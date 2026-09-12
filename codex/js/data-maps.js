/* ═══════════════ THE WORLD MAP: what each map holds ═══════════════

   Fifteen drawn maps replace ninety eight hand-coded SVG pins. This file is
   the join between the pictures and the study data the app already carries,
   and it invents nothing: every region name, grape list, soil and note below
   is looked up at runtime out of INTRO_ATLAS (js/data-intro.js) and TERROIR
   (js/reference.js). Nothing here is a wine claim. It is a table of which
   existing record belongs under which picture, and which drill a reader
   should be offered when they have finished looking.

   WHY A TABLE AND NOT A NAMING CONVENTION. The maps do not line up with the
   atlas one for one: the United States is one atlas country and four maps,
   and a reader looking at Oregon should not be handed Long Island. The join
   has to be written down.

   The files themselves live in maps/ and are deliberately NOT precached;
   codex23 says why. */

/* The order the reader meets them. Old World first, because every
   classification vocabulary in wine is borrowed from it, then the New World
   by continent. This is the order core.js's DRILL_GROUPS already uses, so
   the atlas and the drills agree with each other. */
var MAP_SHEETS = [
  { id: 'france',       name: 'France',        atlas: 'France' },
  { id: 'italy',        name: 'Italy',         atlas: 'Italy' },
  { id: 'spain',        name: 'Spain',         atlas: 'Spain',    sec: 'Spain' },
  { id: 'portugal',     name: 'Portugal',      atlas: 'Portugal', sec: 'Portugal' },
  { id: 'germany',      name: 'Germany',       atlas: 'Germany',  sec: 'Germany' },
  { id: 'austria',      name: 'Austria',       atlas: 'Austria',  sec: 'Austria' },

  /* One atlas country, four sheets. `only` is the split. */
  { id: 'california',   name: 'California',    atlas: 'United States', sec: 'California',
    only: ['Napa & Sonoma (CA)', 'Central Coast (CA)'] },
  { id: 'oregon',       name: 'Oregon',        atlas: 'United States', sec: 'Pacific NW, NY & Canada',
    only: ['Willamette Valley (OR)'] },
  { id: 'washington',   name: 'Washington',    atlas: 'United States', sec: 'Pacific NW, NY & Canada',
    only: ['Columbia Valley (WA)'] },
  /* Virginia and Texas are in the atlas and on no sheet the owner has drawn.
     They are listed here rather than dropped, flagged by `orphan` below, so
     that retiring the old drawings loses nothing. */
  { id: 'new-york',     name: 'New York',      atlas: 'United States', sec: 'Pacific NW, NY & Canada',
    only: ['Finger Lakes (NY)', 'Long Island (NY)', 'Virginia', 'Texas'] },

  { id: 'argentina',    name: 'Argentina',     atlas: 'Argentina',    sec: 'South America' },
  { id: 'chile',        name: 'Chile',         atlas: 'Chile',        sec: 'South America' },
  { id: 'australia',    name: 'Australia',     atlas: 'Australia',    sec: 'Australia' },
  { id: 'new-zealand',  name: 'New Zealand',   atlas: 'New Zealand',  sec: 'New Zealand' },
  { id: 'south-africa', name: 'South Africa',  atlas: 'South Africa', sec: 'South Africa' }
];

var MAP_GROUPS = [
  ['The Old World',           ['france', 'italy', 'spain', 'portugal', 'germany', 'austria']],
  ['The Americas',            ['california', 'oregon', 'washington', 'new-york', 'argentina', 'chile']],
  ['The Southern Hemisphere', ['australia', 'new-zealand', 'south-africa']]
];

/* Regions the app examines that no sheet covers. Shown under New York with a
   line saying so, so the gap is visible instead of silent. */
var MAP_ORPHANS = ['Virginia', 'Texas'];

/* Region name to drill section, where the section differs from the sheet's
   own. France and Italy are the only sheets whose regions split across more
   than one examined section. Every value here is checked against cats() at
   runtime before a button is offered, so a renamed section hides the button
   rather than starting nothing. */
var MAP_REGION_SEC = {
  'Champagne': 'Champagne',
  'Alsace': 'Alsace',
  'Loire Valley': 'Loire',
  'Burgundy': 'Burgundy',
  'Beaujolais': 'Burgundy',
  'Rhône Valley': 'Rhône',
  'Bordeaux': 'Bordeaux',
  'Provence': 'Southern France',
  'Languedoc-Roussillon': 'Southern France',

  'Piedmont': 'Italy North',
  'Lombardy': 'Italy North',
  'Veneto': 'Italy North',
  'Friuli': 'Italy North',
  'Trentino-Alto Adige': 'Italy North',
  'Tuscany': 'Italy Central & South',
  'Umbria': 'Italy Central & South',
  'Abruzzo': 'Italy Central & South',
  'Campania': 'Italy Central & South',
  'Puglia': 'Italy Central & South',
  'Sicily': 'Italy Central & South',
  'Sardinia': 'Italy Central & South'
};

/* Atlas region to the TERROIR rows describing the same ground. TERROIR
   (reference.js) carries a climate category and an explanatory note that
   INTRO_ATLAS does not, and the two files have never been shown together.
   Only confident pairings are listed; an unmatched TERROIR row is left alone
   rather than guessed onto a region. A region may gather several rows:
   Bordeaux is three entries in TERROIR and one place on the map. */
