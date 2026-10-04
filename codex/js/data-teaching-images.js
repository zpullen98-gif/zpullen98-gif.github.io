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
    }
  ]
};
