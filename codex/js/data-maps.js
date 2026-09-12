/* ═══════════════ THE WORLD MAP: what each map holds ═══════════════

   Drawn maps replace ninety eight hand-coded SVG pins. This file is the join
   between the pictures and the study data the app already carries: almost
   every region name, grape list, soil and note below is looked up at runtime
   out of INTRO_ATLAS (js/data-intro.js) and TERROIR (js/reference.js), so it
   is mostly a table of which existing record belongs under which picture, and
   which drill a reader should be offered when they have finished looking.

   THE ONE PLACE THIS FILE MAKES WINE CLAIMS OF ITS OWN is MAP_OWN_REGIONS, at
   the foot. INTRO_ATLAS stops at twelve countries and the app examines more
   than twelve: Hungary and Greece are a full category at three ranks, seventy
   seven questions, and had no atlas entry at all. Those regions were written
   against the app's own question bank so the atlas cannot contradict the exam,
   and each one was then handed to a second pass told to refute it.

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
  { id: 'south-africa', name: 'South Africa',  atlas: 'South Africa', sec: 'South Africa' },

  /* Two sheets whose regions are NOT in INTRO_ATLAS: see MAP_OWN_REGIONS and
     mapRegions. The app examines Hungary and Greece as ONE drill category at
     three ranks, which is why both point at the same section. */
  { id: 'hungary',      name: 'Hungary',       own: 'hungary', sec: 'Hungary & Greece' },
  { id: 'greece',       name: 'Greece',        own: 'greece',  sec: 'Hungary & Greece' }
];

var MAP_GROUPS = [
  ['The Old World',           ['france', 'italy', 'spain', 'portugal', 'germany', 'austria',
                               'hungary', 'greece']],
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
  'Constantia': ['Constantia'],

  /* TERROIR has always carried a Hungary & Greece group of three, which until
     now had no map to sit under and no view that showed it beside a grape. */
  'Tokaj': ['Tokaj'],
  'Santorini': ['Santorini'],
  'Naoussa': ['Naoussa']
};

/* ═══════════ regions the atlas does not hold ═══════════

   INTRO_ATLAS stops at twelve countries. The app examines more than twelve:
   Hungary & Greece is one category, seventy seven questions across three
   ranks, and had no atlas entry of any kind. These entries were written
   against that bank, question by question, so the map cannot teach a student
   something the exam will then mark wrong. Each was handed to a second pass
   told to refute it; nine of the nineteen came back corrected, and the
   corrections are the reason this list is worth trusting:

     Mátra had andesite tuff lying on top of loess, which is fifteen million
       year old rock resting on windblown silt two million years old. Inverted.
     Mátra was also given Sárga Muskotály, which is TOKAJ's muscat by the
       bank's own answer to "name Tokaj's two supporting whites". Mátra's is
       Ottonel Muskotály, and the confusion would have cost a mark either way.
     Villány carried Kékfrankos, which belongs to Sopron, Szekszárd and Eger,
       while Cabernet Sauvignon, its second most planted red, was missing.
     Kunság carried Ezerjó, which is Mór's grape and a known exam trap.
     Naoussa's soil listed sand. Sand is AMYNDEON's marker and the bank uses it
       to tell the two Xinomavro regions apart, so naming it twice destroys the
       distinction. Rapsani had the same fault; it is iron-rich schist.
     Santorini put its 85 per cent Assyrtiko floor in front of a list ending in
       Vinsanto, which is 51 per cent. Two different legal minimums.
     Crete was given Assyrtiko in place of Dafni, contradicting the bank's own
       answer outright, and schist on its peaks, which are limestone karst.
     Samos read as though Nectar were fortified. Vin Doux is fortified, Nectar
       is sun-dried and is not, and that is exactly the distinction examined.

   Style matches INTRO_ATLAS: grapes then a plain hyphen then the style, soil
   as a short phrase. No em-dashes anywhere; the publish gate counts them. */
