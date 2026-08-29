/* ---------------- SHOTS: THE CALLED ROUNDS ---------------- */
const SHOT_CATS = ['Classic Shooters','Dessert & Candy','Layered','Bombs & Boilermakers','Industry Handshakes','Flaming & Novelty'];
const SHOTS = [
  // CLASSIC SHOOTERS
  { name:"Kamikaze", cat:"Classic Shooters", spec:["3/4 oz vodka","3/4 oz triple sec","3/4 oz lime juice"], method:"Shake with ice, strain into shot glasses", note:"A tiny, honest sour: the shooter that taught the 1970s to shake." },
  { name:"Lemon Drop", cat:"Classic Shooters", spec:["1 oz citron vodka","1/4 oz lemon juice","1/4 oz simple syrup"], method:"Shake, strain; serve with a sugared lemon wedge to bite after", note:"The wedge is part of the spec, not a garnish." },
  { name:"Green Tea", cat:"Classic Shooters", spec:["1/2 oz Irish whiskey","1/2 oz peach schnapps","1/2 oz lemon juice + 1/2 oz simple","splash lemon-lime soda"], method:"Shake everything but soda, strain, splash", note:"No tea in it: named for the color. The single best-selling called shot in most American bars." },
  { name:"White Tea", cat:"Classic Shooters", spec:["1/2 oz vodka","1/2 oz peach schnapps","1/2 oz lemon juice + 1/2 oz simple","splash lemon-lime soda"], method:"Shake, strain, splash", note:"The Green Tea's vodka sibling: same garden, different leaf." },
  { name:"Washington Apple", cat:"Classic Shooters", spec:["3/4 oz Canadian whisky","3/4 oz sour apple schnapps","3/4 oz cranberry juice"], method:"Shake, strain", note:"Also served tall as a cocktail — ask which they want." },
  { name:"Red Snapper", cat:"Classic Shooters", spec:["3/4 oz Canadian whisky","3/4 oz amaretto","3/4 oz cranberry juice"], method:"Shake, strain", note:"A Washington Apple that traded the orchard for the almond tree. (Also the name of a gin Bloody Mary — context matters.)" },
  { name:"Royal Flush", cat:"Classic Shooters", spec:["3/4 oz Canadian whisky","3/4 oz peach schnapps","3/4 oz cranberry juice"], method:"Shake, strain", note:"The whisky-peach-cran triangle completes the family." },
  { name:"Purple Hooter", cat:"Classic Shooters", spec:["3/4 oz vodka","3/4 oz raspberry liqueur","3/4 oz lemon juice + splash soda"], method:"Shake, strain", note:"1980s survivor; still called every weekend." },
  { name:"Woo Woo", cat:"Classic Shooters", spec:["3/4 oz vodka","3/4 oz peach schnapps","1 oz cranberry juice"], method:"Shake, strain", note:"A Sex on the Beach that lost the orange juice on the way to the bar." },
  { name:"Melon Ball", cat:"Classic Shooters", spec:["3/4 oz vodka","3/4 oz melon liqueur","3/4 oz pineapple juice"], method:"Shake, strain", note:"Neon green and proud of it." },
  { name:"Surfer on Acid", cat:"Classic Shooters", spec:["3/4 oz Jägermeister","3/4 oz coconut rum","3/4 oz pineapple juice"], method:"Shake hard, strain", note:"Herbal amaro meets the beach — weirder on paper than in the glass." },
  { name:"Alabama Slammer", cat:"Classic Shooters", spec:["1/2 oz amaretto","1/2 oz sloe gin","1/2 oz Southern Comfort","splash orange juice"], method:"Shake, strain", note:"Also served tall; the shot version is the original 1970s fraternity call." },
  { name:"Kool-Aid", cat:"Classic Shooters", spec:["1/2 oz vodka","1/2 oz amaretto","1/2 oz melon liqueur","1 oz cranberry juice"], method:"Shake, strain", note:"Tastes exactly like it sounds — which is the point." },
  { name:"Snake Bite", cat:"Classic Shooters", spec:["1 oz Yukon Jack","1/4 oz lime cordial"], method:"Shake or build chilled", note:"The Canadian bar staple (not the British beer-and-cider pint of the same name)." },
  { name:"Prairie Fire", cat:"Classic Shooters", spec:["1.5 oz blanco tequila","4 dashes hot sauce"], method:"Build in the shot glass", note:"Order it for someone else. Warn the guest; never spring it as a prank pour." },
  { name:"Three Wise Men", cat:"Classic Shooters", spec:["1/2 oz Tennessee whiskey","1/2 oz bourbon","1/2 oz blended scotch"], method:"Build chilled or room temp", note:"Jack, Jim, and Johnnie walk into a glass. Count it as a full whiskey pour for pacing." },
  { name:"Mind Eraser", cat:"Classic Shooters", spec:["1 oz vodka","1 oz coffee liqueur","2 oz soda water"], method:"Build over ice in a rocks glass, layered; drunk through a straw in one pull", note:"Technically a shot in cocktail's clothing: the straw slam is the ritual." },

  // DESSERT & CANDY
  { name:"Chocolate Cake", cat:"Dessert & Candy", spec:["3/4 oz citron vodka","3/4 oz Frangelico"], method:"Shake, strain; bite a sugared lemon wedge immediately after", note:"The magic trick: no chocolate anywhere, but hazelnut + lemon + sugar reads as cake on the palate." },
  { name:"Pineapple Upside-Down Cake", cat:"Dessert & Candy", spec:["3/4 oz vanilla vodka","3/4 oz pineapple juice","splash grenadine"], method:"Shake, strain, sink the grenadine", note:"The cherry-on-the-bottom look sells it." },
  { name:"Cinnamon Toast Crunch", cat:"Dessert & Candy", spec:["3/4 oz cinnamon whisky","3/4 oz horchata cream liqueur (RumChata-style)"], method:"Shake with ice, strain", note:"Uncannily accurate to the cereal, the 2010s' best-selling dessert shot." },
  { name:"PB&J", cat:"Dessert & Candy", spec:["3/4 oz Frangelico","3/4 oz raspberry liqueur"], method:"Shake, strain", note:"Hazelnut plays the peanut butter; nobody complains." },
  { name:"Oatmeal Cookie", cat:"Dessert & Candy", spec:["1/2 oz Irish cream","1/2 oz butterscotch schnapps","1/2 oz cinnamon schnapps"], method:"Shake, strain", note:"Some houses add a bar spoon of Jägermeister for the 'baked' note." },
  { name:"Scooby Snack", cat:"Dessert & Candy", spec:["1/2 oz melon liqueur","1/2 oz coconut rum","1/2 oz pineapple juice","splash cream"], method:"Shake very hard for froth, strain", note:"The froth is the signature; a lazy shake ruins the Snack." },
  { name:"Key Lime Pie", cat:"Dessert & Candy", spec:["3/4 oz Licor 43","1/2 oz lime juice","1/2 oz cream"], method:"Shake, strain into graham-cracker-rimmed shot glass", note:"Licor 43's vanilla does the pie crust's job." },
  { name:"Birthday Cake", cat:"Dessert & Candy", spec:["3/4 oz vanilla vodka","3/4 oz white crème de cacao"], method:"Shake, strain into sprinkle-rimmed glass", note:"The rim is non-negotiable. It's someone's birthday: commit." },
  { name:"Buttery Nipple", cat:"Dessert & Candy", spec:["1 oz butterscotch schnapps","1/2 oz Irish cream float"], method:"Schnapps first, float the cream over a barspoon", note:"Half dessert, half layered — the gateway to layering technique." },

  // LAYERED
  { name:"B-52", cat:"Layered", spec:["1/2 oz coffee liqueur","1/2 oz Irish cream","1/2 oz Grand Marnier"], method:"Layer in exactly that order over an inverted barspoon", note:"The layering benchmark: if your B-52 is clean, your hand is steady." },
  { name:"Baby Guinness", cat:"Layered", spec:["3/4 oz coffee liqueur","1/4 oz Irish cream float"], method:"Float the cream to form the 'head'", note:"A perfect miniature stout, the most charming layered shot in the book." },
  { name:"Duck Fart", cat:"Layered", spec:["1/2 oz coffee liqueur","1/2 oz Irish cream","1/2 oz Canadian whisky"], method:"Layer in order", note:"Alaska's unofficial state shot, born at the Peanut Farm in Anchorage." },
  { name:"Brain Hemorrhage", cat:"Layered", spec:["1 oz peach schnapps","1/2 oz Irish cream, dribbled in","3 drops grenadine"], method:"The cream curdles into a 'brain'; grenadine bleeds through", note:"Halloween's finest gross-out; the curdling is intentional chemistry, not spoilage." },

  // BOMBS & BOILERMAKERS
  { name:"Boilermaker", cat:"Bombs & Boilermakers", spec:["1.5 oz whiskey (shot)","1 pint of beer"], method:"Served side by side: sip or drop, drinker's choice", note:"The great-grandfather of every bomb. A shift beer and a shot is also the industry's closing ritual." },
  { name:"Jägerbomb", cat:"Bombs & Boilermakers", spec:["1.5 oz Jägermeister (shot)","1/2 can energy drink in a glass"], method:"Shot dropped into the glass, drunk immediately", note:"Many bars serve the pieces side by side; dropped glassware chips and injures. Know your house policy." },
  { name:"Irish Slammer", cat:"Bombs & Boilermakers", spec:["3/4 oz Irish cream + 3/4 oz Irish whiskey (shot)","1/2 pint of stout"], method:"Drop and drink fast: the cream curdles if you linger", note:"Long sold under a name referencing car bombings; the industry has widely renamed it (Irish Slammer, Dublin Drop). Use the respectful name and gently translate when guests use the old one." },
  { name:"Sake Bomb", cat:"Bombs & Boilermakers", spec:["1.5 oz sake (shot)","1/2 pint of lager"], method:"Shot balanced on chopsticks over the glass; the table pounds, it drops", note:"An American invention: most izakayas in Japan have never seen one." },
  { name:"Vegas Bomb", cat:"Bombs & Boilermakers", spec:["Royal Flush shot (whisky, peach schnapps, cranberry)","1/2 glass energy drink"], method:"Drop and drink", note:"A shooter and a bomb had a baby in a casino." },
  { name:"Skittle Bomb", cat:"Bombs & Boilermakers", spec:["1 oz Cointreau (shot)","1/2 glass energy drink"], method:"Drop and drink", note:"Orange liqueur + energy drink genuinely tastes like the candy. Chemistry is strange." },

  // INDUSTRY HANDSHAKES
  { name:"Pickleback", cat:"Industry Handshakes", spec:["1.5 oz Irish whiskey (shot)","1.5 oz pickle brine (chaser)"], method:"Whiskey first, brine second", note:"The brine neutralizes the burn completely. Bushwick, 2006, and now everywhere." },
  { name:"Ferrari", cat:"Industry Handshakes", spec:["1 oz Fernet-Branca","1 oz Campari"], method:"Stir briefly over ice or serve as a chilled shot", note:"F + C = the badge. The after-shift aperitivo-digestivo compromise." },
  { name:"Hard Start", cat:"Industry Handshakes", spec:["3/4 oz Fernet-Branca","3/4 oz Branca Menta"], method:"Chilled, straight down", note:"A modern addition to the bartender liturgy: Fernet with training wheels, or Menta with teeth." },
  { name:"Chilled Fernet", cat:"Industry Handshakes", spec:["1.5 oz Fernet-Branca, freezer-cold"], method:"Pour, nod, drink", note:"THE bartender's handshake. In San Francisco it comes with a ginger beer back by law of custom." },
  { name:"Snaquiri", cat:"Industry Handshakes", spec:["1 oz white rum","1/2 oz lime juice","1/4 oz simple syrup"], method:"Shake, strain into a shot glass, a snack-sized Daiquiri", note:"The industry's love language: proof that even a shot can be balanced and beautiful." },
  { name:"Malört", cat:"Industry Handshakes", spec:["1.5 oz Jeppson's Malört, room temperature"], method:"Pour with eye contact", note:"Chicago's wormwood initiation. The grimace has a name, 'Malört face', and photographing a friend's first one is tradition." },
  { name:"Sambuca con la Mosca", cat:"Industry Handshakes", spec:["1.5 oz sambuca","3 coffee beans ('the flies')"], method:"Beans float on top; sometimes flamed briefly to toast them, then extinguished", note:"Three beans for health, wealth, and happiness: never an even number." },
  { name:"Tequila & Sangrita", cat:"Industry Handshakes", spec:["1.5 oz blanco tequila","1.5 oz sangrita (citrus, tomato, chile) alongside"], method:"Sipped alternately — never slammed, no lime-and-salt theatrics", note:"How Jalisco actually drinks tequila. Offering it this way marks you as someone who knows." },
  { name:"Green Chartreuse", cat:"Industry Handshakes", spec:["1 oz green Chartreuse, freezer-cold"], method:"Pour reverently", note:"110 proof, 130 herbs, made by monks. The closing-time genuflection of the craft-bar world." },
  // CLASSIC SHOOTERS (+7)
  { name:"Redheaded Slut", cat:"Classic Shooters", spec:["3/4 oz Jägermeister","3/4 oz peach schnapps","3/4 oz cranberry juice"], method:"Shake, strain", note:"One of the most-called shots in America despite the name — many bars have quietly rebranded it 'Ginger Snap' or 'Redhead.' Take the order graciously and use whichever name your house prefers." },
  { name:"Four Horsemen", cat:"Classic Shooters", spec:["1/2 oz Tennessee whiskey","1/2 oz bourbon","1/2 oz blended scotch","1/2 oz Irish whiskey"], method:"Build chilled", note:"The Three Wise Men plus one. Two ounces of straight whiskey: count it as a double and mean it." },
  { name:"Liquid Marijuana", cat:"Classic Shooters", spec:["1/2 oz spiced rum","1/2 oz blue curaçao","1/2 oz melon liqueur","1/2 oz coconut rum","1 oz pineapple juice","splash sweet & sour"], method:"Shake, strain", note:"Contains nothing of the kind: named for the swampy green color. A tiki drink in a shot glass." },
  { name:"Blue Kamikaze", cat:"Classic Shooters", spec:["3/4 oz vodka","3/4 oz blue curaçao","3/4 oz lime juice"], method:"Shake, strain", note:"A Kamikaze with the triple sec swapped for blue — same drink, different costume." },
  { name:"Tequila Slammer", cat:"Classic Shooters", spec:["1 oz blanco tequila","1 oz lemon-lime soda"], method:"Cover the glass, slam it on the bar to fizz, drink immediately", note:"The slam is the recipe. Use a sturdy glass and a bar mat: this is how glassware dies." },
  { name:"Jelly Bean", cat:"Classic Shooters", spec:["3/4 oz blackberry brandy","3/4 oz anisette or sambuca"], method:"Build or briefly layer", note:"Licorice plus berry lands exactly on the candy. Some houses build it layered instead." },
  { name:"Liquid Cocaine", cat:"Classic Shooters", spec:["1/2 oz Jägermeister","1/2 oz peppermint schnapps","1/2 oz 151 rum"], method:"Build chilled, or shake with ice", note:"At least four different recipes carry this name; always ask how the guest wants it built." },

  // DESSERT & CANDY (+8)
  { name:"Gummy Bear", cat:"Dessert & Candy", spec:["3/4 oz raspberry vodka","3/4 oz peach schnapps","1/2 oz lemon-lime soda","splash cranberry"], method:"Shake the spirits, strain, splash the soda", note:"The 'White Gummy Bear' swaps in pineapple juice for the cranberry." },
  { name:"Jolly Rancher", cat:"Dessert & Candy", spec:["3/4 oz apple schnapps","3/4 oz peach schnapps","1/2 oz cranberry juice"], method:"Shake, strain", note:"Green apple is the default reading: swap the schnapps to change the 'flavor' the guest asked for." },
  { name:"Starburst", cat:"Dessert & Candy", spec:["3/4 oz vodka","1/2 oz peach schnapps","1/2 oz orange juice","splash grenadine"], method:"Shake, strain", note:"The pink Starburst is the target. Ask which color they want: the answer is always pink." },
  { name:"Bazooka Joe", cat:"Dessert & Candy", spec:["1/2 oz banana liqueur","1/2 oz blue curaçao","1/2 oz Irish cream"], method:"Layer in order, or shake for the fast version", note:"Tastes uncannily like bubble gum, a genuine bar-chemistry curiosity." },
  { name:"Tootsie Roll", cat:"Dessert & Candy", spec:["1 oz dark crème de cacao","1 oz orange juice"], method:"Shake, strain", note:"Chocolate plus orange really does read as the candy. Two ingredients, universally recognized." },
  { name:"Peppermint Patty", cat:"Dessert & Candy", spec:["3/4 oz peppermint schnapps","3/4 oz dark crème de cacao","splash cream (optional)"], method:"Shake, strain", note:"Served hot with cocoa it becomes a winter menu staple." },
  { name:"Mexican Candy Shot", cat:"Dessert & Candy", spec:["1 oz blanco tequila","3/4 oz watermelon liqueur or purée","1/4 oz lime juice","dash hot sauce","chamoy + Tajín rim"], method:"Shake, strain into a rimmed glass", note:"Sweet, sour, salty, spicy all at once, the modern shot that best rewards actual technique." },
  { name:"Root Beer Float Shot", cat:"Dessert & Candy", spec:["3/4 oz root beer schnapps (or licor 43)","3/4 oz coffee liqueur","1/2 oz cream float"], method:"Build, float the cream", note:"The cream is the 'float': pour it last over a spoon and don't stir." },

  // LAYERED (+6, including two the Layer Drill already referenced)
  { name:"Slippery Nipple", cat:"Layered", spec:["1 oz sambuca","1/2 oz Irish cream float"], method:"Sambuca first, float the cream over a barspoon", note:"A drop of grenadine dripped through the cream makes it a 'bleeding' variant." },
  { name:"Springbokkie", cat:"Layered", spec:["3/4 oz green crème de menthe","3/4 oz Amarula cream"], method:"Menthe first, float the Amarula", note:"South Africa's rugby colors. Amarula is a marula-fruit cream liqueur — Irish cream substitutes fine." },
  { name:"B-51", cat:"Layered", spec:["1/2 oz coffee liqueur","1/2 oz Irish cream","1/2 oz Frangelico"], method:"Layer in order", note:"The B-52 with hazelnut in the top slot instead of orange. B-53 swaps in absinthe; B-54 uses amaretto." },
  { name:"Bumble Bee", cat:"Layered", spec:["1/2 oz coffee liqueur","1/2 oz Irish cream","1/2 oz Galliano"], method:"Layer in order", note:"The yellow Galliano stripe over dark and cream gives it the name." },
  { name:"Traffic Light", cat:"Layered", spec:["1/2 oz grenadine","1/2 oz green crème de menthe","1/2 oz Galliano"], method:"Layer in order: grenadine is the heaviest thing on your bar", note:"Red, then green, then yellow reading bottom to top. Pure density showmanship." },
  { name:"Black and Tan", cat:"Layered", spec:["1/2 pint pale ale or lager","1/2 pint stout, poured over a spoon"], method:"Fill halfway with the lighter beer, then pour the stout slowly over an inverted spoon", note:"Beer layering follows the same density rule. In Ireland, ask for a 'half and half': the other name carries historical baggage." },

  // BOMBS & BOILERMAKERS (+2)
  { name:"Dr Pepper Shot", cat:"Bombs & Boilermakers", spec:["3/4 oz amaretto","1/4 oz 151 rum (shot)","1/2 glass lager"], method:"Drop the shot into the beer, drink fast", note:"Tastes remarkably like the soda. No Dr Pepper involved at any point." },
  { name:"Bomb Pop", cat:"Bombs & Boilermakers", spec:["1/2 oz grenadine","1/2 oz blue curaçao","1/2 oz vodka","1/2 glass lemon-lime soda or energy drink"], method:"Layer bottom-up by density — grenadine, curaçao, vodka — then drop", note:"All three Bomb Pop colors in the glass — the bands stack red, blue, white by density, since vodka floats on everything (see the ladder). The layering is the whole appeal." },

  // INDUSTRY HANDSHAKES (+2)
  { name:"Salt & Lime Tequila", cat:"Industry Handshakes", spec:["1.5 oz blanco tequila","lime wedge","pinch of salt"], method:"Salt on the hand, lick, shoot, bite the lime", note:"The ritual most guests expect, and the one most Mexican bartenders would gently steer you away from. Salt and lime exist to mask a rough spirit; with good tequila, offer sangrita or a simple sip instead." },
  { name:"Shift Beer & Shot", cat:"Industry Handshakes", spec:["1.5 oz whiskey (or amaro)","1 cold cheap beer"], method:"Poured at the end of a shift, drunk sitting down", note:"Not a recipe so much as a ritual, the closing-time boilermaker every bar crew shares. The beer should be cold, cheap, and unpretentious." },

  // FLAMING & NOVELTY (new category, 5)
  { name:"Flaming Dr Pepper", cat:"Flaming & Novelty", spec:["3/4 oz amaretto","1/4 oz 151 rum floated on top","1/2 glass lager"], method:"Float the 151, ignite, EXTINGUISH, then drop into the beer", note:"Always blow out the flame before dropping. Never hand a guest a lit glass, never pour from a bottle near flame, and keep a wet towel within reach." },
  { name:"Flaming Sambuca", cat:"Flaming & Novelty", spec:["1.5 oz sambuca","3 coffee beans"], method:"Ignite briefly to toast the beans, extinguish, let the glass cool before serving", note:"The flame toasts the beans and warms the anise oils. The glass gets genuinely hot — cool it and warn the guest." },
  { name:"Flaming Lamborghini", cat:"Flaming & Novelty", spec:["1 oz coffee liqueur","1 oz sambuca","1/2 oz blue curaçao","1/2 oz Irish cream"], method:"Layer the coffee liqueur and sambuca, ignite the sambuca for the show, extinguish completely, then pour in the curaçao and Irish cream and serve with a straw", note:"Pure 1980s theater. The traditional serve, pouring into the burning glass while the guest drinks, breaks both fire rules in this book: never pour near open flame, never hand a guest a lit glass. The show ends before the glass crosses the bar. Many bars have banned it outright: know your house rules and your insurance." },
  { name:"Cement Mixer", cat:"Flaming & Novelty", spec:["3/4 oz Irish cream","1/4 oz lime juice"], method:"Cream first, lime second — swish in the mouth before swallowing", note:"The acid curdles the cream on the tongue. A gag shot, not a drink: never serve it to someone who didn't order it knowingly." },
  { name:"Blue Blazer Shot", cat:"Flaming & Novelty", spec:["1.5 oz cask-strength scotch","1.5 oz boiling water","1 tsp demerara sugar"], method:"Ignite and pour the flaming liquid between two metal mugs, then serve", note:"An 1862 showpiece, scaled down. Practice with cold water dozens of times before you ever strike a match." },
];

