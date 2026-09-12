/* ---------------- MISE EN PLACE: THE PREP ROOM ---------------- */
const PREP_CATS = ['Syrups','Infusions & Washes','Acids & Cordials','Juice & Garnish'];

const PREPS = [
  // ===== SYRUPS =====
  { name:"Simple Syrup (1:1)", cat:"Syrups", ratio:"1 part sugar : 1 part water, by weight", yield:"1 lb sugar + 1 lb water ≈ 24 oz syrup",
    steps:["Weigh equal parts white sugar and warm water.","Stir or shake until fully dissolved: no heat required, and cold-process syrup tastes cleaner and lasts as long.","If you do heat it, never boil: you'll evaporate water and change the ratio.","Bottle while cool, label, date."],
    keeps:"3–4 weeks refrigerated. A half ounce of neutral spirit per pint extends it to about 2 months.",
    uses:"The default sweetener for shaken drinks. Anywhere a spec says 'simple.'",
    note:"Measure by weight, not volume. A cup of sugar and a cup of water are not equal parts: that error is why some bars' drinks are inconsistent." },
  { name:"Rich Simple (2:1)", cat:"Syrups", ratio:"2 parts sugar : 1 part water, by weight", yield:"2 lb sugar + 1 lb water ≈ 32 oz syrup",
    steps:["Weigh two parts sugar to one part warm water.","Stir until dissolved: this takes real patience cold; gentle warming speeds it without boiling.","Cool fully before bottling."],
    keeps:"6–8 weeks refrigerated: the higher sugar concentration inhibits spoilage.",
    uses:"Old Fashioneds, juleps, stirred drinks, and any zero-proof drink needing body. Use roughly half the volume you'd use of 1:1.",
    note:"More body and a longer shelf life. Most craft bars run 2:1 as their house standard and adjust specs accordingly." },
  { name:"Demerara Syrup", cat:"Syrups", ratio:"2 parts demerara sugar : 1 part water, by weight", yield:"≈ 32 oz from 2 lb sugar",
    steps:["Combine demerara or turbinado sugar with warm water.","Stir until dissolved; the larger crystals take longer than white sugar.","Cool, bottle, date."],
    keeps:"6–8 weeks refrigerated.",
    uses:"Old Fashioneds, tiki drinks, rum and whiskey builds: anywhere molasses depth helps.",
    note:"The single easiest upgrade to an Old Fashioned. Demerara's faint molasses note bridges the spirit and the bitters." },
  { name:"Gum (Gomme) Syrup", cat:"Syrups", ratio:"2:1 rich syrup + 2% gum arabic by weight", yield:"≈ 32 oz",
    steps:["Soak powdered gum arabic in an equal weight of warm water overnight until fully hydrated.","Make a 2:1 rich syrup separately.","Blend the hydrated gum into the warm syrup until completely smooth.","Strain through fine mesh and rest 24 hours before use."],
    keeps:"2 months refrigerated.",
    uses:"Any spirit-forward classic where you want silk: Sazeracs, Old Fashioneds, and 19th-century recipes that originally called for it.",
    note:"Gum arabic is an emulsifier that adds viscosity without sweetness. It's what made pre-Prohibition cocktails feel rounder than ours, and it's the most underused prep on this list." },
  { name:"Honey Syrup (3:1)", cat:"Syrups", ratio:"3 parts honey : 1 part hot water, by weight", yield:"≈ 16 oz from 1 lb honey",
    steps:["Warm the water, not boiling, which dulls honey's aromatics.","Stir honey into the water until fully incorporated.","Cool and bottle."],
    keeps:"1 month refrigerated.",
    uses:"Bee's Knees, Gold Rush, Penicillin, Airmail.",
    note:"Straight honey will not incorporate into a cold drink: it seizes and sinks. Always cut it. Vary the honey (orange blossom, buckwheat, wildflower) and the drink changes noticeably." },
  { name:"Ginger Syrup", cat:"Syrups", ratio:"1 part fresh ginger juice : 1 part sugar, by weight", yield:"≈ 16 oz from 8 oz ginger juice",
    steps:["Juice fresh ginger root: a centrifugal juicer is ideal; otherwise grate and squeeze through cloth.","Stir in an equal weight of sugar until dissolved. Do not heat: heat kills the fresh burn that makes this worth making.","Let the sediment settle, then decant off the top for a cleaner syrup, or leave it for more bite."],
    keeps:"2 weeks refrigerated: it's raw juice with no heat step, so nothing pasteurized it; smell it before every service.",
    uses:"Penicillin, mules, Kentucky Buck, Gin Gin Mule, and house ginger beer.",
    note:"The difference between fresh ginger syrup and the bottled stuff is the difference between a Penicillin and a disappointment." },
  { name:"Cinnamon Syrup", cat:"Syrups", ratio:"2:1 rich syrup + 4–5 cinnamon sticks per quart", yield:"≈ 32 oz",
    steps:["Crack the cinnamon sticks to expose more surface.","Combine with sugar and water, warm gently for 5 minutes, then kill the heat.","Steep off the heat at least 2 hours; overnight is better.","Strain and bottle."],
    keeps:"1 month refrigerated.",
    uses:"Zombie, Jet Pilot, Nui Nui, Hot Buttered Rum batter, and autumn drinks generally.",
    note:"Use true Ceylon cinnamon if you can find it: cassia (the supermarket default) is harsher and more one-note." },
  { name:"Don's Mix", cat:"Syrups", ratio:"2 parts fresh grapefruit juice : 1 part cinnamon syrup", yield:"Make to order in small batches",
    steps:["Juice fresh white grapefruit.","Combine two parts juice with one part cinnamon syrup.","Keep refrigerated and use within 3 days: it's a juice product."],
    keeps:"3 days refrigerated.",
    uses:"Zombie, Three Dots and a Dash, and much of the Don the Beachcomber canon.",
    note:"The recipes at Don the Beachcomber were kept in code to stop poaching; this mix is one of the codes tiki archaeologists cracked. Half of classic tiki depends on it." },
  { name:"Orgeat", cat:"Syrups", ratio:"1 part almond milk base : 1.5 parts sugar", yield:"≈ 24 oz",
    steps:["Toast 2 cups blanched almonds lightly, then blitz with 2 cups hot water.","Steep 3–4 hours, then strain hard through cheesecloth; squeeze it dry.","Weigh the almond milk and stir in 1.5 times its weight in sugar.","Finish with 1/2 oz orange flower water and 1 oz overproof rum or brandy per quart as flavor and preservative."],
    keeps:"3 weeks refrigerated. Freezes well in portions.",
    uses:"Mai Tai, Army & Navy, Japanese Cocktail, Trinidad Sour, Saturn.",
    note:"MAJOR ALLERGEN: tree nuts. Label it clearly and always disclose it; a Mai Tai is not an obvious nut hazard to a guest with an allergy." },
  { name:"Grenadine", cat:"Syrups", ratio:"1 part pomegranate juice : 1 part sugar, by weight", yield:"≈ 24 oz",
    steps:["Warm unsweetened pomegranate juice gently: do not boil.","Stir in an equal weight of sugar until dissolved.","Add 1/2 oz pomegranate molasses per quart for depth and 2 dashes orange flower water for lift.","Cool and bottle."],
    keeps:"3–4 weeks refrigerated.",
    uses:"Jack Rose, Ward 8, Shirley Temple, tiki, and every drink where the neon stuff has been ruining things for decades.",
    note:"Commercial grenadine is usually corn syrup, red dye, and no pomegranate at all. This is a ten-minute prep that upgrades a dozen drinks." },
  { name:"Falernum", cat:"Syrups", ratio:"Infusion + 2:1 syrup base", yield:"≈ 24 oz",
    steps:["Steep 40 cloves, zest of 6 limes, and 1/4 cup toasted slivered almonds in 8 oz overproof rum for 24 hours.","Strain, then combine with 16 oz rich syrup and 2 oz fresh lime juice.","Add 1 tbsp grated fresh ginger during the infusion for a spicier house version."],
    keeps:"2 months refrigerated (the rum preserves it).",
    uses:"Corn 'n' Oil, Royal Bermuda Yacht Club, Nuclear Daiquiri, Test Pilot, Chartreuse Swizzle.",
    note:"Contains tree nuts. Technically a liqueur, not a syrup: the rum base is what gives it shelf life and backbone." },
  { name:"Vanilla Syrup", cat:"Syrups", ratio:"2:1 rich syrup + 1 split vanilla bean per pint", yield:"≈ 16 oz",
    steps:["Split and scrape a vanilla bean; add pod and seeds to warm rich syrup.","Steep at least 24 hours refrigerated: vanilla is slow.","Leave the pod in the bottle; it keeps developing."],
    keeps:"6 weeks refrigerated.",
    uses:"Espresso drinks, tiki, zero-proof builds needing perceived richness.",
    note:"Vanilla reads as 'creamy' and 'barrel-aged' to the palate, which makes it disproportionately useful in NA drinks." },
  { name:"Herb Syrup (rosemary, sage, dill, basil, mint)", cat:"Syrups", ratio:"1:1 simple + 1 large handful herbs per quart", yield:"≈ 24 oz",
    steps:["Bring the syrup to a bare simmer, then remove from heat entirely.","Add the herbs and steep exactly 20 minutes; longer turns them bitter and vegetal.","Strain immediately and chill fast to keep the color bright.","For mint and basil, blanch the leaves in boiling water for 10 seconds and shock in ice water first: this locks in green color."],
    keeps:"2 weeks refrigerated.",
    uses:"Garden cocktails, gin drinks, and most of the zero-proof herbal list.",
    note:"The 20-minute limit is the whole trick. Over-steeped rosemary tastes like a pine cleaner." },
  { name:"Spicy Chile Syrup", cat:"Syrups", ratio:"1:1 simple + 2 sliced jalapeños or 1 habanero per quart", yield:"≈ 24 oz",
    steps:["Warm the syrup, add sliced chiles (seeds in for heat, out for flavor only).","Steep 30 minutes, tasting every 10: chile heat escalates fast and unpredictably.","Strain the moment it's where you want it. It will keep getting hotter if you don't."],
    keeps:"3 weeks refrigerated.",
    uses:"Spicy Margaritas, agave drinks, Mango Chile Cooler.",
    note:"Capsaicin varies wildly pepper to pepper. Taste every batch and adjust the spec, not the recipe." },
  { name:"Hibiscus Syrup", cat:"Syrups", ratio:"Strong hibiscus tea + equal weight sugar", yield:"≈ 24 oz",
    steps:["Steep 1 cup dried hibiscus flowers in 16 oz hot water for 20 minutes.","Strain, then stir in an equal weight of sugar.","Cool and bottle."],
    keeps:"3 weeks refrigerated.",
    uses:"Zero-proof drinks, margarita variations, spritzes, anywhere you want tartness plus dramatic color.",
    note:"Naturally acidic and deeply colored, which makes it one of the most useful NA ingredients on the shelf." },
  { name:"Berry Syrup (raspberry, strawberry, blackberry)", cat:"Syrups", ratio:"1 part fruit : 1 part sugar : 1/2 part water", yield:"≈ 20 oz per pound of fruit",
    steps:["Toss fruit with sugar and let it macerate 2–4 hours at room temperature: the sugar draws the juice out cold, preserving flavor.","Add water, warm gently for 5 minutes to dissolve fully.","Strain through fine mesh without pressing hard, or it turns cloudy."],
    keeps:"2 weeks refrigerated; freeze in portions for longer.",
    uses:"Clover Club, Bramble, Knickerbocker, Frosé.",
    note:"Frozen berries work as well as fresh and are cheaper year-round: they've already broken down." },
  { name:"Passion Fruit Syrup", cat:"Syrups", ratio:"1 part passion fruit purée : 1 part rich syrup", yield:"≈ 24 oz",
    steps:["Use frozen unsweetened purée: it's more consistent and cheaper than fresh fruit.","Blend with an equal volume of 2:1 rich syrup.","Bottle and refrigerate."],
    keeps:"2 weeks refrigerated.",
    uses:"Hurricane, Port Light, Saturn, Porn Star Martini.",
    note:"Passion fruit is the most acidic common tropical fruit: treat it as part of your sour, not just your sweet." },
  { name:"Pineapple Gum Syrup", cat:"Syrups", ratio:"Gum syrup + fresh pineapple, infused", yield:"≈ 24 oz",
    steps:["Dice fresh pineapple, including some core, and cover with warm gum syrup.","Infuse refrigerated for 24–48 hours.","Strain, pressing gently."],
    keeps:"3 weeks refrigerated.",
    uses:"Pisco Punch, Chartreuse Swizzle, and tropical builds needing weight.",
    note:"The legendary missing ingredient of Pisco Punch. Fresh pineapple contains bromelain, an enzyme that breaks down protein; it will thin egg-white drinks, so pair carefully." },
  { name:"Coffee & Tea Syrups", cat:"Syrups", ratio:"Strong brew + equal weight sugar", yield:"≈ 24 oz",
    steps:["Brew coffee or tea at double strength and cool completely.","Stir in an equal weight of sugar.","For tea, never steep beyond the recommended time: tannin turns astringent fast."],
    keeps:"2 weeks refrigerated.",
    uses:"Espresso builds, Sober Sour, Black Tea Negroni, and any drink needing tannic grip.",
    note:"Tea syrup is the most underrated zero-proof tool on the bar: it supplies the astringency alcohol used to provide." },
  { name:"Coconut Cream Mix", cat:"Syrups", ratio:"1 part coconut cream : 1 part coconut milk : 1/4 part rich syrup", yield:"≈ 24 oz",
    steps:["Whisk or blend all three together until fully homogeneous.","Keep refrigerated and shake hard before every use; it separates constantly.","Discard at the first sign of sourness."],
    keeps:"5 days refrigerated. This is a dairy-analogue product; treat it like dairy.",
    uses:"Piña Colada, Painkiller, Bushwacker, Coconaut.",
    note:"Canned coconut cream alone is too thick and too sweet. This mix pours and integrates properly." },

  // ===== INFUSIONS & WASHES =====
  { name:"Fat-Washing", cat:"Infusions & Washes", ratio:"1–2 oz melted fat per 750ml spirit", yield:"Roughly the original volume, minus a little loss",
    steps:["Melt the fat: bacon fat, browned butter, toasted sesame oil, coconut oil.","Combine with the spirit in a sealed container and shake.","Let it sit at room temperature 4–6 hours, shaking occasionally.","Freeze overnight. The fat solidifies into a cap.","Skim the solid fat and strain through a coffee filter, twice if needed."],
    keeps:"Indefinitely, refrigerated, once fully strained.",
    uses:"Benton's Old Fashioned (bacon bourbon), brown-butter rum, sesame-oil whiskey.",
    note:"Fat carries flavor compounds alcohol can't. Strain thoroughly: residual fat goes rancid and will ruin the bottle." },
  { name:"Milk-Washing / Clarification", cat:"Infusions & Washes", ratio:"1 part whole milk : 4 parts acidified punch", yield:"≈ 80% of starting volume after filtering",
    steps:["Build your punch: spirit, citrus, sugar, water. The citrus is essential: it does the curdling.","Warm the milk gently in a large vessel.","Add the punch TO the milk, never the reverse, or you'll get a broken mess.","Let it curdle and rest 1 hour, then refrigerate several hours.","Filter through a coffee filter or superbag, slowly. The first pass may take hours; the curd itself becomes the filter."],
    keeps:"Months refrigerated: clarification is also a preservation technique.",
    uses:"Clarified Milk Punch, batched clear cocktails, high-volume service.",
    note:"An 18th-century technique, and a genuinely magical one: the milk protein strips harshness, tannin, and color while leaving flavor. Franklin and Dickens both had recipes." },
  { name:"Spirit Infusions", cat:"Infusions & Washes", ratio:"Varies wildly by ingredient: see timings", yield:"Original volume",
    steps:["Chiles: 30 minutes to 2 hours. Taste every 15 minutes.","Fresh herbs: 1–4 hours, then strain; they turn bitter and grassy overnight.","Coffee beans: 4–12 hours.","Vanilla, cinnamon, whole spice: 3–7 days.","Fresh fruit: 2–5 days refrigerated.","Tea: 30 minutes to 2 hours: tannin makes it astringent quickly."],
    keeps:"Once strained, essentially as long as the base spirit, but fruit infusions should be refrigerated and used within a month.",
    uses:"House spirits, signature cocktails, working around gaps in your back bar.",
    note:"Always strain when it's right, not when it's convenient. Nearly every failed infusion is an over-infusion." },
  { name:"High-Proof Tinctures", cat:"Infusions & Washes", ratio:"1 part botanical : 4 parts overproof neutral spirit",
    yield:"Small: you're making a dasher bottle, not a cocktail ingredient",
    steps:["Cover the botanical (saline, celery seed, cardamom, chile, smoked tea) with high-proof neutral spirit.","Steep 3–14 days depending on intensity, shaking daily.","Strain through a coffee filter into dasher bottles and label clearly."],
    keeps:"A year or more at room temperature.",
    uses:"Adjusting drinks by drops instead of ounces, the finest-resolution tool you have.",
    note:"High proof extracts far more efficiently than 40% spirit. A few drops of a tincture can rescue a flat drink." },
  { name:"20% Saline Solution", cat:"Infusions & Washes", ratio:"20 g fine sea salt : 80 g warm water", yield:"≈ 3.5 oz, a dropper bottle's worth",
    steps:["Dissolve the salt fully in warm water.","Cool and transfer to a dropper bottle.","Label it clearly: it looks exactly like water."],
    keeps:"Indefinitely at room temperature.",
    uses:"2–4 drops in almost any drink; essential in zero-proof and grapefruit-based builds.",
    note:"Salt suppresses bitterness selectively and lengthens the finish. This is the highest-leverage, lowest-effort prep on this entire page." },
  { name:"House Bitters", cat:"Infusions & Washes", ratio:"Bittering agent + aromatics, infused separately in overproof spirit", yield:"≈ 8 oz",
    steps:["Infuse your bittering agents (gentian root, cinchona bark, wormwood) in overproof neutral spirit separately from your aromatics; they extract at different rates.","Steep bittering agents 2 weeks, aromatics 3–7 days, shaking daily.","Strain both, then blend to taste, adding a little rich syrup to round it.","Rest the blend a week before judging it."],
    keeps:"Years at room temperature.",
    uses:"House Old Fashioneds, signature drinks, and understanding what commercial bitters actually do.",
    note:"Cinchona contains quinine: potentially dangerous in quantity. Keep it to trace amounts, and buy from a reputable botanical supplier." },

  // ===== ACIDS & CORDIALS =====
  { name:"Oleo Saccharum", cat:"Acids & Cordials", ratio:"Peels of 4–6 citrus : 1 cup sugar", yield:"≈ 6–8 oz of intensely aromatic syrup",
    steps:["Peel the citrus with a Y-peeler, taking as little white pith as possible.","Toss the peels thoroughly with sugar in a sealed container.","Rest 2–12 hours at room temperature. The sugar's osmotic pressure pulls the oil out of the peel.","Once the sugar has become a fragrant slurry, add a splash of hot water to dissolve the remaining crystals, then strain.","Squeeze the spent peels before discarding."],
    keeps:"2 weeks refrigerated.",
    uses:"Punches, Fish House Punch, Chatham Artillery, and anywhere you want citrus aroma without citrus acid.",
    note:"The single most aromatic thing you can make behind a bar, and it costs you only the peels you were already discarding. Make it whenever you juice a case of lemons." },
  { name:"Super Juice", cat:"Acids & Cordials", ratio:"Peels of the fruit + citric & malic acid + water", yield:"About 6× the juice from the same fruit",
    steps:["Peel your limes (or lemons), then juice them and set the juice aside.","Weigh the peels. Add citric acid at 66% of the peel weight and malic acid at 33% (for limes; use mostly citric for lemons).","Toss peels with the acids and rest 1–2 hours to make an acid-oleo.","Add water equal to about 16× the peel weight and blend until fully dissolved.","Strain, then combine with the reserved fresh juice."],
    keeps:"1–2 weeks refrigerated, dramatically longer than fresh juice.",
    uses:"High-volume service, catering, and any bar where lime cost or waste is a real problem.",
    note:"A modern bar technique that produces a stable, remarkably accurate lime substitute using the whole fruit. It is not identical to fresh juice, it's flatter aromatically, but it's far better than bottled and it eliminates waste." },
  { name:"Lime Cordial", cat:"Acids & Cordials", ratio:"Lime oleo + lime juice + sugar", yield:"≈ 16 oz",
    steps:["Make an oleo saccharum from the lime peels.","Combine with equal parts fresh lime juice and dissolve the sugar fully.","Add 1 g citric acid per 100 ml to stabilize and brighten.","Strain and bottle."],
    keeps:"3 weeks refrigerated.",
    uses:"Gimlets made the historical way, Ti' Punch variations, Lemon Lime & Bitters.",
    note:"The Gimlet was built on cordial, not fresh juice and syrup. Make one of each and taste them side by side; they're different drinks." },
  { name:"Fruit Shrub (Drinking Vinegar)", cat:"Acids & Cordials", ratio:"1 part fruit : 1 part sugar : 1 part vinegar, by weight", yield:"≈ 20 oz per pound of fruit",
    steps:["COLD METHOD (better flavor): Macerate chopped fruit with sugar 24–48 hours refrigerated until syrupy. Strain, then stir in the vinegar. Rest 3–7 days before using: the harshness mellows.","HOT METHOD (faster): Simmer fruit, sugar, and water briefly, strain, then add vinegar off the heat.","Use apple cider or champagne vinegar; white distilled is too aggressive."],
    keeps:"2–3 months refrigerated: the acid preserves it. It improves for the first few weeks.",
    uses:"Shrub sodas, zero-proof drinks, Blackberry Bramble, and anywhere you want acid without citrus.",
    note:"Vinegar acidity hits a different part of the palate than citrus, sharper, longer, more savory. It's the best tool for making a sober drink taste structured." },
  { name:"Acid Adjusting", cat:"Acids & Cordials", ratio:"Citric, malic, tartaric or lactic acid in solution",
    yield:"Make a 25% solution: 25 g acid to 100 g water",
    steps:["Citric acid tastes like lemon; malic like green apple (and lime, in part); tartaric like grape; lactic like dairy and soft fruit.","To mimic lime: roughly 2 parts citric to 1 part malic.","To make a low-acid juice behave like a sour ingredient, adjust it to about 6% total acidity, the natural level of lemon and lime.","Always taste as you go; acids compound fast."],
    keeps:"Solutions keep for months refrigerated; dry acids keep indefinitely.",
    uses:"Making grapefruit, orange, or pineapple juice function as a proper sour; stabilizing batched drinks.",
    note:"This is how you build a Margarita on orange juice or a sour on watermelon. Acid adjusting is the most powerful modern technique on this list." },
  { name:"Brandied Cherries", cat:"Acids & Cordials", ratio:"1 lb cherries : 8 oz rich syrup : 4 oz brandy or bourbon", yield:"≈ 1 quart",
    steps:["Pit fresh or use good frozen dark cherries.","Warm rich syrup with a cinnamon stick, a strip of lemon peel, and a pinch of salt.","Off the heat, add the cherries and let them cool in the syrup.","Stir in the brandy and a dash of Angostura, jar, and refrigerate.","Wait at least a week before serving."],
    keeps:"3 months refrigerated.",
    uses:"Manhattans, Old Fashioneds, whiskey sours, anything that deserves better than a neon maraschino.",
    note:"The bright red cocktail cherry is bleached fruit in dyed corn syrup. Making your own, or buying Luxardo, is the cheapest upgrade in visible quality a bar can make." },

  // ===== JUICE & GARNISH =====
  { name:"The Juice Program", cat:"Juice & Garnish", ratio:"See yields below", yield:"Lemon ≈ 1–1.25 oz · Lime ≈ 0.75–1 oz · Orange ≈ 2–3 oz · Grapefruit ≈ 5–6 oz",
    steps:["Juice fresh every day; twice daily for lime if you're busy.","Roll the fruit firmly under your palm before juicing and use room-temperature fruit; both increase yield noticeably.","Strain juice through a fine mesh to remove pulp and seeds unless a spec wants the texture.","Label every container with the juice and the time it was pressed."],
    keeps:"Lime: peaks around 2–4 hours after pressing, declines noticeably after 8, unusable by 24. Lemon: more forgiving, good for about two days refrigerated. Orange and grapefruit: oxidize fast, press to order where possible.",
    uses:"Everything. Fresh citrus is the single largest quality variable in any cocktail program.",
    note:"Lime juice genuinely improves for the first few hours and then falls off a cliff. If your Daiquiris taste different at 6pm and midnight, this is why." },
  { name:"Cutting Garnishes", cat:"Juice & Garnish", ratio:"Cut fresh every shift, no exceptions", yield:"1 lemon ≈ 8 wheels or 6 twists · 1 lime ≈ 8 wedges",
    steps:["WHEELS: slice evenly about 1/4 inch, notch to sit on the rim.","WEDGES: halve lengthwise, then cut each half into 3–4 wedges; trim the membrane so they squeeze cleanly.","TWISTS: Y-peeler, minimal pith, trim to a clean rectangle.","HORSE'S NECK: one continuous spiral peel from the whole fruit. Practice on cheap fruit.","FLAG: cherry and orange slice on a pick.","Store cut garnish covered and refrigerated; keep twists in a sealed container with a barely damp towel."],
    keeps:"One shift. A dried-out lime wheel tells a guest everything about your standards.",
    uses:"Every drink that leaves your station.",
    note:"The doctrine here: the garnish is the first thing the guest's nose meets. It is an ingredient, not decoration." },
  { name:"Dehydrated Garnishes", cat:"Juice & Garnish", ratio:"Thin, even slices, about 1/8 inch", yield:"1 orange ≈ 10–12 wheels",
    steps:["Slice citrus as thinly and evenly as you can. A mandoline helps.","Dehydrate at 135°F for 6–12 hours, or bake at your oven's lowest setting on parchment, flipping occasionally.","They're done when completely leathery with no soft spots.","Store airtight with a silica packet if you have one."],
    keeps:"Several weeks airtight, well away from humidity.",
    uses:"Garnish for high-volume service, batched drinks, and anything where you can't cut to order.",
    note:"They look impressive and save time, but they contribute aroma rather than oil. Use a fresh expressed peel when the drink actually needs the citrus oils." },
  { name:"Pickled Onions & Savory Garnish", cat:"Juice & Garnish", ratio:"1 cup vinegar : 1 cup water : 2 tbsp sugar : 1 tbsp salt", yield:"≈ 1 pint",
    steps:["Bring the brine ingredients to a simmer with peppercorns, a bay leaf, and a smashed garlic clove.","Pour hot over peeled pearl onions in a clean jar.","Cool, seal, and refrigerate at least 48 hours before using."],
    keeps:"2 months refrigerated.",
    uses:"Gibsons, Bloody Marys, Caesars, and savory garnish trays.",
    note:"A house Gibson garnish is a small detail that regulars notice immediately and remember." },
  { name:"Ice Program", cat:"Juice & Garnish", ratio:"Match the ice to the job", yield:"Plan roughly 1–2 lbs per guest per hour in service",
    steps:["LARGE CUBES for spirit-forward rocks drinks: slow dilution.","1-INCH CUBES for shaking; cracked ice chills faster but dilutes faster too.","CRUSHED for juleps, swizzles, and tiki: it's the engine of the drink, not a filler.","CLEAR ICE: freeze directionally in an insulated cooler with the lid off so it freezes top-down and pushes air and impurities to the bottom; cut off the cloudy base."],
    keeps:"Ice absorbs odors; keep it covered and never store food or garnish in the ice well.",
    uses:"Every drink you make.",
    note:"Wet, small, warm ice over-dilutes everything. If your drinks taste watery, look at your ice before you touch your specs." },
];

