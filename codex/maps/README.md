# Wine Atlas collections

The original JPGs remain an archive. `atlas-v3/` holds the 17 existing country/state overview sheets, covering 14 countries and preserving every original numbered regional join.

`regions-v1/` adds 115 regional field maps, one for every existing regional reading, and 14 supplementary country maps. These cover Canada, the United Kingdom (England and Wales focus), Lebanon, Mexico, Switzerland, Uruguay, Croatia, Slovenia, Georgia, Romania, Bulgaria, Moldova, Czechia and Slovakia. This closes illustration gaps in the current curriculum; it does not cover every wine-producing country in the world.

The illustrations use the established forest-green, antique-gold explorer frame. Country/state outlines, water and town coordinates come from geographic data. Dots are representative locations. No map depicts legal appellation boundaries, vineyard parcels, soil polygons or elevation contours. Town centres locate nearby study areas; a named town is not the full wine denomination. Neighbouring geography is context.

## Build and provenance

- Existing overview generator: `.scripts/atlas-v3/build.cjs`.
- Regional generator: `.scripts/atlas-regions/build.cjs`.
- Regional viewing windows: `.scripts/atlas-regions/windows.cjs`.
- Extended Natural Earth data: `.scripts/atlas-regions/geography.json`; pinned upstream revision and hashes are in `provenance.json`.
- Additional town locations and their attribution are retained with the regional authoring inputs. GeoNames data uses CC BY 4.0; Natural Earth geographic data is public domain.
- Champagne and Tuscany have authored, sourced location and study files. The 14 supplementary countries have sourced teaching notes in `countries.cjs`.
- `js/data-field-atlas.js` is generated. It carries exact SVG hashes, byte sizes, sources, locators and existing region identities.

Rebuild the canonical readings first with `node .scripts/regions/build-regions.cjs`, then the regional art with `node .scripts/atlas-regions/build.cjs`. Run `node .scripts/check-field-atlas.cjs` and the existing release gates. Review rendered maps after geography or layout changes.

## Reading and offline use

The Regional Field Atlas is at `#/v/fieldatlas`; a map is at `#/v/fieldmap/<id>`. It connects to the existing regional reading, flashcards and questions. All 115 regional articles retain their identities. Detailed readings load through their existing stamped regional files.

Artwork remains outside the atomic shell installation. Optional downloads keep one or all maps in the scope-specific `codexfields-v1-*` cache. Requests use SVG content hashes so revised maps cannot silently reuse old images. Removing artwork does not remove lessons or learning progress. External references require a connection.