const SHOT_SERVICE = [
  ["Building a round like a pro","For a round of six: multiply the spec by six plus a splash extra for foam and loss, shake it all in one large tin, line the glasses rim to rim in a tight row, and pour in one continuous back-and-forth motion: first pass fills halfway, second pass levels them. Even fill is the mark of the craft; topping up glass-by-glass reads amateur and wastes seconds you don't have on a Saturday."],
  ["Layering physics","Layers hold because of sugar density, not alcohol: the sweetest, heaviest liqueur goes first, the lightest last. Pour each layer slowly over the back of an inverted barspoon touching the glass wall. Cold bottles layer cleaner than warm ones. Learn the B-52 order cold and every other layered shot follows the same logic: when in doubt, more sugar sinks."],
  ["Bombs, glassware & house policy","Dropped shot glasses chip pint glasses, and chipped glass near mouths is a lawsuit. Many bars serve bomb components side by side and let the guest do the drop — know your house policy before your first Saturday. Cream-plus-stout bombs curdle within a minute, so serve them last in a round and tell the table to go immediately."],
  ["Naming diplomacy","Shot recipes vary wildly bar to bar — if a guest calls a shot you don't know, the professional move is a friendly 'how do you like that made?' They'll happily tell you, and you'll learn your neighborhood's dialect. Some legacy shot names are crude or genuinely offensive; use the renamed versions (Irish Slammer, not the old name) and translate gently when guests use the originals. You set the tone of your bar."],
  ["Flaming shots & fire safety","If your bar allows them at all: never pour from a bottle anywhere near an open flame: the bottle can flash back. Extinguish every flame before the glass reaches a guest, never hand over a lit glass, keep a wet bar towel and a lid within arm's reach, tie back hair and roll sleeves, and check that nothing above the bar is flammable. Flamed glass stays hot far longer than it looks; cool it before serving. Many venues and insurers ban flaming service outright: know your house rule before a guest asks."],
  ["Know your shot glass","A 'pony' is 1 oz, a standard shot is 1.5 oz, a double is 2 oz, and 'cheater' glasses have thick false bottoms that hold well under an ounce while looking full. Know exactly what your house glass holds — it determines your pour cost, your responsible-service count, and whether a guest feels cheated. When batching a round, measure to the glass you're actually using, not the one in your head."],
  ["Responsible shot service","Shots are the fastest route to over-service: they bypass the natural pacing of a sipped drink. Count a round against each guest like a full drink (count the two-ounce Four Horsemen as a double; a Three Wise Men is one full drink), keep water on the bar, and slow the train early: 'let me get some waters going with these.' Never stack a second round in front of a visibly intoxicated guest, and remember the birthday crowd's enthusiasm is not your legal defense. Your right to refuse is also your duty."],
];

function shotTicketHTML(s, hideName){
  const lines = s.spec.map(l => '<div class="spec-line"><span>·</span><span>'+esc(l)+'</span></div>').join('');
  return '<div class="ticket"><div class="ticket-inner">'
    + '<div class="tc"><div class="tix-label">'+esc(s.cat)+' · Shot Call</div>'
    + '<div class="tix-name">'+(hideName ? '· ? ·' : esc(s.name.toUpperCase()))+'</div></div>'
    + '<div class="tix-rule"></div>'+lines+'<div class="tix-rule"></div>'
    + '<div><span class="tix-label">Method </span>'+esc(s.method)+'</div>'
    + (!hideName && s.note ? '<div class="tix-rule"></div><div class="tix-note">'+esc(s.note)+'</div>' : '')
    + '</div></div>';
}

/* ---------------- SHOT BOARD: DENSITY, DRILLS & ROUNDS ---------------- */

// Rough specific gravity ladder — the physics behind every layered shot.
const LAYER_LADDER = [
  ["Grenadine / syrups","~1.18","Pure sugar. Sinks under everything: the floor of any layered build."],
  ["Crème de cassis / noyaux","~1.16","Heavy fruit liqueurs, just above syrup."],
  ["Coffee liqueur (Kahlúa-style)","~1.15","The classic base layer, the B-52's foundation."],
  ["Crème de menthe / cacao","~1.12","Crème liqueurs are sugar-dense despite the name."],
  ["Butterscotch / peach schnapps","~1.08","Sweet, low proof, sits low-to-middle."],
  ["Irish cream","~1.05","The great middle layer. Curdles on contact with acid."],
  ["Amaretto / Frangelico","~1.04","Nutty liqueurs, mid-ladder."],
  ["Orange liqueur (Grand Marnier, Cointreau)","~1.03","Higher proof drags density down — a top layer."],
  ["Green Chartreuse","~1.01","110 proof, herbal, near the top."],
  ["Whiskey / rum / vodka (80 proof)","~0.95","Spirits are LIGHTER than water. Always the crown, never the base."],
  ["Overproof spirits (151)","~0.90","The lightest thing on your bar: floats on everything, ignites on cue."],
];

const LAYERED_BUILDS = [
  { name:"B-52", layers:[
      ["Coffee liqueur","heaviest: most sugar, lowest proof"],
      ["Irish cream","the classic middle band"],
      ["Grand Marnier","highest proof of the three, so it floats"]],
    note:"The benchmark. Clean B-52 = steady hand." },
  { name:"Baby Guinness", layers:[
      ["Coffee liqueur","the dark 'stout' body"],
      ["Irish cream","the pale 'head'"]],
    note:"Two layers, maximum charm." },
  { name:"Duck Fart", layers:[
      ["Coffee liqueur","sugar-heavy base"],
      ["Irish cream","middle"],
      ["Canadian whisky","spirit floats on liqueur, every time"]],
    note:"Anchorage, Alaska's own." },
  { name:"Buttery Nipple", layers:[
      ["Butterscotch schnapps","sweet and low-proof"],
      ["Irish cream","floats on the schnapps"]],
    note:"The gateway layered shot." },
  { name:"Slippery Nipple", layers:[
      ["Sambuca","dense anise liqueur"],
      ["Irish cream","the pale cap"]],
    note:"A dash of grenadine dropped through makes it a 'bleeding' variant." },
  { name:"Springbokkie", layers:[
      ["Green crème de menthe","dense crème liqueur, the green base"],
      ["Amarula cream","the cream crown"]],
    note:"South Africa's rugby colors, in a glass." },
  { name:"Brain Hemorrhage", layers:[
      ["Peach schnapps","the base pool"],
      ["Irish cream","dribbled in — it curdles on purpose into the 'brain'"],
      ["Grenadine","3 drops, which sink and bleed through"]],
    note:"The one build where grenadine goes LAST: you want it falling through the curdled cream, not sitting under it." },
];

// Shots that change most from bar to bar, the dialect map.
const SHOT_VARIANTS = {
  "Green Tea":"Nearly universal as Irish whiskey + peach schnapps + sour + a soda splash — but some houses use Jameson specifically and call anything else a White Tea, some skip the soda entirely, and Midwest bars often build it as a tall 'Green Tea Shot' over ice. Ask which they mean.",
  "Washington Apple":"Canadian whisky in the Northwest, but Crown Royal specifically in most of the Midwest and South. Some bars build it with apple schnapps and no cranberry; others serve it tall.",
  "Alabama Slammer":"The 1970s original is amaretto + sloe gin + Southern Comfort. Many modern bars drop the sloe gin (hard to stock) and add vodka. Both are 'correct' depending on the ZIP code.",
  "Oatmeal Cookie":"Butterscotch + Irish cream + cinnamon schnapps is the base. Some houses add a bar spoon of Jägermeister for a 'baked' note; others swap in Goldschläger for the cinnamon.",
  "Kool-Aid":"The name attaches to at least four different builds depending on the region: vodka/amaretto/melon/cranberry is the most common, but 'Cherry Kool-Aid' with cherry liqueur is its own thing entirely.",
  "Mind Eraser":"Layered in a rocks glass and drunk through a straw is the original. Some bars shake and serve it as a straight shooter, which loses the whole point: the straw pulls the layers in reverse.",
  "Red Snapper":"Whisky + amaretto + cranberry as a shot in the Midwest, but 'Red Snapper' also means a gin Bloody Mary in old-school New York hotel bars. Confirm before you build.",
  "Irish Slammer":"Formerly sold under a name referencing car bombings; the industry has widely moved to Irish Slammer or Dublin Drop. Some guests still use the old name innocently: take the order graciously and use the new name back.",
  "Three Wise Men":"Jack, Jim, and Johnnie is the classic trio. 'Three Wise Men Go Hunting' adds Wild Turkey; 'and a Mexican' adds tequila. Each addition is another half ounce of liquor: count accordingly.",
  "Jägerbomb":"Dropped is traditional, but a growing number of bars serve the components side by side to protect glassware. Some houses also pre-batch the Jäger portion in a chilled bottle for speed on busy nights.",
  "Prairie Fire":"Tequila and hot sauce is standard, but the heat level varies wildly. Always ask 'how hot do you want it?' and never serve one as a prank on an unsuspecting guest.",
  "Liquid Cocaine":"At least four unrelated builds carry this name — Jäger/peppermint/151 is the most common, but some bars mean Rumple Minze and Bacardi 151, others a blue vodka shooter. Always ask.",
  "Redheaded Slut":"Jäger, peach schnapps, and cranberry is near-universal, but many houses now list it as 'Ginger Snap' or simply 'Redhead.' Some bars shake it; others build it as a bomb with the cranberry as the chaser.",
  "Bazooka Joe":"Layered in most bars, shaken in busy ones. Some swap the blue curaçao for blue raspberry schnapps, which changes the color but not the bubble-gum trick.",
  "Pickleback":"Irish whiskey is the Bushwick original, but bourbon and even mezcal picklebacks are common now. The brine matters more than the whiskey: house-made dill brine is the flex.",
};

function shotRoundHTML(){
  const b = state.shots;
  const s = SHOTS[b.rDrink];
  const n = b.rCount;
  const lines = s.spec.map(l => '<div class="spec-line"><span>·</span><span>'+esc(pluralize(scaleLine(l, n)))+'</span></div>').join('');
  const per = s.spec.reduce((t,l)=>t+lineOz(l),0);
  const total = per * n;
  const shakeable = /shake/i.test(s.method);
  const layered = /layer|float/i.test(s.method);
  let advice;
  if(layered) advice = 'Layered builds cannot be batched: pour each glass individually, slowest hand wins. Line the glasses up first so you never stop moving.';
  else if(shakeable) advice = 'Batch all '+n+' in one large tin with ice, then pour rim-to-rim in one continuous pass: halfway down the row, then back to level them.';
  else advice = 'Build straight into the lined-up glasses; a steady speed-pour beats measuring each one on a busy night.';
  return '<div class="ticket"><div class="ticket-inner">'
    + '<div class="tc"><div class="tix-label">Round sheet · '+n+' guests</div>'
    + '<div class="tix-name">'+esc(s.name.toUpperCase())+'</div></div>'
    + '<div class="tix-rule"></div>'+lines+'<div class="tix-rule"></div>'
    + (per ? '<div><span class="tix-label">Yield ≈ </span>'+trimNum(total)+' oz / '+Math.round(total*29.57)+' ml</div>' : '')
    + '<div class="tix-rule"></div><div class="tix-note">'+esc(advice)+'</div>'
    + '</div></div>';
}