const PREP_LISTS = [
  ["Opening (90 minutes before doors)",[
    "Wash hands, tie back hair, clean apron. Sanitizer bucket made and dated.",
    "Wipe down the entire bar top, rail, and station surfaces.",
    "Check the 86 list from last night and the walk-in for anything that turned.",
    "Juice all citrus for the shift; label each container with the time pressed.",
    "Check every syrup: level, date, smell. Anything doubtful gets dumped, not gambled on.",
    "Cut garnishes fresh. Fill garnish trays; keep backups refrigerated.",
    "Stock ice wells; check the machine is producing and the bin is clean.",
    "Fill speed rail to par, labels facing out; check every pour spout is clean and unclogged.",
    "Restock beer, wine by the glass, and back-bar gaps from storage.",
    "Set glassware: polish and stage coupes, rocks, collins, and specialty glasses.",
    "Clean and stage tools: tins, jiggers, strainers, barspoons, muddlers, peelers.",
    "Test the POS, the printer, and that you have change and pens.",
  ]],
  ["Pre-Shift (15 minutes before doors)",[
    "Taste your citrus. Lime acidity varies daily and your specs may need a nudge.",
    "Taste anything you're unsure of: a dead vermouth caught now saves twenty bad drinks.",
    "Review the 86 list and know your substitutions before a guest asks.",
    "Review reservations, large parties, and any VIP or allergy notes.",
    "Confirm tonight's specials and any new menu items, including how they're built.",
    "Agree on station assignments and who's calling the well.",
    "Set your mise: everything within arm's reach, in the same place, every shift.",
  ]],
  ["During Service",[
    "Wipe as you go. A cluttered station is a slow station.",
    "Re-stock in the lulls: never wait until you're out.",
    "Rotate garnish and refill juice before it hits empty.",
    "Burn the ice immediately if any glass breaks near the well. The entire well, every time.",
    "Change sanitizer water when it's visibly cloudy.",
    "Note anything running low for the 86 list and tell whoever's ordering.",
  ]],
  ["Closing",[
    "Last call and final pours; collect all glassware.",
    "Seal, label, date, and refrigerate every juice and syrup. Discard anything past its life.",
    "Empty, wash, and dry ice wells; never leave standing water.",
    "Pull, soak, and rinse all pour spouts; fruit flies live in dirty spouts.",
    "Break down and sanitize tools, mats, shakers, and jiggers.",
    "Wipe every surface including under the rail and behind the bottles.",
    "Take inventory notes: what got hit hard, what needs ordering.",
    "Write tomorrow's prep list while tonight is fresh in your memory.",
    "Sweep, mop, take out trash and recycling, empty the drain trays.",
  ]],
  ["Weekly Deep Prep",[
    "Make or replenish the long-lead preps: orgeat, falernum, grenadine, shrubs, brandied cherries.",
    "Start any infusions or tinctures that need days to develop.",
    "Deep clean the ice machine, soda gun, and drains.",
    "Full back-bar inventory and order to par.",
    "Rotate stock FIFO; move older bottles and containers forward.",
    "Wipe down every bottle: sticky bottles are the clearest sign of a neglected bar.",
    "Taste your entire vermouth and amaro shelf. Replace anything flat.",
    "Calibrate: run the free-pour drill and the consistency test.",
  ]],
];

