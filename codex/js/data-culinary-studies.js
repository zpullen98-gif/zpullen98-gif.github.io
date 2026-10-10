/* Culinary companion: reviewed observations, then a guest-centred decision.
   Exact house IDs name study records, not live stock. No score or saved state. */
var CODEX_CULINARY_STUDIES = {
  title: "Read the dish, describe the wine",
  subtitle: "A cook's aroma cabinet and a sommelier's conversation at the table.",
  reviewedOn: "2026-10-10",
  boundaries: [
    "Brennan's public food menus were checked on 10 October 2026. The named wine records come from the saved house study pack; current bottles, vintages, prices, pours and availability still need the current list and lineup.",
    "These are teaching options, not newly approved house pairings. A printed tasting-menu pairing is identified separately. Ask the guest what they enjoy, including whether they want wine at all.",
    "The food illustrations are ingredient and method studies, not photographs of current Brennan's plating. Confirm portions, preparation and presentation with the kitchen.",
    "Pictures build a vocabulary. Aroma, sweetness, acidity, tannin, body and alcohol need a real sample and careful comparison; they cannot be measured from a picture."
  ],
  sources: [
    { id: "tasting", title: "WSET: building wine-tasting skills", url: "https://www.wsetglobal.com/knowledge-centre/blog/2019/november/how-to-build-your-wine-tasting-skills/" },
    { id: "aroma", title: "WSET: why wine can smell unlike grapes", url: "https://www.wsetglobal.com/knowledge-centre/blog/2022/january/13/why-doesn-t-wine-taste-like-grapes" },
    { id: "lexicon", title: "WSET: tasting vocabulary and aroma references", url: "https://www.wsetglobal.com/media/11766/wset_l3wines_sat_en_may2022_issue2.pdf" },
    { id: "pairing", title: "WSET: food, wine and personal preference", url: "https://www.wsetglobal.com/knowledge-centre/blog/2023/july/13/four-rules-to-masterful-food-and-wine-pairing" },
    { id: "spice", title: "WSET: pairing drinks with spice", url: "https://www.wsetglobal.com/knowledge-centre/blog/2026/how-to-pair-drinks-with-spice/" },
    { id: "sauces", title: "Professional Cooking: classical sauces, chapter 9", url: "https://resources.escoffier.edu/textbooks/gisslen/professional_cooking_09.pdf" },
    { id: "breakfast", title: "Brennan's: breakfast and lunch menu", url: "https://www.brennansneworleans.com/menus/breakfast-and-lunch/" },
    { id: "dinner", title: "Brennan's: dinner menu", url: "https://www.brennansneworleans.com/menus/dinner/" },
    { id: "dinner-tasting", title: "Brennan's: dinner tasting menu", url: "https://www.brennansneworleans.com/menus/dinnertastingmenu/" }
  ],
  lessons: [
    {
      id: "describe", title: "Describe before you identify",
      intro: "Start with an observation you can explain, then consider what it might mean.",
      guideIds: ["grid-colour-rim"],
      body: [
        "Look against a plain white background in neutral light. Describe the visible hue and depth, then smell and taste separately. A golden appearance does not by itself tell you the grape, age, sweetness or weight of the wine.",
        "Build a short note from different kinds of evidence: what it resembles on the nose, whether it tastes sweet, whether it makes you salivate, how drying it feels, its weight and any warmth. More intense aroma is not automatically more body.",
        "Use plain words first. A useful guest description could be: apple-like aroma, dry on the palate and a mouthwatering finish. Name grape or origin only after considering several observations and the actual label."
      ],
      practice: {
        question: "A wine smells of ripe peach. What can you say about its sweetness?",
        answer: "You have an aroma observation, not a sweetness measurement. It may still taste dry. Assess sweetness on the palate and keep the peach description separate.",
        practise: "With a trainer and a real sample, give one aroma observation and one structural observation without naming the grape. Compare your wording before making an identity guess."
      },
      sources: ["tasting", "lexicon"]
    },
    {
      id: "fruit", title: "Fresh, ripe and cooked fruit",
      intro: "Use familiar fruit to make your tasting language more precise.",
      guideIds: ["culinary-fruit-references"],
      body: [
        "Read the plate across the top row, then the bottom row: fresh green apple, ripe peach, lemon peel, fresh cherry, dried cherry and cooked cherry compote. They are aroma references, not ingredients being added to wine.",
        "The cherry comparison asks you to notice condition as well as fruit family. Fresh fruit, a dried piece and a cooked preserve need not smell alike. Smell real examples separately and choose the closest description you can defend.",
        "A dried or cooked-fruit resemblance does not alone prove bottle age, hot-climate origin or residual sugar. These pictures offer a vocabulary, not a grape-identification key."
      ],
      practice: {
        question: "How would you improve the description 'fruity'?",
        answer: "Name a recognisable resemblance and its condition, such as fresh cherry or cooked cherry. Then describe sweetness independently instead of assuming the wine contains sugar because its aroma recalls sweet food.",
        practise: "Smell fresh cherry, dried cherry and plain cherry compote without added spice in separate containers. Describe one difference, then look for a resemblance in a supervised wine sample without forcing a match."
      },
      sources: ["aroma", "lexicon", "tasting"]
    },
    {
      id: "aromas", title: "Herbal, spice and cellar references",
      intro: "An aroma can suggest a question about the wine without answering it for you.",
      guideIds: ["culinary-savoury-references"],
      body: [
        "Read across the top row, then the bottom row: cut green bell pepper, black peppercorns, vanilla pod, toasted bread, butter and dried mushroom. Name the resemblance before suggesting a possible source.",
        "Green-pepper and black-pepper notes may be associated with grape-derived character. Vanilla may suggest oak influence; butter may occur with malolactic conversion. Toast can overlap between oak and yeast-related development, while mushroom-like notes may emerge with maturation.",
        "These are possibilities, not diagnostic rules. Butter does not establish new oak, toast does not prove a particular sparkling method, and mushroom does not supply a vintage. Compare the whole wine, then check reliable producer information when explaining its production.",
        "A pepper aroma in wine is different from the burning sensation of chilli in a dish. Ask about the guest's sensitivity to heat separately from their enjoyment of spice aromas."
      ],
      practice: {
        question: "You notice a buttery aroma. Is that proof that the wine was aged in a new oak barrel?",
        answer: "No. A buttery note can relate to malolactic conversion. Oak and malolactic conversion are separate choices; the aroma alone confirms neither the complete method nor the vessel.",
        practise: "Smell the six real kitchen references separately. For two of them, name the resemblance and one question you would investigate before making a claim about the wine."
      },
      sources: ["aroma", "lexicon", "spice"]
    },
    {
      id: "sauce", title: "The sauce changes the question",
      intro: "Read the whole dish: preparation, sauce, garnish, texture and the guest's taste.",
      guideIds: ["culinary-sauce-comparison", "culinary-hussarde-components"],
      body: [
        "The protein is a starting point. Compare the raw-oyster preparation with mignonette against the Louisiana Oysters with BBQ sauce and pickled greens. The two menus give you different seasoning and texture questions; the word oysters alone cannot choose the wine.",
        "For Eggs Hussarde, remember both hollandaise and marchand de vin. A recommendation can emphasise refreshing contrast, a savoury connection or the guest's preferred style. The presence of red-wine sauce does not require a red wine.",
        "For Gulf Fish en Papillote, read the banana-leaf preparation and the crab, sorghum, almonds, olives and tomato together. Confirm how the kitchen uses sorghum before describing the dish as sweet; a name on a menu does not tell you its form or amount.",
        "Use the studies below to separate printed ingredients from a proposed pairing explanation. Describe what you would check with a real bite and sip, rather than promising that acid chemically removes fat or that a whole appellation will inevitably taste metallic."
      ],
      practice: {
        question: "Which two sauces distinguish Eggs Hussarde, and why do both matter?",
        answer: "Hollandaise and marchand de vin. Consider the butter-and-yolk richness as well as the savoury red-wine sauce, bacon and egg. Either bubbles or an appropriately chosen still wine may be defensible when you explain the emphasis and ask the guest's preference.",
        practise: "Choose one dish below. Identify two menu components and one preparation detail that still needs a kitchen answer, then explain how those details could change your wine suggestion."
      },
      sources: ["breakfast", "dinner", "pairing", "sauces"]
    },
    {
      id: "recommend", title: "Recommend, explain, adapt",
      intro: "Offer a reason and an alternative, then listen to the person at the table.",
      guideIds: [],
      body: [
        "Begin with the guest: still or sparkling, a preferred style, comfort with sweetness, sensitivity to heat and a comfortable price range. Check the current list before promising a bottle, vintage or pour. A thoughtful non-alcoholic choice is also part of hospitality.",
        "Choose two plausible options from the practice studies. Explain what each would emphasise and what might make you choose differently. These are discussion paths, not a contest with one universally correct wine.",
        "For a heat-sensitive guest, consider alcohol, tannin and actual sweetness together. Some sweetness can soften the perception of chilli heat; avoid assuming every Riesling is sweet. The stored C.H. Berres Old Vines record needs the actual cuvee and open bottle checked before a precise sweetness or alcohol claim.",
        "Rehearse: 'For this dish, I would suggest [confirmed wine] because [one clear reason]. If you prefer [different emphasis], [confirmed alternative] may suit you better.' After a real bite and sip, ask what the guest enjoys and adapt."
      ],
      practice: {
        question: "A guest dislikes sweet wine but is sensitive to chilli. What comes before your recommendation?",
        answer: "Acknowledge both preferences and ask about the dish's heat. Check the actual wine's alcohol, sweetness and tannin rather than prescribing Riesling by name. Offer a suitable confirmed option, and consider a non-alcoholic alternative with the team if that better meets the guest's wishes.",
        practise: "Select a dish and one option below. Give a twenty-second explanation, offer the other path, then rehearse one follow-up question. No choice here changes your study score."
      },
      sources: ["pairing", "spice"]
    }
  ],
  structure: [
    { id: "aroma", label: "Aroma", observe: "What does the smell remind you of? Name a familiar reference, then its condition.", distinguish: "A ripe-fruit aroma is different from sweetness tasted on the palate." },
    { id: "sweetness", label: "Sweetness", observe: "Assess the sweet taste in the actual sample, alongside the rest of its structure.", distinguish: "Fruit intensity, colour and the word Riesling cannot establish residual sugar." },
    { id: "acidity", label: "Acidity", observe: "Notice sourness and the mouthwatering response, comparing with another sample when possible.", distinguish: "Mouthwatering acidity differs from the drying grip of tannin." },
    { id: "tannin", label: "Tannin", observe: "Describe the drying, gripping or astringent sensation and its texture.", distinguish: "Astringency is not the same observation as sourness or bitterness." },
    { id: "body", label: "Body", observe: "Describe the overall weight and fullness of the wine in your mouth.", distinguish: "Aroma intensity and slow-moving tears on the glass are not a body scale." },
    { id: "alcohol", label: "Alcohol", observe: "Notice any warmth in the context of the wine and its serving temperature.", distinguish: "A warmth impression does not give an exact alcohol percentage; check the label for that figure." }
  ],
  dishes: [
    {
      id: "raw-oysters", title: "Grand Isle Jewel Oysters: brine and mignonette",
      dishIds: ["d-nd0d2czb"], art: null,
      description: "The dinner menu identifies raw oysters with preserved Fresno chilli mignonette and parsley.",
      variables: [
        { label: "Acid and brine", detail: "Taste the oyster and its actual dressing together before deciding how much brightness the wine needs." },
        { label: "Chilli", detail: "The menu names Fresno chilli. Its quantity and perceived heat need a real taste or kitchen confirmation." },
        { label: "Still or sparkling", detail: "Ask the guest which experience they enjoy; acidity and bubbles are different sensations." }
      ],
      options: [
        { id: "raw-still", label: "A crisp still-white path", wineId: "w-naty4r19", benefit: "The saved Pazo das Bruxas Albarino record offers a starting point for a fresh, citrus-led still white alongside the dressing.", tradeoff: "Check the actual vintage and taste. If the dressing is very hot or the guest wants a softer impression, a very brisk dry wine may be less comfortable." },
        { id: "raw-sparkling", label: "The printed tasting-menu Champagne path", wineId: "w-3yaps1gt", benefit: "The official dinner tasting menu checked on 10 October 2026 names Charles Lafitte Brut with this oyster course. Study how its freshness and bubbles sit with the brine and dressing.", tradeoff: "That printed pairing belongs to the tasting menu. Confirm the current pairing and whether a separate pour is available; do not promise it as an a la carte glass." }
      ],
      guestQuestion: "Would you prefer a still white or bubbles, and how do you feel about chilli heat?",
      boundary: "The menu establishes the raw preparation and named garnish. It does not establish a fixed heat level, portion count or a universal best pairing.",
      sources: ["dinner", "dinner-tasting", "pairing", "spice"]
    },
    {
      id: "bbq-oysters", title: "Louisiana Oysters: sauce, pickle and crunch",
      dishIds: ["d-wckf36s5"], art: null,
      description: "The daytime menu names New Orleans BBQ sauce, pickled collard greens, shallots and fried saltine crumble.",
      variables: [
        { label: "Sauce weight", detail: "The house study notes describe a buttery, peppery sauce. Check the kitchen's actual preparation and intensity." },
        { label: "Pickle", detail: "The collards add another question about acidity; taste the combined bite, not the sauce alone." },
        { label: "Texture", detail: "The crumble contributes crunch. Confirm how the oysters themselves are cooked and served before describing the method." }
      ],
      options: [
        { id: "bbq-texture", label: "A textured Chardonnay path", wineId: "w-uw1bb9ax", benefit: "The stored Gainey Chardonnay is described as creamy but fresh. If the open bottle shows that balance, it gives you a textural connection to discuss with the sauce.", tradeoff: "Taste before promising a match. Strong oak or insufficient freshness in the actual bottle could dominate the oyster or feel heavy with the sauce." },
        { id: "bbq-bubbles", label: "A sparkling contrast", wineId: "w-dbz9e960", benefit: "The listed house Champagne provides a second study path for a guest who enjoys bubbles and a brighter contrast to a rich bite.", tradeoff: "Confirm the exact house bottle and how it tastes. Its category alone does not tell you perceived dryness, and a very brisk finish may not suit every guest." }
      ],
      guestQuestion: "Would you enjoy a rounder still white with the sauce, or a brighter sparkling contrast?",
      boundary: "Do not describe these oysters as chargrilled or supply a cooking technique from the picture. The saved house notes leave cooking and plating for confirmation at lineup.",
      sources: ["breakfast", "pairing"]
    },
    {
      id: "hussarde", title: "Eggs Hussarde: remember both sauces",
      dishIds: ["d-1q0xk7jv"], art: { guideId: "culinary-hussarde-components" },
      description: "The menu brings together an English muffin, coffee-cured Canadian bacon, poached egg, hollandaise and marchand de vin.",
      variables: [
        { label: "Hollandaise and yolk", detail: "Consider richness and texture without reducing the whole dish to butter alone." },
        { label: "Marchand de vin", detail: "Consider the savoury red-wine sauce. The illustration's mushrooms and shallot are a classic sauce study, not confirmation of today's exact recipe." },
        { label: "Bacon and bread", detail: "Include the coffee-cured bacon and muffin when you explain the complete bite." }
      ],
      options: [
        { id: "hussarde-bubbles", label: "A Champagne contrast", wineId: "w-dbz9e960", benefit: "For a guest who enjoys bubbles, the listed house Champagne is a starting point for discussing freshness alongside the egg and hollandaise.", tradeoff: "Confirm the actual cuvee and taste. This practice choice is not a substitution for the separate breakfast tasting-menu pour; check that menu and the current service plan." },
        { id: "hussarde-red", label: "A light-red conversation", wineId: "w-y0ihoyc7", benefit: "The stored Damien Martin Bourgogne Pinot Noir offers a red-wine path for a guest who wants one, with fruit and savoury character to consider alongside the marchand de vin and bacon.", tradeoff: "Choose by the actual bottle's tannin, weight and freshness. Pinot Noir on the label does not guarantee delicacy, and the egg and sauce still matter." }
      ],
      guestQuestion: "Do you feel like bubbles with breakfast, or would you enjoy a lighter red with the savoury sauce?",
      boundary: "The numbered picture names components; it is not an assembly sequence or an approved portion-and-plating specification.",
      sources: ["breakfast", "pairing", "sauces"]
    },
    {
      id: "papillote", title: "Gulf Fish en Papillote: follow the whole parcel",
      dishIds: ["d-szzugxzi"], art: null,
      description: "The dinner menu names banana-leaf-wrapped Gulf fish with Louisiana crab, sorghum, Marcona almonds, Castelvetrano olives and tomato.",
      variables: [
        { label: "Preparation", detail: "Start with the wrapped cooking method and actual fish. The menu does not guarantee one fish species each day." },
        { label: "Acid and savoury detail", detail: "The tomato and olives are reasons to assess the complete seasoning; they do not establish fixed acidity or salt levels." },
        { label: "Sorghum and almonds", detail: "Confirm the sorghum's form and role with the kitchen. Do not infer syrup, sweetness or a precise texture from its name alone." }
      ],
      options: [
        { id: "papillote-bright", label: "A fresh still-white path", wineId: "w-naty4r19", benefit: "The saved Albarino record offers a bright still-white option to consider with fish, tomato and olives when the guest wants a lighter impression.", tradeoff: "Check the dish's actual weight and the open wine. A very lean bottle may not give the textural connection the guest wants from the crab and almonds." },
        { id: "papillote-texture", label: "A Chardonnay comparison", wineId: "w-iuzjmgz4", benefit: "The saved Leflaive Macon-Verze record offers a Chardonnay comparison. Taste for enough freshness and texture to support the parcel's fish, crab and accompaniments.", tradeoff: "Origin and price cannot settle the choice. Confirm the vintage, serving availability and actual oak or textural character before describing them." }
      ],
      guestQuestion: "Would you like a lighter, brisker impression, or a little more texture with the fish?",
      boundary: "The menu description does not establish today's fish species, sorghum form, portion, doneness or final presentation.",
      sources: ["dinner", "pairing"]
    }
  ],
  wineLessons: {
    "w-naty4r19": ["describe", "fruit", "sauce", "recommend"],
    "w-3yaps1gt": ["describe", "aromas", "sauce", "recommend"],
    "w-uw1bb9ax": ["describe", "aromas", "sauce", "recommend"],
    "w-dbz9e960": ["describe", "sauce", "recommend"],
    "w-y0ihoyc7": ["fruit", "sauce", "recommend"],
    "w-iuzjmgz4": ["describe", "aromas", "sauce", "recommend"],
    "w-5luyxb98": ["describe", "fruit", "recommend"]
  },
  componentLessons: {
    "c-3g6wf620": ["sauce", "recommend"],
    "c-ocn197ql": ["sauce", "recommend"],
    "c-r6jyoux5": ["sauce", "recommend"],
    "c-2f293qeb": ["sauce"],
    "c-aupfuy4n": ["sauce", "recommend"],
    "c-hn4k0yvt": ["sauce"],
    "c-afejqija": ["describe", "fruit", "aromas"],
    "c-xn3cmmpq": ["describe", "fruit", "aromas"],
    "c-x5enc0ws": ["describe", "fruit", "recommend"],
    "c-7yzddo2v": ["describe", "fruit", "recommend"],
    "c-6ndwvbia": ["aromas"]
  },
  grapeLessons: {
    "Chardonnay": ["describe", "fruit", "aromas"],
    "Riesling": ["describe", "fruit", "recommend"],
    "Pinot Noir": ["describe", "fruit", "aromas"],
    "Albariño": ["describe", "fruit", "recommend"],
    "Sauvignon Blanc": ["describe", "fruit", "aromas"],
    "Cabernet Sauvignon": ["describe", "fruit", "aromas"],
    "Syrah / Shiraz": ["describe", "fruit", "aromas"],
    "Syrah": ["describe", "fruit", "aromas"]
  },
  primerLessons: {
    "Wine Fundamentals": ["describe", "fruit", "aromas"],
    "Food & Pairing": ["sauce", "recommend"],
    "Viticulture & Winemaking": ["aromas"],
    "vin": ["aromas"]
  }
};
