/* Reviewed teaching artwork only. Each delivered picture is checked against
   its lesson and the actual house specification. No inferred
   glass, garnish, quantity or recipe belongs in this registry.

   Each stable id names { src, width, height, alt, caption }. src is an explicit
   versioned local WebP under img/brennans/, img/cards/ or img/plates/. Optional
   thumb is { src, width, height } for a smaller, identically framed WebP;
   labels is the ordered, numbered HTML key when the picture has one;
   optional notes gives one plain-text reading cue per label.
   Never overwrite a released file: use the next -vN path for corrected art.
   Add images to this registry, not the service worker's shell ASSETS. */
var LEDGER_TEACHING_IMAGES = {
  'brennans-glassware': {
    title: 'Glass shapes: a service reference',
    purpose: 'Recognise nine vessel shapes and use their names when checking a printed drink specification.',
    context: 'A representative shape study, not a record of current Brennan\'s glassware, capacity, fill level or drink assignments. Confirm the actual glass with the bar.',
    reviewedOn: '2026-10-10',
    sources: [{title:'Visual review of this illustration against its numbered vocabulary key; no current house vessel or capacity is asserted.'}],
    src: 'img/brennans/brennans-glassware-v1.webp', width: 1024, height: 1536,
    thumb: { src: 'img/brennans/brennans-glassware-v1.thumb.webp', width: 360, height: 540 },
    alt: 'Nine numbered glass and cup shapes, left to right across three rows: 1 rocks, 2 highball, 3 stemmed Irish coffee, 4 flute, 5 coupe, 6 Nick and Nora, 7 wine glass, 8 cup and saucer, 9 tall tumbler.',
    caption: 'Learn these common shapes. Confirm the glass for each drink with the bar.',
    labels: ['Rocks', 'Highball', 'Stemmed Irish coffee', 'Flute', 'Coupe', 'Nick & Nora', 'Wine glass', 'Cup and saucer', 'Tall tumbler'],
    notes: [
      'A short, broad tumbler. Its appearance alone does not establish a serving size.',
      'A tall straight-sided glass. Exact height, volume and house use vary.',
      'A handled, stemmed hot-drink shape. Verify the actual vessel and suitability for hot service.',
      'A narrow stemmed bowl. This is a shape reference, not an assignment to every sparkling drink.',
      'A shallow, wide stemmed bowl, distinct from the deeper Nick & Nora beside it.',
      'A smaller, deeper stemmed cocktail bowl with a narrower opening than the illustrated coupe.',
      'A rounded bowl on a stem; wine-glass sizes and profiles differ.',
      'A handled cup with a separate saucer. Cup capacity is not shown.',
      'A generic tall tumbler. Names overlap with highball and Collins glassware; use the house specification.'
    ]
  },
  'garnish-citrus': {
    title: 'Citrus cuts: know the distinction',
    purpose: 'Tell a peel, wheel and wedge apart, then match only the cut actually named in the drink specification.',
    context: 'Representative prepared cuts. The picture does not prescribe house dimensions, garnish placement or a knife technique.',
    reviewedOn: '2026-10-10',
    sources: [{title:'Visual review of the eight prepared forms against the numbered key and reading cues. House finishing details remain to be confirmed.'}],
    src: 'img/plates/garnish-citrus-v1.webp', width: 1024, height: 1536,
    thumb: { src: 'img/plates/garnish-citrus-v1.thumb.webp', width: 360, height: 540 },
    alt: 'Eight citrus cuts in numbered reading order: lemon twist, orange twist, wide orange peel, lime wheel, lemon wheel, lime wedge, lemon wedge, and an orange half wheel.',
    caption: 'Read across each row. A twist is peel; a wheel is a crosswise round; a wedge is a lengthwise segment. Cut size and the final garnish follow the drink specification.',
    labels: ['Lemon twist', 'Orange twist', 'Wide orange peel', 'Lime wheel', 'Lemon wheel', 'Lime wedge', 'Lemon wedge', 'Orange slice (half wheel)'],
    notes: [
      'A narrow strip of yellow zest curled into a spiral. Twists can also be broader strips; this sheet shows the curled form.',
      'A narrow strip of orange zest curled into a spiral, distinct from a slice of fruit.',
      'A broad piece of zest with little white pith. Its outer skin carries the aromatic oils used for expressing.',
      'A complete round cut across the lime. A small slit can help it sit on a glass rim.',
      'A complete round cut across the lemon, with the peel forming a ring around the flesh.',
      'A lengthwise segment of lime, showing both flesh and curved peel.',
      'A lengthwise segment of lemon. It is thicker than a crosswise wheel.',
      'Half of a crosswise orange round, with a straight cut edge and curved rind.'
    ]
  },
  'ice': {
    title: 'Ice: four forms',
    purpose: 'Recognise the ice form while keeping size, condition, technique and dilution separate in your observations.',
    context: 'An illustrative form comparison, not measured dimensions, a dilution chart or proof that a drink is ready.',
    reviewedOn: '2026-10-10',
    sources: [{title:'Visual review of the four illustrated ice forms. The image supplies no measured temperature or dilution result.'}],
    src: 'img/plates/ice-v1.webp', width: 1024, height: 1024,
    thumb: { src: 'img/plates/ice-v1.thumb.webp', width: 360, height: 360 },
    alt: 'Four numbered ice forms at a common illustrative scale: one large cube, several smaller cubes, irregular cracked pieces, and finely crushed ice.',
    caption: 'Compare the forms, not a promised dilution rate. Ice temperature, surface meltwater, the amount of ice and liquid, agitation, and time all matter. Follow the drink specification and taste the result.',
    labels: ['Large cube', 'Cubed', 'Cracked', 'Crushed'],
    notes: [
      'One substantial cube. A common rocks presentation; the picture does not prescribe a universal size or serving choice.',
      'Separate, regular cubes. Their size varies with the machine or mould used.',
      'Larger irregular fragments made by breaking ice. More angular and less uniform than cubes.',
      'A bed of much smaller fragments. Often used in juleps and swizzles; drain surface meltwater when appropriate to the method.'
    ]
  },
  'bar-tools': {
    title: 'Bar tools: know the working end',
    purpose: 'Identify ten tools and explain the part each plays before practising with the actual equipment.',
    context: 'Representative tools. The stylised jigger markings do not specify an amount; check the real markings and house procedure.',
    reviewedOn: '2026-10-10',
    sources: [
      {title:'Visual review of this tool inventory and numbered descriptions; shapes and markings are illustrative.'},
      {title:'Campari Academy: strainer types and uses (tools 5 to 7)',url:'https://www.campariacademy.com/en-uk/training/tools-techniques/cocktail-strainers/'},
      {title:'Patron: a two-tin shaking and straining demonstration',url:'https://www.patrontequila.com/en-gb/cocktails/lab/pro-tips/shaking-straining.html'}
    ],
    src: 'img/plates/bar-tools-v1.webp', width: 1024, height: 1536,
    thumb: { src: 'img/plates/bar-tools-v1.thumb.webp', width: 360, height: 540 },
    alt: 'Ten numbered bar tools, read across each row: shaking tins, mixing glass, jigger, barspoon, Hawthorne strainer, julep strainer, fine strainer, muddler, Y-peeler, and channel knife.',
    caption: 'Learn the working end of each tool. The shapes shown are representative; capacities, dimensions and handle designs vary.',
    labels: ['Shaking tins', 'Mixing glass', 'Jigger', 'Barspoon', 'Hawthorne strainer', 'Julep strainer', 'Fine strainer', 'Muddler', 'Y-peeler', 'Channel knife'],
    notes: [
      'Two open metal cups of different sizes that fit together to form a shaker.',
      'A broad vessel for stirring, shown with a pouring lip.',
      'Two measuring cups joined at their bases. Read its markings; the drawing does not specify a capacity.',
      'A small spoon on a long shaft for stirring. Do not assume every spoon bowl holds the same volume.',
      'A perforated plate edged with a coiled spring that helps retain ice while pouring.',
      'A perforated, bowl-shaped strainer without a spring, commonly used with a mixing glass.',
      'A small mesh sieve used after the first strainer when the method calls for finer filtration.',
      'A blunt pressing tool with a broad working face. It is not a spoon or a sharp blade.',
      'A peeler with a transverse blade supported by a Y-shaped frame, useful for broad strips of zest.',
      'A small tool with a cutting channel for making narrow strips of zest, distinct from a broad peeler blade.'
    ]
  }
};