const PREP_SAFETY = [
  ["Label everything, always","Every container gets the contents, the date made, and the discard date. Masking tape and a sharpie is enough. An unlabeled container is a mystery, and mysteries get thrown away, which is more expensive than the label. Health inspectors check this first, and in most jurisdictions it's a violation on its own."],
  ["Know the shelf lives","Rough guide, all refrigerated: fresh juice 1 day (lime), 2 days (lemon); 1:1 simple 3–4 weeks; 2:1 rich 6–8 weeks; honey syrup 1 month; fresh ginger syrup 2 weeks; herb syrups 2 weeks; dairy and coconut mixes 5 days; shrubs 2–3 months; anything with high-proof spirit in it, months. When in doubt, dump it: a bad batch costs you a guest, and the syrup costs you a dollar."],
  ["Recognize spoilage","Look for cloudiness in a syrup that was clear, surface film, mold at the neck or under the cap, bubbles or fizzing (that's fermentation), and any sour or 'off' smell. Mold in one spot means the whole container is compromised: you cannot scoop it out. Yeast and bacteria travel throughout the liquid long before you see anything."],
  ["Refrigeration and cooling","Cool preparations completely before sealing and refrigerating: trapped steam creates condensation, which dilutes the surface and invites mold. Keep the fridge at or below 40°F, and never store syrups in the ice well. Shallow containers cool faster and more safely than deep ones."],
  ["Raw egg and dairy","Use fresh, properly refrigerated eggs and crack them into a separate container so a bad one doesn't ruin a drink. Never hold pre-separated whites at room temperature. Aquafaba is a legitimate substitute that eliminates the risk entirely and works for vegan guests. Some jurisdictions require pasteurized eggs for raw service: know your local rule."],
  ["Allergens are your responsibility","Orgeat and falernum contain tree nuts and are not obvious hazards to a guest. Cream, Irish cream, and coconut mixes are dairy or dairy-adjacent. Egg white appears in far more classics than most guests expect. Some bitters and amari contain gluten. Label these preps clearly on the container and know your menu's allergens without having to check: a guest asking is often asking because the answer really matters."],
  ["Cross-contamination and hygiene","Separate cutting boards and knives for citrus and for anything savory. Never use the same tongs for garnish and for anything else. Wash hands after handling money, phones, or trash, every time. Sanitizer bucket at proper dilution, changed when cloudy. Never use your hands to scoop ice, and never put a glass in the ice well as a scoop; if it chips, the entire well is gone."],
  ["FIFO and stock rotation","First in, first out. New stock goes behind old stock, every time you restock. Date everything on arrival, not just on opening. This applies as much to your syrups and juices as to your bottles, and it's the difference between a program that runs on par levels and one that runs on panic."],
];

