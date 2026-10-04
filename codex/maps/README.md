# The wine-growing field atlas

The active atlas contains **17 versioned SVG sheets** in `atlas-v2/`, described
by `js/data-atlas-v2.js`. It preserves all **115 mapped course headings**.
Virginia and Texas remain visible as “Beyond this map” study notes on the
New York page. Canada has no sheet and is not implied to be included.

| Sheet | Active file |
|---|---|
| France | `atlas-v2/france.svg` |
| Italy | `atlas-v2/italy.svg` |
| Spain | `atlas-v2/spain.svg` |
| Portugal | `atlas-v2/portugal.svg` |
| Germany | `atlas-v2/germany.svg` |
| Austria | `atlas-v2/austria.svg` |
| California | `atlas-v2/california.svg` |
| Oregon | `atlas-v2/oregon.svg` |
| Washington | `atlas-v2/washington.svg` |
| New York | `atlas-v2/new-york.svg` |
| Argentina | `atlas-v2/argentina.svg` |
| Chile | `atlas-v2/chile.svg` |
| Australia | `atlas-v2/australia.svg` |
| New Zealand | `atlas-v2/new-zealand.svg` |
| South Africa | `atlas-v2/south-africa.svg` |
| Hungary | `atlas-v2/hungary.svg` |
| Greece | `atlas-v2/greece.svg` |

## What the drawing means

Country and state outlines, selected rivers and lakes are drawn from actual
Natural Earth geometry. The map uses an equirectangular projection with each
sheet’s midpoint as its standard parallel. North is up. Latitude and longitude
graticules follow that same projection. Vertex simplification has a 0.32 SVG
pixel tolerance at the native 1200 × 1500 size; it is for screen legibility,
not surveying.

The small dots are **approximate representative locations**. A line joins each
fixed dot to a readable number or letter; the label may be displaced to avoid
overlap. Numbers follow the course-heading order. A repeated number connects
separate places within one grouped heading, such as Wachau, Kremstal and
Kamptal. Letters mark additional reference places. Some headings are broad
regions, some are counties, and some are appellations; the marks are not an
equal-level classification or a map of legal appellation boundaries.

Portugal includes a separately scaled Madeira inset. Argentina and Chile focus
on the selected wine latitudes, and South Africa on the Cape. Their country
overviews show the actual main map window in gold. Insets use their own scale.
Island coastlines retain the source geometry; small islands may require zoom.
Only selected waterways are drawn. Omission is a scale and focus choice, not a
claim that a river or lake is absent. There is no invented relief, terrain,
vineyard polygon, navigation scale or elevation data. The subtle land grain
is decorative print texture. The grape-and-journal vignette is decoration,
outside the geographic field.

## Sources and reviewed notes

Every sheet links official wine-body sources and Natural Earth through its
companion HTML guide and `atlas-sources.html`. Geometry is public domain under
[Natural Earth’s terms](https://www.naturalearthdata.com/about/terms-of-use/).
Source GeoJSON is pinned to upstream revision
`ca96624a56bd078437bca8184e78163e5039ad19`; original download SHA-256 values and
retrieval date are stored in `.scripts/atlas-v2/geography.json`.

The location guide is newly reviewed. The separate grapes-and-terroir
disclosure preserves existing course notes, with narrow display overrides for
Campania/Vulture, Aconcagua/Casablanca, Barossa/Eden/Clare and Cava’s scope. This
does not revise question banks or certify every inherited wine-law claim.

The original JPG posters are retained as archival files for provenance, but are
not the active teaching images. Unsupported old labels were not promoted to
wine denominations. Goose Gap is correctly in Washington; Etna is on Sicily;
Riverland and Mudgee are separate South Australian and New South Wales places;
Nelson is on the northern South Island. Additional California, Oregon,
Washington and New York reference locations preserve useful geographic breadth.

## Rebuild and change safely

The authoring source is `.scripts/atlas-v2/catalog.cjs`; the deterministic
renderer is `.scripts/atlas-v2/build.cjs`. The compact vendored geography is
sufficient for a normal build, so generation performs no network requests.

```text
node .scripts/atlas-v2/build.cjs
node .scripts/atlas-v2/build.cjs --mirror /path/to/OutsideOfTime/codex
```

For an exact provenance re-download, pass a scratch directory to
`.scripts/atlas-v2/download.cjs`, then pass that same directory to
`.scripts/atlas-v2/prepare-geography.cjs`. The downloader validates all eight
original hashes before writing. The extractor retains only selected country,
state and water features. The renderer also embeds the versioned decorative
asset `assets/codex-atlas-vignette-v2.webp`; it never reads a remote image.

Change the authoring catalog, not the emitted metadata. Preserve the exact
`mapRegions(id).n` joins, read and verify primary sources, and inspect every
affected rendered sheet for real point placement, leader clarity and inset
extent. Generated SVGs are self-contained and load on demand; they are not part
of the shell precache. The map downloader and its dedicated cache are maintained
by the map UI/cache layer. Use the project’s map data and cache checks before
publishing through the suite publisher.
