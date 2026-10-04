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
    src: 'img/brennans/brennans-glassware-v1.webp', width: 1024, height: 1536,
    thumb: { src: 'img/brennans/brennans-glassware-v1.thumb.webp', width: 360, height: 540 },
    alt: 'Nine numbered glass and cup shapes, left to right across three rows: 1 rocks, 2 highball, 3 stemmed Irish coffee, 4 flute, 5 coupe, 6 Nick and Nora, 7 wine glass, 8 cup and saucer, 9 tall tumbler.',
    caption: 'Learn these common shapes. Confirm the glass for each drink with the bar.',
    labels: ['Rocks', 'Highball', 'Stemmed Irish coffee', 'Flute', 'Coupe', 'Nick & Nora', 'Wine glass', 'Cup and saucer', 'Tall tumbler']
  },
  'garnish-citrus': {
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