function renderShots(){
  const sh = state.shots;
  const nav = [['board','The Board'],['round','Round Builder'],['layer','Layer Drill'],['service','Service Craft']]
    .map(([k,l]) => '<button class="tab-btn'+(sh.view===k?' active':'')+'"'+(sh.view===k?' aria-current="true"':'')+' data-act="shots-view" data-v="'+k+'">'+l+'</button>').join('');
  const wrap = (inner) => '<div class="col"><nav class="tabs" style="margin-bottom:4px">'+nav+'</nav>'+inner+'</div>';

  /* ---- shot-call drill (overlays the board) ---- */
  if(sh.drill){
    const s = SHOTS[sh.order[sh.idx]];
    const head = '<div class="row between tiny dim"><span>Shot call '+(sh.idx+1)+' of '+sh.order.length+'</span>'
      + '<button class="chip" data-act="shots-exit">Exit drill</button></div>';
    if(!sh.revealed){
      return '<div class="col">'+head
        + '<div class="panel p5 col tc" style="align-items:center">'
        + '<div class="eyebrow">The table calls out —</div>'
        + '<div class="font-display" style="font-size:1.5rem;color:var(--brass-2)">'+esc(s.name)+'</div>'
        + '<div class="small dim">Say the build and the method out loud, then check.</div>'
        + '<button class="btn btn-brass" data-act="shots-flip">Show the ticket</button></div></div>';
    }
    return '<div class="col">'+head
      + '<div class="panel p5 col" style="align-items:center">'+shotTicketHTML(s)
      + '<button class="btn btn-brass" data-act="shots-next">'+(sh.idx+1>=sh.order.length?'Finish the round':'Next call')+'</button></div></div>';
  }

  /* ---- ROUND BUILDER ---- */
  if(sh.view==='round'){
    const opts = SHOTS.map((s,i) => '<option value="'+i+'"'+(sh.rDrink===i?' selected':'')+'>'+esc(s.name)+'</option>').join('');
    return wrap('<div class="panel p5 col" style="gap:14px">'
      + '<div class="eyebrow">Round builder</div>'
      + '<div class="small dim lh">A round of six should take one tin, one pass, and zero arithmetic. Pick the call and the headcount; the ledger does the multiplication and tells you how to pour it.</div>'
      + '<div class="row" style="gap:10px">'
      + '<select class="input" id="shot-drink" style="flex:2;min-width:170px">'+opts+'</select>'
      + '<input class="input" type="number" min="1" max="30" id="shot-count" value="'+sh.rCount+'" style="flex:1;min-width:80px">'
      + '</div>'
      + '<div id="shot-round-out" style="display:flex;justify-content:center">'+shotRoundHTML()+'</div>'
      + '<div class="tiny dim lh">Pour a splash extra into the tin: foam and tin loss will cost you the last glass otherwise.</div>'
      + '<div class="row"><a class="btn btn-ghost tiny" href="'+ytSearch('how to pour a round of shots bartender technique'+scopeSuffix())+'" target="_blank" rel="noopener noreferrer">▶ Watch a round poured</a></div>'
      + '</div>');
  }

  /* ---- LAYER DRILL ---- */
  if(sh.view==='layer'){
    const ladder = LAYER_LADDER.map(([n,d,note]) =>
      '<div class="hist-row" style="align-items:baseline"><span class="small">'+esc(n)+'</span>'
      + '<span class="tiny dim" style="text-align:right;max-width:60%">'+esc(note)+' <span class="font-tix brass2">'+esc(d)+'</span></span></div>').join('');
    let drill;
    if(!sh.lay){
      drill = '<div class="panel p5 col tc" style="align-items:center">'
        + '<div class="eyebrow">Layer drill</div>'
        + '<div class="small dim lh" style="max-width:440px">You\'ll get a layered shot with its ingredients scrambled. Tap them in the order you\'d pour: heaviest first. Get the physics right and every layered shot on earth becomes buildable, including ones you\'ve never heard of.</div>'
        + '<button class="btn btn-brass" data-act="lay-start">Deal a build</button></div>';
    } else {
      const b = LAYERED_BUILDS[sh.lay.i];
      const done = sh.lay.picks.length === b.layers.length;
      const correct = done && sh.lay.picks.every((p,idx) => p === idx);
      if(!done){
        const pool = sh.lay.pool.map(pi => {
          const taken = sh.lay.picks.includes(pi);
          const pos = sh.lay.picks.indexOf(pi) + 1;
          return '<button class="opt-btn'+(taken?' picked':'')+'" data-act="lay-pick" data-i="'+pi+'"'+(taken?' disabled':'')+'>'
            + (taken ? '<span class="brass2 bold">'+pos+'. </span>' : '') + esc(b.layers[pi][0]) + '</button>';
        }).join('');
        drill = '<div class="panel p5 col">'
          + '<div><div class="eyebrow mb1">Build the '+esc(b.name)+'</div>'
          + '<div class="small dim">Tap the layers in pour order: bottom of the glass first.</div></div>'
          + '<div class="col-sm">'+pool+'</div>'
          + '<div class="row"><button class="chip" data-act="lay-reset">Start this one over</button></div></div>';
      } else {
        const rows = b.layers.map((l,idx) =>
          '<div class="small lh" style="padding:6px 0;border-bottom:1px solid var(--felt-3)">'
          + '<span class="brass2 bold">'+(idx+1)+'. '+esc(l[0])+'</span><br><span class="dim tiny">'+esc(l[1])+'</span></div>').join('');
        drill = '<div class="panel p5 col">'
          + '<div class="explain"><span class="brass2 bold">'+(correct?'Clean pour. ':'Not the order. ')+'</span>'
          + (correct ? 'That\'s the density ladder working exactly as it should.' : 'Sugar sinks and proof floats: check the correct order against the ladder below.')+'</div>'
          + '<div class="eyebrow">Correct pour order</div>'+rows
          + (b.note ? '<div class="tiny dim lh italic">'+esc(b.note)+'</div>' : '')
          + '<div class="row"><button class="btn btn-brass" data-act="lay-start">Deal another</button>'
          + '<button class="btn btn-ghost" data-act="lay-quit">Done drilling</button></div></div>';
      }
    }
    return wrap(drill
      + '<div class="panel p5 col" style="gap:10px"><div class="eyebrow">The density ladder</div>'
      + '<div class="small dim lh">Layering isn\'t about alcohol; it\'s about sugar. Heaviest (sweetest) on the bottom, lightest (highest proof) on top. Memorize the ladder, not the recipes.</div>'
      + '<div>'+ladder+'</div>'
      + '<div class="tiny dim lh">Technique: pour slowly over the back of an inverted barspoon held against the inside wall of the glass. Cold bottles layer cleaner than warm ones.</div>'
      + '<div class="row"><a class="btn btn-ghost tiny" href="'+ytSearch('how to layer shots bar spoon technique'+scopeSuffix())+'" target="_blank" rel="noopener noreferrer">▶ Watch layering technique</a></div></div>');
  }

  /* ---- SERVICE CRAFT ---- */
  if(sh.view==='service'){
    const svc = SHOT_SERVICE.map(([t,p]) => {
      const open = sh.svc===t;
      return '<div class="panel" style="padding:0 16px">'
        + '<button class="accordion-btn'+(open?' open':'')+'" aria-expanded="'+(open?'true':'false')+'" data-act="shots-svc" data-t="'+esc(t)+'">'
        + '<span>'+esc(t)+'</span><span style="color:var(--brass)">'+(open?'−':'+')+'</span></button>'
        + (open ? '<div class="accordion-body"><div class="small dim lh">'+esc(p)+'</div></div>' : '')+'</div>';
    }).join('');
    return wrap('<div class="col-sm">'+svc+'</div>'
      + '<div class="panel p5 col" style="gap:10px;margin-top:8px"><div class="eyebrow">Sober rounds</div>'
      + '<div class="small dim lh">When a table toasts, the guest who isn\'t drinking should have something in a shot glass too: chilled tart cherry juice with a squeeze of lime, cold-brew with a drop of vanilla syrup, or a ginger-lemon shooter. Same glass, same timing, same clink. Nobody should have to explain an empty hand.</div></div>');
  }

  /* ---- THE BOARD (default) ---- */
  const cats = ['All',...SHOT_CATS].map(c =>
    '<button class="chip'+(sh.cat===c?' on':'')+'" aria-pressed="'+(sh.cat===c?'true':'false')+'" data-act="shots-cat" data-c="'+esc(c)+'">'+esc(c)+'</button>').join(' ');
  const list = SHOTS.map((s,i)=>({s,i})).filter(({s}) => sh.cat==='All' || s.cat===sh.cat);
  const rows = list.map(({s,i}) => {
    const open = sh.open===i;
    const v = SHOT_VARIANTS[s.name];
    const varHTML = (open && v) ? '<div class="tiny dim lh" style="max-width:400px"><span class="brass2 bold">House variations · </span>'+esc(v)+'</div>' : '';
    const badge = v ? '<span class="chip brass">Varies</span>' : '';
    return '<div class="panel"><button class="drink-head" aria-expanded="'+(open?'true':'false')+'" data-act="shots-toggle" data-i="'+i+'"'+(open?' data-open="1"':'')+'>'
      + '<span class="bold">'+esc(s.name)+'</span><span class="chip">'+esc(s.cat)+'</span>'+badge
      + '<span class="plusminus">'+(open?'−':'+')+'</span></button>'
      + (open ? '<div class="drink-body">'+shotTicketHTML(s)+varHTML+videoRowHTML({src:'Shots',name:s.name,group:s.cat,tier:null})+'</div>' : '')+'</div>';
  }).join('');
  return wrap('<div class="small dim lh" style="padding:0 4px">Shots are a third of a busy bar\'s tickets and a tenth of its training. '+SHOTS.length+' calls across '+SHOT_CATS.length+' categories: the party classics, the dessert tricks, the layered showpieces, the bombs, the handshakes bartenders pour each other, and the flaming showpieces. Anything marked <span class="brass2">Varies</span> changes bar to bar; open it to learn the dialects.</div>'
    + '<div class="row"><button class="btn btn-brass" data-act="shots-drill">Run the Shot Call drill</button>'
    + '<span class="tiny dim push">'+list.length+' shots shown</span></div>'
    + '<div class="row">'+cats+'</div>'
    + (sh.cat!=='All' ? '<div class="row">'+categoryVideoHTML(sh.cat,'shot')+'</div>' : '')
    + '<div class="col-sm">'+rows+'</div>');
}

/* ---------------- ZERO PROOF: THE SOBER CANON ---------------- */
const NA_CATS = ['Zero-Proof Classics','Soda Fountain','Garden & Herbal','Fruit Forward','Bitter & Complex','Fizzes & Spritzes','Coffee, Tea & Warm','Global Refreshers','Restoratives & Brunch'];