function renderPrep(){
  const p = state.prep;
  const nav = PREP_CATS.concat(['Technique Videos','The Prep List','Storage & Safety']).map(c =>
    '<button class="tab-btn'+(p.cat===c?' active':'')+'"'+(p.cat===c?' aria-current="true"':'')+' data-act="prep-cat" data-c="'+esc(c)+'">'+esc(c)+'</button>').join('');
  const wrap = (inner) => '<div class="col"><nav class="tabs" style="margin-bottom:4px">'+nav+'</nav>'+inner+'</div>';

  if(p.cat==='Technique Videos'){
    return wrap(techniqueHTML());
  }

  if(p.cat==='The Prep List'){
    const rows = PREP_LISTS.map(([t,items]) => {
      const open = p.listOpen===t;
      const li = items.map(x => '<li class="small dim lh" style="margin-bottom:6px">'+esc(x)+'</li>').join('');
      return '<div class="panel" style="padding:0 16px">'
        + '<button class="accordion-btn'+(open?' open':'')+'" aria-expanded="'+(open?'true':'false')+'" data-act="prep-list" data-t="'+esc(t)+'">'
        + '<span>'+esc(t)+'</span><span style="color:var(--brass)">'+(open?'−':'+')+'</span></button>'
        + (open ? '<div class="accordion-body"><ul style="padding-left:18px;margin:0">'+li+'</ul></div>' : '')+'</div>';
    }).join('');
    return wrap('<div class="small dim lh" style="padding:0 4px">Mise en place: everything in its place. The systems half of the job: service is won or lost before the first guest sits down, and the bartender who preps well looks calm at midnight while everyone else is drowning.</div>'+rows);
  }

  if(p.cat==='Storage & Safety'){
    const rows = PREP_SAFETY.map(([t,txt]) => {
      const open = p.safeOpen===t;
      return '<div class="panel" style="padding:0 16px">'
        + '<button class="accordion-btn'+(open?' open':'')+'" aria-expanded="'+(open?'true':'false')+'" data-act="prep-safe" data-t="'+esc(t)+'">'
        + '<span>'+esc(t)+'</span><span style="color:var(--brass)">'+(open?'−':'+')+'</span></button>'
        + (open ? '<div class="accordion-body"><div class="small dim lh">'+esc(txt)+'</div></div>' : '')+'</div>';
    }).join('');
    return wrap('<div class="small dim lh" style="padding:0 4px">The unglamorous half that keeps guests safe and keeps you employed. Label everything, know your shelf lives, and when in doubt, dump it.</div>'+rows);
  }

  const list = PREPS.map((x,i)=>({x,i})).filter(({x}) => x.cat===p.cat);
  const rows = list.map(({x,i}) => {
    const open = p.open===i;
    const steps = x.steps.map(s => '<div class="spec-line"><span>·</span><span>'+esc(s)+'</span></div>').join('');
    const body = open ? '<div class="drink-body" style="gap:14px">'
      + '<div class="ticket"><div class="ticket-inner">'
      + '<div class="tc"><div class="tix-label">Prep sheet</div><div class="tix-name">'+esc(x.name.toUpperCase())+'</div></div>'
      + '<div class="tix-rule"></div>'
      + '<div><span class="tix-label">Ratio </span>'+esc(x.ratio)+'</div>'
      + '<div><span class="tix-label">Yield </span>'+esc(x.yield)+'</div>'
      + '<div class="tix-rule"></div>'+steps+'<div class="tix-rule"></div>'
      + '<div><span class="tix-label">Keeps </span>'+esc(x.keeps)+'</div>'
      + '<div><span class="tix-label">Used in </span>'+esc(x.uses)+'</div>'
      + '</div></div>'
      + '<div style="max-width:440px"><div class="eyebrow mb1">Why it matters</div><div class="small dim lh">'+esc(x.note)+'</div></div>'
      + prepVideoHTML(x)
      + '</div>' : '';
    return '<div class="panel"><button class="drink-head" aria-expanded="'+(open?'true':'false')+'" data-act="prep-open" data-i="'+i+'"'+(open?' data-open="1"':'')+'>'
      + '<span class="bold">'+esc(x.name)+'</span>'
      + '<span class="plusminus">'+(open?'−':'+')+'</span></button>'+body+'</div>';
  }).join('');
  return wrap('<div class="small dim lh" style="padding:0 4px">Every great drink is decided before service starts. '+PREPS.length+' prep sheets with ratios, method, yield, and shelf life: measured by <span class="brass2">weight</span>, because a cup of sugar and a cup of water are not equal parts, and that single error is why some bars can\'t make the same drink twice.</div>'
    + '<div class="row"><span class="eyebrow">'+esc(p.cat)+'</span><span class="tiny dim push">'+list.length+' preps</span></div>'
    + '<div class="col-sm">'+rows+'</div>');
}