var MAP_REGION_TERROIR = {
  'Champagne': ['Champagne'],
  'Alsace': ['Alsace'],
  'Beaujolais': ['Beaujolais'],
  /* Straight apostrophes, because that is what reference.js and data-intro.js
     both hold. A typographic one here silently matches nothing. */
  'Burgundy': ['Chablis', "Côte d'Or"],
  'Bordeaux': ['Bordeaux (Left Bank)', 'Bordeaux (Right Bank)', 'Sauternes'],
  'Loire Valley': ['Sancerre / Pouilly-Fumé', 'Vouvray (Touraine)', 'Muscadet (Pays Nantais)'],
  'Rhône Valley': ['Northern Rhône', 'Southern Rhône'],
  'Provence': ['Provence / Bandol'],
  'Languedoc-Roussillon': ['Roussillon (Banyuls)'],

  'Piedmont': ['Piedmont (Langhe)'],
  'Veneto': ['Soave', 'Valpolicella'],
  'Trentino-Alto Adige': ['Alto Adige'],
  'Tuscany': ['Chianti Classico', 'Montalcino'],
  'Campania': ['Campania / Vulture'],
  'Sicily': ['Etna (Sicily)'],

  'Rioja': ['Rioja Alta/Alavesa'],
  'Ribera del Duero': ['Ribera del Duero'],
  'Rías Baixas': ['Rías Baixas'],
  'Priorat': ['Priorat'],
  'Jerez (Sherry)': ['Jerez'],

  'Douro / Port': ['Douro'],
  'Vinho Verde': ['Vinho Verde'],
  'Madeira': ['Madeira'],

  'Mosel': ['Mosel'],
  'Rheingau': ['Rheingau'],
  'Baden': ['Baden'],
  'Franken': ['Franken'],

  'Wachau / Kamptal / Kremstal': ['Wachau'],
  'Burgenland': ['Burgenland'],

  'Napa & Sonoma (CA)': ['Napa Valley', 'Sonoma (RRV/Coast)'],
  'Willamette Valley (OR)': ['Willamette Valley'],
  'Columbia Valley (WA)': ['Columbia Valley'],
  'Finger Lakes (NY)': ['Finger Lakes'],

  'Mendoza (Uco, Luján de Cuyo)': ['Mendoza / Uco Valley'],
  'Salta / Cafayate': ['Salta (Cafayate)'],
  'Maipo Valley': ['Maipo (Puente Alto)'],
  'Aconcagua / Casablanca': ['Casablanca / Leyda'],

  'Barossa / Eden Valley (SA)': ['Barossa Valley'],
  'Clare Valley (SA)': ['Eden & Clare Valleys'],
  'Coonawarra (SA)': ['Coonawarra'],
  'Margaret River (WA)': ['Margaret River'],
  'Hunter Valley (NSW)': ['Hunter Valley'],

  'Marlborough': ['Marlborough'],
  'Central Otago': ['Central Otago'],
  "Hawke's Bay": ["Hawke's Bay (Gimblett)"],

  'Stellenbosch': ['Stellenbosch'],
  'Swartland': ['Swartland'],
  'Walker Bay / Hemel-en-Aarde': ['Hemel-en-Aarde'],
  'Constantia': ['Constantia']
};

/* ---- lookups ------------------------------------------------------------ */

function mapSheet(id) {
  for (var i = 0; i < MAP_SHEETS.length; i++) if (MAP_SHEETS[i].id === id) return MAP_SHEETS[i];
  return null;
}

function mapFile(id) { return 'maps/' + id + '.jpg'; }

/* Every TERROIR row, flattened once and keyed by its region name. */
var _mapTerroirIndex = null;
function mapTerroirRow(name) {
  if (_mapTerroirIndex === null) {
    _mapTerroirIndex = {};
    try {
      TERROIR.forEach(function (c) {
        c.regions.forEach(function (r) { _mapTerroirIndex[r.r] = r; });
      });
    } catch (e) { _mapTerroirIndex = {}; }
  }
  return _mapTerroirIndex[name] || null;
}

/* The regions belonging to one sheet, in atlas order, each already carrying
   whatever TERROIR adds. Returns [] rather than throwing when the atlas is
   not loaded, so a missing data file costs a list and not the page. */
function mapRegions(id) {
  var sheet = mapSheet(id);
  if (!sheet) return [];
  var country = null;
  try {
    for (var i = 0; i < INTRO_ATLAS.length; i++) {
      if (INTRO_ATLAS[i].name === sheet.atlas) { country = INTRO_ATLAS[i]; break; }
    }
  } catch (e) { return []; }
  if (!country) return [];

  var rows = country.r;
  if (sheet.only) {
    rows = sheet.only.map(function (n) {
      for (var j = 0; j < country.r.length; j++) if (country.r[j].n === n) return country.r[j];
      return null;
    }).filter(Boolean);
  }

  return rows.map(function (r) {
    var extra = (MAP_REGION_TERROIR[r.n] || []).map(mapTerroirRow).filter(Boolean);
    return {
      n: r.n,
      g: r.g,
      soil: r.soil,
      climate: extra.length ? extra[0].cl : '',
      notes: extra.map(function (t) { return t.note; }).filter(Boolean),
      sec: MAP_REGION_SEC[r.n] || sheet.sec || '',
      orphan: MAP_ORPHANS.indexOf(r.n) >= 0
    };
  });
}