const NA_DRINKS = [
  // ZERO-PROOF CLASSICS
  { name:"Nojito", cat:"Zero-Proof Classics", spec:["1 oz lime juice","3/4 oz simple syrup","10 mint leaves","4 oz soda water"], method:"Press mint gently, build, swizzle with crushed ice", glass:"Highball", garnish:"Mint bouquet + lime wheel", why:"Extra lime and proper dilution carry the length the rum used to." },
  { name:"Cinderella", cat:"Zero-Proof Classics", spec:["1 oz orange juice","1 oz pineapple juice","1/2 oz lemon juice","1/4 oz grenadine","2 oz soda water"], method:"Shake juices, strain over ice, top with soda", glass:"Collins", garnish:"Orange slice + cherry", why:"A genuine pre-Prohibition classic: the sober canon is older than the word mocktail." },
  { name:"Shirley Temple", cat:"Zero-Proof Classics", spec:["4 oz ginger ale","1/2 oz real grenadine","squeeze of lime"], method:"Build over ice", glass:"Highball", garnish:"Two cherries, always two", why:"Real pomegranate grenadine turns a kids' drink into hospitality." },
  { name:"Roy Rogers", cat:"Zero-Proof Classics", spec:["5 oz cola","1/2 oz real grenadine"], method:"Build over ice", glass:"Highball", garnish:"Brandied cherry", why:"The Shirley Temple's cola-drinking cousin." },
  { name:"Arnold Palmer", cat:"Zero-Proof Classics", spec:["4 oz cold black tea","3 oz fresh lemonade"], method:"Build over ice", glass:"Collins", garnish:"Lemon wheel + mint", why:"Tannin from the tea gives grip; the lemon gives the sour spine." },
  { name:"Sober Sour", cat:"Zero-Proof Classics", spec:["3 oz strong cold black tea","3/4 oz lemon juice","3/4 oz demerara syrup","1 oz aquafaba","2 drops saline"], method:"Dry shake, shake with ice, double strain", glass:"Coupe", garnish:"3 drops NA bitters on the foam", why:"Tannin replaces the whiskey's grip, aquafaba replaces egg white, salt replaces alcohol's savor." },
  { name:"Zero-Proof Daiquiri", cat:"Zero-Proof Classics", spec:["2 oz NA rum alternative (or 2 oz coconut water + 1/4 oz vanilla syrup)","1 oz lime juice","3/4 oz cane syrup","1 pinch salt"], method:"Shake hard, double strain", glass:"Coupe", garnish:"Lime wheel", why:"The salt does what proof used to: it lengthens the finish." },
  { name:"Phony Negroni", cat:"Zero-Proof Classics", spec:["1 oz NA bitter aperitivo","1 oz NA botanical spirit","1 oz alcohol-free red vermouth alternative"], method:"Stir over ice", glass:"Rocks, large cube", garnish:"Expressed orange peel", why:"Bitterness carries the whole drink; this is the family that survives sobriety best." },
  { name:"Virgin Mary", cat:"Zero-Proof Classics", spec:["5 oz tomato juice","1/2 oz lemon juice","1/4 oz pickle brine","3 dashes hot sauce","2 dashes Worcestershire (check label)","horseradish, salt, black pepper"], method:"Roll between tins — never shake", glass:"Highball or pint", garnish:"Celery, lemon, olives, pickled anything", why:"Savory drinks were never leaning on alcohol in the first place." },
  { name:"Prairie Sunrise", cat:"Zero-Proof Classics", spec:["4 oz orange juice","2 oz sparkling water","1/2 oz grenadine, sunk"], method:"Build, pour grenadine down the inside", glass:"Highball", garnish:"Orange + cherry", why:"The Tequila Sunrise's optics work identically without the tequila." },

  // GARDEN & HERBAL
  { name:"Cucumber Basil Cooler", cat:"Garden & Herbal", spec:["4 cucumber slices","6 basil leaves","3/4 oz lime juice","3/4 oz simple syrup","3 oz soda water","pinch salt"], method:"Muddle cucumber and basil, shake, double strain over ice, top", glass:"Highball", garnish:"Cucumber ribbon + basil", why:"Cucumber gives body and cooling; salt makes both read louder." },
  { name:"Garden Gimlet", cat:"Garden & Herbal", spec:["2 oz cucumber juice","3/4 oz lime juice","3/4 oz dill syrup","2 drops saline"], method:"Shake, double strain", glass:"Coupe", garnish:"Dill frond", why:"Vegetal weight stands in for gin's botanical backbone." },
  { name:"Rosemary Grapefruit Fizz", cat:"Garden & Herbal", spec:["3 oz grapefruit juice","3/4 oz lemon juice","3/4 oz rosemary syrup","2 oz soda water","pinch salt"], method:"Shake, strain over ice, top", glass:"Highball", garnish:"Torched rosemary sprig", why:"Grapefruit's natural bitterness is the sober bartender's best friend." },
  { name:"Sage & Honey Lemonade", cat:"Garden & Herbal", spec:["1 oz lemon juice","3/4 oz sage-honey syrup","4 oz still or sparkling water"], method:"Shake, strain over ice", glass:"Collins", garnish:"Sage leaf, slapped", why:"Honey brings viscosity that plain sugar can't." },
  { name:"Thai Basil Limeade", cat:"Garden & Herbal", spec:["1 oz lime juice","3/4 oz palm sugar syrup","8 Thai basil leaves","3 oz soda water"], method:"Muddle basil lightly, shake, double strain, top", glass:"Highball", garnish:"Basil sprig", why:"Anise-tinged basil brings the aromatic lift absinthe would." },
  { name:"Celery Sour", cat:"Garden & Herbal", spec:["2 oz celery juice","3/4 oz lemon juice","3/4 oz simple syrup","1 oz aquafaba","1 drop saline"], method:"Dry shake, shake, double strain", glass:"Coupe", garnish:"Celery leaf", why:"Celery's salinity and bitterness make it one of the great NA base ingredients." },
  { name:"Fennel & Apple Highball", cat:"Garden & Herbal", spec:["3 oz cloudy apple juice","1/2 oz lemon juice","1/2 oz fennel syrup","3 oz soda water"], method:"Build over ice, stir once", glass:"Highball", garnish:"Fennel frond + apple fan", why:"Cloudy juice carries texture that clarified juice loses." },
  { name:"Lavender Lemon Fizz", cat:"Garden & Herbal", spec:["1 oz lemon juice","3/4 oz lavender syrup","1 oz aquafaba","3 oz soda water"], method:"Dry shake, shake, strain, top slowly", glass:"Collins", garnish:"Lemon twist", why:"Floral aromatics reach the nose first — half of flavor is smell." },
  { name:"Tarragon Peach Smash", cat:"Garden & Herbal", spec:["1/2 ripe peach, muddled","3/4 oz lemon juice","3/4 oz tarragon syrup","2 oz soda water"], method:"Muddle, shake, strain over crushed ice", glass:"Rocks", garnish:"Peach slice + tarragon", why:"Crushed ice keeps dilution working as an active ingredient." },

  // FRUIT FORWARD
  { name:"Strawberry Basil Smash", cat:"Fruit Forward", spec:["4 strawberries, muddled","6 basil leaves","3/4 oz lemon juice","3/4 oz simple syrup","2 oz soda"], method:"Muddle, shake, strain over crushed ice", glass:"Rocks", garnish:"Strawberry fan + basil", why:"Ripe fruit brings its own acid and body — adjust the syrup by taste, not by spec." },
  { name:"Blackberry Bramble", cat:"Fruit Forward", spec:["1 oz lemon juice","3/4 oz simple syrup","3 oz soda water","1/2 oz blackberry shrub, drizzled"], method:"Build over crushed ice, drizzle the shrub last", glass:"Rocks", garnish:"Blackberries + lemon", why:"The shrub's vinegar delivers the sharp bite that liqueur can't here." },
  { name:"Watermelon Lime Cooler", cat:"Fruit Forward", spec:["3 oz fresh watermelon juice","3/4 oz lime juice","1/2 oz simple syrup","pinch salt","2 oz soda"], method:"Shake, strain over ice, top", glass:"Highball", garnish:"Watermelon wedge + mint", why:"Salted watermelon is a global street-food truth for a reason." },
  { name:"Peach Bellini", cat:"Fruit Forward", spec:["2 oz white peach purée","4 oz NA sparkling wine"], method:"Purée first, pour bubbles slowly", glass:"Flute", garnish:"None", why:"Carbonation carries aroma upward — bubbles do real work in NA drinks." },
  { name:"Passion Fruit Fizz", cat:"Fruit Forward", spec:["1 oz passion fruit purée","3/4 oz lime juice","3/4 oz simple syrup","3 oz soda water"], method:"Shake, strain over ice, top", glass:"Highball", garnish:"Half passion fruit", why:"Passion fruit is the most intense fruit acid available: a little goes far." },
  { name:"Blood Orange Spritz", cat:"Fruit Forward", spec:["2 oz blood orange juice","1/2 oz lemon juice","1/2 oz simple syrup","3 oz NA sparkling wine","1 oz soda"], method:"Build over ice", glass:"Large wine glass", garnish:"Orange half-wheel", why:"Aperitivo timing and glassware matter as much as what's in the glass." },
  { name:"Pomegranate Cooler", cat:"Fruit Forward", spec:["2 oz pomegranate juice","3/4 oz lime juice","1/2 oz honey syrup","3 oz soda water"], method:"Shake, strain over ice, top", glass:"Highball", garnish:"Pomegranate seeds + mint", why:"Pomegranate carries tannin — the closest fruit analogue to red wine's grip." },
  { name:"Mango Chile Cooler", cat:"Fruit Forward", spec:["3 oz mango purée","3/4 oz lime juice","1/2 oz agave syrup","pinch chile powder"], method:"Shake, pour over crushed ice in rimmed glass", glass:"Highball, Tajín rim", garnish:"Lime wheel + chile dust", why:"Capsaicin creates warmth on the palate, the closest thing to alcohol's heat." },
  { name:"Pineapple Sage Soda", cat:"Fruit Forward", spec:["2 oz pineapple juice","1/2 oz lime juice","3/4 oz sage syrup","3 oz soda water"], method:"Shake, strain over ice, top", glass:"Highball", garnish:"Pineapple frond + sage", why:"Pineapple's enzymes give a savory-sweet weight most juices lack." },

  // BITTER & COMPLEX
  { name:"Bitter Orange Spritz", cat:"Bitter & Complex", spec:["2 oz NA bitter aperitivo","3 oz NA sparkling wine","1 oz soda water"], method:"Build over ice, 3-2-1 style", glass:"Large wine glass", garnish:"Orange slice", why:"The single most convincing NA drink you can serve an adult palate." },
  { name:"Grapefruit Gentian Tonic", cat:"Bitter & Complex", spec:["2 oz grapefruit juice","1/4 oz gentian or wormwood tincture-free bitter syrup","4 oz tonic water","pinch salt"], method:"Build over ice", glass:"Highball", garnish:"Grapefruit peel, expressed", why:"Quinine in tonic is real bitterness: lean on it." },
  { name:"Hibiscus Amaro Cooler", cat:"Bitter & Complex", spec:["3 oz strong hibiscus tea","1/2 oz lemon juice","1/2 oz demerara syrup","2 dashes NA aromatic bitters","2 oz soda"], method:"Build over ice, stir once", glass:"Highball", garnish:"Orange peel", why:"Hibiscus delivers tartness, color, and tannin in one ingredient." },
  { name:"Chicory Old Fashioned", cat:"Bitter & Complex", spec:["2 oz strong cold chicory-coffee brew","1/4 oz demerara syrup","3 dashes NA aromatic bitters","2 drops saline"], method:"Stir over a large cube", glass:"Rocks", garnish:"Expressed orange peel", why:"Roasted bitterness plus a big cube plus slow dilution reads as spirit-forward." },
  { name:"Garden Highball", cat:"Bitter & Complex", spec:["2 oz NA botanical spirit","4 oz tonic water","squeeze of lime"], method:"Build over tall ice", glass:"Highball", garnish:"Cucumber ribbon or grapefruit peel", why:"The NA G&T: carbonation, quinine, and aromatics doing all the work." },
  { name:"Cascara Fizz", cat:"Bitter & Complex", spec:["2 oz cascara (coffee cherry) tea","1/2 oz lemon juice","1/2 oz honey syrup","3 oz soda water"], method:"Shake, strain over ice, top", glass:"Highball", garnish:"Lemon twist", why:"Cascara tastes of tamarind and cherry with real tannic length." },
  { name:"Salted Grapefruit Aperitivo", cat:"Bitter & Complex", spec:["3 oz grapefruit juice","1/2 oz lime juice","1/2 oz simple syrup","4 drops saline","2 oz soda"], method:"Shake, strain over ice, top", glass:"Rocks", garnish:"Grapefruit peel + salt rim (half)", why:"Salt suppresses bitterness selectively, making grapefruit taste rounder and longer." },
  { name:"Black Tea Negroni", cat:"Bitter & Complex", spec:["1 oz strong black tea concentrate","1 oz NA bitter aperitivo","1 oz NA red vermouth alternative"], method:"Stir over ice", glass:"Rocks, large cube", garnish:"Orange peel", why:"Tea tannin supplies the astringent grip vermouth's wine used to." },
  { name:"Smoked Tea Sour", cat:"Bitter & Complex", spec:["3 oz lapsang souchong tea, chilled","3/4 oz lemon juice","3/4 oz honey syrup","1 oz aquafaba"], method:"Dry shake, shake, double strain", glass:"Coupe", garnish:"Lemon twist", why:"Smoked tea is the closest honest analogue to peated scotch." },

  // FIZZES & SPRITZES
  { name:"Elderflower Spritz", cat:"Fizzes & Spritzes", spec:["3/4 oz elderflower cordial","1/2 oz lemon juice","4 oz NA sparkling wine","1 oz soda"], method:"Build over ice", glass:"Large wine glass", garnish:"Lemon wheel + mint", why:"Floral cordials give perceived sweetness at lower sugar." },
  { name:"NA Hugo", cat:"Fizzes & Spritzes", spec:["3/4 oz elderflower cordial","4 oz NA sparkling wine","1 oz soda","6 mint leaves"], method:"Build over ice, press mint gently", glass:"Large wine glass", garnish:"Mint + lime wheel", why:"Aroma-forward drinks survive the loss of alcohol best." },
  { name:"Ginger Lime Rickey", cat:"Fizzes & Spritzes", spec:["3/4 oz lime juice","3/4 oz ginger syrup","4 oz soda water","pinch salt"], method:"Build over ice, drop the spent lime shell in", glass:"Highball", garnish:"Lime shell", why:"Fresh ginger's burn is the most direct substitute for alcohol's heat." },
  { name:"Cucumber Tonic", cat:"Fizzes & Spritzes", spec:["2 oz cucumber juice","1/2 oz lime juice","4 oz tonic water"], method:"Build over ice", glass:"Highball", garnish:"Cucumber ribbon", why:"Quinine bitterness plus vegetal weight, deceptively grown-up." },
  { name:"Verjus Spritz", cat:"Fizzes & Spritzes", spec:["2 oz verjus","1/2 oz simple syrup","4 oz soda water"], method:"Build over ice", glass:"Wine glass", garnish:"Grape cluster or lemon twist", why:"Verjus is unripe grape juice — wine's acidity and complexity without fermentation." },
  { name:"Shrub Soda", cat:"Fizzes & Spritzes", spec:["1 oz fruit shrub (see Pantry)","5 oz soda water"], method:"Build over ice", glass:"Highball", garnish:"Match the shrub's fruit", why:"Vinegar acidity hits a different part of the palate than citrus, sharper, longer." },
  { name:"Sober Ramos", cat:"Fizzes & Spritzes", spec:["1/2 oz lemon + 1/2 oz lime juice","3/4 oz simple syrup","1 oz cream","1.5 oz aquafaba","3 drops orange flower water","2 oz soda"], method:"Dry shake hard, shake with ice, strain, rest, top slowly", glass:"Collins", garnish:"The meringue tower", why:"Texture is a flavor. This one proves NA drinks can be showpieces." },
  { name:"Egg White Sour Base", cat:"Fizzes & Spritzes", spec:["2 oz any tart juice or tea base","3/4 oz lemon juice","3/4 oz syrup","1 oz aquafaba"], method:"Dry shake, shake, double strain", glass:"Coupe", garnish:"NA bitters drops", why:"A template, not a recipe: swap the base and you have twenty drinks." },

  // COFFEE, TEA & WARM
  { name:"Espresso Tonic", cat:"Coffee, Tea & Warm", spec:["1 shot espresso","4 oz tonic water","1/4 oz simple syrup (optional)"], method:"Build tonic over ice, float espresso last", glass:"Highball", garnish:"Orange peel, expressed", why:"Bitter meets bitter — the Scandinavian café classic." },
  { name:"Sober Irish Coffee", cat:"Coffee, Tea & Warm", spec:["5 oz hot coffee","2 tsp brown sugar","1/4 tsp vanilla","lightly whipped cream float"], method:"Build hot, float cream over a spoon", glass:"Pre-heated Irish coffee glass", garnish:"The cream", why:"Temperature and texture carry the ritual: nobody misses the whiskey at the table." },
  { name:"Spiced Chai Toddy", cat:"Coffee, Tea & Warm", spec:["5 oz strong masala chai","1/2 oz honey","1/4 oz lemon juice"], method:"Build in a pre-heated mug", glass:"Mug", garnish:"Cinnamon stick + star anise", why:"Spice heat plus warmth replicates a toddy's whole comfort loop." },
  { name:"Hot Apple Toddy", cat:"Coffee, Tea & Warm", spec:["5 oz hot spiced apple cider","1/4 oz lemon juice","1/4 oz demerara syrup","2 dashes NA aromatic bitters"], method:"Build in a pre-heated mug", glass:"Mug", garnish:"Apple slice + clove-studded lemon", why:"Baking spice reads as barrel age to the nose." },
  { name:"Mulled Cider", cat:"Coffee, Tea & Warm", spec:["6 oz apple cider","orange peel, clove, cinnamon, star anise","1/4 oz honey"], method:"Warm gently 20 minutes — never boil", glass:"Mug", garnish:"Orange wheel + cinnamon", why:"The house smelling like this sells more of it than any menu ever will." },
  { name:"Matcha Lemonade", cat:"Coffee, Tea & Warm", spec:["1 tsp matcha whisked in 1 oz warm water","1 oz lemon juice","3/4 oz simple syrup","3 oz cold water"], method:"Whisk matcha smooth, shake with the rest, pour over ice", glass:"Collins", garnish:"Lemon wheel", why:"Matcha's umami and tannin give body that fruit juice alone can't." },
  { name:"Golden Turmeric Toddy", cat:"Coffee, Tea & Warm", spec:["5 oz warm coconut milk","1/2 tsp turmeric","pinch black pepper + ginger","1/2 oz honey"], method:"Warm and whisk", glass:"Mug", garnish:"Cinnamon dust", why:"Fat carries aroma the way alcohol does — coconut milk is a real tool." },
  { name:"Iced Hibiscus Tea", cat:"Coffee, Tea & Warm", spec:["5 oz strong hibiscus tea, chilled","1/2 oz lime juice","1/2 oz agave syrup"], method:"Shake, pour over ice", glass:"Collins", garnish:"Lime wheel + mint", why:"Agua de jamaica: tart, vivid, and refreshing without a gram of pretense." },

  // RESTORATIVES & BRUNCH
  { name:"Virgin Caesar", cat:"Restoratives & Brunch", spec:["5 oz Clamato","1/2 oz lime juice","3 dashes hot sauce","2 dashes Worcestershire (check label)","pinch celery salt"], method:"Roll between tins, pour into rimmed glass", glass:"Highball, celery-salt rim", garnish:"Celery, pickled bean, lime", why:"Canada's national drink loses nothing without the vodka." },
  { name:"Switchel", cat:"Restoratives & Brunch", spec:["1/2 oz apple cider vinegar","1/2 oz maple syrup","1/2 oz ginger juice","5 oz cold water","pinch salt"], method:"Stir, serve over ice", glass:"Collins", garnish:"Lemon wheel", why:"Colonial haymakers' punch, the original electrolyte drink, and a genuinely great sour." },
  { name:"Ginger Turmeric Shot", cat:"Restoratives & Brunch", spec:["1 oz ginger juice","1/2 oz lemon juice","1/4 oz honey","pinch turmeric + cayenne"], method:"Shake, strain into a shot glass", glass:"Shot", garnish:"None", why:"The sober round: when the table toasts, everyone should have a glass to raise." },
  { name:"Coconut Electrolyte Cooler", cat:"Restoratives & Brunch", spec:["4 oz coconut water","3/4 oz lime juice","1/2 oz simple syrup","2 pinches salt"], method:"Shake, pour over ice", glass:"Highball", garnish:"Lime wheel", why:"Salt and sugar and acid — the actual chemistry of rehydration, made to taste good." },
  { name:"Sober Michelada", cat:"Restoratives & Brunch", spec:["12 oz NA lager","3/4 oz lime juice","2 dashes hot sauce","2 dashes Worcestershire (check label)","pinch salt"], method:"Build in a rimmed glass over ice, top gradually", glass:"Pint, chile-salt rim", garnish:"Lime wedge", why:"NA beers have gotten genuinely good; this is a real drink, not a consolation." },
  { name:"Tart Cherry Cooler", cat:"Restoratives & Brunch", spec:["3 oz tart cherry juice","3/4 oz lime juice","1/2 oz vanilla syrup","3 oz soda water"], method:"Shake, strain over ice, top", glass:"Highball", garnish:"Brandied cherry + lime", why:"Tart cherry has the depth and color of a spirit-forward drink at zero proof." },
  // ZERO-PROOF CLASSICS (+7)
  { name:"NA Margarita", cat:"Zero-Proof Classics", spec:["2 oz NA agave or blanco alternative (or 2 oz strong green tea)","1 oz lime juice","3/4 oz orange cordial","1/4 oz agave syrup","2 pinches salt"], method:"Shake, strain over fresh ice", glass:"Rocks, salt rim", garnish:"Lime wheel", why:"The salt rim was already doing half the work; lean on it harder here." },
  { name:"NA Paloma", cat:"Zero-Proof Classics", spec:["2 oz grapefruit juice","1/2 oz lime juice","1/4 oz agave syrup","3 oz grapefruit soda","big pinch salt"], method:"Build over ice", glass:"Highball, salt rim", garnish:"Grapefruit wedge", why:"Grapefruit's bitterness and salt carry it, one of the easiest classics to render sober convincingly." },
  { name:"NA Moscow Mule", cat:"Zero-Proof Classics", spec:["3/4 oz lime juice","1/2 oz ginger syrup","4 oz ginger beer","2 dashes NA aromatic bitters"], method:"Build over ice", glass:"Copper mug", garnish:"Lime wedge + candied ginger", why:"Ginger's burn is the most direct stand-in for alcohol's heat, and the copper mug keeps the theater intact." },
  { name:"NA Espresso Martini", cat:"Zero-Proof Classics", spec:["1.5 oz fresh espresso, chilled","1 oz NA coffee liqueur (or cold brew + 1/2 oz demerara)","1/4 oz vanilla syrup","2 drops saline"], method:"Shake very hard, double strain", glass:"Coupe", garnish:"Three coffee beans", why:"Espresso crema builds the foam; this one loses almost nothing without the vodka." },
  { name:"NA Piña Colada", cat:"Zero-Proof Classics", spec:["3 oz pineapple juice","1.5 oz coconut cream","1/2 oz lime juice","1 cup ice"], method:"Blend until velvety", glass:"Hurricane", garnish:"Pineapple wedge + cherry", why:"Fat and fruit were always the point — the rum was a passenger." },
  { name:"Transfusion", cat:"Zero-Proof Classics", spec:["3 oz Concord grape juice","1/2 oz lime juice","4 oz ginger ale"], method:"Build over ice", glass:"Highball", garnish:"Lime wedge", why:"The golf-course classic: grape's tannin gives it real structure. Usually served with vodka; it doesn't need it." },
  { name:"NA Sangria", cat:"Zero-Proof Classics", spec:["4 oz NA red wine (or strong hibiscus-black tea blend)","1/2 oz orange juice","1/4 oz lemon juice","1/2 oz simple syrup","seasonal fruit"], method:"Build in a pitcher, rest one hour, serve over ice", glass:"Wine glass", garnish:"Macerated fruit", why:"The rest is mandatory: maceration is what makes sangria taste like sangria, with or without wine." },

  // SODA FOUNTAIN (new category, 6)
  { name:"Egg Cream", cat:"Soda Fountain", spec:["1 oz chocolate syrup (Fox's U-Bet, traditionally)","2 oz whole milk","6 oz cold seltzer"], method:"Milk and syrup in the glass, then blast the seltzer in hard to build the foam head", glass:"Tall soda glass", garnish:"None", why:"Contains neither egg nor cream. Brooklyn's greatest drink, and a lesson in how carbonation creates texture." },
  { name:"Cherry Phosphate", cat:"Soda Fountain", spec:["3/4 oz cherry syrup","1/4 tsp acid phosphate (or 1/4 oz lemon juice)","6 oz cold seltzer"], method:"Build, stir once gently", glass:"Soda glass", garnish:"Brandied cherry", why:"Acid phosphate gives a clean mineral tartness citrus can't: the original soda-fountain sour, and a genuinely useful modern tool." },
  { name:"Italian Soda", cat:"Soda Fountain", spec:["1 oz flavored syrup (raspberry, hazelnut, orgeat)","5 oz cold soda water","1 oz cream float (for a 'French' soda)"], method:"Build over ice, float cream last if requested", glass:"Collins", garnish:"Match the syrup", why:"The template that lets a bar make thirty NA drinks from one syrup rack." },
  { name:"Classic Lime Rickey", cat:"Soda Fountain", spec:["3/4 oz lime juice + the spent shell","3/4 oz raspberry or lime syrup","5 oz cold seltzer"], method:"Build over ice, drop the shell in", glass:"Highball", garnish:"The lime shell", why:"The 1880s Washington DC original was built on bourbon; gin took over the spec, and the soda fountain kept a zero-proof version of its own." },
  { name:"Root Beer Float", cat:"Soda Fountain", spec:["8 oz cold root beer","2 scoops vanilla ice cream"], method:"Ice cream first, pour root beer slowly down the side to control the foam", glass:"Tall soda glass or mug", garnish:"Straw and a long spoon, both", why:"Pouring technique is the entire skill. Too fast and you get a foam volcano and an unhappy guest." },
  { name:"Creamsicle", cat:"Soda Fountain", spec:["3 oz orange juice","2 oz whole milk or cream","1/2 oz vanilla syrup","2 oz soda water"], method:"Shake the first three hard, strain over ice, top with soda", glass:"Collins", garnish:"Orange wheel", why:"Acid and dairy shaken fast emulsify instead of curdling: shake hard and serve immediately." },

  // GLOBAL REFRESHERS (new category, 8)
  { name:"Horchata", cat:"Global Refreshers", spec:["1 cup long-grain rice, soaked overnight with cinnamon","4 cups water, blended and strained","3 oz sweetened condensed milk","1 tsp vanilla"], method:"Soak, blend, strain twice through fine cloth, chill", glass:"Tall over ice", garnish:"Cinnamon dust", why:"Mexico's agua fresca: rice starch gives a body no juice can match." },
  { name:"Agua de Tamarindo", cat:"Global Refreshers", spec:["2 oz tamarind concentrate","1/2 oz lime juice","3/4 oz simple syrup","4 oz cold water","pinch salt"], method:"Stir, serve over ice", glass:"Tall", garnish:"Lime wheel + chile salt rim", why:"Tamarind is sour, sweet, and savory at once; it does everything an amaro does, sober." },
  { name:"Mango Lassi", cat:"Global Refreshers", spec:["4 oz ripe mango purée","3 oz plain yogurt","1 oz milk","1/2 oz honey","pinch cardamom"], method:"Blend until smooth", glass:"Tall", garnish:"Cardamom dust or mint", why:"Yogurt's lactic acid is a different acid than citrus: rounder, creamier, and it cools chile heat." },
  { name:"Thai Iced Tea", cat:"Global Refreshers", spec:["5 oz strong brewed Thai tea, chilled","1 oz sweetened condensed milk","1/2 oz evaporated milk, floated"], method:"Build over ice, float the evaporated milk last", glass:"Tall", garnish:"The milk swirl", why:"The float is the drink's signature — pour it over a spoon and let the guest stir it themselves." },
  { name:"Sekanjabin", cat:"Global Refreshers", spec:["1 oz mint-vinegar syrup (sugar, vinegar, mint, simmered)","5 oz cold water","cucumber ribbons"], method:"Stir, serve over ice with cucumber", glass:"Tall", garnish:"Mint + cucumber", why:"A Persian oxymel dating back over a thousand years, the original shrub, and still one of the best." },
  { name:"Nimbu Pani", cat:"Global Refreshers", spec:["1 oz lime juice","3/4 oz simple syrup","5 oz cold water or soda","pinch black salt (kala namak)","pinch roasted cumin"], method:"Stir well, serve over ice", glass:"Tall", garnish:"Mint sprig", why:"India's lemonade. Black salt's sulfurous funk is the ingredient that makes it unforgettable." },
  { name:"Lebanese Mint Lemonade", cat:"Global Refreshers", spec:["1.5 oz lemon juice","1 oz simple syrup","large handful mint","4 oz cold water","1 cup ice"], method:"Blend everything until frothy and pale green", glass:"Tall", garnish:"Mint sprig", why:"Blending rather than muddling pulverizes the mint into the drink — bitter for a cocktail, perfect here." },
  { name:"Kombucha Spritz", cat:"Global Refreshers", spec:["3 oz ginger or hibiscus kombucha","1/2 oz lemon juice","1/2 oz honey syrup","2 oz soda water"], method:"Build over ice, stir once", glass:"Wine glass", garnish:"Lemon wheel + herb sprig", why:"Kombucha brings acidity, faint tannin, and a fermented complexity most NA ingredients lack. Note it may carry trace alcohol under 0.5%." },

  // BITTER & COMPLEX (+3)
  { name:"Gunner", cat:"Bitter & Complex", spec:["3 oz ginger beer","3 oz ginger ale","1/2 oz lime cordial","4 dashes Angostura bitters"], method:"Build over ice", glass:"Tall", garnish:"Lime wedge", why:"Hong Kong's colonial-era classic. Note the caveat: standard Angostura is ~44% ABV — use alcohol-free bitters if the guest needs it truly zero." },
  { name:"Lemon, Lime & Bitters", cat:"Bitter & Complex", spec:["4 oz lemon-lime soda","1 oz lime cordial","4 dashes Angostura bitters"], method:"Build over ice, bitters first to stain the glass", glass:"Highball", garnish:"Lime wedge", why:"Australia's default non-drinker order. Same bitters caveat applies — ask before assuming." },
  { name:"Bitter Grapefruit Sour", cat:"Bitter & Complex", spec:["2 oz grapefruit juice","3/4 oz lemon juice","3/4 oz honey syrup","1 oz aquafaba","4 drops saline"], method:"Dry shake, shake, double strain", glass:"Coupe", garnish:"Grapefruit twist", why:"Foam plus bitterness plus salt is the closest a zero-proof drink gets to a proper whiskey sour's weight." },

  // FIZZES & SPRITZES (+2)
  { name:"House Ginger Beer", cat:"Fizzes & Spritzes", spec:["4 oz fresh ginger juice","4 oz simple syrup","1/2 oz lime juice","top with soda water to taste"], method:"Combine the base, keep refrigerated, mix 1 part base to 3 parts soda to order", glass:"Highball", garnish:"Lime wedge", why:"The single highest-impact thing you can make for a bar program: every mule, buck, and Dark 'n' Stormy improves instantly." },
  { name:"Cucumber Elderflower Fizz", cat:"Fizzes & Spritzes", spec:["2 oz cucumber juice","3/4 oz elderflower cordial","1/2 oz lemon juice","3 oz soda water","2 drops saline"], method:"Shake, strain over ice, top", glass:"Collins", garnish:"Cucumber ribbon + mint", why:"Cool, floral, and faintly savory: the drink to hand someone who says they don't like sweet things." },
];