/* ---------------- WATCH IT MADE: VIDEO LINKS ----------------
   Design note: these are SEARCH links, not hardcoded video IDs.
   A pinned video ID rots: channels delete, privatize, and re-upload,
   and a study guide full of dead links is worse than none. A search
   URL is permanently stable and always returns current results. */

const CHANNELS = [
  { id:'anders', name:'Anders Erickson', handle:'@AndersErickson',
    url:'https://www.youtube.com/@AndersErickson',
    about:'Chicago pro with two decades behind the bar. Dense, precise, beautifully shot, with real history on every drink. The best single channel for classics done correctly.',
    best:'Classics, technique, home-bar building' },
  { id:'steve', name:'Steve the Bartender', handle:'@SteveTheBartender',
    url:'https://www.youtube.com/@SteveTheBartender',
    about:'Australian bartender with 500+ cocktail videos, the deepest back catalogue on YouTube. If a drink exists, this channel has probably filmed it. No-fuss, straight to the build.',
    best:'Sheer breadth: obscure drinks, batching, tools' },
  { id:'chemistry', name:'Cocktail Chemistry', handle:'@CocktailChemistry',
    url:'https://www.youtube.com/@CocktailChemistry',
    about:'San Francisco. The "Basic Cocktails" series is a clean, well-paced tour of the canon; the advanced episodes go deep on clarification, fat-washing, and technique.',
    best:'Advanced technique, clarified and batched drinks' },
  { id:'barfly', name:'The Educated Barfly', handle:'@TheEducatedBarfly',
    url:'https://www.youtube.com/@TheEducatedBarfly',
    about:'Encyclopedic recipe library plus opinionated list videos: best bourbon under $30, which gin for which drink. Good for building a shopping brain.',
    best:'Recipe completism, syrups and prep, bottle picks' },
  { id:'howtodrink', name:'How to Drink', handle:'@HowToDrink',
    url:'https://www.youtube.com/@HowToDrink',
    about:'Funny, historically curious, and genuinely educational: strong on the why behind a drink rather than just the build.',
    best:'History, context, and cocktail archaeology' },
  { id:'behindbar', name:'Behind the Bar', handle:'@behindthebar',
    url:'https://www.youtube.com/@behindthebar',
    about:'Melbourne. A working bar manager\'s perspective: service reality, menu thinking, and drinks explained by someone who makes them for money.',
    best:'Professional service perspective, modern classics' },
  { id:'commonman', name:'Common Man Cocktails', handle:'@commonmancocktails',
    url:'https://www.youtube.com/@commonmancocktails',
    about:'Long-running home-bartender channel. Approachable, unpretentious, and strong on equipment reviews, syrups, and beginner questions.',
    best:'Beginners, gear, home setups, party drinks' },
];
const chanById = function(id){ return CHANNELS.filter(function(c){ return c.id===id; })[0]; };

