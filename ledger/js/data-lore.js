/* ---------------- THE STORY: LORE FOR THE CANON (tiers 1–3) ----------------
   Keyed by exact cocktail name. Rendered as "The Story" in the Library
   and as a footnote on flashcard backs. Drinks outside the canon simply
   have no story panel: the ledger stays honest about what it knows. */

const LORE = {
  /* ---- Tier 1: The Core Dozen ---- */
  "Old Fashioned":
    "When the word 'cocktail' was first defined in print in 1806, it meant exactly this: spirit, sugar, water, bitters. By the 1880s, bartenders drowning drinks in curaçao and absinthe prompted customers to ask for one made 'the old-fashioned way', and the protest became the name. The Pendennis Club in Louisville claims it; the truth is it was everywhere. It survived Prohibition, a mid-century dark age of muddled fruit salad, and returned as the bedrock drink of the craft revival. If you can make this well, slowly, you understand the whole book.",
  "Manhattan":
    "Born in New York in the early 1880s: the Manhattan Club took credit, though the story about a future British prime minister's mother hosting the launch party is a myth (she was in England, around his birth, at the time). Here is the first great marriage of American whiskey and Italian vermouth, and it taught bartenders the template that produced the Rob Roy and, by most tellings, the Martinez and eventually the Martini. Rye is the traditional call: its spice stands up to the vermouth's sweetness. Treat the vermouth as wine, because it is one: fresh bottle, refrigerated, or the drink is already dead.",
  "Martini":
    "By the usual telling, the Martini descended from the sweeter Martinez sometime in the 1880s–90s, drying out decade by decade as gin got better and palates got drier. The original spec carried orange bitters; they vanished mid-century and the craft revival put them back. The 20th century turned it into an accessory (ever-drier, ever-colder, shaken by secret agents) but the drink underneath is simply gin and dry vermouth in honest proportion, stirred to silk. Ask twist or olive. Never assume; people are loyal to their answer in a way they are loyal to little else.",
  "Daiquiri":
    "Named for a beach near Santiago de Cuba, standardized around 1900 by American mining engineers on the island, and perfected at Havana's El Floridita, where the house built a daiquiri empire and its most famous regular drank doubles. There is nowhere to hide in it: rum, lime, sugar, and your shake. That is why bartenders order it to test each other, the 'bartender's handshake.' If the frozen slushy version is the only one you know, this spec is the correction: bright, cold, bone-dry at the finish.",
  "Margarita":
    "The most-ordered cocktail in America is, by the most convincing telling, a Prohibition-era Daisy ('margarita' is Spanish for daisy) built on tequila: a sour extended with orange liqueur, in the New Orleans style. A dozen people claimed to have invented it in the 1930s–40s border-resort scene; none can prove it. Decades of sour-mix abuse buried it until the Tommy's Margarita (agave nectar instead of orange liqueur) reintroduced the world to what tequila actually tastes like. Salt the rim in a half-moon, so the guest can choose each sip's seasoning.",
  "Whiskey Sour":
    "In the Bar-Tender's Guide of 1862 the sour was already a fixture: the sailor's ration of spirit, citrus and sugar, civilized into a glass. It is the template drink of the entire sour family: change the spirit and you have a Daiquiri, a Gimlet, a Bee's Knees. With egg white it becomes the silkier Boston Sour, and with a float of red wine over the top, the New York Sour, one of the oldest special effects in bartending, and still one of the best-looking drinks you can serve.",
  "Negroni":
    "Florence, around 1919: a local count asked the bartender at his usual café to stiffen his Americano by swapping the soda for gin. The count got his own drink and the amaro world got its gateway. Equal parts gin, sweet vermouth and Campari is a spec you cannot misremember, which is part of its genius; it travels perfectly. It taught American drinkers to love bitterness, and its skeleton (spirit + vermouth + bitter liqueur) generates half of modern bartending: Boulevardier, Old Pal, White Negroni, Rosita.",
  "Mojito":
    "Cuba's oldest drink, with roots in the 16th-century Draque: aguardiente, lime, sugar and mint, drunk as medicine by Elizabethan privateers. Refined in Havana's cantinas and made famous at La Bodeguita del Medio, it is the drink every new bartender learns to dread on a busy night and every good bartender learns to respect. The mint is the whole argument: press it gently to release oil, never shred it to chlorophyll. Made with care it is the best hot-weather drink in the canon; made carelessly it is a salad.",
  "Moscow Mule":
    "Invented around 1941 at the Cock 'n' Bull in Hollywood by three people with inventory problems: a bar owner with unsold ginger beer, a spirits executive with unsold Smirnoff, and (as the story goes) a copper-mug salesman. The mug was marketing genius: photographed in Hollywood hands, it launched vodka from obscurity to the best-selling spirit in America. The drink itself is honest and self-balancing: spicy ginger, sharp lime, clean spirit, ice-cold copper. Few drinks owe more to their glassware.",
  "Gin & Tonic":
    "British officers in colonial India took bitter quinine against malaria and cut it with sugar, soda and their gin ration, inventing, almost by accident, the world's most durable highball. A line usually attributed to a wartime British prime minister has it that gin and tonic 'saved more Englishmen's lives than all the doctors in the Empire.' Modern Spain rebuilt it as the Gin-Tonica: big balloon glass, mountains of clear ice, garnish matched to the gin's botanicals. The craft is all temperature and bubbles: cold glass, cold tonic, one gentle lift. Stir it like a Manhattan and you have murdered it.",
  "Tom Collins":
    "A gin sour served long, named, in the most likely telling, for the Great Tom Collins Hoax of 1874, a fad where you told a friend that a man named Tom Collins was slandering him in a bar down the street. When the victim stormed in demanding Tom Collins, the bartender handed him this. Originally built on sweet Old Tom gin (the pun wrote itself), it settled into London dry. The Collins glass is named for the drink, not the other way around.",
  "Espresso Martini":
    "London, 1983: a young model asked the bartender at the Soho Brasserie for something to 'wake me up'; the answer was vodka, fresh espresso and coffee liqueur, shaken violently. It went out as the Vodka Espresso, the 1990s renamed it, and after a couple of dormant decades it returned as the defining drink of the 2020s. The crema on fresh espresso is what builds the foam, and the three beans on top are traditional: health, wealth and happiness. Shake it like you mean it or serve it flat and thin.",

  /* ---- Tier 2: The Classics Canon ---- */
  "Sazerac":
    "New Orleans in a glass, and by some arguments America's first branded cocktail, named for the Sazerac de Forge cognac it was originally built on. When phylloxera devoured France's vineyards in the 1870s, the city, so the story goes, switched to rye and never switched back. The absinthe rinse, the Peychaud's bitters (invented by a local apothecary), the lemon peel expressed and discarded: every gesture is ritual, and the ritual is the point. Served without ice, cold from the stir, in a chilled rocks glass. There is no garnish to hide behind.",
  "Sidecar":
    "The great brandy sour of the Prohibition era, claimed by both Harry's New York Bar in Paris and the Ritz, allegedly named for an American army captain who arrived by motorcycle sidecar. It is the New Orleans sour template (spirit, citrus, orange liqueur) executed on cognac, and the direct ancestor of the Margarita and the White Lady. The sugared rim appeared early as a customer-side correction for tartness; a well-balanced Sidecar doesn't strictly need it, but tradition has its privileges.",
  "Gimlet":
    "Royal Navy surgeons knew lime prevented scurvy; a Scottish shipping merchant patented preserved lime cordial in 1867; naval officers put it in their gin ration. The result is the only classic sour built on cordial instead of fresh juice: sharper-edged and rounder at once, allegedly named for the small tool used to tap the cordial casks. In The Long Goodbye it was Terry Lennox who told Philip Marlowe a real one is 'half gin and half Rose's lime juice and nothing else'; the craft era rebuilt it with fresh lime and rich syrup, or house-made cordial. Both schools are defensible. Pick one and make it cold.",
  "Cosmopolitan":
    "The pink drink that carried craft technique through the vodka decades. Its modern form was standardized in the late 1980s (the version poured at the Odeon in Manhattan is the most credited), built on the new citrus vodka with cranberry, lime and Cointreau, a Kamikaze that went to finishing school. Sex and the City made it the most famous cocktail on earth for a decade, then fashion turned on it. Ignore fashion: made with fresh lime and real Cointreau, it is simply a good sour, and the flamed orange peel added at the Rainbow Room remains the correct flourish.",
  "Mai Tai":
    "Trader Vic's, Oakland, 1944: seventeen-year-old J. Wray & Nephew rum, lime, orange curaçao, orgeat, rock candy syrup. It was served to Tahitian friends who pronounced it 'maita'i roa', 'the best.' Don the Beachcomber claimed it too, and the feud defined tiki's golden age. The drink is a rum sour dressed in almond and orange, no fruit juice parade; decades of pineapple-and-grenadine abuse are a separate drink wearing its name. The spent lime shell and mint sprig garnish is traditional: an island and a palm tree.",
  "Paloma":
    "Mexico's actual favorite tequila drink: the Margarita is for export. A blue-collar highball of tequila and grapefruit soda with a squeeze of lime and a pinch of salt, probably named for a folk song, undocumented before the 1990s because nobody writes down what everybody already drinks. The craft version splits the soda into fresh grapefruit, lime and syrup with a soda top; the cantina version cracks open a Squirt. Both are correct. The salt is not optional: it is what makes the grapefruit bloom.",
  "Boulevardier":
    "The Boulevardier, an American expat journal idling in 1920s Paris, gave its name to the Negroni's autumn cousin: bourbon where the gin was. Harry's New York Bar recorded it in 1927. Whiskey's weight changes the drink's season entirely, warm where the Negroni is bracing, and it drinks best slightly whiskey-heavy (1.25–1.5 oz) rather than strict equal parts. Swap the bourbon for rye and the sweet vermouth for dry and you have its leaner sibling, the Old Pal.",
  "Aperol Spritz":
    "The spritz began with 19th-century Austrian soldiers in the Veneto watering the local wine ('spritzen': to spray). Aperol arrived in 1919, a gentler, brighter orange cousin to Campari, and the 3-2-1 formula (prosecco, Aperol, soda) became the Veneto's official evening ritual, the aperitivo hour in a glass. A century later a marketing campaign conquered the world with it. Build it over fat ice in a big wine glass, orange slice in, and resist the urge to stir out the bubbles. It is sunshine engineering.",
  "French 75":
    "Named for the French 75mm field gun of the First World War, because that's what the kick felt like. Harry's New York Bar published an early version; the modern gin-lemon-sugar-champagne spec settled at the Stork Club and in the Savoy Cocktail Book. There is an old argument about gin versus cognac: New Orleans's Arnaud's French 75 Bar serves cognac and calls history its witness. Either way it is a Tom Collins in evening wear: a sour lengthened with champagne instead of soda, served up in a flute.",
  "Dark 'n' Stormy":
    "Bermuda, after the First World War: Gosling's black rum met the ginger beer the Royal Navy brewed to keep sailors off worse things. The name (a sailor supposedly said the drink was 'the colour of a cloud only a fool or a dead man would sail under') is one of the only trademarked cocktail names on earth; Gosling's has defended it in court (they register it 'Dark 'n Stormy,' one apostrophe), so the true article is Gosling's Black Seal by definition. Build the ginger beer first and float the rum on top: the drink is named for its weather.",
  "Penicillin":
    "Milk & Honey, New York, 2005: a Gold Rush (whiskey-honey sour) rebuilt with ginger and finished with a float of smoky Islay scotch drifting over the top like weather. It is the most successful cocktail invented in the 21st century, a modern classic that reads as if it had always existed: honey and ginger say medicine, smoke says cure. The name closed the deal. Blended scotch in the body, the peated single malt only as perfume: invert that and the drink is a campfire.",
  "Paper Plane":
    "The Milk & Honey school, 2007, named for the pop song playing that summer. Four ingredients, equal parts (bourbon, Aperol, Amaro Nonino, lemon) and nothing to adjust: the spec is the drink. It descends from the Last Word's equal-parts logic and proved that the format could carry the amaro shelf. It also became the modern bartender's handshake in half the world's craft bars. If a guest likes whiskey sours and you want to walk them one shelf deeper, this is the drink that does it.",
  "Last Word":
    "A Prohibition-era Detroit Athletic Club drink, sold at a steep 35 cents, that vanished for eighty years until Seattle's Zig Zag Café pulled it from an old book called Bottoms Up in 2004 and set the drink world on fire. Equal parts gin, green Chartreuse, maraschino, lime: a spec with no dials, herbal and sharp and strange. Its resurrection launched the equal-parts revival (Paper Plane, Naked & Famous) and made the case that cocktail archaeology was worth doing. That book credited the drink to a vaudeville monologist; nobody is sure of more.",
  "Corpse Reviver #2":
    "From a family of pre-Prohibition morning 'eye-opener' drinks, codified in The Savoy Cocktail Book (1930): equal parts gin, Cointreau, Lillet, lemon, with an absinthe rinse ghosting through. Its warning is the most quoted line in the book: 'four of these taken in swift succession will unrevive the corpse again.' The #1 is a brandy drink almost nobody orders; the #2 became the craft revival's favorite brunch flex. The absinthe is a seasoning, not an ingredient: rinse and dump.",
  "Aviation":
    "Hotel Wallick, New York, 1916: gin, lemon, maraschino, and a few drops of crème de violette to turn the drink the grey-lavender of sky at altitude, in the decade when flight was the most romantic idea on earth. The Savoy dropped the violette (likely a supply problem), and for seventy years the drink flew colorless. When violette returned to the US market in 2007, the original was restored. Go easy: at a quarter ounce it is dusk in a glass, at a half ounce it is grandmother's soap.",
  "Bee's Knees":
    "Prohibition slang for 'the best,' and a drink built for its era: honey and lemon were exactly what you'd add to bathtub gin you didn't want to taste. The Paris Ritz published it in the 1930s. Better gin turned the disguise into the point: honey syrup rounds a citrus sour in a way plain sugar can't, all texture and floral weight. Make the syrup 3:1 honey to water; full-strength honey seizes in a cold shake and lines the tin instead of the drink.",
  "Vieux Carré":
    "Built at the Hotel Monteleone's bar by 1937 and named for the French Quarter, the 'old square.' It is New Orleans's history in one glass: rye for the Americans, cognac for the French, sweet vermouth for the Italians, Bénédictine for the monks, and both Peychaud's and Angostura because the city never chose just one of anything. The Monteleone's bar has revolved on a carousel since 1949; the drink is engineered for slow sipping while the room turns. Stir it patiently: it carries five layers and wants the water.",
  "Ramos Gin Fizz":
    "New Orleans, 1888: a gin fizz driven through orange flower water, cream and egg white into something between a drink and a cloud. At its Carnival peak the bar employed thirty-five 'shaker boys' passing tins down a line, and still couldn't keep up. A Louisiana governor flew a New Orleans bartender to New York rather than go without. The legendary twelve-minute shake is myth-adjacent, but the dry shake must be violent and long, and the final soda pour through the center should raise the soufflé an inch above the rim. A drink you serve with a straw and an apology to whoever's next in line.",
  "Bloody Mary":
    "Harry's New York Bar claimed the tomato-vodka original in the 1920s, and the recipe was salted and spiced properly when its bartender moved to the St. Regis (where propriety renamed it the Red Snapper). It is the only canonical cocktail that is genuinely a meal, the anchor of brunch, and the world's most personal spec: every bartender's mix is a fingerprint of heat, salt, acid and umami. Roll it between tins instead of shaking; shaken tomato juice aerates into pink foam. The celery stick arrived in 1960s Chicago when a garnish-less drink met an impatient guest and a relish tray.",
  "Irish Coffee":
    "Foynes flying-boat terminal, Ireland, winter 1943: the terminal's chef spiked coffee with whiskey for passengers off a storm-turned flight, and answered 'is this Brazilian coffee?' with 'no, that's Irish coffee.' A travel writer carried it to the Buena Vista in San Francisco in 1952, where they cracked the physics (cream aged 48 hours, lightly whipped, floated over sweetened coffee) and have poured thousands a day since. The sugar isn't optional: it changes the coffee's density so the cream can sit. Drink the hot coffee through the cold cream; never stir.",
  "Martinez":
    "The missing link between the Manhattan and the Martini, from the 1880s when American bartending ran sweet: Old Tom gin under sweet vermouth, a spoon of maraschino, a dash of bitters. Half a dozen California towns claim it (Martinez, CA has a plaque); the truth is lost. It drinks like a Manhattan that swapped its whiskey for perfume: rich, silky, faintly cherried. Order one and you are drinking the Martini's baby pictures.",
  "Hanky Panky":
    "The American Bar at the Savoy was run for two decades by one of the first great female head bartenders. Around 1920, a West End actor asked her for 'something with a bit of punch in it'; the sweet Martini she laced with Fernet-Branca made him declare, 'By Jove! That is the real hanky-panky!' Two dashes of fernet seems like nothing and changes everything: menthol and bitter root under the gin and vermouth. It remains the best answer to a guest who says they want 'a Martini, but interesting.'",
  "Rob Roy":
    "The Manhattan in a kilt: born at the Waldorf's bar in 1894, named for an operetta about the Scottish folk hero playing down the street. Scotch's malt-and-smoke replaces rye's spice, which is the whole conversation: a blended scotch keeps it silky, and even a whisper of peat will colonize the glass. Sweet vermouth is standard; ask for it 'perfect' (half sweet, half dry) and you're drinking the classiest version. One of the few classics that has never been fashionable and never disappeared.",
  "Americano":
    "The senior member of the aperitivo family: Campari and sweet vermouth over ice with soda, born as the 'Milano-Torino' at the Campari café in Milan in the 1860s (Campari from Milan, sweet vermouth from Turin). The name honors, depending on who's telling it, the American tourists who adopted it, or an Italian heavyweight champion of the day. It is the drink James Bond orders in Casino Royale before the Vesper existed, and the direct parent of the Negroni. Low-proof, bitter, endlessly sessionable: the correct first drink of a long evening.",
  "Jungle Bird":
    "Kuala Lumpur Hilton, mid-1970s: the welcome drink at the Aviary Bar. It sat unnoticed in a hotel recipe book until the tiki revival dug it out and realized what it was: the only classic tiki drink with an amaro in it. Campari's bitterness cuts through pineapple and blackstrap rum's molasses funk like a machete through canopy. The original was served in a porcelain bird. A later two-ounce-blackstrap spec is the modern standard, a tiki drink that amaro drinkers respect.",
  "Piña Colada":
    "Puerto Rico's national drink, claimed by two San Juan bartenders at the Caribe Hilton in 1954 (the hotel still celebrates its own claim) and by Barrachina downtown. Coco López, the sweetened cream of coconut invented on the island in 1948, is the enabling technology; without it there is no colada. Blend it with fresh pineapple and good rum and it is a genuinely great drink, not a guilty one. The 1979 pop song is about a failing marriage; the drink deserved better press.",
  "Caipirinha":
    "Brazil's national cocktail: cachaça (sugarcane spirit older than rum, funky and green) over a whole lime muddled with sugar in the glass it's served in. Folk history traces it to a Spanish-flu remedy of lime, garlic and honey that lost the garlic and gained ice. The muddle is the technique: press the lime's oils out of the skin without grinding the pith's bitterness in. Use superfine sugar (it dissolves; granulated sits) and crushed ice, and serve it with the muddled hulls still in the glass. It is the Daiquiri's barefoot cousin and loses nothing in the comparison.",
  "Pisco Sour":
    "Morris' Bar, opened by an American expat in Lima around 1916, ran the whiskey sour template on Peru's grape brandy; the egg-white silk came a little later, usually credited to a Peruvian apprentice of the house. Peru and Chile both claim pisco and this drink with genuine diplomatic heat: Peru celebrates a national Pisco Sour Day. The Angostura dashed across the foam isn't decoration: drag a straw through it and it aromatizes every sip. Peruvian pisco is distilled to proof and rested, never oaked: the drink should taste of grapes and altitude, not barrel.",
  "Bramble":
    "Fred's Club, London, 1984: a gin sour over crushed ice with crème de mûre bleeding down through it like bramble juice through frost. It was built as a memory of picking blackberries on the Isle of Wight in childhood, and it became modern Britain's contribution to the canon. The drizzle is the drink: pour the liqueur over the top after building and let gravity marble it. Lemon wheel and a fat blackberry on top. Simple, seasonal, and better than it has any right to be.",
  "Clover Club":
    "Named for the Philadelphia lawyers' and writers' club that met at the city's Bellevue (later the Bellevue-Stratford) from the 1880s; their house drink was gin, lemon, raspberry syrup and egg white, pink as a boutonnière. It predates Prohibition, died as a 'ladies' drink' punchline, and was resurrected so thoroughly that a Brooklyn bar took its name in 2008, now one of the best cocktail bars in America. Real raspberry syrup, not grenadine; dry vermouth in the craft spec adds a dry backbone under the fruit. The foam should hold the garnish.",
  "Southside":
    "A gin sour with mint, served up: the Mojito's city cousin. Competing origin stories put it at Chicago's South Side during Prohibition (where legend says a bootlegging outfit cut rough gin with mint and lemon) or at the Southside Sportsmen's Club on Long Island, where the gentry drank them after shooting. The 21 Club made it a house institution. Fresh mint shaken hard, double-strained so no leaf-flecks cloud the coupe. With soda it becomes a Southside Fizz; either way it is summer in evening clothes.",
  "Hemingway Daiquiri":
    "El Floridita, Havana, 1930s. The bar's most famous American regular tried the house daiquiri and pronounced: 'That's good, but I prefer it without sugar, and double rum.' The house built the Papa Doble to order, softening the ferocity with grapefruit and a whisper of maraschino. The menu version adds back a little sweetness because almost nobody actually wants the original ask (the man was reportedly diabetic and drank them by the dozen; both facts explain the drink). This is the Daiquiri for people who find the original too polite.",
  "White Lady":
    "First sketched with crème de menthe in 1919, then perfected at Harry's New York Bar in 1929 with gin: a Sidecar rebuilt on juniper. The Savoy claimed it too, and shook them for the Prince of Wales. Gin, Cointreau, lemon, sometimes an egg white for silk: it is the cleanest expression of the New Orleans sour on gin, and the direct ancestor of half the 'floral gin sour' menu items of the last twenty years. Serve it up, very cold, and it justifies its name: pale, poised, quietly strong.",
  "Airmail":
    "A Cuban celebration of the new airmail routes of the late 1920s: a honey daiquiri lengthened with champagne, first printed in Bacardi promotional material around 1930. It is the French 75's tropical pen pal, rum and honey where gin and sugar were, and one of the great under-ordered drinks of the canon. The honey has to be syrup (3:1) or it dies in the cold shake. Some old specs deliver it in a tall glass with a postage stamp stuck to the side; a coupe works, but the stamp was a better idea than most garnishes.",
  "Mint Julep":
    "Older than the cocktail itself: an 18th-century Virginia morning medicine ('julab', from the Persian for rosewater) of spirit, sugar and mint, taken before the heat of the day. It moved from medicinal dram to plantation-porch institution to the official drink of the Kentucky Derby, which now sells 120,000 every race weekend. The build is architecture: mint pressed gently in the bottom, bourbon, then crushed ice packed to a dome, swizzled until the pewter or silver cup frosts. You drink the meltwater as much as the whiskey; the cup's frost is the doneness indicator.",
  "Whiskey Smash":
    "The Bar-Tender's Guide listed the smash as its own family in 1862: 'a julep on a small plan,' fruit and herb muddled under spirit over cracked ice. The 1990s Rainbow Room version (bourbon, lemon quarters muddled skin-and-all, mint) singlehandedly revived the format and became one of the most copied specs of the craft era. The lemon oils from the muddled peel are what separate it from a mere sour. It is the drink for the guest who says they don't like whiskey; it has converted thousands.",
  "Sherry Cobbler":
    "The most popular drink in 19th-century America, full stop: sherry, sugar and fresh fruit over crushed ice, drunk through a straw: a combination so novel that the cobbler is substantially responsible for popularizing both the drinking straw and the ice trade. Martin Chuzzlewit stops the plot to marvel at one. Low-proof, cold, fruit-perfumed, it is the great-grandparent of every spritz-and-session drink on a modern menu. Build it with a decent amontillado or oloroso and berries in season, and serve it looking like a jewelry box.",
  "Hot Toddy":
    "Whisky, hot water, sugar: the toddy (the name likely from an Indian palm liquor via Scots usage) predates the cocktail and was prescribed by actual physicians well into the 20th century. Lemon and clove entered as the drink migrated from Scottish firesides to everywhere with a kettle and a cold. The craft is restraint and temperature: hot water, not boiling, or the alcohol steams off the top; sugar slightly under, since heat amplifies sweetness; and a pre-warmed glass so it doesn't crack or go lukewarm in a minute. It won't cure anything, and it absolutely helps.",
  "Champagne Cocktail":
    "In print by 1855 and codified in the Bar-Tender's Guide of 1862: a sugar cube soaked in Angostura, dropped in a flute, champagne over, lemon oils on top. The cube is theater and engineering at once: a nucleation site that pulls a steady thread of bubbles and meters bitterness into the wine as it dissolves, so the drink evolves from dry to spiced as you sip. It appears in Casablanca more than once. When someone wants champagne but also wants a cocktail, this is the 170-year-old answer.",
  "Brandy Alexander":
    "The gin original ('Alexander') appeared around 1915; cognac took over by the 1930s and improved the argument: brandy, dark crème de cacao and cream in equal parts, nutmeg grated over the top. It is dessert with a spine, the drink a famous Beatle fell for (he called it a milkshake) during his Lost Weekend. Fresh cream, real nutmeg, and honest measurement keep it a cocktail; carelessness turns it into melted ice cream. Serve it after dinner, up, and watch it convert whoever claims they don't like brandy.",
  "White Russian":
    "The Black Russian, vodka and coffee liqueur, appeared in 1949 Brussels, named for the color and the spirit's supposed nationality. Cream landed on top by the 1960s, and the White Russian settled into shag-carpet obscurity until 1998, when The Big Lebowski made it the Dude's sacrament and single-handedly revived it. It survives fashion because it works: coffee bitterness, sweet liqueur, cold cream. Build it over ice, float the cream, and let the drinker marble it themselves. The Dude abides; so does the drink.",
  "Gin Fizz":
    "The fizz is the sour's effervescent child, a New Orleans specialty by the 1870s–80s: shake gin, lemon and sugar, strain into a small glass with no ice, and fill with soda so the drink foams to the rim. Drunk fast and cold in two or three swallows, morning or afternoon: the espresso shot of its era. At its peak, New Orleans bars employed relay teams of shaker boys just to keep up with fizz demand. Add egg white and it's a Silver Fizz; add yolk, Golden; the whole egg, Royal. Keep the glass small: a fizz that sits goes flat, and a flat fizz is just a weak Collins.",

  /* ---- Tier 3 canon: zero-proof standards ---- */
  "Nojito":
    "The Mojito's sober twin, and the proof that the template (mint, lime, sugar, bubbles, crushed ice) never needed the rum to make its argument. Build it with the same care you'd give the original: press the mint, don't shred it, and let the soda lift the aromatics. A splash of chilled green tea in place of the spirit adds the tannic grip that rum's absence leaves behind.",
  "Cinderella":
    "A soda-fountain classic from the golden age of the American 'temperance drink': orange, pineapple and lemon shaken bright, a blush of grenadine, and lengthened with soda or ginger ale depending on the house. It has been on hotel menus for a century because it solves a real problem: a guest who wants something bright, adult and celebratory in a tall glass. Fresh juice or nothing; from concentrate, the drink turns into punch-bowl regret.",
  "Shirley Temple":
    "Invented in the 1930s, Hollywood legend says at Chasen's, for the child star herself, who reportedly found it too sweet and spent her life ordering plain ginger ale. Grenadine and ginger ale with a cherry: the first 'cocktail' most Americans ever order. Made with real pomegranate grenadine instead of dyed corn syrup, it is genuinely good: tart, rosy, and worth the maraschino flourish. She went to court to stop bottled versions trading on her name; respect the woman, pour the good grenadine.",
  /* ---- Tier 4: Modern Craft Classics ---- */
  "Gold Rush":
    "Built at Milk & Honey around 2001 by asking what a Whiskey Sour would taste like with honey doing the sugar's job: the answer launched a dynasty (the Penicillin is its direct descendant). Three ingredients, no garnish debate, and one of the modern era's first proofs that a two-minute tweak to a template can outlive the bar that made it.",
  "Oaxaca Old Fashioned":
    "Death & Co, 2007: reposado tequila and mezcal split the base of an Old Fashioned, agave nectar for the sweet, and a flamed orange peel over the top. It did more for mezcal's arrival in American bars than any importer's campaign, proof that agave could sit in whiskey's oldest chair.",
  "Naked & Famous":
    "A Death & Co creation, described by its maker as the bastard love child of a Last Word and a Paper Plane: equal parts mezcal, Aperol, yellow Chartreuse and lime. It completed the equal-parts trilogy and gave smoke a seat at the sour table.",
  "Old Cuban":
    "An early-2000s masterstroke from the Pegu Club: a Mojito that went to finishing school: aged rum, mint and lime shaken instead of built, bitters for spine, champagne instead of soda. It drinks like the drink the Mojito always wanted to be after hours.",
  "Tommy's Margarita":
    "Tommy's Mexican Restaurant in San Francisco, in the early 1990s, dropped the orange liqueur and sweetened with agave nectar instead: letting 100%-agave tequila carry the whole drink. It became the world's most-ordered modern margarita spec and a Trojan horse for good tequila.",
  "Red Hook":
    "Milk & Honey, 2003: rye, Punt e Mes and maraschino, a Manhattan-Brooklyn hybrid that kicked off the great Brooklyn-neighborhood naming spree (Greenpoint, Bensonhurst, Bushwick all followed). Two bottles swapped, a whole family founded.",
  "Greenpoint":
    "Milk & Honey's answer to the Red Hook, a few years on: yellow Chartreuse takes the maraschino's chair beside rye and sweet vermouth. Softer-spoken than its sibling, herbal where the Red Hook is fruity.",
  "Little Italy":
    "Pegu Club, mid-2000s: a Manhattan with Cynar muscling in for part of the vermouth, artichoke-leaf bitterness under rye. Named for the neighborhood the drink tastes like.",
  "Black Manhattan":
    "San Francisco's Bourbon & Branch, around 2005, replaced the Manhattan's vermouth entirely with Averna. The amaro's cola-and-herb darkness made it the gateway riff of the amaro decade.",
  "Final Ward":
    "A rye rewrite of the Last Word, lemon replacing lime to flatter the whiskey, named as a farewell drink on leaving Death & Co in 2008. The pun is the timestamp.",
  "White Negroni":
    "Bordeaux, 2001: a visiting bartender stuck without Campari or sweet vermouth rebuilt the Negroni from the French shelf: gin, Lillet Blanc, and gentian-bitter Suze. The accident became a modern standard and gave pale, floral bitterness its flagship.",
  "Trinidad Sour":
    "A dare of a drink from the late 2000s: a full ounce and a half of Angostura bitters as the BASE, balanced by orgeat, lemon and a little rye. It shouldn't work; it's magnificent; it costs your bar a fortune in bitters.",
  "Amaretto Sour":
    "A 1970s bottle-driven crowd-pleaser famously rehabilitated in 2012: cask-proof bourbon stiffening the amaretto, lemon, and egg white for silk, published under the modest headline that this is the best one in the world. It might be.",
  "New York Sour":
    "A whiskey sour with a float of dry red wine laid over the top like a sunset, a special effect dating to the 1880s, when Chicago bartenders poured it as the Continental Sour. Drink through the float; never stir it away.",
  "Gin Basil Smash":
    "Le Lion, Hamburg, 2008: a gin sour muddled with a fistful of fresh basil, shaken to a startling green. It crossed the Atlantic in about a season: the fastest-spreading European cocktail of its generation.",
  "Porn Star Martini":
    "A 2002 London creation: vanilla vodka and passion fruit, served with a sidecar shot of chilled champagne. It became Britain's most-ordered cocktail. The name was pure provocation; the drink outlived the blushes.",
  "Garibaldi":
    "Campari and orange juice, named for the unifier of Italy: bitter north, sweet south in one glass. The revival at New York's Dante made 'fluffy' juice the point: fresh oranges aerated to foam, turning a two-ingredient highball into a craft object.",
  "Siesta":
    "Flatiron Lounge, 2006: a tequila sour that borrows the Hemingway Daiquiri's grapefruit and adds a Campari bite. One of the drinks that taught tequila and Italian bitters to get along.",
  "Division Bell":
    "From the agave temple Mayahuel, 2009: mezcal, Aperol, maraschino, lime, a Last Word rewired for smoke. Named for the Pink Floyd record.",
  "Kentucky Buck":
    "A strawberry-and-ginger bourbon buck out of San Francisco's Rickhouse, around 2010, a farmers-market drink with a whiskey backbone, and one of the most copied specs of the 2010s.",
  "Chartreuse Swizzle":
    "Early-2000s San Francisco put green Chartreuse (110 proof, 130 herbs) at the base of a crushed-ice swizzle with pineapple, lime and falernum. The monks' liqueur had waited 400 years for a tiki vacation.",
  "Left Hand":
    "Milk & Honey: a Boulevardier that swapped in mole bitters: chocolate and chile murmuring under bourbon, Campari and sweet vermouth. Stirred proof that one dasher bottle can re-season a whole template.",
  "Bitter Giuseppe":
    "Chicago's Violet Hour: Cynar out front for once, sweet vermouth behind it, a little lemon, and six dashes of orange bitters to lift it. A drink built low and bitter, for the end of the shift.",
  "Enzoni":
    "Another Milk & Honey classic: a Negroni that collided with a sour: muddled fresh grapes, lemon, gin and Campari. The grapes do the vermouth's job, juicier and stranger.",
  "Jasmine":
    "1990s California: gin, Campari, Cointreau and lemon that conspire to taste exactly like fresh grapefruit juice, the canon's best magic trick. Named for a friend, not the flower.",
  "Fitzgerald":
    "A Rainbow Room-era gin sour seasoned with Angostura, proof from the craft revival's birthplace that sometimes the riff is just two dashes. Named for the author, appropriately elegant.",
  "Juliet & Romeo":
    "The Violet Hour, 2007: gin, mint, cucumber and a ghost of rose water, a drink engineered to be beautiful, served with three droplets of bitters like a signature. Chicago's most romantic spec.",
  "Water Lily":
    "From New York's Little Branch school: gin, crème de violette, orange liqueur and lemon in equal parts, the Aviation's violet made structural instead of decorative. Pale purple, served up, gone in four sips.",
  "Vieux Mot":
    "The Last Word template run through the elderflower boom of the late 2000s: gin, St-Germain, lemon. The name, 'old word', is the joke, and the drink converted a thousand skeptics of 'bartender's ketchup.'",
  "Art of Choke":
    "From The Violet Hour: rum and a heavy pour of Cynar with mint, lime and a whisper of green Chartreuse, an artichoke tiki drink, which should be impossible. The name commits to the bit.",
  "Rome with a View":
    "A Milk & Honey daytime drink: Campari and dry vermouth given a sour's lime-and-sugar structure and a soda top. Bitter, bone-dry, and low-proof enough to have two with lunch like a civilized person.",
  "Kingston Negroni":
    "Death & Co, 2009, poured Smith & Cross (Jamaica's funkiest navy-strength rum) into the Negroni's gin seat. Hogo meets bitter; nobody involved apologizes.",
  "Brancolada":
    "Brooklyn's Donna: a Piña Colada with Branca Menta bullying its way in, menthol and bitter herbs cutting through coconut cream. The industry's favorite dessert it pretends is ironic.",
  "Benton's Old Fashioned":
    "PDT, 2007: bourbon fat-washed with Benton's bacon, maple syrup for the sweet. The drink that put fat-washing on every craft menu and made 'bacon cocktail' a sentence bartenders had to endure for a decade.",
  "Conference":
    "A Death & Co statement piece: an Old Fashioned whose base is a four-way summit: rye, bourbon, cognac and calvados splitting two ounces. The name is exactly what's happening in the glass.",
  "Gin Gin Mule":
    "A Mojito crossed with a Moscow Mule (gin, mint, lime, house ginger beer) as a gateway drink for vodka drinkers, around 2000. It converted them by the thousands and became the New York craft era's calling card.",
  "Cable Car":
    "The Starlight Room atop San Francisco's Sir Francis Drake, 1996: spiced rum, orange curaçao and lemon under a cinnamon-sugar rim: 'between the stars and the cable cars.' A Sidecar that moved west.",
  "Bourbon Renewal":
    "Early 2000s Oregon: bourbon, lemon, and crème de cassis over cracked ice, a whiskey sour in blackcurrant velvet. Named like an urban-planning initiative, drinks like a porch swing.",
  "Eastside":
    "The Southside's cucumber cousin from the 2000s New York school (gin, mint, cucumber, lime), attribution as blurry as most bar inventions. It became the modern shorthand for 'refreshing gin drink' on menus everywhere.",
  "Nuclear Daiquiri":
    "London, 2005: overproof Jamaican rum, green Chartreuse, falernum and lime, a Daiquiri wearing a hazmat suit. The name is a fair warning; the balance, improbably, holds.",
  "Mezcal Negroni":
    "The simplest possible smoke swap (mezcal for gin, everything else untouched) and one of the first moves every bar made when good mezcal arrived. The Campari picks a fight with the smoke; they end the night friends.",
  "Spicy Margarita":
    "The 2010s' most-ordered modification: jalapeño or serrano heat muddled or infused into the standard Margarita math. Now so universal it's effectively canon: control the heat at the infusion stage, not the muddle, if you value consistency.",
  "Clarified Milk Punch":
    "An 18th-century preservation trick (citrus curdles warm milk, the curds get filtered out and take the harshness with them), leaving a clear, silky, shelf-stable punch; a founding father left a recipe. The craft era revived it as its favorite show-off project.",
  "Cynar Julep":
    "The julep template surrendered to the amaro shelf: crushed ice, mint, and artichoke-leaf bitterness where the bourbon monoculture used to be. Lower proof, higher intrigue, deeply sessionable.",
  "Bitter Mai Tai":
    "A tiki-amaro handshake from the early 2010s: a Mai Tai where Campari joins funky Jamaican rum at the base. It reads like a dare and drinks like an inevitability, the Jungle Bird's ambitious nephew.",

  /* ---- Tier 5: Tiki & Tropical ---- */
  "Zombie":
    "Don the Beachcomber's 1934 flagship: three rums, falernum, grenadine, lime, absinthe and the coded 'Don's Mix', so potent the menu limited guests to two. The bar kept the recipe in cipher to foil poaching bartenders; a modern historian spent years decoding it, and tiki archaeology was born.",
  "Painkiller":
    "Born at the Soggy Dollar Bar on Jost Van Dyke (no dock; you swim in, hence the name of the bar and the wet money) in the early 1970s. Pusser's trademarked the drink for its navy rum, one of the only cocktails owned by a brand: rum, pineapple, orange, coconut, and a snowfall of nutmeg.",
  "Hurricane":
    "Pat O'Brien's, New Orleans, 1940s: the story goes that wartime whiskey was scarce and distributors made bars buy surplus rum by the case, and this passion-fruit red giant, served in a hurricane-lamp glass, solved the inventory problem. Bourbon Street has never recovered.",
  "Navy Grog":
    "Don the Beachcomber's tribute to the Royal Navy's daily rum ration, civilized with three rums, grapefruit, lime and honey, famously served with an ice cone frozen around the straw. Its best-documented devotee was an American president, who drank his at the Washington Trader Vic's.",
  "Three Dots and a Dash":
    "Don the Beachcomber's WWII victory drink, the name is Morse code for V, built on rhum agricole and aged rum with falernum, allspice and honey, garnished with three cherries and a pineapple stick spelling out the signal. Patriotism, in crushed ice.",
  "Saturn":
    "A 1967 competition winner and tiki's great gin exception: gin with passion fruit, lemon, orgeat and falernum. Proof the tropical canon didn't have to run on rum; it just usually wanted to.",
  "Fog Cutter":
    "Trader Vic's kitchen-sink of a drink: rum, gin AND brandy over orgeat and citrus, with a sherry float. The bar's own menu warning did the marketing: 'Fog Cutter? Hell, after two of these, you won't even see the stuff.'",
  "Scorpion":
    "Trader Vic's communal bowl: rum, brandy, orgeat, citrus, served with long straws and bad intentions, descended from a Hawaiian 'Scorpion' punch the bar encountered in the 1930s. The gardenia floating in the middle never saved anyone.",
  "Missionary's Downfall":
    "Don the Beachcomber's blended heresy: white rum, fresh mint, pineapple, peach and honey whipped into a pale green frost. The name tells you exactly what it was designed to do to the virtuous.",
  "Queen's Park Swizzle":
    "The Queen's Park Hotel, Port of Spain, Trinidad, 1920s: demerara rum swizzled through crushed ice with mint and lime, then a heavy Angostura float staining the top like a storm front. Trader Vic's called it 'the most delightful form of anesthesia given out today.'",
  "Corn 'n' Oil":
    "Barbados's black blend: blackstrap rum poured over falernum and lime until it sits dark and slick as motor oil: the name is the picture. Velvet Falernum is Bajan; so is the drink's unhurried attitude.",
  "Hotel Nacional Special":
    "The house drink of Havana's grand Hotel Nacional, 1930s: golden rum with pineapple, lime and a kiss of apricot liqueur. The Gentleman's Companion collected it, which is how half the old Cuban canon survived.",
  "Beachcomber":
    "A Daiquiri that went on vacation: white rum, lime, triple sec and a bare spoon of maraschino, named for Don the Beachcomber's whole invented persona. Shake it hard and serve it colder than the story.",
  "Royal Bermuda Yacht Club":
    "The club's namesake cocktail from the 1930s: Barbados rum, lime, falernum and a touch of orange liqueur, a Daiquiri in a blazer. Trader Vic's printed it; the club still pours it.",
  "Test Pilot":
    "Don the Beachcomber's circa-1941 experiment (two rums, falernum, Cointreau, absinthe and bitters) that became tiki's most productive airframe: the Jet Pilot and half a dozen other drinks are direct modifications of this spec.",
  "Jet Pilot":
    "The Luau in Beverly Hills, 1958: the Test Pilot rebuilt for the jet age with three rums, cinnamon and grapefruit, faster, hotter, meaner. Tiki's arms race in a single upgrade.",
  "Ancient Mariner":
    "A 1994 creation in the old Navy Grog style: dark and demerara rums, allspice dram, grapefruit and lime, named for the cursed sailor of The Rime of the Ancient Mariner. The revival era proving it could build new hulls, not just salvage wrecks.",
  "Port Light":
    "The rare bourbon tiki drink, mid-century vintage: whiskey with passion fruit, lemon and grenadine, sometimes crowned with honey foam. A port light is the red lamp on a ship's left side: the drink glows the same color.",
  "Suffering Bastard":
    "Shepheard's Hotel, Cairo, 1942: gin AND brandy with ginger beer and bitters, invented as a hangover cure for officers during the battle of El Alamein; legend says jerry-cans of it went to the front. The name was the customers' self-diagnosis.",
  "Singapore Sling":
    "Created at Raffles Hotel's Long Bar, credited to its head bartender around 1915, a gin sling blushed pink with cherry brandy, supposedly so ladies could drink discreetly at tea. The 'original' recipe was lost and reconstructed decades later, which every tiki historian delights in pointing out.",
  "Planter's Punch":
    "Jamaica's foundational rhyme ('one of sour, two of sweet, three of strong, four of weak'), old enough that its true origin is folklore. Every estate, hotel and grandmother has the correct version, and they all disagree.",
  "Bahama Mama":
    "The cruise-port standard: two rums (one of them coconut), pineapple and orange under a grenadine sunset. Nobody owns it, everybody pours it, and on the right beach it is exactly perfect.",
  "Blue Hawaii":
    "The Hilton Hawaiian Village, 1957: asked by a Bols salesman to use their blue curaçao, the head bartender built the drink that made 'blue' a flavor. The same bar claims to have invented putting the paper parasol and the orchid in drinks. A one-room garnish revolution.",
  "Rum Runner":
    "Holiday Isle Tiki Bar, Islamorada, Florida Keys, 1970s: legend says a surplus of banana liqueur and blackberry brandy needed moving, and the solution got named for the Prohibition boatmen who ran the same waters. Inventory management has rarely tasted better.",
  "Chi Chi":
    "A Piña Colada with vodka in the rum's chair: the 1960s tourist circuit's answer for guests who wanted the beach without the molasses. The name is period slang for 'fancy.'",
  "Doctor Funk":
    "Named for Samoa's actual physician (he attended the author of Treasure Island), whose 'medicinal' prescription of absinthe, lime and grenadine with soda became a South Seas legend the tiki temples embalmed in rum.",
  "Cobra's Fang":
    "Don the Beachcomber, late 1930s: overproof and gold rums with falernum, fassionola and lime, served in a coiled-snake mug. One of the specs the revival had to reconstruct from ex-employees' notebooks: the fang had nearly bitten its last.",
  "151 Swizzle":
    "Don the Beachcomber's deceptively small dose of 151-proof demerara, swizzled with falernum, lime and bitters into a frosted metal cup, dusted with nutmeg. Served short because anything taller would be irresponsible even by tiki standards.",
  "Nui Nui":
    "Don the Beachcomber's spice cabinet in a glass: aged rum with cinnamon, allspice, vanilla and citrus. 'Nui' is Polynesian for 'big'; doubled, it's a promise the drink keeps quietly.",
  "Halekulani":
    "The house cocktail of Waikiki's 'House Befitting Heaven' hotel, 1930s: whiskey, unusual for the islands, with citrus, grenadine and bitters, shaken and served with the sunset. Old Hawaii before the jets arrived.",
  "Shrunken Skull":
    "A Beachcomber-era classic of brutal simplicity: two rums, grenadine and lime, served in a skull mug because tiki understood theater. The red color and the name do the rest of the work.",
  "Tradewinds":
    "A Caribbean cooler built on rum and coconut cream with apricot liqueur and lemon: obscure enough that sources argue over its home island, which is the most Caribbean provenance possible.",
  "Yellow Bird":
    "Named for the calypso standard, a Jamaican beach-bar staple: rum, Galliano, triple sec and lime. The song was everywhere in 1961; the drink stayed on the beach where it belongs.",
  "Goombay Smash":
    "Miss Emily's Blue Bee Bar, Green Turtle Cay, Bahamas: a teetotaler's tavern where the house's secret rum-coconut-pineapple-apricot smash became a pilgrimage drink. The family still guards the exact proportions.",
  "Coconaut":
    "The modern-tiki minimalist statement: overproof Jamaican rum, coconut cream, lime: a Daiquiri that went feral on a desert island. Three ingredients, no garnish parade, all engine.",
};

