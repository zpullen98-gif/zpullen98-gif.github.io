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
      sources: [{title: 'WSET: wine packaging and traditional shapes', url: 'https://www.wsetglobal.com/knowledge-centre/blog/2025/breaking-the-glass-mould-innovative-drinks-packaging'}, {title: 'Comité Champagne: the pressure-resistant bottle', url: 'https://www.champagne.fr/en/about-champagne/a-great-blended-wine/champagne-bottles-bottling'}, {title: 'Verallia: bottle designs and different push-ups', url: 'https://www.verallia.com/en/our-products/selective-line/'}, {title: 'WSET: bottle shapes and the purpose of a punt', url: 'https://wset-uat-integr8.azurewebsites.net/knowledge-centre/blog/2019/june/13/the-definitive-guide-to-wine-bottle-shapes-and-sizes'}]
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
    }
  ]
};
