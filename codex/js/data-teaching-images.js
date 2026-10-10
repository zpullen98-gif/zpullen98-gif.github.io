/* Reviewed teaching art only. Text and sources ship with the app; pictures do
   not. New art needs a new path, honest alt text, a numbered key and review.
   Zoom maps belong here as kind:'zoom', never in ATLAS_V2 or MAP_SHEETS. */
var CODEX_TEACHING_IMAGES = {
  version: 1,
  entries: [
    {
      id: 'bottle-ullage', kind: 'teach', title: 'Reading a bottle’s fill level',
      file: 'assets/teach/bottle-ullage-v1.webp', width: 1536, height: 1024,
      bytes: 77036, sha256: '05bb362d32d648fc254fb004ecd64b4be2e8499df4440fcebe3e4b260cc38cbe',
      thumb: {file: 'assets/teach/bottle-ullage-v1.thumb.webp', width: 540, height: 360, bytes: 13380},
      alt: 'Six Bordeaux-shaped bottles, numbered 1 to 6, with progressively lower wine levels: into neck, base of neck, top shoulder, high shoulder, mid shoulder and low shoulder.',
      caption: 'Ullage is the space above the wine. These shoulder terms describe Bordeaux-shaped bottles. Judge the level alongside age, bottle shape, closure and storage history; it cannot prove that a wine is sound.',
      key: [
        ['Into neck', 'The wine reaches into the narrow neck.'],
        ['Base of neck', 'The surface is where the neck meets the shoulder.'],
        ['Top shoulder', 'The surface sits just below that junction.'],
        ['High shoulder', 'The surface is partway down the upper shoulder.'],
        ['Mid shoulder', 'The surface sits around the middle of the shoulder.'],
        ['Low shoulder', 'The surface approaches the base of the shoulder. Ask the sommelier to assess the bottle before offering it.']
      ],
      note: 'For sloping Burgundy-shaped bottles, the trade commonly describes the gap in centimetres instead. An illustration is a comparison guide, not a verdict on an individual bottle.',
      sources: [{title: 'Christie’s: ullage descriptions and old wine', url: 'https://www.christies.com/-/media/conditions-of-sale/ConditionsOfSale-London-Wine-1Jan24.pdf'}]
    },
    {
      id: 'bottle-heat-damage', kind: 'teach', title: 'Condition clues before service',
      file: 'assets/teach/bottle-heat-damage-v1.webp', width: 1024, height: 1024,
      bytes: 75336, sha256: 'f0fb5b29eacccb7f63dcaff78fde28faa7b8ea971f4e636ebb558277aacb9f3b',
      thumb: {file: 'assets/teach/bottle-heat-damage-v1.thumb.webp', width: 540, height: 540, bytes: 28188},
      alt: 'Two bottles and glasses. The right-hand example is numbered: 1 raised cork, 2 dried seepage, 3 lower fill and 4 browner wine. These are clues to investigate, not a diagnosis of heat damage.',
      caption: 'A raised cork, seepage, a low fill or unexpected browning deserves a closer look. Heat can contribute to these changes, but appearance alone cannot establish the cause or the wine’s condition.',
      key: [
        ['Raised cork', 'Expansion can move a closure. A raised cork alone does not prove heat damage.'],
        ['Seepage', 'Look for dried wine around the capsule and neck. Check the closure and storage history.'],
        ['Lower fill', 'Compare with the expected level for that age and bottle shape.'],
        ['Browner wine', 'Colour also changes with age and style. Assess aroma and flavour before concluding that it is faulty.']
      ],
      note: 'Ask the sommelier to assess a questionable bottle. The left-hand example is a visual comparison, not a guarantee that a clean-looking bottle is sound.',
      sources: [{title: 'Australian Wine Research Institute: transport and storage', url: 'https://www.awri.com.au/industry_support/winemaking_resources/storage-and-packaging/post-packaging/transport-and-storage/'}, {title: 'WSET: common wine faults', url: 'https://www.wsetglobal.com/knowledge-centre/blog/2023/august/24/common-wine-faults-and-how-to-spot-them'}]
    },
    {
      id: 'glass-crystals-sediment-cork', kind: 'teach', title: 'Crystals, sediment and cork',
      file: 'assets/teach/glass-crystals-sediment-cork-v1.webp', width: 1536, height: 1024,
      bytes: 176200, sha256: '2668e39d7e207d0bf6d003a32fd3a58460bcd9a384b97f92b31ec57ad32b9c0b',
      thumb: {file: 'assets/teach/glass-crystals-sediment-cork-v1.thumb.webp', width: 540, height: 360, bytes: 24838},
      alt: 'Three numbered close-ups: 1 clear tartrate crystals in white wine and on a cork, 2 dark sediment at the bottom of red wine, 3 light-brown cork fragments floating on red wine.',
      caption: 'Look closely before naming a deposit. Crystals, sediment and cork fragments are different; none of these pictures diagnoses cork taint.',
      key: [
        ['Tartrate crystals', 'Natural crystals can form in wine and collect on the cork or in the bottle. Their presence alone is not a wine fault.'],
        ['Sediment', 'Some red wines form a natural deposit as they age. Careful decanting can leave the deposit behind.'],
        ['Cork fragments', 'Pieces can break away during opening, especially from an old cork. They do not mean the wine has TCA cork taint.']
      ],
      note: 'Cork taint is assessed through aroma and flavour, often with musty notes and muted fruit. If a guest points out an unfamiliar particle, pause service and ask the sommelier to identify it; do not assume it is a tartrate from its appearance alone.',
      sources: [{title: 'WSET: serving and decanting wine', url: 'https://www.wsetglobal.com/knowledge-centre/blog/2024/july/21/frequently-asked-questions-about-serving-and-decanting-wine/'}, {title: 'WSET: cork fragments and cork taint', url: 'https://www.wsetglobal.com/knowledge-centre/blog/2023/august/24/common-wine-faults-and-how-to-spot-them'}, {title: 'Canadian Food Inspection Agency: wine diamonds', url: 'https://inspection.canada.ca/en/food-safety-consumers/fact-sheets/specific-products-and-risks/commonly-occurring-issues-food/wine-diamonds'}]
    },
    {
      id: 'grid-colour-rim', kind: 'teach', title: 'Reading colour and the rim',
      file: 'assets/teach/grid-colour-rim-v1.webp', width: 1536, height: 1024,
      bytes: 141526, sha256: '7095e4a9b76d1504e305d00aeffee42ac68904a116243e5cfdcd2e21fa9cd4c6',
      thumb: {file: 'assets/teach/grid-colour-rim-v1.thumb.webp', width: 540, height: 360, bytes: 22206},
      alt: 'Six upright tasting glasses seen at an overhead angle over white paper: straw, yellow and gold on the top row; purple, ruby and garnet below. A seventh marker points to the orange edge of the garnet example.',
      caption: 'Start with what you can see. Compare colour and depth against a white background in neutral light, then describe the centre and the rim separately. These are examples, not a colour calibration chart or a sequence of known ages.',
      key: [
        ['Straw', 'A pale yellow example with a greenish glint.'],
        ['Yellow', 'A clearer lemon-yellow example.'],
        ['Gold', 'A deeper golden example.'],
        ['Purple', 'A deep red example with violet tones at the edge.'],
        ['Ruby', 'A bright red example with a narrower pale edge.'],
        ['Garnet', 'A red example with more orange-brown tones.'],
        ['The rim', 'The thinner edge of the wine, where its colour may look paler or different from the centre.']
      ],
      note: 'Colour cannot prove grape variety or age. Grape pigments, extraction, winemaking and ageing all matter. Check aroma, flavour and structure before drawing a conclusion; screen settings and room light also change how this illustration looks.',
      sources: [{title: 'WSET: what determines wine colour', url: 'https://www.wsetglobal.com/knowledge-centre/blog/2021/september/23/what-determines-the-colour-of-wine'}]
    },
    {
      id: 'bottle-shapes', kind: 'teach', title: 'Four familiar bottle shapes',
      file: 'assets/teach/bottle-shapes-v1.webp', width: 1536, height: 1024,
      bytes: 77428, sha256: 'bbd1ac96ab9cf515f04e14b4264bbaee09970ba9bc3ab84a0bd50dba773c233e',
      thumb: {file: 'assets/teach/bottle-shapes-v1.thumb.webp', width: 540, height: 360, bytes: 11116},
      alt: 'Four numbered bottle silhouettes on parchment: a straight-sided Bordeaux bottle, a sloping Burgundy bottle, a tall slender flute and a broader sparkling-wine bottle.',
      caption: 'Learn the outline as a useful first clue, then read the label. These are packaging traditions, not rules that identify the grape, origin or quality of the wine inside.',
      key: [
        ['Bordeaux', 'Straight sides and high shoulders. Common for Cabernet Sauvignon, Merlot and Bordeaux-style whites, including examples from outside Bordeaux.'],
        ['Burgundy', 'A broader body with gently sloping shoulders. Often used for Pinot Noir and Chardonnay; Rhône wines also use related shapes.'],
        ['Flute', 'Tall and slender, with little shoulder. Familiar in Alsace and Germany, often for Riesling or Gewürztraminer. Glass colour varies; it is not proof of origin.'],
        ['Sparkling-wine bottle', 'Built to withstand pressure, with a substantial neck finish for its closure. Champagne is a familiar example; other sparkling wines use similar bottles.']
      ],
      note: 'The punt is the indentation underneath a bottle. Its depth varies by design: it is not fixed by bottle shape and does not tell you the wine’s quality. Always confirm producer, wine, vintage and bottle size before service.',
      sources: [{title: 'WSET: wine packaging and traditional shapes', url: 'https://www.wsetglobal.com/knowledge-centre/blog/2025/breaking-the-glass-mould-innovative-drinks-packaging'}, {title: 'Comité Champagne: the pressure-resistant bottle', url: 'https://www.champagne.fr/en/about-champagne/a-great-blended-wine/champagne-bottles-bottling'}, {title: 'Verallia: bottle designs and different push-ups', url: 'https://www.verallia.com/en/our-products/selective-line/'}]
    },
    {
      id: 'pinot-noir', kind: 'teach', title: 'A closer look at Pinot Noir', numbered: false,
      file: 'assets/teach/grapes/pinot-noir-v1.webp', width: 1024, height: 1024,
      bytes: 122400, sha256: '2ee44cba6c3d34751285d010c8079181bc4f3c7c907100fae008c5650dbadd77',
      thumb: {file: 'assets/teach/grapes/pinot-noir-v1.thumb.webp', width: 540, height: 540, bytes: 33984},
      alt: 'A botanical Pinot Noir study on parchment: a compact bunch of dark berries with a pale bloom, a lobed green vine leaf and tendril, with small insets of a cut berry and translucent ruby wine.',
      caption: 'One illustrative specimen, not an identification test. Pinot Noir often has small, compact bunches and fine-skinned dark berries. Its many clones do not all look alike, and growing conditions also affect the fruit.',
      key: [
        ['Bunch and berries', 'The compact bunch suggests a pine cone. The pale surface bloom is shown over dark skins; the berry inset shows pale flesh beneath.'],
        ['Leaf', 'Mature leaves can be unlobed or have three or five lobes. Look at several features together; a single leaf outline cannot establish a variety.'],
        ['Wine', 'The ruby glass illustrates one possible appearance. Pinot Noir can vary in colour, concentration and structure; its identity cannot be read from the glass alone.']
      ],
      note: 'Use this portrait to connect the vine with your written grape profile. For botanical comparison, use documented photographs and descriptors; do not treat an illustration as a verified photograph of a particular clone.',
      sources: [{title: 'Plantgrape: Pinot noir identification and clonal diversity', url: 'https://www.plantgrape.fr/en/varieties/fruit-varieties/218/export'}, {title: 'Wine Australia: vine identification and variability', url: 'https://www.wineaustralia.com/getmedia/21669eff-05de-41d9-9ef8-283b1e01edcb/201008-Vine-identification.pdf'}, {title: 'Bourgogne Wine Board: the anatomy of Pinot Noir', url: 'https://www.bourgogne-wines.com/wine-and-terroir/our-grape-varietals-our-colors/pinot-noir/the-bourgogne-wine-region-birthplace-of-the-pinot-noir-varietal,2798,10603.html'}]
    },
    {
      "id": "service-bottle-check",
      "file": "assets/teach/service-bottle-check-v1.webp",
      "width": 1536,
      "height": 1024,
      "bytes": 180922,
      "sha256": "ab26e4200ba64b18e0e5cfb3aff9932970acfaf4fbdab720534c33e76bd92ad1",
      "thumb": {
        "file": "assets/teach/service-bottle-check-v1.thumb.webp",
        "width": 540,
        "height": 360,
        "bytes": 29380
      },
      "kind": "teach",
      "title": "The bottle check, before opening",
      "alt": "Four numbered service scenes: 1 a wine bottle beside an order book, 2 its rear label, 3 the intact capsule and closure area, and 4 a server presenting the front label. The labels are intentionally blank.",
      "caption": "A quiet check before opening prevents an avoidable mistake at the table. Match the actual bottle to the order, inspect its condition and present it for confirmation. Use the fictional label exercise below to practise reading real text.",
      "key": [
        [
          "Match the order",
          "Compare the producer, wine or cuvée, vintage and bottle size with the guest’s order. Confirm any substitution before opening."
        ],
        [
          "Read the supporting details",
          "Use the front and rear labels to confirm identity and size. Packaging shape, foil colour and familiar artwork cannot replace reading the actual label."
        ],
        [
          "Inspect the bottle",
          "Look at the fill, capsule, closure and any seepage. These are clues to investigate; a clean appearance cannot prove that the wine is sound."
        ],
        [
          "Present for confirmation",
          "Keep the label visible to the person who ordered and identify the bottle clearly. Wait for confirmation before opening, following your restaurant’s service sequence."
        ]
      ],
      "note": "These are staged teaching illustrations with intentionally blank labels, not photographs of Brennan’s bottles. The written practice example is fictional. Follow Brennan’s current service procedure and ask the sommelier about any discrepancy.",
      "sources": [
        {
          "title": "Court of Master Sommeliers: hospitality and service standards",
          "url": "https://www.mastersommeliers.org/wp-content/uploads/2023/12/CMS-Hospitality-Service-Standards.pdf"
        },
        {
          "title": "Court of Master Sommeliers: advanced service guidance",
          "url": "https://www.mastersommeliers.org/wp-content/uploads/2025/05/2025-ADV-MS-HS-Standards-and-Guidlines-FINAL.pdf"
        }
      ]
    },
    {
      "id": "service-still-opening",
      "file": "assets/teach/service-still-opening-v1.webp",
      "width": 1536,
      "height": 1024,
      "bytes": 140146,
      "sha256": "fcb3fbe9e949fce4f00914a0d8b41205335c02aeed7baffa4849efb8b36f4257",
      "thumb": {
        "file": "assets/teach/service-still-opening-v1.thumb.webp",
        "width": 540,
        "height": 360,
        "bytes": 30192
      },
      "kind": "teach",
      "title": "Opening still wine with control",
      "alt": "Four numbered close-ups show a server cutting the capsule below the bottle lip, wiping the exposed cork and rim, completing a controlled cork extraction with a waiter’s corkscrew, and pouring a small tasting sample.",
      "caption": "Keep the bottle steady and the label available to the guest. Prepare the lip, use a centred corkscrew and withdraw the cork gently. The third frame shows the final extraction; it is not a diagram of the lever’s contact points.",
      "key": [
        [
          "Cut below the lip",
          "Use the wine key’s blade to cut the capsule below the second lip, following house procedure. Remove the top cleanly and close the blade; keep fingers clear."
        ],
        [
          "Wipe before opening",
          "Wipe the exposed cork and bottle lip with a clean service cloth. Keep the bottle steady and avoid turning it unnecessarily."
        ],
        [
          "Extract with control",
          "Centre the worm and engage it securely without driving through the cork. Use the lever correctly for your wine key, then finish the extraction gently by hand. The image shows that final controlled stage; practise lever placement with a trainer."
        ],
        [
          "Check and offer a taste",
          "Check and wipe the lip after extraction. Offer a small tasting sample to the host according to house procedure, then wait for acceptance before serving the table."
        ]
      ],
      "note": "For sound natural corks in still wine. An old or fragile cork can require different tools and a sommelier’s help. The illustrations are staged practice examples; they do not replace a demonstration or Brennan’s current service procedure.",
      "sources": [
        {
          "title": "Court of Master Sommeliers: hospitality and service standards",
          "url": "https://www.mastersommeliers.org/wp-content/uploads/2023/12/CMS-Hospitality-Service-Standards.pdf"
        },
        {
          "title": "Court of Master Sommeliers: advanced service guidance",
          "url": "https://www.mastersommeliers.org/wp-content/uploads/2025/05/2025-ADV-MS-HS-Standards-and-Guidlines-FINAL.pdf"
        }
      ]
    },
    {
      "id": "service-sparkling-control",
      "file": "assets/teach/service-sparkling-control-v1.webp",
      "width": 1536,
      "height": 1024,
      "bytes": 215668,
      "sha256": "fe3dc93410382ea95082eb4ec6a2628588c827291fd506210ec9a3ddcba895f3",
      "thumb": {
        "file": "assets/teach/service-sparkling-control-v1.thumb.webp",
        "width": 540,
        "height": 360,
        "bytes": 38184
      },
      "kind": "teach",
      "title": "Opening sparkling wine quietly",
      "alt": "Three numbered close-ups show a chilled sparkling-wine bottle angled about 45 degrees: a thumb controls the caged cork, a cloth-covered hand retains the cork and cage while the other holds the bottle, and the removed intact cork remains in the hand.",
      "caption": "Keep the closure controlled from the moment you start. Chilled sparkling wine should open with a quiet release under a restraining hand, with the bottle directed away from people and breakable objects.",
      "key": [
        [
          "Secure the closure",
          "Keep a thumb firmly over the cork while removing the foil and loosening the wire cage. Leave the loosened cage on the cork and never let the closure point toward anyone."
        ],
        [
          "Turn the bottle",
          "With the bottle around 45 degrees, hold the cork and cage firmly under a clean cloth. Turn the bottle slowly with your other hand while resisting the cork’s outward pressure."
        ],
        [
          "Ease the release",
          "Allow the cork to ease out quietly into the controlling hand. Keep hold of the cork and cage together, wipe the lip if needed and follow the house tasting and pouring sequence."
        ]
      ],
      "note": "The frames show a continuous controlled opening, not permission to let go between steps. Do not shake the bottle or launch the cork. Practise the technique with a trained colleague before guest service; unusual or damaged closures need the sommelier’s help.",
      "sources": [
        {
          "title": "Court of Master Sommeliers: hospitality and service standards",
          "url": "https://www.mastersommeliers.org/wp-content/uploads/2023/12/CMS-Hospitality-Service-Standards.pdf"
        },
        {
          "title": "Court of Master Sommeliers: advanced service guidance",
          "url": "https://www.mastersommeliers.org/wp-content/uploads/2025/05/2025-ADV-MS-HS-Standards-and-Guidlines-FINAL.pdf"
        }
      ]
    },
    {
      "id": "service-decanting",
      "file": "assets/teach/service-decanting-v1.webp",
      "width": 1536,
      "height": 1024,
      "bytes": 183604,
      "sha256": "0dcf49c97ec69d5043e5392976a7f929d98e31476ddfd219884e27f072999c7c",
      "thumb": {
        "file": "assets/teach/service-decanting-v1.thumb.webp",
        "width": 540,
        "height": 360,
        "bytes": 32182
      },
      "kind": "teach",
      "title": "Decanting: leave the sediment behind",
      "alt": "Two numbered scenes show an older red-wine bottle resting in a lined cradle beside a clean decanter and inspection light, followed by a close controlled pour into the decanter while the bottle shoulder and dark sediment remain visible.",
      "caption": "Decanting can separate a clear wine from sediment; another purpose is controlled exposure to air. Decide which is needed before starting. These two frames illustrate sediment separation, not a universal waiting time for every wine.",
      "key": [
        [
          "Prepare without disturbing",
          "Assess the wine with the sommelier. If sediment is present, allow it to settle and keep the bottle in its settled orientation during careful transport and opening. Prepare a clean decanter and a light that lets you see the neck and shoulder."
        ],
        [
          "Watch and stop",
          "Pour slowly and steadily, keeping the bottle close to the decanter and avoiding splashing. Watch the wine passing the shoulder and neck. Stop as sediment approaches the neck or the stream becomes cloudy; leave the remaining wine and deposit in the bottle."
        ]
      ],
      "note": "Sediment is made conspicuous for learning. It is not a measure of a wine’s age or quality. A fragile mature wine may fade with prolonged air, while a young wine may benefit; there is no fixed decanting time that suits all bottles. Brennan’s sommelier and house procedure determine the service decision.",
      "sources": [
        {
          "title": "Court of Master Sommeliers: hospitality and service standards",
          "url": "https://www.mastersommeliers.org/wp-content/uploads/2023/12/CMS-Hospitality-Service-Standards.pdf"
        },
        {
          "title": "Court of Master Sommeliers: advanced service guidance",
          "url": "https://www.mastersommeliers.org/wp-content/uploads/2025/05/2025-ADV-MS-HS-Standards-and-Guidlines-FINAL.pdf"
        },
        {
          "title": "WSET: serving and decanting wine",
          "url": "https://www.wsetglobal.com/knowledge-centre/blog/2024/july/21/frequently-asked-questions-about-serving-and-decanting-wine/"
        }
      ]
    },
    {
      "kind": "teach",
      "id": "culinary-fruit-references",
      "file": "assets/teach/culinary-fruit-references-v1.webp",
      "width": 1536,
      "height": 1024,
      "bytes": 241926,
      "sha256": "1edf5ff9f7d04393f3d4c3c42b2693a32d4f9c02dc3efa0cbcddd96bb3ad7cf7",
      "thumb": {
        "file": "assets/teach/culinary-fruit-references-v1.thumb.webp",
        "width": 540,
        "height": 360,
        "bytes": 34732
      },
      "title": "Fresh, dried and cooked fruit references",
      "alt": "Six numbered aroma references in two rows: 1 fresh green apple and a cut half, 2 ripe peach and a cut half, 3 lemon peel beside half a lemon, 4 fresh cherries, 5 dried cherries and 6 cherry compote in a bowl.",
      "caption": "Build a more precise aroma vocabulary by naming a fruit and its condition. These separate kitchen references are not ingredients added to the wine, a ripeness sequence or a key that identifies a grape.",
      "key": [
        [
          "Fresh green apple",
          "Notice the crisp, fresh apple reference. Its green skin does not measure acidity in a wine."
        ],
        [
          "Ripe peach",
          "Name the ripe stone-fruit resemblance independently of sweetness on the palate."
        ],
        [
          "Fresh lemon peel",
          "Compare the fragrant peel with the juice and flesh of a real lemon; a citrus aroma is not an acidity measurement."
        ],
        [
          "Fresh cherry",
          "Use fresh cherry as one recognisable red-fruit reference."
        ],
        [
          "Dried cherry",
          "A dried reference can smell different from fresh fruit. Dried fruits can look similar; the written key identifies these as cherries."
        ],
        [
          "Cooked cherry compote",
          "Look for the softened fruit and juices, then smell a real, plainly prepared compote for comparison."
        ]
      ],
      "note": "Pictures support vocabulary; they cannot convey smell. Dried or cooked-fruit notes alone prove neither hot-climate origin nor bottle age, and fruit aroma does not establish residual sugar. Keep ingredient comparisons separate and do not force a match.",
      "sources": [
        {
          "title": "WSET: aroma references and tasting vocabulary",
          "url": "https://www.wsetglobal.com/media/11766/wset_l3wines_sat_en_may2022_issue2.pdf"
        },
        {
          "title": "WSET: why wine can smell unlike grapes",
          "url": "https://www.wsetglobal.com/knowledge-centre/blog/2022/january/13/why-doesn-t-wine-taste-like-grapes"
        }
      ]
    },
    {
      "kind": "teach",
      "id": "culinary-savoury-references",
      "file": "assets/teach/culinary-savoury-references-v1.webp",
      "width": 1536,
      "height": 1024,
      "bytes": 239138,
      "sha256": "04aae3218d51d7baf70093f9654f68d3b945860a09cc6c750faac7dcdecd3b80",
      "thumb": {
        "file": "assets/teach/culinary-savoury-references-v1.thumb.webp",
        "width": 540,
        "height": 360,
        "bytes": 36030
      },
      "title": "Herbs, spice and cellar references",
      "alt": "Six numbered aroma references in two rows: 1 cut green bell pepper, 2 black peppercorns and ground pepper, 3 split vanilla pods, 4 toasted bread, 5 a butter curl and pat, and 6 dried mushroom slices.",
      "caption": "Name the resemblance before proposing its source. These kitchen references help you describe aromas, but none can establish the wine’s grape, production method or age by itself.",
      "key": [
        [
          "Green bell pepper",
          "A green or herbaceous reference. It is different from the burning sensation of chilli."
        ],
        [
          "Black pepper",
          "A spice-aroma reference, illustrated as whole peppercorns with a little ground pepper."
        ],
        [
          "Vanilla pod",
          "A familiar reference that may suggest oak influence; confirm production details before stating a method."
        ],
        [
          "Toasted bread",
          "Toast-like notes may overlap between oak influence and yeast-related development."
        ],
        [
          "Butter",
          "A buttery note can relate to malolactic conversion. It is not proof of new oak."
        ],
        [
          "Dried mushroom",
          "An earthy reference that may occur with maturation. It does not identify a vintage or confirm that the wine is sound."
        ]
      ],
      "note": "Smell the actual references separately. A single descriptor is not a diagnosis. Ask the sommelier about an unexpected aroma and use the whole wine and reliable producer information before drawing conclusions.",
      "sources": [
        {
          "title": "WSET: aroma references and tasting vocabulary",
          "url": "https://www.wsetglobal.com/media/11766/wset_l3wines_sat_en_may2022_issue2.pdf"
        },
        {
          "title": "WSET: why wine can smell unlike grapes",
          "url": "https://www.wsetglobal.com/knowledge-centre/blog/2022/january/13/why-doesn-t-wine-taste-like-grapes"
        }
      ]
    },
    {
      "kind": "teach",
      "id": "culinary-sauce-comparison",
      "file": "assets/teach/culinary-sauce-comparison-v1.webp",
      "width": 1024,
      "height": 1536,
      "bytes": 152424,
      "sha256": "ed0c8048bccf5cc9d29154aee58808e3dbfd9af71f53ab71b6805d60f9736ed7",
      "thumb": {
        "file": "assets/teach/culinary-sauce-comparison-v1.thumb.webp",
        "width": 360,
        "height": 540,
        "bytes": 23416
      },
      "title": "Six sauces, seen side by side",
      "alt": "Six numbered sauce studies in white dishes: 1 pale yellow hollandaise, 2 herb-flecked béarnaise, 3 coral Choron, 4 tan Foyot, 5 red-brown marchand de vin with small pieces, and 6 smooth ivory beurre blanc.",
      "caption": "Compare six classic sauce studies before deciding how a dish might meet a wine. Their ingredients and texture matter more than a rule based only on the main protein.",
      "key": [
        [
          "Hollandaise",
          "A butter-and-egg-yolk emulsion with acidity; the illustration is pale yellow."
        ],
        [
          "Béarnaise",
          "A butter sauce with tarragon character, shown with visible herbs."
        ],
        [
          "Choron",
          "A tomato variation of béarnaise, here with a coral tint."
        ],
        [
          "Foyot",
          "Béarnaise enriched with reduced meat glaze, illustrated as tan."
        ],
        [
          "Marchand de vin",
          "A savoury red-wine brown sauce. The picture includes mushrooms and shallot; confirm the current house ingredients."
        ],
        [
          "Beurre blanc",
          "A wine-and-butter emulsion, shown smooth and ivory rather than separated."
        ]
      ],
      "note": "Reused from the World Table’s reviewed sauce collection. These are classic recipe studies, not Brennan’s current service photographs or a colour standard. The plain beurre blanc does not specify the house’s preserved-lemon version. Taste the actual preparation before recommending a wine.",
      "sources": [
        {
          "title": "Professional Cooking: classical sauces (hosted by Escoffier)",
          "url": "https://resources.escoffier.edu/textbooks/gisslen/professional_cooking_09.pdf"
        },
        {
          "title": "Brennan’s: breakfast and lunch menu",
          "url": "https://www.brennansneworleans.com/menus/breakfast-and-lunch/"
        },
        {
          "title": "Brennan’s: dinner menu",
          "url": "https://www.brennansneworleans.com/menus/dinner/"
        }
      ]
    },
    {
      "kind": "teach",
      "id": "culinary-hussarde-components",
      "file": "assets/teach/culinary-hussarde-components-v1.webp",
      "width": 1024,
      "height": 1536,
      "bytes": 193672,
      "sha256": "db36b0586cab678018ab3d4b91c8def37cda176a99588c09147a6fc217a11676",
      "thumb": {
        "file": "assets/teach/culinary-hussarde-components-v1.thumb.webp",
        "width": 360,
        "height": 540,
        "bytes": 27502
      },
      "title": "Eggs Hussarde: recognise both sauces",
      "alt": "Five numbered separate component studies: 1 split English muffin, 2 sliced Canadian bacon, 3 whole and opened poached eggs, 4 pale hollandaise, and 5 red-brown marchand de vin.",
      "caption": "The Brennan’s menu names an English muffin, coffee-cured Canadian bacon, poached egg, hollandaise and marchand de vin. Remember both sauces when describing the dish or discussing a wine.",
      "key": [
        [
          "English muffin",
          "The menu specifies a housemade English muffin. The open crumb here is a component study."
        ],
        [
          "Coffee-cured Canadian bacon",
          "Recognise the round loin-bacon slices; confirm the current cure and preparation with the kitchen."
        ],
        [
          "Poached egg",
          "The whole and opened views compare texture. They do not establish a portion count."
        ],
        [
          "Hollandaise",
          "The pale butter-and-yolk sauce contributes richness; consider it alongside the egg."
        ],
        [
          "Marchand de vin",
          "The second sauce has a savoury red-wine character. The pictured mushrooms and shallot do not confirm today’s exact house recipe."
        ]
      ],
      "note": "Reused from the World Table’s reviewed component collection. Numbers identify parts, not an assembly sequence. Confirm current portions, stacking, sauce placement and china at the pass. Pairing practice proposes options, not a new approved house pairing.",
      "sources": [
        {
          "title": "Brennan’s: breakfast and lunch menu",
          "url": "https://www.brennansneworleans.com/menus/breakfast-and-lunch/"
        },
        {
          "title": "Professional Cooking: classical sauces (hosted by Escoffier)",
          "url": "https://resources.escoffier.edu/textbooks/gisslen/professional_cooking_09.pdf"
        }
      ]
    }
  ]
};