const NA_THEORY = [
  ["What alcohol actually does","Ethanol contributes five things: body and viscosity, warmth on the palate, length (that lingering finish), aromatic carry (it evaporates and pushes smell to your nose), and a solvent that dissolves bitter and herbal compounds. A zero-proof drink fails when it replaces none of these and just tastes like sweet juice. Build back each function deliberately."],
  ["Acid is your spine","Citrus, verjus, shrubs (drinking vinegars), and tart juices give the structure that makes a drink taste like a drink. Vinegar acidity lands differently from citrus: sharper, longer, more savory. Most weak NA drinks are underacidified, not undersweetened."],
  ["Bitterness is the adult signal","Nothing separates a cocktail from a soda faster than bitterness. Reach for tonic's quinine, grapefruit, hibiscus, strong tea tannin, chicory, cascara, NA aperitivi, and non-alcoholic bitters. The bitter-and-complex family is the one guests are most surprised by."],
  ["Texture is a flavor","Aquafaba (chickpea liquid) foams like egg white at about 1 oz per drink. Cream, coconut milk, honey syrup, rich 2:1 syrups, and cloudy unfiltered juices all add the weight ethanol used to. A thin NA drink feels incomplete even when the flavors are right."],
  ["Salt, heat & aroma","Two to four drops of 20% saline suppresses harsh bitterness and lengthens the finish, the single highest-leverage trick in zero-proof work. Fresh ginger, chile, and black pepper create genuine palate warmth. Expressed citrus peels, slapped herbs, and torched rosemary put aroma where alcohol used to carry it."],
  ["Sweetness is the usual failure","The number one flaw in mocktails is too much sugar with nothing to fight it. Every gram of sweetness needs an opposing force: acid, bitterness, tannin, or salt. Taste with a straw and adjust the acid before you adjust the sugar."],
  ["Dilution still applies","Zero-proof drinks still need water — shake or stir them exactly as long as their alcoholic counterparts. Undiluted, they taste syrupy and cloying. Big cubes for slow-sipping builds, crushed ice for anything mint-driven."],
  ["The soda fountain was here first","American soda fountains spent a century perfecting non-alcoholic drinks — phosphates, egg creams, rickeys, Italian sodas — largely because Prohibition-era pharmacists had to. That tradition is a working recipe archive, not nostalgia: acid phosphate, flavored syrups, and hard-carbonated seltzer solve exactly the problems modern zero-proof bartenders keep rediscovering."],
  ["The NA spirits landscape","Modern non-alcoholic spirits fall into three useful groups: botanical distillates (gin-like, juniper and citrus forward), bitter aperitivi (Campari-style, the most successful category by far), and dark-spirit alternatives (whiskey and rum analogues, which are the hardest to pull off). Use them as ingredients, not as one-to-one swaps — most need extra acid, salt, or bitterness to sing. Trust your palate over the label's claims."],
];

const NA_PANTRY = [
  ["Rich simple (2:1)","Two parts sugar to one part water by weight. More body and a longer shelf life than 1:1, the default sweetener for zero-proof work, where texture is scarce."],
  ["Honey & maple syrup","Honey 3:1 with warm water; maple straight. Both bring viscosity and flavor that plain sugar can't: invaluable when there's no alcohol supplying weight."],
  ["Fruit shrub (drinking vinegar)","Equal parts by weight: chopped fruit, sugar, and vinegar (apple cider or champagne). Macerate fruit and sugar 24 hours, add vinegar, rest 3 days, strain. Keeps a month refrigerated. One ounce in soda is a complete drink."],
  ["Oleo saccharum","Peel 4 lemons or oranges, toss the peels with 1/2 cup sugar, rest 2–12 hours. The sugar draws out pure citrus oil into a fragrant syrup: the most aromatic sweetener you can make, and the secret to great punch."],
  ["20% saline solution","20 g fine salt dissolved in 80 g warm water. Dropper bottle on your station. Two to four drops per drink lengthens the finish and rounds bitterness. Use it in everything."],
  ["Verjus","The pressed juice of unripe grapes — wine's acidity and subtle complexity with no fermentation. Sub it for part of the citrus in any spritz or spritz-adjacent build."],
  ["Tea concentrates","Steep at double strength and chill. Black tea for tannic grip, lapsang souchong for smoke, hibiscus for tartness and color, chamomile for honeyed florals. Your most versatile NA base ingredients, and nearly free."],
  ["Aquafaba","The liquid from a can of chickpeas. One ounce foams like an egg white, is shelf-stable, vegan, and carries no allergen risk from raw egg. Dry shake it exactly as you would egg."],
  ["Spiced & herb syrups","Simple syrup steeped with rosemary, sage, dill, lavender, ginger, cinnamon, or fennel. Steep off the heat 20 minutes, strain, refrigerate a month. The fastest way to build a deep NA menu from a small pantry."],
  ["House ginger beer","Juice fresh ginger, combine equal parts ginger juice and simple syrup with a squeeze of lime, refrigerate. Mix one part base to three parts soda to order. It transforms every mule, buck, and Dark 'n' Stormy on your menu, alcoholic or not."],
  ["Acid phosphate","The old soda-fountain acidulant: clean mineral tartness with no citrus flavor. A quarter teaspoon brightens any drink where lemon would add the wrong flavor. Sold by specialty suppliers and worth the shelf space."],
  ["Real grenadine","Equal parts pomegranate juice and sugar, gently warmed, with a splash of pomegranate molasses and a few drops of orange flower water. Nothing on the market compares, and half your NA classics depend on it."],
];

const NA_SERVICE = [
  ["Never ask why","A guest not drinking may be in recovery, pregnant, on medication, driving, observing their faith, or simply not in the mood — and none of it is your business. Take the order in exactly the voice you'd use for a Manhattan. The absence of a question is the hospitality."],
  ["Watch the hidden alcohol","This is the detail most bars miss. Standard aromatic bitters are around 44% ABV, vanilla extract about 35%, and 'non-alcoholic' beers and wines are legally allowed up to 0.5% ABV. Trace amounts are irrelevant to most guests and absolutely not to someone in recovery. Keep alcohol-free bitters on hand, know which of your syrups and extracts contain alcohol, and if a guest signals it matters, say plainly: 'I'll build this with nothing alcoholic at all, including bitters.'"],
  ["Language and menu placement","List zero-proof drinks on the main menu with real names and real prices: not a sad italicized footnote. Many guests dislike the word 'mocktail'; 'zero proof,' 'spirit-free,' or simply listing them among the cocktails avoids the diminutive. Your menu tells people who belongs at your bar."],
  ["Price honestly","Fresh juice, house syrups, and five minutes of labor cost what they cost. Charging fairly (usually a few dollars under a cocktail) signals the drink is real work, not a courtesy. Charging nothing implies it's worth nothing — and guests notice."],
  ["Same craft, same theater","Proper glassware, fresh garnish, a coupe if it belongs in a coupe, the same expressed peel and the same care. A zero-proof drink served in a plastic cup with a sad lime tells the guest exactly where they rank."],
  ["Include them in the round","When a table orders shots, offer the sober guest something in a shot glass too — a ginger-turmeric shot, chilled tart cherry with lime, a cold-brew shooter. Same glass, same timing, same clink. Nobody should have to explain an empty hand at a toast."],
  ["Batch for volume","Zero-proof drinks are usually the slowest thing on your station. Pre-batch the shelf-stable portions (tea bases, syrups, purées), keep juice fresh, and you can build one in twenty seconds instead of two minutes — which is what makes a real NA program survive a Saturday."],
  ["Know your NA back-bar","Stock at minimum: an NA bitter aperitivo, one botanical distillate, alcohol-free bitters, good tonic, an NA sparkling wine, quality tea, and one shrub. That short list plus fresh citrus and syrups covers nearly every drink in this section."],
];

function naTicketHTML(d, hideName){
  const lines = d.spec.map(l => '<div class="spec-line"><span>·</span><span>'+esc(l)+'</span></div>').join('');
  return '<div class="ticket"><div class="ticket-inner">'
    + '<div class="tc"><div class="tix-label">'+esc(d.cat)+' · Zero Proof</div>'
    + '<div class="tix-name">'+(hideName?'— ? —':esc(d.name.toUpperCase()))+'</div></div>'
    + '<div class="tix-rule"></div>'+lines+'<div class="tix-rule"></div>'
    + '<div><span class="tix-label">Method </span>'+esc(d.method)+'</div>'
    + '<div><span class="tix-label">Glass </span>'+esc(d.glass)+'</div>'
    + '<div><span class="tix-label">Garnish </span>'+esc(d.garnish)+'</div>'
    + (!hideName && d.why ? '<div class="tix-rule"></div><div class="tix-note">'+esc(d.why)+'</div>' : '')
    + '</div></div>';
}

function renderNA(){
  const n = state.na;
  const nav = [['list','The List'],['pantry','The Pantry'],['theory','Theory'],['service','Service']]
    .map(([k,l]) => '<button class="tab-btn'+(n.view===k?' active':'')+'"'+(n.view===k?' aria-current="true"':'')+' data-act="na-view" data-v="'+k+'">'+l+'</button>').join('');
  const wrap = (inner) => '<div class="col"><nav class="tabs" style="margin-bottom:4px">'+nav+'</nav>'+inner+'</div>';

  if(n.drill){
    const d = NA_DRINKS[n.order[n.idx]];
    const head = '<div class="row between tiny dim"><span>Card '+(n.idx+1)+' of '+n.order.length+'</span>'
      + '<button class="chip" data-act="na-exit">Exit drill</button></div>';
    if(!n.revealed){
      return '<div class="col">'+head+'<div class="panel p5 col tc" style="align-items:center">'
        + '<div class="eyebrow">The order comes in:</div>'
        + '<div class="font-display" style="font-size:1.5rem;color:var(--brass-2)">'+esc(d.name)+'</div>'
        + '<div class="small dim">Say the build, method, glass, and garnish out loud.</div>'
        + '<button class="btn btn-brass" data-act="na-flip">Show the ticket</button></div></div>';
    }
    return '<div class="col">'+head+'<div class="panel p5 col" style="align-items:center">'+naTicketHTML(d)
      + '<button class="btn btn-brass" data-act="na-next">'+(n.idx+1>=n.order.length?'Finish':'Next card')+'</button></div></div>';
  }

  if(n.view==='pantry'){
    const rows = NA_PANTRY.map(([t,p]) => {
      const open = n.pOpen===t;
      return '<div class="panel" style="padding:0 16px">'
        + '<button class="accordion-btn'+(open?' open':'')+'" aria-expanded="'+(open?'true':'false')+'" data-act="na-pantry" data-t="'+esc(t)+'">'
        + '<span>'+esc(t)+'</span><span style="color:var(--brass)">'+(open?'−':'+')+'</span></button>'
        + (open ? '<div class="accordion-body"><div class="small dim lh">'+esc(p)+'</div>'
            + '<div class="row"><a class="btn btn-ghost tiny" href="'+ytSearch(t.split('(')[0].trim()+' bartender how to make'+scopeSuffix())+'" target="_blank" rel="noopener noreferrer">▶ Watch it made</a></div></div>' : '')+'</div>';
    }).join('');
    return wrap('<div class="small dim lh" style="padding:0 4px">Zero-proof drinks live or die on their components. Build these '+NA_PANTRY.length+' and you can make nearly everything in this section, plus better versions of half your cocktails.</div>'+rows);
  }

  if(n.view==='theory'){
    const rows = NA_THEORY.map(([t,p]) => {
      const open = n.tOpen===t;
      return '<div class="panel" style="padding:0 16px">'
        + '<button class="accordion-btn'+(open?' open':'')+'" aria-expanded="'+(open?'true':'false')+'" data-act="na-theory" data-t="'+esc(t)+'">'
        + '<span>'+esc(t)+'</span><span style="color:var(--brass)">'+(open?'−':'+')+'</span></button>'
        + (open ? '<div class="accordion-body"><div class="small dim lh">'+esc(p)+'</div></div>' : '')+'</div>';
    }).join('');
    return wrap('<div class="small dim lh" style="padding:0 4px">Removing alcohol removes five specific things from a drink. Learn what they are and how to build each one back, and you stop guessing at mocktails and start engineering them.</div>'+rows);
  }

  if(n.view==='service'){
    const rows = NA_SERVICE.map(([t,p]) => {
      const open = n.sOpen===t;
      return '<div class="panel" style="padding:0 16px">'
        + '<button class="accordion-btn'+(open?' open':'')+'" aria-expanded="'+(open?'true':'false')+'" data-act="na-service" data-t="'+esc(t)+'">'
        + '<span>'+esc(t)+'</span><span style="color:var(--brass)">'+(open?'−':'+')+'</span></button>'
        + (open ? '<div class="accordion-body"><div class="small dim lh">'+esc(p)+'</div></div>' : '')+'</div>';
    }).join('');
    return wrap('<div class="small dim lh" style="padding:0 4px">The service half of zero-proof work. A guest who isn\'t drinking is still a guest, and how you treat them is the clearest signal of what kind of bar you run.</div>'+rows);
  }

  const cats = ['All',...NA_CATS].map(c =>
    '<button class="chip'+(n.cat===c?' on':'')+'" aria-pressed="'+(n.cat===c?'true':'false')+'" data-act="na-cat" data-c="'+esc(c)+'">'+esc(c)+'</button>').join(' ');
  const list = NA_DRINKS.map((d,i)=>({d,i})).filter(({d}) => n.cat==='All' || d.cat===n.cat);
  const rows = list.map(({d,i}) => {
    const open = n.open===i;
    return '<div class="panel"><button class="drink-head" aria-expanded="'+(open?'true':'false')+'" data-act="na-toggle" data-i="'+i+'"'+(open?' data-open="1"':'')+'>'
      + glassIcon(d.glass)
      + '<span class="bold">'+esc(d.name)+'</span><span class="chip">'+esc(d.cat)+'</span>'
      + '<span class="plusminus">'+(open?'−':'+')+'</span></button>'
      + (open ? '<div class="drink-body">'+naTicketHTML(d)+videoRowHTML({src:'Zero Proof',name:d.name,group:d.cat,tier:null})+'</div>' : '')+'</div>';
  }).join('');
  return wrap('<div class="small dim lh" style="padding:0 4px">'+NA_DRINKS.length+' zero-proof drinks across '+NA_CATS.length+' families. Not consolation prizes: drinks built with the same structure, technique, and theater as anything else on the ledger. Every ticket carries a <span class="brass2">why it works</span> note explaining what replaces the alcohol.</div>'
    + '<div class="row"><button class="btn btn-brass" data-act="na-drill">Run the zero-proof drill</button>'
    + '<span class="tiny dim push">'+list.length+' drinks shown</span></div>'
    + '<div class="row">'+cats+'</div>'
    + (n.cat!=='All' ? '<div class="row">'+categoryVideoHTML(n.cat,'na')+'</div>' : '')
    + '<div class="col-sm">'+rows+'</div>');
}