var MAP_OWN_REGIONS = {
  hungary: [
    { n: 'Tokaj',
      g: 'Furmint, Hárslevelű, Sárga Muskotály - botrytised Aszú and dry Furmint',
      soil: 'Rhyolite and andesite tuff; loess, nyirok clay' },
    { n: 'Eger',
      g: 'Kékfrankos (Egri Bikavér), Olaszrizling, Leányka - Egri Csillag white blend',
      soil: 'Rhyolite tuff of the Bükkalja; clay, loess' },
    { n: 'Mátra',
      g: 'Olaszrizling, Rizlingszilváni, Szürkebarát, Ottonel Muskotály - aromatic, crisp whites',
      soil: 'Loess and brown forest soil over volcanic andesite' },
    { n: 'Sopron',
      g: 'Kékfrankos, Zweigelt, Pinot Noir - cool, peppery reds by Lake Fertő',
      soil: 'Gneiss and mica schist; loess, lakeside limestone' },
    { n: 'Badacsony (Balaton)',
      g: 'Kéknyelű, Olaszrizling, Furmint, Szürkebarát - lake-tempered volcanic whites',
      soil: 'Basalt cap and tuff over Pannonian sandstone' },
    { n: 'Somló',
      g: 'Juhfark, Furmint, Hárslevelű, Olaszrizling - taut, smoky, ageworthy whites',
      soil: 'Basalt cap over basalt tuff; loess at the foot' },
    { n: 'Szekszárd',
      g: 'Kékfrankos, Kadarka, Merlot, Cabernets - Szekszárdi Bikavér, spicy reds',
      soil: 'Deep loess on the Szekszárd hills; clay below' },
    { n: 'Villány',
      g: "Cabernet Franc (Villányi Franc), Merlot, Cabernet Sauvignon - Hungary's warmest reds",
      soil: 'Triassic limestone under deep loess; clay' },
    { n: 'Kunság',
      g: 'Cserszegi Fűszeres, Arany Sárfehér, Kadarka, Kékfrankos - ungrafted vines, light wines',
      soil: 'Wind-blown sand over the Danube-Tisza plain' }
  ],

  greece: [
    { n: 'Naoussa',
      g: 'Xinomavro - sole permitted grape, tannic and long-lived',
      soil: 'Calcareous clay-loam over limestone bedrock' },
    { n: 'Amyndeon',
      g: 'Xinomavro - red, still and sparkling rosé; paler, higher-toned, earlier-drinking',
      soil: 'Sand over limestone; lake-basin deposits' },
    { n: 'Goumenissa',
      g: 'Xinomavro with minimum 20% Negoska - flesh over structure',
      soil: 'Clay and sandy loam over limestone' },
    { n: 'Rapsani',
      g: 'Xinomavro, Krassato, Stavroto - equal parts, red',
      soil: 'Iron-rich weathered schist, stony and poor' },
    { n: 'Nemea',
      g: 'Agiorgitiko - the only red permitted, valley floor to high slopes',
      soil: 'Red clay on the floor, clay-limestone above' },
    { n: 'Mantinia',
      g: 'Moschofilero - pink-skinned, pressed pale; aromatic dry white',
      soil: 'Sandy clay-limestone, plateau at 600-700 m' },
    { n: 'Santorini',
      g: 'Assyrtiko (85% dry, 51% Vinsanto), Athiri, Aidani - dry white, Nykteri, Vinsanto',
      soil: 'Volcanic ash and pumice over lava; no clay' },
    { n: 'Crete',
      g: 'Vidiano, Vilana, Dafni; Liatiko, Kotsifali, Mandilaria - dry wines and sweet Liatiko',
      soil: 'Limestone and marl over clay; sandy loam near the coast' },
    { n: 'Kefalonia',
      g: 'Robola - dry white on limestone; also sweet Mavrodaphne and Muscat',
      soil: 'Bare limestone scree and karst' },
    { n: 'Samos',
      g: 'Moschato Aspro - fortified sweet Vin Doux; unfortified sun-dried Nectar',
      soil: 'Schist terraces on Mount Ampelos, to 800 m' }
  ]
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

  var rows;
  if (sheet.own) {
    /* A sheet with no country in INTRO_ATLAS. The atlas stops at twelve
       countries and the app examines more than twelve: Hungary and Greece are
       a full category at three ranks. Their regions are carried here rather
       than pushed into data-intro.js, which three other views also read and
       whose shape includes SVG coordinates that mean nothing to a photograph. */
    rows = MAP_OWN_REGIONS[sheet.own] || [];
  } else {
    var country = null;
    try {
      for (var i = 0; i < INTRO_ATLAS.length; i++) {
        if (INTRO_ATLAS[i].name === sheet.atlas) { country = INTRO_ATLAS[i]; break; }
      }
    } catch (e) { return []; }
    if (!country) return [];

    rows = country.r;
    if (sheet.only) {
      rows = sheet.only.map(function (n) {
        for (var j = 0; j < country.r.length; j++) if (country.r[j].n === n) return country.r[j];
        return null;
      }).filter(Boolean);
    }
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