/* Regional drinks: an English query returns little. Adding the native
   search term surfaces the videos actually made where the drink is from. */
const NATIVE_TERMS = {
  'Somaek':'소맥 만들기','Chu-Hai':'チューハイ 作り方','Lemon Sour':'レモンサワー 作り方',
  'Whiskey Highball':'ハイボール 作り方','Rabo de Galo':'rabo de galo receita',
  'Caipirinha':'caipirinha receita','Caipiroska':'caipiroska receita','Batida':'batida receita',
  'Agua de Tamarindo':'agua de tamarindo receta','Horchata':'horchata receta',
  'Canchánchara':'canchánchara receta','Rebujito':'rebujito receta','Kalimotxo':'kalimotxo receta',
  'Tinto de Verano':'tinto de verano receta','Piscola':'piscola receta','Chilcano':'chilcano receta',
  'Terremoto':'terremoto trago receta','Cantarito':'cantarito receta','Vampiro':'vampiro bebida receta',
  'Charro Negro':'charro negro receta','Batanga':'batanga receta','Paloma':'paloma receta',
  'Michelada':'michelada receta','Chelada':'chelada receta','Carajillo':'carajillo receta',
  'Agua de Valencia':'agua de valencia receta','Sangria':'sangría receta',
  'Coquito':'coquito receta','Mexican Candy Shot':'shot de dulce mexicano',
  'Chuflay':'chuflay receta','Ti\' Punch':'ti punch recette','Sekanjabin':'سکنجبین',
  'Nimbu Pani':'nimbu pani recipe','Mango Lassi':'mango lassi recipe',
  'Bombardino':'bombardino ricetta','Caffè Corretto':'caffè corretto',
  'Sgroppino':'sgroppino ricetta','Negroni Sbagliato':'negroni sbagliato ricetta',
  'Fernet con Coca':'fernet con coca','Porto Tónico':'porto tónico receita',
  'Tatanka':'tatanka drink przepis','Guinness Punch':'guinness punch recipe Jamaican',
  'Wray & Ting':'wray and ting Jamaica','Somaek ':'소맥',
};
function nativeFor(d){ return NATIVE_TERMS[d.name] || null; }