/* ---------------- THE PRODUCERS ---------------- */
const PROD_CATS = ['Gin','Bourbon & Rye','Scotch','Irish & Japanese','Rum','Agave','Brandy','Vermouth & Aperitivo','Amaro & Liqueur'];

const PRIMERS = {
  'Gin':[
    ["How gin is actually made","Gin starts as a finished neutral spirit — almost nobody distills their own base. What separates producers is what happens next. Steeping (maceration) soaks botanicals in the spirit before distillation, pulling heavier oils and deeper color. Vapor infusion suspends botanicals in a basket above the liquid so only the volatile aromatics carry over, giving a lighter, brighter gin. One-shot distillation means the still output is the final proof; multi-shot makes a concentrate that's diluted with more neutral spirit afterward, vastly more efficient and used by most large brands, and not inherently worse."],
    ["What the legal categories mean","London Dry is a method, not a place: nothing but water may be added after distillation, no artificial flavoring, no sweetening beyond a trace. Plymouth Gin is a protected style from one distillery. Old Tom is lightly sweetened, the historical bridge between Dutch genever and modern dry gin. Genever is malt-wine based and closer to a light whiskey. Contemporary or New Western gins simply dial juniper back and let another botanical lead: legal as long as juniper still dominates."],
  ],
  'Bourbon & Rye':[
    ["The legal skeleton","Bourbon: at least 51% corn, distilled to no more than 160 proof, barreled at no more than 125 proof in new charred oak, made in the USA, nothing added. Rye: the same rules with at least 51% rye. 'Straight' means at least two years with no additives. 'Bottled in Bond' is stricter still — one distillery, one distilling season, at least four years in a federally supervised warehouse, exactly 100 proof. That last one is the most trustworthy label in American whiskey and usually the best value on the shelf."],
    ["What actually creates flavor","Mashbill matters less than people think; wood and warehouse matter more. Barrel entry proof is a quiet variable — lower entry proof (Wild Turkey at 115, Michter's at 103) means less water added at bottling and a richer texture. Warehouse position changes everything: upper floors run hot and age fast, lower floors stay cool and slow. Yeast strain is the underrated one — Four Roses runs five proprietary strains that produce genuinely different whiskeys from identical grain."],
    ["The sourcing question","A great deal of American 'craft' whiskey is distilled at MGP in Lawrenceburg, Indiana, then bottled under other labels. That includes the 95% rye mashbill behind many well-known ryes. Sourcing isn't dishonest — MGP makes excellent whiskey — but pretending otherwise is. Knowing which bottles share a source is basic bar literacy and stops you from paying triple for the same liquid."],
  ],
  'Scotch':[
    ["Malt, peat and smoke","Barley is malted — germinated then dried — and if that drying happens over a peat fire, the smoke phenols bind to the grain and survive into the glass. Peating level is measured in ppm of phenols in the malt: Ardbeg's malt runs around 55ppm, Laphroaig around 40, Highland Park lower and aromatic rather than medicinal because Orkney's peat is heather rather than woodland. Almost all distilleries now buy commercially malted barley; the handful still doing floor maltings (Springbank, Laphroaig, Highland Park, Bowmore, Balvenie) do so partly for character and partly for identity."],
    ["Stills, cut and cask","Still shape dictates reflux: tall stills with long necks give lighter, more delicate spirit because heavy compounds fall back; short squat stills give oily, heavy spirit. The Macallan's famously small stills concentrate character. Ardbeg runs a purifier pipe on its spirit still that increases reflux, which is why the most heavily peated malt on Islay tastes cleaner than its ppm suggests. But roughly 60–70% of a scotch's flavor comes from the cask — which is why sherry-seasoned European oak versus ex-bourbon American oak is a bigger decision than most distilling variables."],
    ["Single malt versus blend","Single malt means 100% malted barley from one distillery, not one barrel, and not necessarily better. Blended scotch combines malt and grain whisky from multiple distilleries and is what most of the world drinks. Blending is a genuine craft: a good blender is balancing dozens of components toward a consistent target, which is harder than releasing a single cask. Blended malt (no grain, multiple distilleries) is the category where independents like Compass Box do their most interesting work."],
  ],
  'Irish & Japanese':[
    ["Single pot still: Ireland's own category","Irish single pot still whiskey uses a mash of both malted and unmalted barley, distilled in pot stills at a single distillery. The unmalted portion began as tax avoidance, the 1785 malt tax was levied on malted grain, and accidentally created a style: creamy, oily, with a distinctive spicy grip nothing else quite matches. Triple distillation is common but not universal, and it produces a lighter, softer spirit than scotch's typical two passes."],
    ["Japan's borrowed and rebuilt tradition","A Japanese distiller studied chemistry and distilling in Scotland in 1918, came home to work at Yamazaki, then founded Nikka in the north where the climate resembled Scotland. Japanese producers historically don't trade casks with each other, so a single distillery must generate every component it needs for blending: hence Yamazaki running multiple still shapes and sizes under one roof. Mizunara oak, Japanese oak, is porous, difficult to coop, and imparts sandalwood and incense notes after long aging. Note that Japanese labeling rules only tightened in 2021, so older bottles labeled 'Japanese whisky' sometimes contained imported liquid."],
  ],
  'Rum':[
    ["The least regulated major spirit","Rum has no global standard. It can be made from molasses or fresh cane juice, in pot or column stills, aged anywhere, and in many jurisdictions sweetened or colored after aging without disclosure. Color tells you almost nothing: caramel coloring is widespread and cheap. This is why producer knowledge matters more in rum than in any other category: the label may not tell you what's in the bottle, but the distillery's practices will."],
    ["Style by tradition, not by color","The old shorthand still works. Spanish-heritage (Cuba, Puerto Rico, Dominican Republic): column-distilled, light, clean, filtered. English-heritage (Jamaica, Barbados, Guyana): pot still or pot-column blends, rich and often funky. French-heritage rhum agricole (Martinique, Guadeloupe, Haiti): distilled from fresh-pressed cane juice rather than molasses, grassy and vegetal, protected by AOC rules in Martinique since 1996."],
    ["Esters, dunder and funk","Jamaican 'funk' is ester chemistry. Long wild fermentations, plus dunder (the acidic residue left after distillation) and in extreme cases muck pits, generate fruity esters measured in grams per hectoliter of pure alcohol. Hampden Estate's marks run from moderate to among the highest legally exportable. Tropical aging is the other great variable: heat and humidity mean rum in the Caribbean can lose 6–10% a year to evaporation versus around 2% in Scotland, so a tropically aged eight-year has done work comparable to a much older continental whisky."],
  ],
  'Agave':[
    ["From plant to bottle","Blue Weber agave takes six to eight years to mature. The piñas are harvested by jimadores, cooked to convert inulin into fermentable sugar, crushed, fermented, and distilled — usually twice in copper pots. Every step is a fork in the road. Brick ovens or autoclaves: slow masonry ovens over 24–36 hours build cooked-agave sweetness; industrial autoclaves do it in hours with less character. Diffusers, which strip sugar with hot water and acid without cooking at all, are efficient and widely considered to strip the agave's soul with it."],
    ["Tahona, fibers and fermentation","The tahona is a two-ton volcanic stone wheel that crushes cooked agave; roller mills do the same job faster. Producers who ferment with the fibers still in the tank (Fortaleza, Siete Leguas) get a rounder, more vegetal spirit. Open-air fermentation with ambient yeast adds complexity and unpredictability. Highland (Los Altos) agave tends fruitier and sweeter; valley agave tends earthier and more peppery."],
    ["Read the NOM","Every bottle of tequila carries a NOM number identifying the distillery that made it, and dozens of brands share a single NOM. Learning to read it tells you who actually made the liquid regardless of what the label implies. Also worth knowing: 'additive-free' has become a meaningful distinction, since Mexican regulations permit up to 1% of undisclosed additives (glycerin, sweeteners, oak extract, caramel) even in 100% agave tequila. Mezcal is the broader category — dozens of agave species, traditionally pit-roasted over wood and stone, mostly Oaxacan, usually made by a named palenquero in small batches."],
  ],
  'Brandy':[
    ["Cognac's rules","Cognac must come from the delimited region around the town of Cognac, be made largely from Ugni Blanc grapes, be double-distilled in copper pot stills, and age at least two years in French oak. The crus matter: Grande Champagne is the most chalky and age-worthy, Petite Champagne next, then Borderies (floral, quick-maturing), Fins Bois and beyond. Age statements are minimums for the youngest component — VS is at least two years, VSOP four, XO ten since 2018. The big houses are blending houses: they buy from hundreds of grower-distillers rather than farming everything themselves."],
    ["Armagnac, Calvados, Pisco","Armagnac is older than cognac, distilled once in a continuous alambic armagnacais at lower proof, which leaves more flavor and less polish, rustic in the best sense, and frequently sold as single vintages. Calvados is Norman apple (and pear) brandy; Pays d'Auge, the top appellation, requires double pot distillation. Pisco is unaged grape brandy; Peruvian rules are notably strict: distilled to final proof with no water added afterward and no aging in anything that imparts flavor."],
  ],
  'Vermouth & Aperitivo':[
    ["Vermouth is wine, and that changes everything","Vermouth is aromatized, fortified wine: wine base, botanicals including mandatory wormwood (Artemisia, hence the name from German Wermut), fortifying spirit, and usually sugar. Because it is wine, it oxidizes. An open bottle on a warm back bar is dead in a week. Refrigerate it, date it, and buy smaller bottles that turn over faster. This single habit improves more cocktails than any technique you can learn."],
    ["The styles","Sweet or rosso is Italian in origin, dark from caramel rather than the grapes. Dry is French in origin, pale and higher-acid. Blanc or bianco is sweet but pale. Vermouth di Torino is a protected designation requiring Italian wine and local production. Chambéry, from Dolin, holds France's only vermouth PGI. Quinquinas (Lillet, Cocchi Americano, Kina) are aromatized wines built on quinine bark rather than wormwood: legally a different category, and the reason a true Vesper is hard to reproduce since Kina Lillet was reformulated in 1986."],
  ],
  'Amaro & Liqueur':[
    ["What an amaro is","Amaro simply means bitter in Italian. The template is neutral spirit or wine infused with bitter botanicals (gentian, cinchona, rhubarb root, wormwood, angelica, citrus peel) then sweetened and often rested in oak. There is no legal definition and no standard strength, which is why the category spans light aperitivi around 11% ABV to Fernet at 39%. Learn them by weight and role instead: light aperitivo before a meal, heavier digestivo after."],
    ["Why the classics are irreplaceable","Several bar essentials are genuinely singular. Chartreuse is made by Carthusian monks from a 1605 manuscript; only two monks know the full recipe, the green color is natural chlorophyll, and the order deliberately capped production in 2023 to preserve monastic life — the shortage is a values decision, not a marketing one. Luxardo maraschino comes from marasca cherries the company grows itself, macerated for years then distilled, and tastes nothing like the neon cherry syrup people expect. Bénédictine's 27-botanical recipe dates to 1863 and its 'D.O.M.' stands for Deo Optimo Maximo."],
  ],
};