/* extend LORE in place: tiers 6–12 continue below */
Object.assign(LORE, {
  /* ---- Tier 6: The Golden Age & Prohibition ---- */
  "Bijou":
    "An 1890s jewel box out of the great bar manuals, built on gin, sweet vermouth and green Chartreuse, each standing for a gem: diamond, ruby, emerald. The rare survivor of the era's liqueur-heavy style that modern palates still forgive, because the Chartreuse earns it.",
  "Tuxedo":
    "The Tuxedo Club of Tuxedo Park, New York, the place that named the dinner jacket, also left a Martini variant dressed with maraschino, orange bitters and an absinthe whisper. Formal wear, liquid edition.",
  "Alaska":
    "Gin and yellow Chartreuse, nothing else structural, a 'cocktail' by 1900s standards and a dare by ours. The Savoy Cocktail Book's note insisted it was no Eskimo staple but a South Carolina invention; the cold name stuck anyway.",
  "Bronx":
    "The Waldorf-Astoria's bar claimed it, allegedly named after a visit to the new Bronx Zoo because customers kept describing the strange animals they saw when drinking. A Perfect Martini with orange juice, it was once America's third-most-famous cocktail before fresh-juice logistics killed it.",
  "Income Tax":
    "A Bronx with bitters, named, with gallows humor, for the new American levy. The joke aged better than the drink's fame: you pay a little more, you get a little more.",
  "Ward 8":
    "Boston, 1898, Locke-Ober's bar, by most tellings, built to toast a ward boss's election win in the city's Eighth Ward: a whiskey sour rouged with grenadine and orange. The honoree, a temperance man, reportedly hated having a drink named for him, which improves the story.",
  "Jack Rose":
    "Applejack, lemon and grenadine: pre-Prohibition New Jersey's great gift, famous enough that Jake Barnes drinks one in The Sun Also Rises. The name's origin (a gangster? the rose color? a bartender?) is a permanent bar argument, which is half its charm.",
  "Pegu Club":
    "The house cocktail of the British officers' club outside Rangoon: gin, orange curaçao, lime and two kinds of bitters, colonial refreshment engineered for heat. A seminal New York bar took its name a century later, closing the loop.",
  "Twentieth Century":
    "Named for the 20th Century Limited, the glamour train from New York to Chicago, in 1937: gin, Lillet, lemon, and white crème de cacao, the spec's famous surprise. It tastes like an Art Deco poster looks.",
  "Monkey Gland":
    "Harry's New York Bar's 1920s Paris headline-grab: gin, orange juice, grenadine and absinthe, named for the genuinely real monkey-gland rejuvenation surgeries then scandalizing Europe. The drink outlived the science, mercifully.",
  "Mary Pickford":
    "Prohibition-era Havana, built for the silent-film star while Hollywood drank out its exile in Cuba: white rum, pineapple, grenadine, maraschino. Sweet, blushing, and stronger than it lets on, a fair portrait of the era's stardom.",
  "El Presidente":
    "Havana's aristocrat of the 1920s, toasted to a succession of Cuban presidents: white rum, blanc vermouth, orange curaçao and a grenadine tint. The blanc vermouth is the secret most modern remakes miss; dry vermouth wrecks it.",
  "Between the Sheets":
    "A Sidecar with white rum crashing the cognac's party, from Harry's New York Bar in the Paris of the 1920s. The name was the point: Prohibition-era drinking was flirtation by other means.",
  "Blood and Sand":
    "Named for a 1922 bullfighter film: scotch, sweet vermouth, cherry brandy and orange juice in equal parts: on paper a catastrophe, in the glass a strange velvet. One of the only classic cocktails built on scotch, and the best argument that rules are guidelines.",
  "Scofflaw":
    "In 1924 a Boston contest coined 'scofflaw' for those who drank in defiance of Prohibition; within weeks Harry's New York Bar in Paris had a cocktail mocking the whole affair: rye, dry vermouth, lemon, grenadine. Journalism has never moved faster.",
  "Brooklyn":
    "The Manhattan's overshadowed sibling, circa 1908: rye, dry vermouth, maraschino and Amer Picon, the French bitter that vanished from America, orphaning the drink for decades. The craft revival rebuilt it with substitutes and then named half the borough's neighborhoods in apology.",
  "Algonquin":
    "Named for the hotel whose Round Table drank through the 1920s: rye, dry vermouth and pineapple juice, an odd trio that reads like one of the Round Table's kinder reviews. Best very cold, like the wit.",
  "Chrysanthemum":
    "The Savoy's gentlest classic: dry vermouth led, Bénédictine following, absinthe perfuming, no base spirit at all. A low-proof drink from an age that didn't have the phrase, perfect for the first round or the last.",
  "Bamboo":
    "Credited to Yokohama's Grand Hotel in the 1890s: sherry and dry vermouth with bitters, a cocktail with no spirit, built for a port city's long afternoons. Japan's first great contribution to the canon, a century before its bartenders conquered the craft.",
  "Adonis":
    "Named for the 1884 Broadway musical that ran a then-record 603 performances: sweet vermouth and sherry with orange bitters, the Bamboo's rosier twin. Proof the 1880s understood session drinking better than we do.",
  "Coronation":
    "A family of drinks raised for royal occasions; the standard bearer is sherry and dry vermouth with maraschino and bitters. The empire made drinks the way it made stamps, commemoratively.",
  "Diamondback":
    "Rye, applejack and yellow Chartreuse: a Baltimore hotel lounge special from the 1940s named for the local terrapin, revived by the craft era as one of the strongest stirred drinks in the book. Handle accordingly.",
  "Widow's Kiss":
    "New York, 1895: calvados, Bénédictine and yellow Chartreuse, autumn distilled, monastic and sweet, with a name straight out of a Victorian novel. The 19th century's best after-dinner drink, still barely improved upon.",
  "Japanese Cocktail":
    "The Bar-Tender's Guide, around 1860: cognac, orgeat and bitters, likely named for the first Japanese diplomatic mission then touring America: nothing Japanese in the glass, everything Japanese in the timing. One of the first cocktails ever named for a news event.",
  "East India":
    "A colonial trade-route cocktail from the 1880s: cognac with curaçao, pineapple, maraschino and bitters: the whole cargo manifest in one glass. Rich as the company it was named for.",
  "Brandy Crusta":
    "New Orleans, 1850s: cognac with curaçao, lemon and bitters in a glass fully lined with a citrus peel and crusted with sugar: the garnish AS architecture. The Sidecar and the Margarita are its great-grandchildren.",
  "Improved Whiskey Cocktail":
    "The 1870s 'improvement' on the original spirit-sugar-bitters formula: add maraschino and absinthe. The name is a fossil of the exact moment cocktails began to evolve, and the drink the Old Fashioned crowd was protesting against.",
  "Morning Glory Fizz":
    "A scotch fizz with absinthe and egg white from the 1880s, prescribed unapologetically as breakfast: the era's hangover medicine drawer in a small cold glass. Modern brunch has no idea how tame it is.",
  "Rattlesnake":
    "The Savoy's rye-absinthe-egg-white sour, with its immortal footnote: so called because 'it will either cure rattlesnake bite, or kill rattlesnakes, or make you see them.' The best cocktail copy ever written.",
  "Seelbach":
    "Louisville's 'lost 1917 hotel classic' (bourbon, Cointreau, two full teaspoons of bitters, champagne) was actually invented in 1995 by the hotel's restaurant director, who confessed the hoax in 2016 after decades in respected cocktail books. Now it's famous twice: once as history, once as the craft world's favorite con.",
  "Boothby":
    "A San Francisco bartender crowned a Manhattan with a champagne float and modestly named it for himself, around 1900. Politician, author, bartender: the champagne was the least of his self-promotion.",
  "Deshler":
    "A rye-and-Dubonnet curiosity from the early 1900s, named for a prizefighter, heavy on Peychaud's and orange peel. One of those drinks the craft revival keeps rediscovering and re-forgetting on a five-year cycle.",
  "Leap Year":
    "Built at the Savoy for February 29, 1928 (gin, Grand Marnier, sweet vermouth, lemon) and claimed to be 'responsible for more proposals than any other cocktail that has ever been mixed.' Order accordingly, or defensively.",
  "Satan's Whiskers":
    "The Savoy's gin-vermouth-orange number in two official states: 'straight' with Grand Marnier, 'curled' with orange curaçao. Any drink whose variations are anatomical descriptions of the devil's grooming deserves its survival.",
  "Old Pal":
    "Harry's New York Bar credited a Paris sportswriter whose greeting for everyone was 'old pal'. Rye, dry vermouth, Campari: the Boulevardier's leaner, drier drinking buddy from the same 1920s barroom.",
  "Pink Lady":
    "A 1910s gin sour blushed with grenadine and silked with egg white, later burdened by decades of 'ladies' drink' condescension it never deserved: made honestly, it's a Clover Club cousin with applejack backbone in the better specs.",
  "Corpse Reviver #1":
    "The Savoy's morning drink nobody orders: cognac, calvados and sweet vermouth: The Savoy Cocktail Book prescribed it 'before 11 a.m., or whenever steam and energy are needed.' The #2 got the fame; the #1 got the authenticity.",
  "Casino":
    "Old Tom gin with maraschino, orange bitters and lemon, the Aviation's older cousin without the violette, from the 1900s. A reminder that most 'lost classics' are four familiar bottles in an unfamiliar order.",
  "Delmonico":
    "Named for the New York restaurant that invented American fine dining: gin and cognac splitting the base over both vermouths, a Perfect Martini with a brandy accent, as expense-account as its address.",
  "Fourth Degree":
    "A heavier Martini variant (gin, both vermouths, absinthe) named in the Masonic style of the era's clubland. The fourth degree, appropriately, is where the initiations stop being gentle.",

  /* ---- Tier 7: Highballs, Spritzes & Party Calls ---- */
  "Cuba Libre":
    "Havana, circa 1900, as the story goes: an American soldier toasted 'Por Cuba libre!' with the occupation's two imports, Coca-Cola and rum, over ice with lime. History's most successful three-ingredient diplomacy; the lime is what separates it from a mere rum and Coke.",
  "Greyhound":
    "Vodka (originally gin) and grapefruit juice, on menus since the 1930s, allegedly named for the bus-terminal restaurants that served it. Cheap transit, honest drink.",
  "Salty Dog":
    "A Greyhound with a salt rim, and the salt is doing real chemistry, taming grapefruit's bitterness rather than seasoning it. The rare garnish that's actually an ingredient.",
  "Sea Breeze":
    "Vodka, cranberry and grapefruit: the flagship of the cranberry cooperative's brilliant postwar campaign to make juice a cocktail category. Ocean Spray did more for vodka highballs than any bartender.",
  "Bay Breeze":
    "The Sea Breeze gone tropical: pineapple replacing grapefruit against the cranberry. Same beach, sweeter postcard.",
  "Cape Codder":
    "Vodka-cranberry with a lime squeeze, named for the bogs that grew it: the base model of the whole cranberry family and a masterclass in how marketing builds a canon.",
  "Madras":
    "Vodka, cranberry and orange, named for the bleeding madras plaid its layers resemble, a 1970s preppy uniform in a glass.",
  "Screwdriver":
    "Vodka and orange juice, legendarily named for American oil workers in the Persian Gulf stirring it with the nearest tool. It carried vodka through the 1950s the way the Mule carried it through the 40s.",
  "Harvey Wallbanger":
    "A Screwdriver with a Galliano float, pushed to fame by one of the great 1970s marketing campaigns: a sandal-wearing surfer mascot named Harvey banging into walls. The ad campaign is the origin story; anything earlier is legend.",
  "Tequila Sunrise":
    "The modern grenadine-sinking version came from Sausalito's Trident in the early 1970s, went on tour with the Rolling Stones, and got an Eagles song, but the original 1930s Agua Caliente version ran on crème de cassis and soda. Two sunrises, same tequila.",
  "Long Island Iced Tea":
    "A bartender at the Oak Beach Inn on Long Island claims he invented it for a 1972 contest; a rival story credits a Tennessee community called Long Island in the 1920s. Either way: five white spirits conspiring to taste like iced tea, and the most efficient drink in the book at what it does.",
  "Whiskey Highball":
    "The 1890s drink that named the entire category: whiskey and soda in a tall glass, possibly named for the railroad ball signal for 'proceed at speed.' Japan later perfected it into a ritual of ice, ratio and reverence; the drink rewards that respect.",
  "Presbyterian":
    "Whiskey with ginger ale AND soda splitting the top, drier than a ginger highball, named (the joke goes) for drinkers who wanted their whiskey with plausible moderation.",
  "Horse's Neck":
    "The whole lemon peel cut in one unbroken spiral, hooked over the rim like its namesake. Originally a soft drink, whiskey climbed in around 1910. The garnish IS the drink's identity; everything else is bourbon and ginger ale.",
  "Mamie Taylor":
    "Scotch, lime and ginger beer, a smash hit of 1899 named for a Broadway soprano: briefly as famous as she was, then forgotten with her. The Moscow Mule is this drink wearing vodka's postwar suit.",
  "El Diablo":
    "Trader Vic's, 1940s: tequila and crème de cassis under ginger beer and lime, devil-red and one of the first respectable tequila drinks in print. The bar got there twenty years before the margarita boom.",
  "Gin Rickey":
    "Shoomaker's bar, Washington D.C., 1880s, named for a Washington lobbyist who drank his with bourbon and famously despised sugar in drinks. Gin took over the spec: lime, soda, no sweetener, no apologies, the driest drink in the canon.",
  "Ranch Water":
    "West Texas folk spec: blanco tequila, lime, and Topo Chico: ideally drunk from the Topo bottle with a swallow poured out to make room. It resisted attribution for decades because nobody in Far West Texas thought it needed a name.",
  "Batanga":
    "La Capilla in Tequila town has poured it since 1961: tequila, Coke, lime, salt rim, stirred with the same knife used to cut the limes, which regulars swore was the actual secret ingredient. The most beloved dive-bar spec in Mexico.",
  "Hugo Spritz":
    "A South Tyrolean bartender invented it in 2005 with lemon balm syrup, prosecco, mint and soda; elderflower took over when the lemon balm proved hard to source, and it was reportedly almost named Otto. It conquered the Alps, then the Aperol-fatigued world.",
  "Limoncello Spritz":
    "The Amalfi lemon liqueur lengthened with prosecco and soda, a spritz that tastes like the postcard looks. Serve it very cold; limoncello warm is a different and worse drink.",
  "Negroni Sbagliato":
    "Bar Basso, Milan, 1972: a bartender reached for the gin and grabbed sparkling wine instead: 'sbagliato' means 'mistaken.' The error became the house drink, and fifty years later a viral video made it the world's mistake too.",
  "Tinto de Verano":
    "Spain's actual summer drink while tourists order sangria: red wine and lemon soda over ice. 'Summer red wine': the name is the recipe, and the humility is the point.",
  "Kalimotxo":
    "Basque country, famously codified at a 1972 fiesta in Algorta when the wine turned out bad and cola hid the evidence: half red wine, half cola, over ice. It sounds like vandalism and drinks like a secret.",
  "Michelada":
    "Mexico's beer cocktail (lime, salt, hot sauce and often clamato in the beer) with an origin claimed by (among others) a San Luis Potosí sports club member whose first name the drink supposedly wears. 'Mi chela helada': my cold beer. The cure and the party in one glass.",
  "Shandy":
    "Beer and lemonade (or ginger beer, the Victorian 'shandygaff'), the drinking world's oldest compromise between refreshment and responsibility. Germany's Radler ('cyclist') was allegedly invented for thirsty riders; every culture reinvents the compromise because every culture needs it.",
  "Pimm's Cup":
    "An 1840s London oyster-house digestif, Pimm's became the drink of English summer, the No. 1 gin cup under lemonade with a garden of cucumber, strawberry and mint. New Orleans's Napoleon House adopted it and made it a Creole institution; both cities claim the ideal pour.",
  "Bellini":
    "Harry's Bar, Venice, 1948: white peach purée and prosecco, named for the painter whose saints wear that exact sunrise pink. Fresh white peaches or nothing: yellow peaches from a can are a different drink wearing the name.",
  "Mimosa":
    "The Ritz Paris, 1920s, named for the yellow flower: champagne and orange juice, the Buck's Fizz of 1921 London made slightly more French and slightly less champagne-heavy. Brunch's load-bearing column.",
  "Kir Royale":
    "Dijon's hero-priest mayor pushed his region's blackcurrant liqueur into white wine at every civic reception until the drink took his name; champagne promoted it to Royale. Politics has produced few better legacies.",
  "Death in the Afternoon":
    "A novelist's contribution to a 1935 celebrity cocktail book: absinthe topped with champagne, with instructions to 'drink three to five of these slowly', advice no one should take from that source. Named for his bullfighting book; drinks like the six o'clock shadow of one.",
  "Kamikaze":
    "Vodka, triple sec and lime in equal parts: the 1970s disco-era shot-and-cocktail that is, structurally, a vodka Margarita nobody salutes. Made fresh and cold it's honestly good, which surprises everyone involved.",
  "Lemon Drop":
    "A fern-bar San Francisco creation of the 1970s: vodka, fresh lemon and sugar with a sugared rim, the sour rebuilt for the vodka age. The candy came later; the drink was always better than its reputation.",
  "Green Tea Shot":
    "Contains no green tea: Jameson, peach schnapps, sour and a splash of lemon-lime, a 2000s whiskey-marketing triumph named for its color. The bar's most successful bait-and-switch since the Monkey Gland.",
  "Sex on the Beach":
    "The peach-schnapps boom of the 1980s produced it (vodka, peach, orange and cranberry) and spring break named it. A drink engineered to be ordered out loud, which was always the actual product.",
  "Fuzzy Navel":
    "Peach schnapps and orange juice, coined in the mid-1980s when DeKuyper's Peachtree launched: the 'fuzzy' is the peach, the 'navel' the orange, and the name did more sales work than the recipe.",
  "Blue Lagoon":
    "Harry's New York Bar in the 1960s, showcasing the new blue curaçao: vodka, lemon, and that swimming-pool color. The bar's second act went technicolor.",
  "Midori Sour":
    "Midori launched at Studio 54 in 1978, the melon liqueur's electric green was disco lighting in a bottle, and the sour became its vehicle. Fresh lemon rescues it from the sour-mix decades; the color needs no rescue.",
  "Kentucky Mule":
    "The Moscow Mule's bourbon passport: whiskey warms what vodka left neutral, and the ginger bites back. Same copper mug, better conversation.",
  "Mexican Mule":
    "Tequila in the mule's saddle: agave and ginger being natural allies. Add a pinch of salt and it converses with the Paloma across the bar.",
  "Irish Mule":
    "The mule ridden by Irish whiskey: soft, cereal-sweet, and the gentlest of the mule family. A gateway ginger drink for the whiskey-shy.",
  "Gin Buck":
    "The buck (spirit, citrus, ginger) predates the Mule by decades; the gin version was Prohibition's friend because ginger ale forgave bathtub gin almost anything. The Mule is just this drink with better postwar marketing.",
  "John Collins":
    "The Tom Collins's whiskey brother: by most tellings the ORIGINAL Collins, named for a London headwaiter, before Old Tom gin stole the family name. Bourbon, lemon, sugar, soda: a sour with its collar open.",
  "Whiskey Ginger":
    "The two-ingredient handshake of every neighborhood bar: whiskey and ginger ale doing more work with less ceremony than half the canon. The upgrade path is real ginger beer and a real lime.",
  "Chelada":
    "The michelada's minimalist parent: cold beer, fresh lime, salt, Mexico's argument that a beer cocktail needs exactly three moves. On a hot day it needs none of your improvements.",
  "Adios":
    "Also answering to AMF: the Long Island's electric-blue cousin: four white spirits and blue curaçao under lemon-lime soda. The name is the drink's honest assessment of your evening.",

  /* ---- Tier 8: Dessert, Hot & After-Dinner ---- */
  "Grasshopper":
    "Tujague's, New Orleans. Family lore says it was built for a 1918 New York cocktail contest and took second place: green crème de menthe, white cacao, cream. It became the after-dinner drink of the American mid-century and never left the Gulf South's banquet halls.",
  "Golden Cadillac":
    "Poor Red's, a tiny gold-country roadhouse in El Dorado, California, 1952: legend says a couple celebrating a new gold Cadillac asked for a drink to match: Galliano, white cacao, cream. The bar still sells more Galliano than almost anywhere in America.",
  "Pink Squirrel":
    "Bryant's Cocktail Lounge, Milwaukee: crème de noyaux (the pink, almond-flavored one) with white cacao and cream. Wisconsin kept the flame for the ice-cream-drink tradition; this is its blushing standard-bearer.",
  "Brandy Milk Punch":
    "New Orleans's breakfast tipple with 18th-century roots: brandy shaken with milk, sugar and vanilla, nutmeg over the top: the unclarified, immediate cousin of the clarified antique. Brennan's pours them like coffee.",
  "Mudslide":
    "The Wreck Bar on Grand Cayman, 1970s: vodka, coffee liqueur and Irish cream, a Black Russian that ordered dessert. The blender found it later and never gave it back.",
  "Toasted Almond":
    "Amaretto, coffee liqueur and cream, the suburban after-dinner standard of the 1970s cordial boom. Add vodka and it's 'roasted'; either way it's pie in a rocks glass.",
  "Black Russian":
    "Brussels's Hôtel Métropole, 1949, built it for the American ambassador to Luxembourg, famed as Washington's 'hostess with the mostest': vodka and coffee liqueur, named for the color and the spirit's supposed homeland. Cream came along in the 1960s and stole the fame, but the parent drink is the cleaner nightcap.",
  "Bushwacker":
    "Born at the Ship's Store & Sapphire Pub on St. Thomas in 1975, adopted so hard by Pensacola that the Florida panhandle now claims it: a frozen chocolate-coffee-rum milkshake that drinks like a beach vacation's last responsible decision.",
  "Stinger":
    "Cognac and white crème de menthe: high society's nightcap from the 1910s through the Mad Men era, famously drunk by New York's railroad-fortune set as 'the only drink you can take after dinner.' Shaken, traditionally, in defiance of the no-citrus rule: the mint needs the violence.",
  "Rusty Nail":
    "Scotch and Drambuie, the honeyed liqueur allegedly born from a recipe a fugitive Stuart prince left behind. The drink knocked around under various names until the 1960s, when 21 Club patronage and Rat Pack thirst fixed the spec and the name.",
  "Godfather":
    "Scotch and amaretto, surfacing in the early 1970s with a name riding the 1972 film's wave; marketing claimed it was the film star's own drink, a claim exactly as verifiable as it sounds. The formula works regardless of the cinema.",
  "Godmother":
    "The Godfather with vodka in the scotch's chair: smoother, quieter, and arguably more dangerous, like the title suggests.",
  "French Connection":
    "Cognac and amaretto, named for the 1971 film, the Godfather's formula with a French passport. Two bottles, one glass, zero technique: the whole after-dinner genre in miniature.",
  "Chocolate Martini":
    "A 1990s martini-glass-era invention: vodka and chocolate liqueur dressed in cocktail clothes. The craft world sneered for twenty years, then quietly admitted that made with good cacao liqueur and cream it's a Brandy Alexander with a stage name.",
  "Sgroppino":
    "Venice's palate-cleanser-turned-cocktail: lemon sorbet whisked loose with prosecco and a little vodka until it pours like sea foam. Traditionally served between courses; universally finished before the next one arrives.",
  "Spanish Coffee":
    "Huber's Café in Portland, Oregon made it a table-side ritual: a sugared-rim glass, 151 flamed to caramelize the rim, coffee liqueur, coffee, whipped cream. The show is mandatory; Huber's burns through more Kahlúa than any account in the country.",
  "Mexican Coffee":
    "Coffee with tequila or Kahlúa (usually both), sugar and cream: the border cantina's answer to the Irish original. The tequila's earthiness against coffee is an underrated pairing the coffee-cocktail revival keeps rediscovering.",
  "Keoke Coffee":
    "A San Diego creation from the 1960s: brandy, Kahlúa and dark cacao in hot coffee, named for the regular who ordered it, 'Keoke' being the Hawaiian form of George. A steakhouse standard wherever red booths survive.",
  "Hot Buttered Rum":
    "Colonial America's winter medicine: rum, butter, sugar and spice in hot water, descended from England's buttered ales. The butter is the point: it rounds the rum and coats the throat, which 1700s medicine counted as a cure.",
  "Tom & Jerry":
    "Eggnog's frothier cousin, served hot from its own named punch bowl: attributed variously to an 1820s London journalist (whose popular characters were named Tom and Jerry) and, inevitably, to the Bar-Tender's Guide of 1862. Wisconsin and Minnesota never stopped making it; every December the bowls come down.",
  "Eggnog":
    "Descended from the medieval posset through colonial planters with surplus eggs, dairy and rum: a ferociously strong house recipe attributed to the first American president still circulates, and it is stronger than yours. Aging it for weeks (safely, high-proof) transforms it; the carton version is a rumor of the real thing.",
  "Coquito":
    "Puerto Rico's Christmas gift: coconut cream and condensed milk with rum and cinnamon, no eggs in most family specs, and every family's spec is the correct one. Bottles get gifted, hoarded, and judged across generations.",
  "Mulled Wine":
    "Wine heated with spice and citrus: the Romans wrote recipes (conditum), the Victorians codified it, Scandinavia perfected it as glögg with almonds and raisins in the cup. Never boil it; you're warming a drink, not cooking off your investment.",
  "Café Brûlot":
    "Antoine's, New Orleans, circa 1890: brandy, spices and a full orange peel studded with cloves, flamed table-side in a special bowl, then doused with coffee: the restaurant's Prohibition-friendly theater. The most dramatic legal thing you can order in the French Quarter.",
  "Sherry Flip":
    "A whole egg shaken with sherry and sugar, nutmeg over, the flip family's gentlest member, once prescribed to invalids and now the bar's best-kept low-proof secret. Oloroso makes it taste like liquid flan.",
  "Porto Flip":
    "The Bar-Tender's Guide printed it in 1862: port, a little brandy, a whole egg: dessert, protein shake and nightcap in one Victorian gesture. Ruby port for fruit, tawny for caramel; either way, grate the nutmeg fresh.",
  "Alexander":
    "The original was GIN (cacao and cream over London dry, circa 1915) before brandy took the name and the fame. The gin version drinks like chocolate botanicals and deserves its slow rediscovery.",
  "Velvet Hammer":
    "Cointreau, cacao and cream: the late-1960s cordial-lounge special whose name promises exactly what it delivers: soft impact, delayed consequences.",
  "Dirty Banana":
    "The Caribbean resort blender standard: rum, banana, coffee liqueur and cream, Jamaica's poolside answer to the Mudslide. Fresh banana or nothing; the liqueur alone is a confession.",
  "Nutty Irishman":
    "Frangelico and Baileys: hazelnut meets Irish cream, in coffee or over ice. The 1980s liqueur boom's most durable two-bottle handshake.",
  "Snowball":
    "Advocaat, Dutch egg liqueur, with sparkling lemonade and a squeeze of lime: Britain's retro Christmas glass, mocked for decades and revived with sincere affection. It tastes like custard learned to fizz.",
  "Ferrari":
    "Fernet-Branca and Campari, equal parts: the name is the brand portmanteau, the drink is the industry's bitter secret handshake in shot form. Italian engineering: no sugar added, none survives.",
  "Brave Bull":
    "Tequila under coffee liqueur: a Black Russian gone to Jalisco, on record since the 1950s. Add cream and it's a White Bull; add nothing and respect the name.",

  /* ---- Tier 9: Drinks of the World ---- */
  "Caesar":
    "Calgary Inn, 1969: commissioned for an Italian restaurant opening, with the bar mashing the clams into tomato juice by hand; Clamato wouldn't reach Canadian shelves until months later. Canada drinks hundreds of millions a year; the country has formally celebrated Caesar Day. The celery-salt rim is non-negotiable.",
  "Toronto":
    "Fernet-Branca and rye with sugar and bitters, recorded in a 1922 bar book as popular with 'the Canadians of Toronto.' The city took a century to notice it owns a classic; the fernet drinkers always knew.",
  "Brandy Old Fashioned":
    "Wisconsin consumes more brandy than nearly anywhere on earth (a legacy, the story goes, of German settlers and an 1893 World's Fair Korbel stand) and its supper clubs muddle fruit into a Brandy Old Fashioned as the state cocktail. Order it 'sweet' (7-Up) or 'sour' (Squirt); those are the official dialects.",
  "Pisco Punch":
    "The legendary pour at San Francisco's Bank Exchange saloon: pisco, pineapple, lemon and a secret (gum arabic, probably more) its proprietor took to his grave in 1926, closing the recipe with Prohibition. A famous Victorian author praised a San Francisco punch 'compounded of the shavings of cherubs' wings', words near-universally taken to mean the Bank Exchange's. We reconstruct; we don't replicate.",
  "Chilcano":
    "Peru's everyday pisco highball (pisco, lime, ginger ale, bitters) named, the story goes, for a restorative fish broth of similar powers. The Pisco Sour is for visitors; the Chilcano is for Tuesdays.",
  "Piscola":
    "Chile's national reflex: pisco and Coca-Cola, mixed to personal ratio, no further instructions. The drink is a unit of social measurement: parties are planned in piscolas.",
  "Terremoto":
    "Chile again: sweet young pipeño wine with a scoop of pineapple ice cream and a grenadine bleed: named 'earthquake' after the 1985 quake, when a shaken visitor to El Hoyo reportedly declared the drink hit harder. The refill, half-size, is called the aftershock.",
  "Caipiroska":
    "The Caipirinha with vodka standing in for cachaça: Brazil's concession to the international well, muddled the same, forgiven locally on hot enough days.",
  "Batida":
    "Brazil's beach-shack blender family: cachaça whipped with fruit (passion fruit, coconut, lime) and often condensed milk. 'Batida' means 'shaken' or 'beaten'; the coconut version is a national institution.",
  "Rabo de Galo":
    "Brazil's 'rooster's tail', literally 'cocktail' translated: cachaça stirred with sweet vermouth or Cynar, the working man's Manhattan, born when vermouth salesmen met cachaça counters in the 1950s. São Paulo's bar scene has lately dressed it up with pride.",
  "Fernet con Coca":
    "Argentina, especially Córdoba, drinks most of the world's Fernet-Branca, nearly all of it in this: fernet over Coke in a cut-down bottle or tall glass. Nicknamed 'Fernandito,' it is less a cocktail than a citizenship requirement.",
  "Carajillo":
    "Spain spikes espresso with brandy; Mexico rebuilt it on Licor 43 over ice and made it the after-dinner drink of the 2010s. The folk etymology, soldiers taking coffee with 'coraje' (courage), is unproven and universally repeated, as the best etymologies are.",
  "Cantarito":
    "Jalisco's roadside citrus tequila cooler (orange, lime and grapefruit with grapefruit soda and salt) served in a clay cantarito jug that keeps it cold and tastes faintly of rain. The clay is not optional; the clay is the drink.",
  "Vampiro":
    "Tequila with sangrita's spicy tomato-citrus blood and grapefruit soda, Mexico's brunch-red highball, named for what it looks like it drank. Roadside stands sell it in plastic bags with a straw, which is the correct format.",
  "Mexican Firing Squad":
    "The Gentleman's Companion found it at a Mexico City bar in the 1930s and put it in print: tequila, lime, grenadine and bitters, a margarita that chose bitters over orange liqueur. That souvenir became a craft-era darling.",
  "Rebujito":
    "Andalusia's feria fuel: dry fino or manzanilla sherry lengthened with lemon-lime soda over ice, drunk by the pitcher through week-long fairs. Bone-dry sherry plus sweet soda equals dangerous sessionability, which is the entire design brief.",
  "Agua de Valencia":
    "Café Madrid, Valencia, 1959: the bar answered regulars bored of ordering 'Agua de Bilbao', the house's best cava, with cava, gin, vodka and fresh Valencian orange juice. Served by the pitcher, named like a soft drink, built like a delegation of regrets.",
  "Sangria":
    "Iberian wine punch as old as watered wine itself, 'sangría' for the blood-red color, codified for Americans at the 1964 World's Fair Spanish pavilion. The rule every tourist bar breaks: good enough wine, real fruit, and hours of rest before the first pour.",
  "Ti' Punch":
    "Martinique's ritual: rhum agricole, a coin of lime, a spoon of cane syrup, no ice in the traditional order: assembled by the drinker, because 'chacun prépare sa propre mort': each prepares his own death. The French islands' entire philosophy in a four-ounce glass.",
  "Jamaican Rum Punch":
    "The island's standing rhyme made liquid (one of sour, two of sweet, three of strong, four of weak) with Wray & Nephew doing the strong's work and every bar's 'weak' a house secret. Punch as folk memory.",
  "Canchánchara":
    "Trinidad, Cuba's independence-war field ration: aguardiente, honey, lime, drunk by mambí guerrillas, now served to visitors in clay cups in the town that claims it. History you can order.",
  "Wray & Ting":
    "Jamaica's national shorthand: overproof Wray & Nephew white rum and Ting grapefruit soda. Two brand names, one drink, no recipe card required, the island's hi-hat in a glass.",
  "Chu-Hai":
    "Japan's shochu highball, the name contracts 'shochu highball', canned in a hundred flavors and poured fresh in izakayas with real fruit. The lemon sour version is practically a food group in Tokyo.",
  "Somaek":
    "Korea's arithmetic: soju + maekju (beer), poured to personal ratio, often to a chanted count, sometimes bombed glass-into-glass. Less a recipe than a team-building exercise.",
  "Snakebite":
    "Half lager, half cider: a British student institution with a folk reputation for chaos so strong some pubs refuse to pour it. With a blackcurrant dash it becomes the Snakebite & Black, which changes the color and nothing else about the outcome.",
  "Suze Tonic":
    "France's gentian aperitif, whose bottle a Cubist master once painted, lengthened with tonic: two kinds of bitterness agreeing beautifully. The alpine root does what Campari does, but in yellow and in French.",
  "Pastis":
    "Marseille's anise ritual, born in 1932 when the Ricard house commercialized the post-absinthe-ban formula: one part pastis, five parts cold water, poured table-side as it louches to cloud. The dilution is the ceremony; the afternoon is the point.",
  "Lemon Sour":
    "The izakaya standard: shochu, fresh lemon, soda, Japan's working answer to the highball, often with a frozen lemon half in the glass. Tokyo bars compete on lemon prep the way New Orleans competes on Sazeracs.",
  "Porto Tónico":
    "Portugal's summer correction to port's stuffy reputation: white port and tonic with a citrus twist, the Douro's answer to the spritz, drunk by the river that grew it.",
  "Caribou":
    "Québec's winter carnival blood-warmer: red wine fortified with whisky and maple, descended, legend insists, from voyageurs cutting caribou blood with alcohol. Sold by the plastic cane-full at Carnaval; regretted by the same measure.",
  "Bicicletta":
    "Campari and dry white wine with a soda splash, named, the Italians say, for the old men who wobble home on bicycles after a few. The spritz's drier, more honest uncle.",
  "Guinness Punch":
    "Jamaica's stout tradition: Guinness blended with condensed milk, vanilla and nutmeg into something between a flip and a milkshake, the island's Sunday-afternoon institution, no eggs required.",
  "Tatanka":
    "Poland's bison-grass signature: Żubrówka vodka and apple juice, the grass's coumarin vanilla against orchard sweetness. Also answers to 'szarlotka,' the apple pie, which is exactly what it tastes like.",
  "Bombardino":
    "The Italian Alps' ski-hut depth charge: hot advocaat-style egg liqueur with brandy under whipped cream: named, the story goes, when a customer cried 'it's a bomb!' Après-ski in its purest form.",
  "Caffè Corretto":
    "Espresso 'corrected' with a shot of grappa or sambuca, the Italian bar's deadpan masterpiece of naming. The coffee was never wrong; the correction is philosophical.",
  "Rosita":
    "The tequila Negroni with both vermouths and a bitters dash, an obscure 1970s spec pulled back into print in the 1990s, after which the craft era adopted it as agave's answer to the stirred-and-bitter question.",
  "Bloody Maria":
    "The Bloody Mary's Mexican passport: tequila under the tomato, where the vegetal agave actually argues better with the spice than vodka ever did. Sangrita drinkers saw this coming centuries early.",
  "Charro Negro":
    "Tequila, Coke and lime with a salted rim: Mexico's black-clad horseman version of the Batanga family. The salt is what separates it from a mere mixed drink; small moves, real difference.",
  "Rossini":
    "The Bellini's strawberry sibling from the same Venetian family of sparklers named for Italian masters: purée and prosecco, this one for the man who wrote The Barber of Seville. Strawberries in season or don't bother.",
  "Chuflay":
    "Bolivia's national highball: singani, the country's aromatic grape brandy, with ginger ale and lime. The name allegedly descends from railway-era English 'short flight'; the drink outlasted the railways.",

  /* ---- Tier 10: The Bartender's Obscura ---- */
  "Blue Blazer":
    "An 1862 showpiece: flaming whisky thrown between two silver mugs in a blazing arc, performed, legend insists, for President-elect and gold-rush barons alike. Its inventor reportedly refused to make it unless the thermometer or the customer demanded it. The first celebrity-bartender signature move.",
  "Absinthe Frappé":
    "An 1870s creation at what became New Orleans's Old Absinthe House: absinthe whipped over shaved ice with a little sugar and soda, the morning drink of the French Quarter until the 1912 ban. A hit Broadway song of 1904 celebrated it as the morning-after's salvation.",
  "Roffignac":
    "Named for an 1820s New Orleans mayor: cognac (or whiskey) with raspberry shrub and soda: a red, vinegar-bright refresher that vanished for a century until the shrub revival brought the mayor back to office.",
  "Cocktail à la Louisiane":
    "The house drink of Restaurant de la Louisiane, printed in a 1937 New Orleans drinks book: rye, sweet vermouth and Bénédictine with absinthe and Peychaud's, a Vieux Carré and a Sazerac negotiating in one glass. New Orleans's deepest cut.",
  "Remember the Maine":
    "Collected in Havana in 1933, 'during the unpleasantness', machine-gun fire in the streets and revolution at the door: rye, sweet vermouth, cherry brandy, absinthe. The name resurrects the battleship slogan of 1898; the drink tastes like history's smoke.",
  "Army & Navy":
    "The gin sour running on orgeat instead of syrup: almond depth under juniper, codified in the cranky 1948 classic The Fine Art of Mixing Drinks. That book's own overdry spec is universally corrected; its opinions, never.",
  "Lion's Tail":
    "Bourbon, allspice dram, lime and bitters: from the 1937 Café Royal Cocktail Book, London's Empire-era shelf raiding the Caribbean spice cabinet. 'Twisting the lion's tail' was the era's phrase for provoking Britain; the drink provokes nothing but repeat orders.",
  "Cameron's Kick":
    "Harry's New York Bar's genre outlaw: scotch AND Irish whiskey over orgeat and lemon, two rival whiskies forced to waltz. No one knows who Cameron was; the kick is well documented.",
  "Champs-Élysées":
    "The Savoy's cognac-and-green-Chartreuse sour, France's grandest avenue rendered as a drink: brandy foundation, herbal spire, lemon light. One of the book's quiet masterpieces that never got the Corpse Reviver's press.",
  "Brown Derby":
    "Hollywood, 1930s, named for the hat-shaped restaurant, built at the Vendome Club: bourbon, grapefruit and honey. The studio era's three-ingredient proof that California could do classics too.",
  "Blinker":
    "Rye, grapefruit and grenadine from a 1934 bar manual, a Prohibition-exit spec that reads strange and drinks bright. The craft revival's favorite example of 'trust the old books.'",
  "Fish House Punch":
    "The Schuylkill Fishing Company of Pennsylvania, a private angling club chartered in 1732, has served its rum-cognac-peach-brandy punch for near three centuries; a founding father is said to have gone quiet in his diary for days after a visit. America's oldest continuously-poured cocktail, and still a heavyweight.",
  "Chatham Artillery Punch":
    "Savannah's militia punch (rum, brandy, whiskey and champagne fortified in quantity) with a reputation for leveling visiting dignitaries that survives in newspaper accounts going back over a century. Approach as you would the artillery.",
  "Millionaire":
    "A name attached to several Prohibition-era drinks; the survivor is rye with orange liqueur, grenadine and an absinthe whisper, egg white optional, wealth as a color: sunset gold-pink, served up.",
  "Palmetto":
    "The rum Manhattan: aged rum and sweet vermouth with bitters, named for the South's state tree around 1900. Rum drinkers' proof that their spirit sits in whiskey's chairs without adjusting a thing.",
  "Stone Fence":
    "Rum or whiskey in hard cider: the drink the Green Mountain Boys allegedly fortified themselves with before taking Fort Ticonderoga in 1775. America's oldest highball, older than America.",
  "Prescription Julep":
    "From an 1857 Harper's account: cognac and a rye float over the standard mint-and-crushed-ice architecture: the julep as written by a doctor's hand, when brandy was the julep's aristocratic base and whiskey the afterthought.",
  "Creole Cocktail":
    "Rye and sweet vermouth with Bénédictine and Amer Picon accents: New Orleans by way of the pre-Prohibition books, the Vieux Carré's leaner ancestor from the same block of ideas.",
  "Angel Face":
    "The Savoy's equal-parts gamble: gin, apricot brandy, calvados, no citrus net, all fruit and nerve. It shouldn't balance; on the right cold night it does, angelically.",
  "Fancy Free":
    "Bourbon washed with maraschino and both bitters over a big cube, an Old Fashioned that swapped sugar for cherry liqueur, from the 1940s. The name undersells the engineering.",
  "Monte Carlo":
    "Rye with Bénédictine standing where vermouth would: the Manhattan's monastic cousin from the mid-century manuals. Two ingredients and bitters; wealth is simplicity.",
  "Tipperary":
    "Irish whiskey, sweet vermouth and green Chartreuse, printed in a New York recipe book in 1916, the year of the Rising, named for the marching song. Ireland and the Alps negotiating over vermouth.",
  "Bobby Burns":
    "The Rob Roy sweetened with Bénédictine, served at the old Waldorf where, the bar book claimed, it was a favorite of Scots celebrating their poet. Address it on January 25th with a verse.",
  "Harvard":
    "Cognac and sweet vermouth with bitters: the Ivy League cocktail series' brandy chair, circa 1895. Crimson in color, clubby in temperament, better than its rivals (a Harvard opinion, but correct).",
  "Princeton":
    "Gin and port in layers with orange bitters, the 1890s collegiate series' strangest member, drinking like a sunset in reverse. The port float is the diploma.",
  "Saratoga":
    "An 1887 track-season special: cognac and rye splitting the base of a Manhattan-shaped drink, the sporting compromise of a town that bet on everything.",
  "Gin Daisy":
    "The daisy template (spirit, citrus, grenadine or cordial, soda splash) in its gin original, served over crushed ice with fruit. The Margarita is this drink's Spanish translation.",
  "Knickerbocker":
    "1850s New York: rum with raspberry syrup, curaçao and lime over ice, the century-early prototype of tiki, complete with fruit garnish excess. The old Dutch name for the city, and the drink the city forgot it invented.",
  "Coffee Cocktail":
    "Contains no coffee: port and cognac shaken with a whole egg until it pours coffee-colored, the name a Victorian visual joke printed with a shrug in the 1887 edition of the Bar-Tender's Guide. The best breakfast-adjacent drink no brunch menu dares list.",
  "Bensonhurst":
    "A 2006 entry in the Brooklyn-neighborhood cycle: rye, dry vermouth, maraschino and a Cynar rinse, the Brooklyn rebuilt with the amaro era's toolkit. The family tree's newest strong branch.",
  "Preakness":
    "Named for the Baltimore race in a 1936 contest: the Manhattan formula with a Bénédictine seam. The middle jewel of the Triple Crown got the middleweight classic.",
  "Fourth Regiment":
    "An 1889 spec revived from the old books: rye and sweet vermouth with THREE bitters (orange, celery, Peychaud's), each dash a different instrument. The celery bitters are the reason to bother; the drink is the argument for owning them.",
  "Metropole":
    "The Hotel Metropole's Times Square nightcap from the 1900s: cognac and dry vermouth with two bitters, the Harvard's drier city cousin, drunk where Broadway's sporting crowd settled its evenings.",
  "Waldorf":
    "The hotel's namesake from the old bar book: rye, sweet vermouth and absinthe in earnest quantity, pre-Prohibition New York's heavier hand, when absinthe was an ingredient, not a rumor.",
  "Rock and Rye":
    "Rye whiskey bottled over rock candy with citrus and horehound: sold in pharmacies as a cough remedy well into the 20th century, taxed as medicine, drunk as neither. The bottled old-fashioned your great-grandfather's druggist prescribed.",
  "Twelve Mile Limit":
    "Prohibition arithmetic: when the dry law's reach extended from three miles offshore to twelve, the booze cruises sailed further and the drink got named: white rum, whiskey AND brandy under grenadine and lemon, because on a ship past the limit, why choose?",
  "Hop Toad":
    "Apricot brandy, rum and lime from the old books: three ingredients, a silly name, and a surprisingly serious sour underneath. The apricot does the sugar's job; the name does the marketing's.",
  "Bishop":
    "Mulled port with roasted orange and clove: the Victorian Christmas standard A Christmas Carol names outright ('a Christmas bowl of smoking bishop, Bob!' says Scrooge, reformed). The Bar-Tender's Guide printed American versions; December justifies them still.",

  /* ---- Tier 11: The Martini Book ---- */
  "Vesper":
    "Casino Royale put it in print in 1953: gin AND vodka with Kina Lillet, shaken, named for the double agent who breaks Bond's heart. Kina Lillet is extinct; modern bars fake the quinine bite with Cocchi Americano or a bitters dash. Order it stirred and watch the bartender relax.",
  "Gibson":
    "A Martini garnished with a cocktail onion and nothing else, attributed by legend to a Gilded Age illustrator or to a teetotaling banker who marked his water 'martini' with an onion. The onion's brine changes the drink more than the story changes the history.",
  "Dirty Martini":
    "Olive brine in the Martini: traceable to 1901 New York, made presidential by a 1930s White House that shook them badly and enthusiastically for visiting dignitaries. 'Extra dirty' is a legitimate order; 'filthy' is a personality.",
  "Vodka Martini":
    "Born as the 'Kangaroo Cocktail' in the 1950s, the name nobody kept, and made cultural furniture by Bond's shaken order. The gin drinker's sneer is traditional; the drink, made cold and wet with good vermouth, is better than the sneer.",
  "Perfect Martini":
    "'Perfect' meaning split vermouth (half dry, half sweet), not a boast. Rounder than a dry Martini, drier than a Martinez: the diplomatic middle of the whole family.",
  "Fifty-Fifty Martini":
    "Equal parts gin and dry vermouth: the pre-war ratio the dry decades buried, revived by bartenders who kept whispering that vermouth is wine and wine is good. The lowest-proof Martini and the one that tastes most like a conversation.",
  "Smoky Martini":
    "A Martini with a whisper of scotch where the vermouth might be, peat as perfume. A drink invented by whoever first cleaned a mixing glass insufficiently, then perfected on purpose.",
  "Dukes Martini":
    "The Dukes Hotel, London: frozen gin poured table-side from a trolley into a frozen glass over a vermouth rinse: no stirring, no dilution, a two-drink house limit that is enforced and earned. Casino Royale's author, the hotel swears, drank at Dukes; the trolley is the closest thing the Martini has to a shrine.",
  "Obituary Cocktail":
    "Lafitte's Blacksmith Shop, New Orleans: a Martini with an absinthe shadow, two dashes darkening the gin like its namesake. The oldest bar building in the Quarter serves it by candlelight, which is the correct lighting for the name.",
  "Blue Moon":
    "The violette Martini of the 1910s (gin, dry vermouth, crème de violette) colored like its name and lost for the same decades as the Aviation, for the same supply reasons. The violette returns; the moon rises.",
  "Turf Cocktail":
    "The racing crowd's 1900s Martini variant: gin and dry vermouth with maraschino, absinthe and bitters, everything the era could dress a Martini in. Old Tom gin makes it historical; dry gin makes it drinkable.",
  "Astoria":
    "The Waldorf-Astoria's inverted Martini (vermouth leading gin, orange bitters seasoning) from the hotel's pre-Prohibition bar book. The hotel's other tower got the Waldorf cocktail; this is the better half.",
  "Bradford":
    "A Martini, shaken: that's the whole recipe and the whole controversy, named in the old books as its own drink because the technique changes the texture that much. Cloudier, colder, softer; order it when you want the fight.",
  "French Martini":
    "Vodka, Chambord and pineapple: born in the 1980s–90s New York bar world and inescapable by the millennium. No vermouth, no France beyond the raspberry liqueur, and no shame: shaken hard, the pineapple foams like a fizz.",
  "Breakfast Martini":
    "London's Library Bar, 1996: gin, orange marmalade, triple sec, lemon; invented, the story goes, after its creator's wife made him actually eat breakfast. A knowing revival of the Savoy's Marmalade Cocktail with better press.",
  "Appletini":
    "Lola's, West Hollywood, 1997, born the 'Adam's Apple' and renamed by the decade that suffixed everything with -tini: vodka and sour-apple liqueur in electric green. The craft era's favorite punching bag, and still the best-selling drink at half the bars that mock it.",
  "Lychee Martini":
    "The pan-Asian restaurant boom of 2000s New York produced it: vodka, lychee liqueur and syrup from the can, a Martini-glassed perfume that outlived every trend piece written against it.",
  "Pomegranate Martini":
    "The POM-juice era's contribution, mid-2000s: vodka, pomegranate and citrus in a Martini glass, antioxidant marketing's finest cocktail hour. Fresh juice and real measurement redeem it completely.",

  /* ---- Tier 12: Frozen & Blended ---- */
  "Frozen Margarita":
    "Dallas, 1971: frustrated by inconsistent blender output, a restaurateur converted a soft-serve ice-cream machine to pour margaritas; the machine now sits in the Smithsonian. Texas's greatest contribution to industrial engineering.",
  "Frozen Daiquiri":
    "El Floridita met the electric blender in the 1930s and built the frappé daiquiri empire its most famous regular drank through: shaved ice, precise sugar, a machine-cold masterpiece that the beach-bar slushy both descends from and betrays.",
  "Strawberry Daiquiri":
    "The frozen daiquiri's most popular costume: fresh strawberries redeem it; mix from a jug indicts it. Somewhere between those poles, every beach vacation finds its level.",
  "Banana Daiquiri":
    "Claimed by the Mountain Top bar on St. Thomas, allegedly for a 1950s naval visit: rum, banana and lime blended to custard. The banana rounds the rum like butter; the view did the rest of the marketing.",
  "Frozen Piña Colada":
    "The Caribe Hilton's creation in its blended, machine-age form, the version the world actually orders. Coco López, pineapple, rum, ice: the sound of a resort pool rendered in texture.",
  "Miami Vice":
    "Half frozen Piña Colada, half frozen Strawberry Daiquiri, layered white over red like the show's pastel blazers, the 1980s in a hurricane glass. Order one ironically; finish it sincerely.",
  "Lava Flow":
    "The Miami Vice's Hawaiian cousin: strawberry purée 'erupting' up through a coconut-banana colada as it's poured. Resort-bar stagecraft at its most literal: the garnish is geology.",
  "Frosé":
    "Bar Primi, New York, summer 2016: rosé frozen with strawberry and vermouth into the drink of a single inescapable season: the fastest a cocktail has ever gone from invention to ubiquity to eye-roll to quiet permanent menu residence.",
  "Frozen Painkiller":
    "The Soggy Dollar's spec surrendered to the blender: coconut, pineapple, orange and rum as weather. Purists object; the beach overrules them.",
  "Frozen Irish Coffee":
    "New Orleans's improbable perfection: Erin Rose and Molly's at the Market pour a frozen-machine take on the Irish coffee, brandy-spiked and coffee-dark, that outdrinks the hot original in ninety-degree heat. Coffee, cream, brandy, machine: the Quarter's best air conditioning.",
  "Frozen Mudslide":
    "The Grand Cayman original gone full milkshake: vodka, Kahlúa, Irish cream and ice cream logic. Dessert that requires ID.",
  "Frozen Negroni":
    "The craft slushy-machine era's flex: the equal-parts classic frozen without falling apart, usually with orange juice mediating the Campari's argument with the cold. Bitterness at brain-freeze temperature. Somehow, it works.",
  "Frozen Aperol Spritz":
    "The spritz surrendered to the frozen-drink machine (Aperol, prosecco reduced or fortified, citrus), the 2010s patio drink completing its final form. The bubbles die; the orange sunset survives.",
});