/* Search scoping: the person studying gets to steer this. */
function scopeSuffix(){
  return (progress.vidPrefs && progress.vidPrefs.longform) ? ' -shorts full tutorial' : '';
}
function preferredChannel(){
  const id = progress.vidPrefs && progress.vidPrefs.channel;
  return id && id!=='auto' ? chanById(id) : null;
}

/* Category-level: watch a whole family or category back to back. */
function categoryVideoLink(label, kind){
  let q;
  if(kind==='family') q = label + ' family cocktails explained bartender';
  else if(kind==='tier') q = label + ' classic cocktails bartender guide';
  else if(kind==='shot') q = label + ' shots bartender guide';
  else if(kind==='na') q = label + ' mocktails non alcoholic guide';
  else q = label + ' cocktails guide';
  return ytSearch(q + scopeSuffix());
}
function categoryVideoHTML(label, kind){
  return '<a class="btn btn-ghost tiny" href="'+categoryVideoLink(label,kind)+'" target="_blank" rel="noopener noreferrer">▶ Watch a '+esc(label)+' rundown</a>';
}

/* Producer queries: strip slashes, parentheticals, and filler. */
function producerQuery(p){
  let n = p.name.replace(/\s*\([^)]*\)\s*/g,' ');
  if(n.indexOf('/')>=0) n = n.split('/')[0].trim();
  n = n.replace(/^MGP of Indiana$/,'MGP Lawrenceburg Indiana distillery');
  return n.trim() + ' distillery how it is made process';
}

/* Names that mean something else entirely to a search engine.
   Without a qualifier, "Saturn" returns planets and "Toronto" returns a city. */
const AMBIGUOUS = ['Cinderella','Snowball','Bramble','Saturn','Hurricane','Scorpion','Bishop','Toronto',
 'Alaska','Bronx','Brooklyn','Harvard','Princeton','Casino','Ferrari','Adios','Transfusion','Gunner',
 'Egg Cream','Horchata','Sangria','Switchel','Bellini','Mimosa','Chi Chi','Batida','Caesar','Michelada',
 'Shandy','Snakebite','Somaek','Terremoto','Pastis','Malört','Boilermaker','Pickleback','Aviation',
 'Paloma','Sidecar','Stinger','Gimlet','Manhattan','Rickey','Jasmine','Bijou','Tuxedo','Delmonico',
 'Metropole','Waldorf','Preakness','Seelbach','Chuflay','Caribou','Coquito','Bombardino','Rossini',
 'Sgroppino','Grasshopper','Mudslide','Bushwacker','Godfather','Godmother','Kamikaze','Starburst',
 'Gummy Bear','Jolly Rancher','Bazooka Joe','Tootsie Roll','Peppermint Patty','Jelly Bean',
 'Traffic Light','Bumble Bee','Bomb Pop','Creamsicle','Matcha Lemonade','Arnold Palmer','Roy Rogers',
 'Shirley Temple','Nimbu Pani','Sekanjabin','Cascara Fizz','Garibaldi','Siesta','Enzoni','Conference',
 'Diamondback','Scofflaw','Algonquin','Bamboo','Adonis','Coronation','Deshler','Astoria','Bradford',
 'Vesper','Gibson','Obituary Cocktail','Turf Cocktail','Alexander','Millionaire','Palmetto','Harvey Wallbanger'];

function needsQualifier(name){
  if(AMBIGUOUS.indexOf(name)>=0) return true;
  // single short word names are almost always ambiguous
  return name.split(' ').length===1 && name.length<=9;
}

/* Build a search query that actually returns the right video. */
function videoQuery(d, mode){
  const n = d.name;
  const low = n.toLowerCase();
  const has = function(w){ return low.indexOf(w)>=0; };
  let q = n;

  // Classify by what the drink IS, not just which list it sits in: the
  // cocktail list contains a few spirit-free drinks and a couple of shots.
  const isShot = d.src==='Shots' || /\bshot\b/i.test(n) || /\bshooter\b/i.test(n);
  const isNA = d.src==='Zero Proof' || d.spirit==='Spirit-free';

  if(isShot){
    if(!has('shot')) q += ' shot';
    q += ' recipe';
    if(needsQualifier(n)) q += ' bartender';
  } else if(isNA){
    // don't stack modifiers on names that already carry one
    const carries = /^(na |zero-proof|sober|virgin)/i.test(n) || has('mocktail');
    if(!carries) q += ' mocktail';
    q += ' non alcoholic recipe';
  } else {
    // cocktails: avoid appending "cocktail" when the name already says it,
    // and never call a Punch a cocktail
    const isPunch = /punch$/i.test(n);
    if(!has('cocktail') && !isPunch) q += ' cocktail';
    q += ' recipe';
    if(needsQualifier(n)) q += ' how to make bartender';
  }
  if(mode==='technique') q = n + ' cocktail technique how to';
  return q;
}

/* Primary channel: best first stop. Secondary: a genuinely different take. */
function channelFor(d){
  const g = (d.group||'').toLowerCase();
  const n = (d.name||'').toLowerCase();
  if(d.src==='Shots'){
    if(g.indexOf('layered')>=0 || g.indexOf('flaming')>=0) return 'chemistry';
    if(g.indexOf('industry')>=0) return 'behindbar';
    return 'commonman';
  }
  if(d.src==='Zero Proof'){
    if(g.indexOf('soda fountain')>=0 || g.indexOf('global')>=0) return 'steve';
    if(g.indexOf('bitter')>=0) return 'behindbar';
    return 'steve';
  }
  if(/clarified|milk punch|fat.wash|benton/.test(n)) return 'chemistry';
  if(g.indexOf('tiki')>=0 || /zombie|mai tai|painkiller|colada|hurricane|grog|swizzle|fog cutter|jet pilot/.test(n)) return 'chemistry';
  if(g.indexOf('punch')>=0) return 'howtodrink';
  if(d.tier===12) return 'commonman';
  if(d.tier===7) return 'commonman';
  if(d.tier===11) return 'barfly';
  if(d.tier===4) return 'behindbar';
  if(d.tier===6 || d.tier===10) return 'howtodrink';
  if(d.tier===9) return 'steve';
  if(d.tier && d.tier<=3) return 'anders';
  return 'anders';
}
function channel2For(d){
  const primary = channelFor(d);
  const order = ['anders','steve','barfly','chemistry','howtodrink','behindbar','commonman'];
  // pick a channel with a genuinely different angle from the primary
  const pairs = { anders:'barfly', steve:'anders', barfly:'anders', chemistry:'anders',
                  howtodrink:'anders', behindbar:'steve', commonman:'steve' };
  let second = pairs[primary] || 'steve';
  if(second===primary) second = order.filter(function(x){ return x!==primary; })[0];
  return second;
}