const PRODUCERS = [
  // GIN
  { name:"Tanqueray", cat:"Gin", where:"Cameronbridge, Scotland", est:"1830", why:"The London Dry reference point: if a recipe just says 'gin,' this is a safe assumption of what the author meant.", process:"Famously spare: juniper, coriander, angelica root, and licorice. Four botanicals, distilled in the 'Old Tom' still that survived a WWII bombing raid. Tanqueray No. Ten is made separately in a small still nicknamed Tiny Ten using fresh whole citrus and chamomile rather than dried peel.", bar:"The workhorse. Assertive enough to survive tonic, vermouth, or a heavy shake." },
  { name:"Beefeater", cat:"Gin", where:"Kennington, London", est:"1863", why:"One of the very few major gins still distilled inside London, and the best value on most back bars.", process:"A full 24-hour steep of botanicals in the spirit before distillation, where many producers steep briefly or use vapor baskets. Nine botanicals with a pronounced Seville orange and lemon peel note. Its long-serving master distiller was one of the industry's most-cited authorities on gin production.", bar:"Built for cocktails — the citrus core makes it excellent in sours and Negronis." },
  { name:"Plymouth", cat:"Gin", where:"Black Friars Distillery, Plymouth", est:"1793", why:"England's oldest working gin distillery and its own legally protected style.", process:"Softer and earthier than London Dry, with more root botanicals and less juniper dominance, distilled in a Victorian copper still. Historically supplied to the Royal Navy, which is where Navy Strength (57% ABV, the proof at which spilled spirit still allows gunpowder to ignite) comes from.", bar:"Called for by name in the original Aviation and Pink Gin. Its softness suits delicate, vermouth-forward drinks." },
  { name:"Hayman's", cat:"Gin", where:"London", est:"family since 1863", why:"The house that put Old Tom back on the shelf, which made a whole slice of the classic canon reproducible again.", process:"Fifth-generation family distillers producing London Dry, Old Tom, and Royal Dock navy strength. Their Old Tom is lightly sweetened after distillation in the historical manner rather than sweetened aggressively.", bar:"Essential for the Martinez, the original Tom Collins, and any pre-1900 recipe." },
  { name:"Sipsmith", cat:"Gin", where:"London", est:"2009", why:"Changed British law, and with it the entire craft gin landscape.", process:"The first new copper pot-still gin distillery in London in nearly two centuries. Founders spent two years challenging an 1823 Excise Act provision that effectively banned stills below 1,800 litres; winning that fight opened the door for hundreds of small distilleries. One-shot distillation in a single still named Prudence.", bar:"Clean, juniper-forward, classic in structure. Reliable anywhere London Dry is called for." },
  { name:"Junipero (Anchor)", cat:"Gin", where:"San Francisco", est:"1996", why:"Widely credited as the first American craft gin, made when nobody was asking for one.", process:"From Anchor Distilling, small-batch in a copper pot still at a bracing 49.3% ABV, aggressively juniper-led at a moment when the market was drifting toward soft and floral.", bar:"High proof means it holds its shape in a heavy sour or a strong Negroni." },
  { name:"Monkey 47", cat:"Gin", where:"Black Forest, Germany", est:"2008", why:"The most successful argument that gin didn't have to be British.", process:"47 botanicals at 47% ABV, including lingonberries picked in the Black Forest, on a molasses base spirit. Botanicals macerate for roughly three months in earthenware before distillation, then the finished gin rests further.", bar:"Too complex for a workhorse G&T — use it where the gin is meant to be the subject." },
  { name:"Ford's", cat:"Gin", where:"Thames Distillers, London", est:"2012", why:"Designed by a bartender, for bartenders, and it shows in every cocktail it touches.", process:"Developed to a working bartender's brief, with a London distiller from an eighth-generation distilling family. Nine botanicals with jasmine and grapefruit peel alongside the juniper core, at a deliberately cocktail-friendly 45% ABV — engineered so citrus and vermouth wouldn't flatten it.", bar:"A modern well gin that makes almost everything taste more expensive." },

  // BOURBON & RYE
  { name:"Buffalo Trace", cat:"Bourbon & Rye", where:"Frankfort, Kentucky", est:"1773 site", why:"America's oldest continuously operating distillery, and the single most influential address in bourbon.", process:"Ran through Prohibition on a medicinal whiskey license. Home to Blanton's, the first commercial single barrel bourbon, released in 1984 by Elmer T. Lee, plus Weller, Eagle Rare, Stagg, and Sazerac Rye. Warehouse H, metal-clad and heated, ages differently from the brick warehouses and produces the Blanton's profile. Their Experimental Collection has run hundreds of documented trials on mashbill, wood, and warehouse variables.", bar:"Buffalo Trace itself is an outstanding everyday Old Fashioned bourbon at an honest price." },
  { name:"Heaven Hill", cat:"Bourbon & Rye", where:"Bardstown, Kentucky", est:"1935", why:"The largest family-owned producer in American whiskey, and the source of the single most useful rye behind a bar.", process:"A catastrophic 1996 fire destroyed the distillery and seven warehouses; they distilled elsewhere for years before rebuilding. Rittenhouse Rye Bottled-in-Bond is their gift to bartenders: 100 proof, four years minimum, single distilling season, priced like a mixer. Also Elijah Craig, Evan Williams, Larceny, and the Parker's Heritage series.", bar:"Rittenhouse is arguably the correct default rye for a Manhattan or Sazerac." },
  { name:"Wild Turkey", cat:"Bourbon & Rye", where:"Lawrenceburg, Kentucky", est:"1869 lineage", why:"Its father-and-son master distillers hold the longest combined tenure in the industry, over a century between them.", process:"Deliberately low barrel entry proof of 115 (the legal maximum is 125), meaning less water is added at bottling and more flavor survives. Heavy char, aggressive warehouse placement, and no chill filtration on several expressions. Wild Turkey 101 is a bar standard precisely because its proof and spice punch through citrus and sugar.", bar:"101 for anything shaken; Russell's Reserve for stirring." },
  { name:"Four Roses", cat:"Bourbon & Rye", where:"Lawrenceburg, Kentucky", est:"1888", why:"Ten distinct bourbon recipes under one roof: the clearest demonstration anywhere that yeast is an ingredient.", process:"Two mashbills crossed with five proprietary yeast strains yields ten recipes, each coded with a four-letter designation. Unusually, they use single-story rack warehouses, which produce far more consistent aging than multi-floor rickhouses because there is no vertical temperature gradient.", bar:"The Small Batch and Single Barrel are among the best-value stirred-drink bourbons available." },
  { name:"Maker's Mark", cat:"Bourbon & Rye", where:"Loretto, Kentucky", est:"1953", why:"Made wheated bourbon a category the public understood.", process:"Red winter wheat replaces rye as the flavoring grain, producing a softer, sweeter, rounder whiskey. Barrels are rotated by hand between warehouse floors to even out aging. Every bottle is still hand-dipped in wax. They also rotate all grain through a roller mill rather than a hammer mill, which they argue avoids scorching.", bar:"Its softness suits guests who find rye-heavy bourbon harsh, and it makes a gentle, approachable Old Fashioned." },
  { name:"Jim Beam", cat:"Bourbon & Rye", where:"Clermont, Kentucky", est:"1795 lineage", why:"The largest bourbon producer on earth, and the birthplace of the premium bourbon category.", process:"Seven generations of the same family. In 1992 the distillery launched the Small Batch Collection: Booker's, Baker's, Basil Hayden, and Knob Creek. Before that, bourbon was essentially a commodity; afterward, it had a top shelf. They also propagate a single jug yeast strain the family has maintained since Prohibition.", bar:"Knob Creek 100 proof is a genuine bargain for cocktail work." },
  { name:"Michter's", cat:"Bourbon & Rye", where:"Louisville, Kentucky", est:"revived 1990s", why:"An obsessive approach to wood and warehouse that costs them yield and shows in the glass.", process:"Barrel entry proof of 103, among the lowest in the industry, which means minimal water at bottling. Heat-cycled warehouses force expansion and contraction rather than waiting for seasons. Toasted-barrel finishing on several expressions, and proprietary air-dried wood specifications.", bar:"US*1 Rye and Bourbon are excellent stirred; the price reflects the yield sacrifice." },
  { name:"Old Forester", cat:"Bourbon & Rye", where:"Louisville, Kentucky", est:"1870", why:"The first bourbon sold exclusively in sealed glass bottles: the invention that made brand trust possible.", process:"The house sealed its whiskey in bottles specifically to guarantee it hadn't been adulterated by middlemen, which was rampant. One of only a handful of brands sold before, during (medicinal license), and after Prohibition. The Whiskey Row series recreates historical proofs and production styles.", bar:"The 100 proof and the Rye are both strong, honest cocktail whiskeys." },
  { name:"Willett", cat:"Bourbon & Rye", where:"Bardstown, Kentucky", est:"1936", why:"A family operation that rebuilt its own distilling after decades of bottling others' whiskey.", process:"Kentucky Bourbon Distillers spent years as a respected independent bottler, then resumed distillation on site in 2012. Their own-make rye, released once sufficiently aged, is now among the most sought-after in the category. Small pot-still-influenced production and pot still-shaped bottles.", bar:"Family Estate bottlings are sipping whiskey; the Rye rewards a simple, spirit-forward build." },
  { name:"MGP of Indiana", cat:"Bourbon & Rye", where:"Lawrenceburg, Indiana", est:"1847 site", why:"The most important distillery most drinkers have never heard of, and required knowledge for anyone reading a label critically.", process:"A contract distillery producing whiskey sold under dozens of other brands. Their 95% rye / 5% malted barley mashbill is behind a remarkable share of the ryes on the American market. Sourcing isn't a scandal (MGP makes excellent spirit), but knowing which bottles share a source keeps you from paying a premium for the same liquid in a heavier bottle.", bar:"That bright, dill-and-mint rye character in many bar ryes is the MGP signature." },

  // SCOTCH
  { name:"Springbank", cat:"Scotch", where:"Campbeltown", est:"1828", why:"The only distillery in Scotland performing 100% of production on site, from barley to bottle.", process:"Floor maltings, distilling, maturation, and bottling all happen at the same address — nobody else does all four. Springbank is distilled two and a half times, an unusual regime that sits between scotch's standard two and Ireland's three. The same site produces Longrow (heavily peated, twice distilled) and Hazelburn (unpeated, triple distilled), so a single distillery demonstrates three different production philosophies. Family owned by the Mitchells since founding.", bar:"A teaching dram. Pour it beside almost anything to show what production choices actually do." },
  { name:"Laphroaig", cat:"Scotch", where:"Islay", est:"1815", why:"The most polarizing malt in the world and the benchmark for medicinal peat.", process:"Still runs its own floor maltings for a portion of production, drying barley over Islay peat cut from its own beds to roughly 40ppm phenols. The peat here is compressed sphagnum and seaweed rather than woodland, producing iodine, tar, and antiseptic notes rather than campfire smoke. Matured largely in ex-bourbon casks near the shore.", bar:"The classic Penicillin float — a quarter ounce transforms the drink." },
  { name:"Ardbeg", cat:"Scotch", where:"Islay", est:"1815", why:"The clearest proof that peat measurement doesn't predict taste.", process:"Malt phenols run near 55ppm, the highest of the major Islay distilleries, yet the spirit drinks cleaner and fruitier than Laphroaig's. The reason is a purifier pipe on the spirit still that returns heavier vapors for redistillation, increasing reflux and stripping the oiliest compounds. Mothballed through much of the 1980s and 90s before its revival.", bar:"Where you want smoke plus citrus lift rather than smoke plus medicine." },
  { name:"Lagavulin", cat:"Scotch", where:"Islay", est:"1816", why:"The most balanced of the big Islay three, and a masterclass in patience.", process:"Notably long fermentations and one of the slowest spirit runs in Scotland, roughly five hours where many distilleries take half that. Slow distillation increases copper contact, which strips sulfur and rounds the spirit. Heavy sherry cask influence on the 16 Year alongside the peat.", bar:"Too fine for most cocktails: serve it neat and let the guest have the moment." },
  { name:"The Macallan", cat:"Scotch", where:"Speyside", est:"1824", why:"Defined what sherry-cask maturation means to the modern market.", process:"Unusually small stills producing heavy, oily spirit, combined with a famously narrow cut — they take only a small fraction of the spirit run. Casks are made from European and American oak in Jerez and seasoned with sherry to Macallan's specification before shipping north; the company invests heavily upstream in its own wood supply chain, which is where much of the cost lies.", bar:"A sipping malt. If someone orders it in a cocktail, make it, but ask once, kindly." },
  { name:"Glenfiddich", cat:"Scotch", where:"Speyside", est:"1887", why:"Created the single malt category as a global commercial product.", process:"Family owned by William Grant & Sons since founding. In 1963 they began marketing single malt internationally when virtually all Scotch whisky was sold as blends, an enormous gamble that created the category everyone else now competes in. One of very few distilleries retaining on-site coppersmiths and its own cooperage.", bar:"The 12 is a reliable, affordable Rob Roy or Blood and Sand base." },
  { name:"Highland Park", cat:"Scotch", where:"Orkney", est:"1798", why:"A completely different flavor of smoke from a completely different peat.", process:"Runs its own floor maltings for roughly 20% of its barley, dried over Orkney peat — which is heather-rich and nearly treeless, producing aromatic, floral, honeyed smoke rather than Islay's medicinal tar. Heavy use of sherry-seasoned casks, and Orkney's constant wind and even temperature make for unusually steady maturation.", bar:"The smoke that even smoke-skeptics tend to enjoy." },
  { name:"Compass Box", cat:"Scotch", where:"blender, London/Scotland", est:"2000", why:"Argued publicly that blending is a craft and that customers deserve to know what's in the bottle.", process:"The house sources casks and blends rather than distilling. In 2015 the company published full component recipes with exact ages and was told by regulators this violated EU labeling rules, which permit only the age of the youngest component. Their subsequent transparency campaign changed the industry conversation about disclosure.", bar:"Excellent, characterful blends that mix better than most single malts and cost less." },

  // IRISH & JAPANESE
  { name:"Midleton", cat:"Irish & Japanese", where:"County Cork", est:"1825", why:"The custodian of single pot still whiskey, a category that nearly went extinct.", process:"Produces Jameson, Redbreast, the Spot range, Powers, and Method and Madness in the world's largest pot stills. Single pot still style uses both malted and unmalted barley — a legacy of the 1785 malt tax — triple distilled, producing a creamy texture and distinctive spice. Irish whiskey collapsed from hundreds of distilleries to a handful in the 20th century; Midleton's survival kept the style alive.", bar:"Redbreast 12 for sipping; Powers or Jameson for Irish Coffee and picklebacks." },
  { name:"Bushmills", cat:"Irish & Japanese", where:"County Antrim", est:"licensed 1608", why:"Holds the oldest distilling license on record anywhere.", process:"Triple-distilled malt whiskey — unusual in that Bushmills focuses on single malt rather than pot still or blends. Its own maltings historically, and heavy use of both bourbon and sherry wood. The 1608 date refers to a regional distilling license, a detail worth knowing when a guest challenges the claim.", bar:"The Original is a soft, forgiving base for anything hot." },
  { name:"Teeling", cat:"Irish & Japanese", where:"Dublin", est:"2015", why:"The first new distillery to open in Dublin in 125 years — the symbolic start of the Irish revival.", process:"Founded by the family that had sold Cooley Distillery. Non-chill-filtered releases, heavy experimentation with rum, port, and wine cask finishes, and a willingness to bottle at higher strength than the Irish industry norm.", bar:"The Small Batch, finished in rum casks, is a genuinely interesting Irish for cocktails." },
  { name:"Suntory Yamazaki", cat:"Irish & Japanese", where:"Shimamoto, Osaka", est:"1923", why:"Japan's first malt whisky distillery and the origin point of the entire national industry.", process:"Built as the house's flagship malt distillery, with a Scotland-trained Japanese distiller as its first manager. Because Japanese producers do not trade casks with one another, Yamazaki must generate every component it needs internally: hence an unusual variety of still shapes and sizes under one roof, plus multiple yeast strains and cask types. Mizunara, Japanese oak, is porous, prone to leaking, and difficult to work, but after long maturation contributes sandalwood and incense notes found nowhere else.", bar:"Rare and expensive; the Toki blend is the sensible bottle for a Japanese highball." },
  { name:"Nikka Yoichi", cat:"Irish & Japanese", where:"Hokkaido", est:"1934", why:"Preserves a distilling technique nearly extinct worldwide.", process:"Hokkaido was chosen because its cold, damp, coastal climate resembled Scotland's. Yoichi still uses direct coal-fired pot stills, stoked by hand, a method almost entirely abandoned elsewhere because it is labor-intensive and hard to control, but which produces slight caramelization and a robust, faintly smoky spirit.", bar:"Assertive enough to hold up in a stirred drink where most Japanese malts would vanish." },

  // RUM
  { name:"Foursquare", cat:"Rum", where:"Barbados", est:"1996 (site 1636)", why:"The loudest and most credible voice for honesty in a category that badly needs it.", process:"The distillery blends pot and column distillate made on site, ages tropically, and adds nothing: no sugar, no glycerol, no coloring. It has campaigned publicly for a rum classification system based on production method rather than marketing language, and publishes cask details for the Exceptional Cask series. Tropical aging means roughly three times the annual evaporation loss of continental maturation.", bar:"Doorly's and the Probitas white are outstanding, honestly priced cocktail rums." },
  { name:"Hampden Estate", cat:"Rum", where:"Trelawny, Jamaica", est:"1753", why:"The extreme end of what rum can be, and the reference point for Jamaican funk.", process:"Wild, spontaneous fermentations running for weeks, using dunder (acidic still residue) and muck to drive ester production to extraordinary levels. Their marks (OWH, LROK, DOK and others) denote specific ester concentrations measured in grams per hectolitre of pure alcohol. No sugar or additives, pot still only. For most of its history the rum was sold anonymously to blenders and perfumers.", bar:"A half ounce transforms a Mai Tai or a Jungle Bird. Use it as seasoning, not as base." },
  { name:"Appleton Estate", cat:"Rum", where:"Nassau Valley, Jamaica", est:"1749", why:"The most complete expression of the Jamaican house style — and a landmark in the industry's history.", process:"In 1997 the estate appointed the first woman to serve as master blender at any major spirits company, and she has led the blending program ever since. Estate-grown cane, limestone-filtered water, blends of pot and column distillate, fully tropically aged with the resulting heavy angel's share.", bar:"The Signature and 12 are the reliable choices for rum sours and tiki bases." },
  { name:"Mount Gay", cat:"Rum", where:"St. Michael, Barbados", est:"deed 1703", why:"Holds the earliest surviving documentary evidence of commercial rum production anywhere.", process:"Blends double-retort pot still and column distillate, aged in charred ex-bourbon oak in a comparatively dry Barbadian climate. The Black Barrel expression is finished in heavily charred barrels; the Master Blender Collection has begun disclosing far more production detail.", bar:"Eclipse is a solid, affordable workhorse; Black Barrel stands up in an Old Fashioned." },
  { name:"Demerara Distillers", cat:"Rum", where:"Guyana", est:"consolidated 1670s onward", why:"Operates the last wooden stills on earth — irreplaceable industrial heritage.", process:"When Guyana's many estates closed, their stills were consolidated at Diamond. The result: the Port Mourant double wooden pot still, the Versailles single wooden pot, and the Enmore wooden Coffey still, all still in production. Wood contributes character copper cannot, and these stills cannot be replicated — they are maintained rather than rebuilt.", bar:"El Dorado and independent Demerara bottlings supply the rich, smoky backbone of a proper Zombie or Queen's Park Swizzle." },
  { name:"Rhum J.M / Neisson", cat:"Rum", where:"Martinique", est:"1845 / 1932", why:"The purest expression of agricole, protected by the strictest rum rules in the world.", process:"AOC Martinique, granted in 1996, governs cane varieties, harvest timing, fermentation length, still design (single-column creole), distillation proof, and aging. Fresh-pressed cane juice must be distilled within hours of pressing, giving a grassy, olive-brine, vegetal spirit utterly unlike molasses rum. Neisson is family-run and among the smallest producers.", bar:"Essential for a Ti' Punch, and a revelation in a Daiquiri once you adjust the sugar." },
  { name:"Havana Club", cat:"Rum", where:"Cuba", est:"1878", why:"Defines the light Cuban style that the Daiquiri and Mojito were built on.", process:"Fermented and column-distilled to a light aguardiente, aged, filtered through charcoal to strip color, then often aged again. The maestros roneros system trains blenders over decades in a formal apprenticeship. Note the trademark dispute: the Cuban product and the Puerto Rican-made version sold in the US are different rums entirely.", bar:"The 3 Año is the Daiquiri benchmark where it's available." },

  // AGAVE
  { name:"Fortaleza", cat:"Agave", where:"Tequila, Jalisco (NOM 1493)", est:"family since 1873", why:"The most complete surviving example of pre-industrial tequila production.", process:"A fifth-generation descendant of the founding family rebuilt the old methods on the original estate. Agave cooked slowly in brick ovens, crushed by a two-ton volcanic stone tahona wheel, fermented in open wooden tanks with the agave fibers left in, and distilled in small copper pots. Every one of those choices costs yield and adds character.", bar:"Too good to bury in a Margarita, but a Fortaleza Old Fashioned is a revelation." },
  { name:"Tequila Ocho", cat:"Agave", where:"Arandas, Jalisco (NOM 1474)", est:"2008", why:"Proved agave has terroir by putting it on the label.", process:"A collaboration between a Jalisco agave-growing family and a European tequila advocate. Each bottling is single-estate and vintage-dated by the specific field it came from, so you can taste two expressions made identically from different plots and different years. Brick ovens, roller mill, open fermentation, copper pots.", bar:"Buy two vintages and taste them side by side: it's the single best agave education available." },
  { name:"Siete Leguas", cat:"Agave", where:"Atotonilco, Jalisco (NOM 1120)", est:"1952", why:"The quiet benchmark, and the original source of a far more famous brand.", process:"Produced Patrón from 1989 until 2002, when Patrón moved production elsewhere. Runs two production lines in parallel — one using a tahona, one a roller mill — and blends them. Ferments with the fibers included, distills in copper pots, and has changed remarkably little in seventy years.", bar:"A tequila that rewards a well-made cocktail without demanding you skip the mixers." },
  { name:"G4 / El Pandillo", cat:"Agave", where:"Jesús María, Jalisco (NOM 1579)", est:"2010s", why:"Traditional character achieved through genuinely inventive engineering.", process:"Its distiller built much of the plant by hand, including a shredder nicknamed the Tahona Frankenstein. Uses a mix of rainwater and deep-well spring water in production, a real variable, since water source measurably affects fermentation. Brick ovens, open-air fermentation, no additives.", bar:"Widely stocked by agave-serious bars precisely because it tastes like the old style at a working price." },
  { name:"Cascahuín", cat:"Agave", where:"El Arenal, Jalisco (NOM 1123)", est:"1904", why:"Valley-style tequila made the old way by a family that never modernized much.", process:"A third-generation family operation. Brick ovens, some tahona production, open fermentation, and bottlings at higher proof including a 48% blanco that agave enthusiasts prize. Valley agave gives the earthy, peppery, mineral profile that contrasts with the fruitier highlands style.", bar:"The higher-proof blanco is exceptional in a Margarita or a Batanga." },
  { name:"Del Maguey", cat:"Agave", where:"Oaxaca and beyond", est:"1995", why:"Changed how the world buys mezcal by naming the village and the maker.", process:"Its single-village model put the palenquero's name, the pueblo, the agave species, and the elevation on the label at a time when mezcal was sold as an anonymous commodity with a worm in it. Traditional production: agave roasted in earthen pits over wood and volcanic rock, crushed by horse-drawn tahona, fermented in open wood with wild yeast, distilled in small copper or clay pots.", bar:"Vida is built for cocktails; the single-village bottlings are for sipping and teaching." },
  { name:"Mezcal Vago / Rey Campero", cat:"Agave", where:"Oaxaca", est:"2010s", why:"The current standard-bearers for maker-forward, small-batch mezcal.", process:"Both operate on the model of naming the individual mezcalero and documenting the batch: agave species (espadín, tobalá, madrecuixe, tepeztate), village, still type, and often the exact batch proof. Wild agave species can take fifteen to thirty years to mature, which is why they cost what they do and why sustainability is a live issue in the category.", bar:"Pour these for anyone who thinks mezcal just means 'smoky.'" },

  // BRANDY
  { name:"Hennessy", cat:"Brandy", where:"Cognac, France", est:"1765", why:"The largest cognac house on earth, and the reference against which the category is measured.", process:"A blending house rather than a farm: buys eaux-de-vie from hundreds of grower-distillers across the crus, then blends and ages. The tasting committee has met daily for generations to assess new spirit. Their own cooperage sources and air-dries Limousin oak for years before coopering.", bar:"VS or VSOP is the honest working cognac for a Sidecar or a Vieux Carré." },
  { name:"Pierre Ferrand", cat:"Brandy", where:"Grande Champagne, Cognac", est:"1989", why:"The house that made cognac make sense to bartenders again.", process:"The house works exclusively in Grande Champagne, the chalkiest and most age-worthy cru, and successfully petitioned to revive historical production practices including different cask sizes and distillation methods. Their 1840 Original Formula was reverse-engineered from a period recipe specifically to match how cognac tasted when the classic cocktails were written.", bar:"1840 is arguably the correct cognac for 19th-century recipes. Their Dry Curaçao is a bar essential in its own right." },
  { name:"Delamain", cat:"Brandy", where:"Grande Champagne, Cognac", est:"1824", why:"A house that makes only old, dry, single-cru cognac and nothing else.", process:"Buys only aged Grande Champagne eaux-de-vie, blends them, and bottles at the minimum reduction — no sugar, no boisé, no caramel, which many houses permit within the rules. Every release is well beyond XO minimums.", bar:"A neat pour and a conversation, not a mixer." },
  { name:"Château du Tariquet", cat:"Brandy", where:"Bas-Armagnac", est:"1912", why:"Makes the case that armagnac's rusticity is a feature.", process:"Single-estate, distilled once in a continuous alambic armagnacais at low proof — roughly 52–60% — where cognac is double-distilled to a higher, cleaner strength. Less rectification leaves more congeners and more flavor. Frequently released as single vintages rather than blends, so you can drink a specific year.", bar:"Substitute for cognac in a Sidecar and the drink gets bigger and earthier." },
  { name:"Christian Drouin", cat:"Brandy", where:"Pays d'Auge, Normandy", est:"1960", why:"The benchmark for calvados, and an argument for apple brandy in the bar.", process:"Pays d'Auge is the top calvados appellation and requires double distillation in pot stills, plus cider made from a blend of specified apple varieties (bitter, bittersweet, sweet, and acidic) fermented slowly for weeks. Aged in a wide range of casks including former sherry, port, and calvados wood.", bar:"Essential for a proper Widow's Kiss or Corpse Reviver #1." },
  { name:"Caravedo / Pisco Porton", cat:"Brandy", where:"Ica, Peru", est:"1684 hacienda", why:"Peru's pisco rules are the strictest unaged-brandy regulations anywhere, and this estate embodies them.", process:"Peruvian pisco must be distilled to its final proof: no water may be added afterward, which means the distiller has to hit the target strength precisely at the still. It cannot be aged in anything that imparts flavor, so it rests in glass or stainless. Only eight approved grape varieties. The old hacienda's stone fermentation vats remain in use.", bar:"A proper Pisco Sour needs a proper pisco — the difference is not subtle." },

  // VERMOUTH & APERITIVO
  { name:"Carpano", cat:"Vermouth & Aperitivo", where:"Turin, Italy", est:"1786", why:"Invented the category. Everything else in this section is downstream.", process:"The house created the first commercial vermouth in Turin in 1786. Antica Formula is a recreation of that style: heavy vanilla, dried fruit, and bitter root, far richer than modern sweet vermouths. Punt e Mes, launched in 1870, adds a deliberate hit of extra bitterness, its name meaning 'point and a half' from a stockbroker's order.", bar:"Antica makes a decadent Manhattan; Punt e Mes is the correct call for a Red Hook." },
  { name:"Cocchi", cat:"Vermouth & Aperitivo", where:"Asti, Piedmont", est:"1891", why:"Makes the closest available thing to a discontinued ingredient the classics depend on.", process:"Storico Vermouth di Torino follows the protected designation using Piedmontese wine. Cocchi Americano is a quinquina — built on quinine bark and gentian rather than wormwood — and is the standard modern substitute for the pre-1986 Kina Lillet a true Vesper calls for.", bar:"Keep Americano on the shelf specifically for Vespers and Corpse Revivers." },
  { name:"Dolin", cat:"Vermouth & Aperitivo", where:"Chambéry, Savoie", est:"1821", why:"Holds France's only vermouth geographical protection, and defines the light alpine style.", process:"Chambéry PGI vermouth, made with alpine botanicals and a notably light hand: lower sugar, lower alcohol, more delicate than Italian styles. The Blanc in particular is a distinct third category between sweet and dry.", bar:"The default dry vermouth for a Martini where you want the gin to lead." },
  { name:"Noilly Prat", cat:"Vermouth & Aperitivo", where:"Marseillan, Languedoc", est:"1813", why:"Ages its wine outdoors on purpose, a process no one else replicates at scale.", process:"Base wines spend a year in oak casks in the enclos, an open-air yard where they are exposed to Mediterranean sun, sea air, and seasonal temperature swings. This deliberate, controlled oxidation produces the nutty, saline character that defines the Original Dry. The wine is then blended with botanical infusions and rested further.", bar:"Its salinity is why classic French recipes specify it by name." },
  { name:"Campari", cat:"Vermouth & Aperitivo", where:"Milan", est:"1860", why:"An entire family of cocktails exists because of one secret recipe.", process:"Created by the founder of the house; the botanical recipe remains undisclosed and is reportedly known to very few people. Its famous red once came from carmine derived from cochineal insects — the company switched to artificial coloring in 2006, which is a genuinely useful fact when a vegan guest asks.", bar:"Non-negotiable for Negronis, Boulevardiers, Americanos, and Jungle Birds." },
  { name:"Lillet", cat:"Vermouth & Aperitivo", where:"Podensac, Bordeaux", est:"1872", why:"Its reformulation is the reason one famous cocktail can't be made as written.", process:"A Bordeaux-based aperitif wine blended with citrus liqueurs and aged in oak. The original Kina Lillet carried significant quinine bitterness; the 1986 reformulation to Lillet Blanc reduced it substantially for modern palates. The Vesper was written for the older, more bitter product.", bar:"Fine in a Corpse Reviver #2; for a period-accurate Vesper, reach for Cocchi Americano." },

  // AMARO & LIQUEUR
  { name:"Chartreuse", cat:"Amaro & Liqueur", where:"Voiron, France", est:"recipe 1605", why:"Genuinely irreplaceable, and the only major spirit whose scarcity is a spiritual decision.", process:"Made by Carthusian monks from a 1605 manuscript, produced since 1737. Roughly 130 botanicals; only two monks know the complete recipe at any time. The green color is natural chlorophyll from the plants themselves, not added. Aged in oak vats. In 2023 the order announced it would cap production permanently to protect the monastic life of solitude and prayer, a values decision that created a global shortage.", bar:"Green (55%) for the Last Word and Chartreuse Swizzle; Yellow (40%, honeyed and gentler) for the Alaska and Greenpoint." },
  { name:"Fernet-Branca", cat:"Amaro & Liqueur", where:"Milan", est:"1845", why:"The bartender's handshake, and the most aggressive amaro in wide circulation.", process:"The founding recipe uses 27 herbs from four continents including saffron, myrrh, gentian, rhubarb, and chamomile, macerated then aged in oak for a year. Saffron is reportedly the single most expensive ingredient. The recipe has stayed in the family since founding, and the company famously bought enormous quantities of herbs during Prohibition when it was imported into the US as a medicinal product.", bar:"Two dashes in a Hanky Panky; an ounce in a Ferrari; a shot with the crew at close." },
  { name:"Luxardo", cat:"Amaro & Liqueur", where:"Torreglia, Veneto", est:"1821", why:"The maraschino standard, and nothing else tastes remotely like it.", process:"The company grows its own marasca cherries. Fruit, stems, leaves, and pits are macerated for years before distillation, which is where the almond-like bitterness comes from. The result is dry and funky rather than sweet, despite being a liqueur. The family fled Zara in 1947 and rebuilt in Italy from a single surviving cherry sapling.", bar:"Required for the Last Word, Aviation, Martinez, and Hemingway Daiquiri. Their cocktail cherries are the other bar essential." },
  { name:"Bénédictine", cat:"Amaro & Liqueur", where:"Fécamp, Normandy", est:"1863", why:"A honeyed herbal backbone that shows up in a surprising number of classics.", process:"It was marketed as a rediscovered monastic recipe; historians consider the monastic origin story largely invented, but the liqueur itself is real and excellent. 27 botanicals including saffron, angelica, hyssop, and honey, distilled in four separate batches then blended and aged. D.O.M. on the label stands for Deo Optimo Maximo.", bar:"The Vieux Carré, Bobby Burns, Monte Carlo, and Singapore Sling all need it." },
  { name:"Cointreau", cat:"Amaro & Liqueur", where:"Angers, France", est:"1885", why:"The orange liqueur most classic recipes assume you're using.", process:"A blend of sweet and bitter orange peels from multiple origins, macerated and double-distilled in copper pots, then blended and sweetened. Crucially it is clear and relatively dry at 40% ABV, so it contributes structure and strength rather than just sugar, which is why it behaves differently from a cheap triple sec in a Margarita or Sidecar.", bar:"The default for Margaritas, Sidecars, Corpse Revivers, and White Ladies." },
  { name:"Combier", cat:"Amaro & Liqueur", where:"Saumur, Loire", est:"1834", why:"Claims the original triple sec, and makes a genuinely distinct alternative.", process:"The distillery still operates in its original building with stills reportedly designed by the Eiffel workshop. Uses bitter oranges from Haiti and Turkey, distilled in copper pots. Drier and more orange-peel-driven than most competitors.", bar:"A worthwhile swap in a Sidecar when you want less sweetness." },
  { name:"Giffard", cat:"Amaro & Liqueur", where:"Angers, France", est:"1885", why:"Quietly restored several ingredients the classic canon needed to function.", process:"A family pharmacy turned liqueur house. Their crème de violette, crème de pêche, and Banane du Brésil are made with real fruit and flower infusions rather than flavoring, at a time when many of these categories had degraded into candy syrups. The Aviation was effectively unmakeable in the US for decades until violette returned to the market.", bar:"Violette for the Aviation and Blue Moon; their pineapple and banana liqueurs for tiki work." },
  { name:"Amaro Nonino", cat:"Amaro & Liqueur", where:"Friuli, Italy", est:"1933 / amaro 1992", why:"Built on grappa, and singlehandedly responsible for one modern classic.", process:"The Nonino family pioneered single-varietal, single-estate grappa distilled from fresh pomace, then built their Quintessentia amaro on that grappa base rather than neutral spirit. Botanicals infused, then aged in ex-sherry and ex-cognac barriques. Lighter and more orange-and-caramel than most amari.", bar:"The Paper Plane exists because of it, and no substitute quite works." },
  { name:"Cynar", cat:"Amaro & Liqueur", where:"Padua, Italy", est:"1952", why:"The artichoke amaro — strange on paper, indispensable in practice.", process:"Thirteen herbs and plants including artichoke leaf, which contributes a distinctive vegetal bitterness rather than the sweet-root profile of most amari. Available at 16.5% and, in the Cynar 70, at 70 proof for cocktail work.", bar:"Little Italy, Bitter Giuseppe, and the Art of Choke all depend on it. Also excellent simply with soda and an orange slice." },
];