function loreOf(c){ return LORE[c.name] || null; }
function loreFootnote(c){
  const l = LORE[c.name];
  if(!l) return null;
  const m = l.match(/^[^.!?]+[.!?]/);
  return m ? m[0] : null;
}

/* ---------------- GLOSSARY OF THE CRAFT ---------------- */

const GLOSSARY = [
  { term:"ABV", def:"Alcohol by volume. Spirits run 40–50%, vermouth 15–18%, most finished shaken cocktails land near 15–20% after dilution." },
  { term:"Amaro", def:"Italian for 'bitter': a family of bittersweet herbal liqueurs (Campari, Nonino, Averna, Fernet) drunk as aperitifs and digestifs and mixed into modern classics." },
  { term:"Aperitivo", def:"A before-dinner drink meant to wake the appetite: lower proof, bitter, often sparkling. Also the Italian evening ritual built around them." },
  { term:"Bar spoon", def:"Long spiral-handled spoon; also a unit of measure, about 1/6 oz (5 ml)." },
  { term:"Batching", def:"Pre-mixing the shelf-stable ingredients of a drink in quantity for speed or parties. Add citrus and bubbles only at service." },
  { term:"Bitters", def:"High-proof botanical tinctures dosed in dashes, the salt and pepper of the bar. Angostura, Peychaud's and orange are the working trio." },
  { term:"Build", def:"To make a drink directly in its serving glass, no shaker or mixing glass, the method of most highballs." },
  { term:"Cordial", def:"A sweetened, acidified fruit or botanical syrup (lime cordial being the classic), sweet and sour in one bottle." },
  { term:"Crusta", def:"A 19th-century style served in a glass fully lined with a citrus peel and a sugared rim, ancestor of the Sidecar's sugar rim." },
  { term:"Dash", def:"The unit of a bitters bottle's throw, roughly 0.9 ml, but bottles vary. Count dashes, then taste." },
  { term:"Dirty", def:"With olive brine (a Dirty Martini). 'Extra dirty' means more brine than most bartenders think is wise." },
  { term:"Double strain", def:"Straining through both the Hawthorne and a fine mesh to catch ice shards and herb flecks, standard for shaken drinks served up." },
  { term:"Dry", def:"Less sweet. In a Martini, less vermouth; in general, the opposite of cloying. 'Bone dry' approaches zero." },
  { term:"Dry shake", def:"Shaking without ice first, usually for egg-white drinks, to emulsify and build foam before the cold dilution shake." },
  { term:"Expressing", def:"Snapping a citrus peel skin-side down over the drink to spray its oils across the surface, then (usually) dropping it in or discarding." },
  { term:"Fat wash", def:"Infusing a spirit with a melted fat (bacon, brown butter, coconut oil), then chilling and skimming: flavor stays, fat leaves." },
  { term:"Fizz", def:"A sour shaken and topped with soda, served without ice in a small glass, meant to be drunk while still foaming." },
  { term:"Flip", def:"A drink shaken with a whole egg: rich, dense, dessert-adjacent. The Golden Fizz's decadent cousin." },
  { term:"Float", def:"Layering a small pour on a drink's surface without mixing: the red wine on a New York Sour, the scotch on a Penicillin." },
  { term:"Hawthorne strainer", def:"The spring-rimmed strainer that fits a shaking tin. The spring is the filter; your finger controls the gate." },
  { term:"Highball", def:"Spirit plus a larger measure of a carbonated mixer over ice in a tall glass. The world's most-poured drink format." },
  { term:"Jigger", def:"The hourglass measuring cup. Jiggering honestly is the fastest way to make every drink taste the same twice." },
  { term:"Julep", def:"Spirit, sugar and mint over crushed ice, no citrus: one of the oldest American drink families, served in metal so it frosts." },
  { term:"Lengthen", def:"To make a drink taller and weaker with mixer: turning a sour into a Collins, a Daiquiri into a highball." },
  { term:"Mother drink", def:"A template drink (Old Fashioned, Manhattan, Daiquiri, Highball) from which families of variations descend by substitution." },
  { term:"Muddle", def:"Pressing fruit or herbs in the glass to release juice and oils. Press mint gently; grind citrus firmly; never pulverize either." },
  { term:"Neat", def:"Spirit poured at room temperature, no ice, no dilution. Different from 'up,' which means chilled first." },
  { term:"Nick & Nora", def:"A small stemmed bell glass for drinks served up, named for the cocktail-fluent couple of the Thin Man films. Spill-resistant, elegant, correct." },
  { term:"Orgeat", def:"Almond syrup brightened with orange flower water, the almond backbone of the Mai Tai and much of tiki." },
  { term:"Perfect", def:"Split vermouth, half sweet and half dry: a Perfect Manhattan, a Perfect Rob Roy." },
  { term:"Proof", def:"Twice the ABV, an old gunpowder-test term. 100 proof = 50% alcohol. 'Overproof' rums run far past it." },
  { term:"Rinse", def:"Coating a chilled glass with a few drops of a strong ingredient (absinthe, fernet) and dumping the excess: perfume, not a pour." },
  { term:"Rolling", def:"Pouring a drink back and forth between tins to mix with minimal aeration: the Bloody Mary's method, since shaking foams tomato." },
  { term:"Shrub", def:"A vinegar-based fruit syrup: colonial-era preservation turned modern acid source for zero-proof builds." },
  { term:"Sour", def:"The great template: spirit, citrus, sweetener, usually 2 : 3/4 : 3/4. Half the canon is a sour wearing a costume." },
  { term:"Split base", def:"Dividing a drink's spirit between two bottles (rye + cognac, rum + mezcal) for complexity neither carries alone." },
  { term:"Swizzle", def:"A crushed-ice drink churned with a swizzle stick (traditionally a branch of the Caribbean swizzlestick tree) until the glass frosts." },
  { term:"Tiki", def:"The mid-century American school of faux-Polynesian rum drinks: multiple rums, multiple sweets and sours, theatrical garnish, serious balance math underneath." },
  { term:"Twist", def:"A strip of citrus peel, expressed and often curled over the drink. Ask for it 'no pith' and mean it." },
  { term:"Up", def:"Chilled by stirring or shaking, then strained into a stemmed glass with no ice. Compare 'neat' (no chill) and 'on the rocks.'" },
  { term:"Well", def:"The bar's default pouring bottles, and the station where drinks are made. 'Well drinks' are the house baseline." },
  { term:"Wheel", def:"A full round slice of citrus, slit to sit on the rim, the garnish of Collinses and sours on the rocks." },
  { term:"Beer-clean", def:"A glass with no fat, protein or detergent film left on it. Test it wet: water sheets off a clean glass and beads up on a dirty one, and a dirty glass kills the head, flattens the aroma and leaves bubbles stuck to the wall." },
  { term:"Head", def:"The foam collar on a poured beer: an inch to an inch and a half on most styles. It is where the aroma lives, so a headless pint is an underpoured pint, not a generous one." },
  { term:"Lacing", def:"The rings of foam left clinging to the glass as a pint goes down, the mark of a beer-clean glass and a well-retained head. Not to be confused with bubbles stuck to the side of a full glass, which mean the opposite." },
  { term:"Coupler", def:"The valve that mates a draught line to a keg. American Sankey (D system) runs nearly all domestic and craft beer; Guinness and most Irish stout use the U system, and the wrong coupler simply will not lock on." },
  { term:"Half-barrel", def:"The standard American keg: 15.5 gallons, roughly 124 sixteen-ounce pours before waste. A quarter is 7.75 gallons, a sixtel 5.16 in a tall narrow shell one person can actually carry." },
  { term:"Applied pressure", def:"The CO2 pressure set at the regulator to push beer up the line and hold its carbonation. It is matched to the beer, the line length and the rise: too low and it pours flat, too high and it pours foam, and it is never a speed control." },
  { term:"Beer gas", def:"Roughly 70-75% nitrogen to 25-30% CO2, pushed hard through a restrictor plate for nitro pours. Nitrogen barely dissolves, which is what makes the cascade and the dense, low-carbonation head." },
  { term:"Direct draw", def:"A draught system where the kegs sit in a cooler right behind the faucets on a short line, with no glycol chase. Cooler temperature is line temperature, which is why the box lives at 38F and stays there." },
  { term:"FOB", def:"Foam-on-beer detector: an inline float that seals the line the instant a keg blows, so you can change it without pushing a column of foam through. Reset it after every change or that tap stays dead." },
  { term:"Diacetyl", def:"A fermentation byproduct that tastes like butterscotch or movie popcorn. If the same beer is clean out of the can, suspect bacteria in a dirty line before you blame the keg." },
  { term:"BTG", def:"By the glass. The wine you sell without selling the bottle, which means you own every bottle you open until it either sells out or turns." },
  { term:"TCA", def:"The cork-taint compound behind a corked bottle. It will not hurt anyone: it strips the fruit out of a wine and leaves wet cardboard and damp basement, and the wine gets more muted the longer it sits." },
  { term:"Volatile acidity", def:"Acetic acid and ethyl acetate in a wine: vinegar and nail polish remover, with a sting at the back of the throat. A trace adds lift; past that the bottle is dying." },
  { term:"Reduction", def:"Sulfur compounds trapped in a wine that saw no oxygen: struck match, burnt rubber, sometimes worse. Not a fault: swirl it hard or decant, and it usually blows off in a few minutes." },
  { term:"Brett", def:"Brettanomyces, a wild yeast reading as barnyard, band-aid or saddle leather. A little is house style in some regions; a lot is a flaw everywhere." },
  { term:"Ullage", def:"The gap between the wine and the closure in an open bottle. It is the air that actually kills your by-the-glass stock, which is why you either shrink it, gas it, or sell it." },
  { term:"Brut", def:"The middle rung of the sparkling sweetness ladder, which lies to you: Brut Nature, Extra Brut, Brut, then Extra Dry, which is sweeter than Brut, then Sec, Demi-Sec, Doux." },
  { term:"Capsule", def:"The foil sleeve over a wine bottle's neck. Cut it cleanly below the lower lip so the pour never crosses metal, and pocket the ring rather than leaving it on the bar." },
  { term:"Oxidation", def:"What air does to an open bottle: fruit flattens, the rim browns, and the nose goes to bruised apple, walnut and sherry. Irreversible, and the reason every open bottle has a clock on it." },
  { term:"Standard drink", def:"In the US, 0.6 oz of pure alcohol: 12 oz of 5% beer, 5 oz of 12% wine, or 1.5 oz of 40% spirit. The point is that those three are the same drink, and a 16 oz pour of a 7% IPA is nearly two of them." },
  { term:"Over-service", def:"Continuing to pour past the point the cues said stop. It is the phrase that appears in the lawsuit, and it is judged on what a reasonable bartender should have noticed, not on what the guest told you." },
  { term:"BAC", def:"Blood alcohol concentration. Most US states set the per se driving limit at 0.08%, and 'per se' means the number convicts on its own: no further proof of impairment required." },
  { term:"De-escalation", def:"Lowering the temperature of a confrontation instead of winning it. Drop your volume under theirs, stand at an angle rather than square up, agree with whatever you honestly can, and leave him a way out that doesn't look like losing." },
  { term:"86 (a guest)", def:"To bar a person from the room, as opposed to 86ing an item off the menu, same word, very different night. Log the name and the date, because the next shift has to enforce it and cannot read your mind." },
  { term:"Thermal shock", def:"Cracking a glass by moving it too fast between temperatures: hot coffee into a cold glass, or a glass straight out of the washer into the freezer. Pre-rinse hot-drink glasses with hot water and let hot glass cool before you chill it." },
  { term:"Pour line", def:"The fill mark, etched or agreed, that a wine or beer pour comes up to. It is your consistency, your pour cost, and in a certified-glass jurisdiction, your compliance." },
];
