/* Reviewed teaching artwork only. Each delivered picture is checked against
   its lesson and the actual house specification. No inferred
   glass, garnish, quantity or recipe belongs in this registry.

   Each stable id names { src, width, height, alt, caption }. src is an explicit
   versioned local WebP under img/brennans/, img/cards/ or img/plates/. Optional
   thumb is { src, width, height } for a smaller, identically framed WebP;
   labels is the ordered, numbered HTML key when the picture has one.
   Never overwrite a released file: use the next -vN path for corrected art.
   Add images to this registry, not the service worker's shell ASSETS. */
var LEDGER_TEACHING_IMAGES = {
  'brennans-glassware': {
    src: 'img/brennans/brennans-glassware-v1.webp', width: 1024, height: 1536,
    thumb: { src: 'img/brennans/brennans-glassware-v1.thumb.webp', width: 360, height: 540 },
    alt: 'Nine numbered glass and cup shapes, left to right across three rows: 1 rocks, 2 highball, 3 stemmed Irish coffee, 4 flute, 5 coupe, 6 Nick and Nora, 7 wine glass, 8 cup and saucer, 9 tall tumbler.',
    caption: 'Learn these common shapes. Confirm the glass for each drink with the bar.',
    labels: ['Rocks', 'Highball', 'Stemmed Irish coffee', 'Flute', 'Coupe', 'Nick & Nora', 'Wine glass', 'Cup and saucer', 'Tall tumbler']
  }
};