function ytSearch(q){
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
}
function videoLinksFor(d){
  const q = videoQuery(d);
  const scoped = q + scopeSuffix();
  const pref = preferredChannel();
  const c1 = pref || chanById(channelFor(d));
  let c2 = chanById(channel2For(d));
  if(c2.id === c1.id) c2 = chanById(channelFor(d));
  if(c2.id === c1.id) c2 = CHANNELS.filter(function(c){ return c.id!==c1.id; })[0];
  const nat = nativeFor(d);
  return {
    all: ytSearch(scoped), query: q, channel: c1,
    channelSearch: ytSearch(scoped + ' ' + c1.name),
    channel2: c2, channel2Search: ytSearch(scoped + ' ' + c2.name),
    native: nat, nativeSearch: nat ? ytSearch(nat) : null, pinned: !!pref,
  };
}
function videoRowHTML(d){
  const v = videoLinksFor(d);
  return '<div class="col-sm" style="gap:6px;max-width:440px">'
    + '<div class="eyebrow">Watch it made</div>'
    + '<div class="row" style="gap:8px">'
    + '<a class="btn btn-ghost tiny" href="'+v.all+'" target="_blank" rel="noopener noreferrer">▶ Search YouTube</a>'
    + '<a class="btn btn-ghost tiny" href="'+v.channelSearch+'" target="_blank" rel="noopener noreferrer">▶ '+esc(v.channel.name)+'</a>'
    + '<a class="btn btn-ghost tiny" href="'+v.channel2Search+'" target="_blank" rel="noopener noreferrer">▶ '+esc(v.channel2.name)+'</a>'
    + (v.native ? '<a class="btn btn-ghost tiny" href="'+v.nativeSearch+'" target="_blank" rel="noopener noreferrer">▶ '+esc(v.native)+'</a>' : '')
    + '</div>'
    + '<div class="tiny dim lh">'
    + (v.native ? 'The last button searches in the drink\'s home language: that is where the people who grew up making it post. ' : '')
    + 'Two takes beats one: watching different bartenders build the same drink teaches you which choices are the recipe and which are the house.'
    + (v.pinned ? ' <span class="brass2">Channel pinned in Notes → Video settings.</span>' : '')
    + '</div></div>';
}

/* Prep sheets, techniques, and tasting all deserve video help too. */
function prepQuery(p){
  const n = p.name.replace(/\s*\([^)]*\)\s*/g,' ').trim();
  if(p.cat==='Syrups') return n + ' syrup recipe bartender how to make';
  if(p.cat==='Infusions & Washes') return n + ' cocktail technique how to';
  if(p.cat==='Acids & Cordials') return n + ' bartender how to make';
  return n + ' bar technique how to';
}
function prepVideoHTML(p){
  const q = prepQuery(p);
  const c = p.cat==='Infusions & Washes' ? chanById('chemistry') : chanById('barfly');
  return '<div class="col-sm" style="gap:6px;max-width:440px">'
    + '<div class="eyebrow">Watch it made</div>'
    + '<div class="row" style="gap:8px">'
    + '<a class="btn btn-ghost tiny" href="'+ytSearch(q)+'" target="_blank" rel="noopener noreferrer">▶ Search YouTube</a>'
    + '<a class="btn btn-ghost tiny" href="'+ytSearch(q+' '+c.name)+'" target="_blank" rel="noopener noreferrer">▶ '+esc(c.name)+'</a>'
    + '</div></div>';
}

const TECHNIQUE_VIDEOS = [
  ['Shaking','how to shake a cocktail properly bartender technique','The hardest thing to learn from text. Watch how violently a proper shake actually is, and how the tin frosts.'],
  ['Stirring','how to stir a cocktail bar spoon technique','The barspoon rides the wall and the ice moves as one silent mass. Almost nobody gets this from a written description.'],
  ['Dry shake & egg white','dry shake egg white cocktail foam technique','Watch the difference between a lazy dry shake and one that holds a straw upright.'],
  ['Expressing a citrus peel','how to express a citrus peel cocktail garnish','Skin-side down, snap, wipe the rim. Two seconds of video replaces a paragraph.'],
  ['The flamed orange peel','flamed orange peel cocktail garnish technique','The signature move of the Rainbow Room revival. Watch it before you try it near a guest.'],
  ['Cutting garnishes','how to cut cocktail garnish twist wheel wedge','Wheels, wedges, twists, and the one-piece horse\'s neck spiral.'],
  ['Layering shots','how to layer shots bar spoon density technique','The inverted barspoon against the glass wall: the motion is the whole skill.'],
  ['Swizzling','how to swizzle cocktail crushed ice technique','Spinning the stick between your palms until the tin frosts. Looks trivial, isn\'t.'],
  ['Free pouring','how to free pour count bartender technique','Calibrating your count against a jigger. Watch a pro, then practice with water.'],
  ['Clear ice','how to make clear ice directional freezing','Directional freezing in a cooler, the cheapest upgrade to how your drinks look.'],
  ['Fat-washing','fat washing spirits cocktail technique','Melt, combine, freeze, skim, filter. Seeing the fat cap form makes the process obvious.'],
  ['Milk-washing / clarification','milk washing clarified cocktail technique','The curdle looks alarming and the filtered result looks impossible. Worth watching once before attempting.'],
  ['Building a shot round','how to pour a round of shots bartender speed','Lining glasses rim to rim and pouring in one continuous pass.'],
  ['Ramos Gin Fizz','how to make a Ramos Gin Fizz technique','The most demanding shake in the canon. Watch someone suffer through it properly.'],
];
function techniqueHTML(){
  const rows = TECHNIQUE_VIDEOS.map(function(t){
    return '<div class="panel p4 col-sm">'
      + '<div class="row between"><span class="bold">'+esc(t[0])+'</span>'
      + '<a class="chip" href="'+ytSearch(t[1])+'" target="_blank" rel="noopener noreferrer">▶ Watch</a></div>'
      + '<div class="small dim lh">'+esc(t[2])+'</div></div>';
  }).join('');
  return '<div class="col-sm">'
    + '<div class="small dim lh" style="padding:0 4px">Specs are text; technique is physical. These fourteen searches cover the motions a written guide genuinely cannot teach: watch each one once before you practice it.</div>'
    + rows + '</div>';
}

function channelDirectoryHTML(){
  const rows = CHANNELS.map(function(c){
    return '<div class="panel p4 col-sm">'
      + '<div class="row between"><span class="bold brass2">'+esc(c.name)+'</span>'
      + '<a class="chip" href="'+c.url+'" target="_blank" rel="noopener noreferrer">'+esc(c.handle)+' ↗</a></div>'
      + '<div class="small dim lh">'+esc(c.about)+'</div>'
      + '<div class="tiny"><span class="eyebrow">Best for </span><span class="dim">'+esc(c.best)+'</span></div>'
      + '</div>';
  }).join('');
  return '<div class="col-sm">'
    + '<div class="small dim lh" style="padding:0 4px">Seven channels worth your time. Watching a drink built is the fastest way to fix technique a written spec can\'t teach: how hard a proper shake actually is, what a correct expressed peel looks like, how a julep gets swizzled.</div>'
    + rows
    + '<div class="panel p4"><div class="tiny dim lh"><span class="brass2 bold">Why search links, not fixed videos: </span>'
    + 'every video button in this guide opens a YouTube search rather than one pinned video. Pinned links rot (creators delete, privatize, and re-upload constantly) and a study guide full of dead links is worse than one with none. A search always returns what currently exists, and lets you compare several bartenders\' takes on the same drink, which is better practice anyway.</div></div>'
    + '</div>';
}