function renderProducers(){
  const p = state.prod;
  const nav = ['All'].concat(PROD_CATS).map(c =>
    '<button class="tab-btn'+(p.cat===c?' active':'')+'"'+(p.cat===c?' aria-current="true"':'')+' data-act="prod-cat" data-c="'+esc(c)+'">'+esc(c)+'</button>').join('');
  const list = PRODUCERS.map((x,i)=>({x,i})).filter(({x}) => p.cat==='All' || x.cat===p.cat);
  const primer = (p.cat!=='All' && PRIMERS[p.cat]) ? PRIMERS[p.cat].map(([t,txt]) => {
    const open = p.primerOpen===t;
    return '<div class="panel" style="padding:0 16px">'
      + '<button class="accordion-btn'+(open?' open':'')+'" aria-expanded="'+(open?'true':'false')+'" data-act="prod-primer" data-t="'+esc(t)+'">'
      + '<span>'+esc(t)+'</span><span style="color:var(--brass)">'+(open?'−':'+')+'</span></button>'
      + (open ? '<div class="accordion-body"><div class="small dim lh">'+esc(txt)+'</div></div>' : '')+'</div>';
  }).join('') : '';
  const rows = list.map(({x,i}) => {
    const open = p.open===i;
    const body = open ? '<div class="drink-body" style="gap:14px">'
      + '<div class="ticket"><div class="ticket-inner">'
      + '<div class="tc"><div class="tix-label">'+esc(x.cat)+'</div><div class="tix-name">'+esc(x.name.toUpperCase())+'</div>'
      + '<div class="tix-label" style="margin-top:4px">'+esc(x.where)+' · est. '+esc(x.est)+'</div></div>'
      + '<div class="tix-rule"></div><div class="tix-note">'+esc(x.why)+'</div></div></div>'
      + '<div style="max-width:440px"><div class="eyebrow mb1">The process</div><div class="small dim lh">'+esc(x.process)+'</div></div>'
      + '<div style="max-width:440px"><div class="eyebrow mb1">Behind the bar</div><div class="small dim lh">'+esc(x.bar)+'</div></div>'
      + '<a class="btn btn-ghost tiny" href="'+ytSearch(producerQuery(x)+scopeSuffix())+'" target="_blank" rel="noopener noreferrer">▶ Watch the distillery</a>'
      + '</div>' : '';
    return '<div class="panel"><button class="drink-head" aria-expanded="'+(open?'true':'false')+'" data-act="prod-open" data-i="'+i+'"'+(open?' data-open="1"':'')+'>'
      + '<span class="bold">'+esc(x.name)+'</span><span class="chip">'+esc(x.where.split(',')[0])+'</span>'
      + '<span class="chip brass">'+esc(x.est)+'</span>'
      + '<span class="plusminus">'+(open?'−':'+')+'</span></button>'+body+'</div>';
  }).join('');
  return '<div class="col">'
    + '<div class="panel p4"><div class="small dim lh"><span class="brass2 bold">On the word "best." </span>'
    + 'There is no objective best distillery, and any list claiming otherwise is selling something. What follows are benchmark houses: producers whose methods defined a category, preserved a technique nobody else kept, or set the standard others are measured against. Knowing <span style="color:var(--cream)">why</span> a producer matters is what lets you answer a guest honestly, recommend across price points, and taste critically. Learn the process; the preferences will follow.</div></div>'
    + '<nav class="tabs" style="margin-bottom:0">'+nav+'</nav>'
    + (primer ? '<div class="eyebrow" style="padding:0 4px">How it\'s made</div><div class="col-sm">'+primer+'</div>' : '')
    + '<div class="row"><span class="eyebrow">'+(p.cat==='All'?'All producers':esc(p.cat))+'</span>'
    + '<span class="tiny dim push">'+list.length+' houses</span></div>'
    + '<div class="col-sm">'+rows+'</div></div>';
}

