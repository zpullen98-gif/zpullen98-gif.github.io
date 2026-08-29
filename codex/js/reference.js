/* ============ Terroir Atlas reference ============ */
var TERROIR=[
{country:"France",regions:[
 {r:"Champagne",cl:"Cool continental",so:"Chalk (belemnite)",note:"49°N, no Atlantic protection: frost, rain, hail; chalk stores water & carves crayères"},
 {r:"Chablis",cl:"Cool continental",so:"Kimmeridgian limestone-marl",note:"Severe spring frost, sprinklers & heaters; Petit Chablis on Portlandian"},
 {r:"Côte d'Or",cl:"Continental",so:"Limestone & marl",note:"East/SE-facing slope; mid-slope = Grand Cru band; hail risk"},
 {r:"Beaujolais",cl:"Continental",so:"Granite & schist",note:"Gamay peaks on the granite hills of the 10 Crus"},
 {r:"Bordeaux (Left Bank)",cl:"Maritime",so:"Gravel croupes",note:"Gironde moderation; gravel drains & warms, Cabernet Sauvignon"},
 {r:"Bordeaux (Right Bank)",cl:"Maritime",so:"Clay & limestone",note:"Cooler clay suits Merlot; Pétrus' blue-clay buttonhole"},
 {r:"Sauternes",cl:"Maritime",so:"Gravel over limestone",note:"Cold Ciron meets warm Garonne → morning mists → botrytis"},
 {r:"Sancerre / Pouilly-Fumé",cl:"Continental",so:"Silex, caillottes, terres blanches",note:"Silex = gunflint smoke; terres blanches = Kimmeridgian marl"},
 {r:"Vouvray (Touraine)",cl:"Continental w/ maritime edge",so:"Tuffeau limestone",note:"Soft stone yields aging caves; Chenin in all sweetness levels"},
 {r:"Muscadet (Pays Nantais)",cl:"Cool maritime",so:"Granite, gneiss, schist",note:"Atlantic frost risk; saline, sur lie whites"},
 {r:"Alsace",cl:"Semi-continental, dry & sunny",so:"Mosaic: granite, limestone, schist, volcanic",note:"Vosges rain shadow, Colmar among France's driest towns"},
 {r:"Northern Rhône",cl:"Continental",so:"Granite terraces",note:"Steep slopes above the river; Mistral demands staked vines"},
 {r:"Southern Rhône",cl:"Mediterranean",so:"Galets roulés, sand, limestone",note:"Galets radiate night heat; Mistral dries & intensifies"},
 {r:"Provence / Bandol",cl:"Mediterranean",so:"Limestone & schist",note:"Amphitheater terraces ripen Mourvèdre; drought pressure"},
 {r:"Roussillon (Banyuls)",cl:"Mediterranean",so:"Schist terraces",note:"Heat-holding dark schist for Grenache VDNs"}]},
{country:"Italy",regions:[
 {r:"Piedmont (Langhe)",cl:"Continental",so:"Calcareous marls",note:"Autumn 'nebbia' fog; Tortonian (perfume) vs Serravallian (structure)"},
 {r:"Soave",cl:"Warm continental",so:"Volcanic basalt",note:"Classico hills give mineral Garganega"},
 {r:"Valpolicella",cl:"Continental, Garda-moderated",so:"Limestone & volcanic",note:"Hillside fruttaia lofts dry grapes for Amarone"},
 {r:"Alto Adige",cl:"Alpine continental",so:"Porphyry, limestone, glacial",note:"Big diurnal swings; crisp aromatic whites"},
 {r:"Chianti Classico",cl:"Continental hills",so:"Galestro & alberese",note:"400–600m elevation freshens Sangiovese"},
 {r:"Montalcino",cl:"Warm Mediterranean-continental",so:"Galestro, clay, limestone",note:"Warmer & drier than Chianti: riper, 100% Sangiovese"},
 {r:"Campania / Vulture",cl:"Mediterranean w/ elevation",so:"Volcanic",note:"Vesuvius & Vulture ash; Aglianico, Fiano, Greco"},
 {r:"Etna (Sicily)",cl:"Mediterranean alpine",so:"Volcanic ash & basalt",note:"600–1,100m contrade; Nerello like mountain Pinot"}]},
{country:"Spain & Portugal",regions:[
 {r:"Rioja Alta/Alavesa",cl:"Continental w/ Atlantic touch",so:"Clay-limestone",note:"Sierra de Cantabria shields Atlantic storms"},
 {r:"Ribera del Duero",cl:"Extreme continental",so:"Clay-limestone, sand",note:"750–900m Meseta; brutal diurnal swings"},
 {r:"Rías Baixas",cl:"Cool Atlantic maritime",so:"Granite",note:"Heavy rain; pergolas lift Albariño above humidity"},
 {r:"Priorat",cl:"Mediterranean",so:"Llicorella (slate/quartz)",note:"Terraced amphitheater; roots plunge through fractured slate"},
 {r:"Jerez",cl:"Hot maritime",so:"Albariza chalk",note:"Albariza soaks winter rain, sustains vines through drought; poniente/levante winds shape flor"},
 {r:"Douro",cl:"Continental Mediterranean",so:"Schist",note:"Serra do Marão rain shadow; terraces on 60° slopes"},
 {r:"Vinho Verde",cl:"Cool Atlantic",so:"Granite",note:"High rainfall: fresh, low-alcohol whites"},
 {r:"Madeira",cl:"Subtropical",so:"Volcanic",note:"Steep island poios (terraces); heat & sea air define the wine"}]},
{country:"Germany & Austria",regions:[
 {r:"Mosel",cl:"Cool continental",so:"Blue & red slate",note:"Slate radiates heat; river reflects light; slopes to 65°"},
 {r:"Rheingau",cl:"Cool continental",so:"Slate, quartzite, loess",note:"Taunus hills shelter; south-facing bank of the Rhine"},
 {r:"Baden",cl:"Warmest German region",so:"Volcanic (Kaiserstuhl), loess",note:"Spätburgunder country"},
 {r:"Franken",cl:"Continental",so:"Muschelkalk limestone, keuper",note:"Dry Silvaner in Bocksbeutel"},
 {r:"Wachau",cl:"Continental meets Pannonian",so:"Gneiss terraces + loess",note:"Riesling on gneiss, Grüner on loess; Danube moderates"},
 {r:"Burgenland",cl:"Warm Pannonian",so:"Varied; lakeside loam",note:"Shallow Lake Neusiedl mists → botrytis sweets; Blaufränkisch reds"}]},
{country:"Hungary & Greece",regions:[
 {r:"Tokaj",cl:"Continental",so:"Volcanic + loess",note:"Bodrog & Tisza mists breed noble rot on Furmint"},
 {r:"Santorini",cl:"Arid Mediterranean",so:"Volcanic ash & pumice",note:"No phylloxera; meltemi wind → kouloura baskets; night humidity waters vines"},
 {r:"Naoussa",cl:"Continental foothills",so:"Limestone, clay, schist",note:"Mount Vermio slopes; structured Xinomavro"}]},
{country:"United States",regions:[
 {r:"Napa Valley",cl:"Mediterranean",so:"Mosaic: volcanic hills, alluvial benchland",note:"San Pablo Bay fog cools the south; heat climbs toward Calistoga"},
 {r:"Sonoma (RRV/Coast)",cl:"Cool Mediterranean",so:"Sandy loam (Goldridge)",note:"Pacific fog via the Petaluma Gap, Pinot & Chard"},
 {r:"Willamette Valley",cl:"Cool, mild maritime-influenced",so:"Jory (volcanic) & Willakenzie (marine sediment)",note:"Van Duzer Corridor funnels ocean air; Pinot Noir heartland"},
 {r:"Columbia Valley",cl:"Continental semi-desert",so:"Sandy loess over basalt",note:"Cascade rain shadow (~8\" rain); own-rooted vines; long daylight"},
 {r:"Finger Lakes",cl:"Cool continental",so:"Shale & glacial till",note:"Deep lakes store heat, buffering winter kill"}]},
{country:"South America",regions:[
 {r:"Mendoza / Uco Valley",cl:"High-altitude continental desert",so:"Alluvial; limestone-flecked in Gualtallary",note:"Andes snowmelt irrigation; Zonda wind; hail nets; huge diurnal swing"},
 {r:"Salta (Cafayate)",cl:"Extreme high-altitude",so:"Sandy alluvial",note:"Vineyards near 3,000m: intense UV, aromatic Torrontés"},
 {r:"Maipo (Puente Alto)",cl:"Mediterranean",so:"Alluvial gravels",note:"Andean foothill Cabernet; poplar windbreaks"},
 {r:"Casablanca / Leyda",cl:"Cool Mediterranean coastal",so:"Granite, clay",note:"Humboldt Current fog: SB, Chardonnay, Pinot"}]},
{country:"Australia & New Zealand",regions:[
 {r:"Barossa Valley",cl:"Warm Mediterranean",so:"Varied loams",note:"Phylloxera-free; ancient own-rooted Shiraz"},
 {r:"Eden & Clare Valleys",cl:"Cooler by elevation",so:"Rocky loams, slate (Polish Hill)",note:"High-acid Riesling; screwcap pioneers"},
 {r:"Coonawarra",cl:"Maritime-moderated",so:"Terra rossa over limestone",note:"A cigar-shaped strip 20km long, Cabernet"},
 {r:"Margaret River",cl:"Maritime (Indian Ocean)",so:"Gravelly loams over granite",note:"Bordeaux-like ripening reliability"},
 {r:"Hunter Valley",cl:"Humid subtropical",so:"Sandy alluvial, clay",note:"Harvest rain risk → early-picked, ageworthy Semillon"},
 {r:"Marlborough",cl:"Cool sunny maritime",so:"Alluvial greywacke gravels",note:"Wairau vs cooler Awatere; NZ's sunniest corner"},
 {r:"Central Otago",cl:"Continental (NZ's only)",so:"Schist + loess",note:"Semi-arid basins, fierce diurnal swing: Pinot Noir"},
 {r:"Hawke's Bay (Gimblett)",cl:"Warm maritime",so:"Greywacke river gravels",note:"Ex-riverbed (1867 flood), Syrah & Bordeaux blends"}]},
{country:"South Africa",regions:[
 {r:"Stellenbosch",cl:"Mediterranean",so:"Decomposed granite, Table Mountain sandstone",note:"False Bay breezes; Cape Doctor wind cuts rot"},
 {r:"Swartland",cl:"Warm, dry Mediterranean",so:"Granite (Paardeberg) & shale",note:"Dry-farmed bush vines: old Chenin, Rhône reds"},
 {r:"Hemel-en-Aarde",cl:"Cool maritime",so:"Clay-rich shale",note:"Atlantic at Walker Bay, Pinot Noir & Chardonnay"},
 {r:"Constantia",cl:"Cool maritime",so:"Granite & sandstone",note:"Historic sweet Muscat; ocean on two sides"}]}
];

function refView(){
  let html='<div><div class="viewhead"><h2>Terroir Atlas</h2><div class="sub">Climate category · signature soil · the feature that explains the wine. Drill these in the matching section when ready.</div></div>';
  html+='<button class="btn gold" id="drill-terroir" style="margin:10px 0 4px">Drill Terroir: Climate &amp; Soil →</button>';
  TERROIR.forEach(c=>{
    html+='<div class="refcountry">'+c.country+'</div>';
    c.regions.forEach(g=>{
      html+='<div class="refrow"><div class="refr">'+g.r+'</div><div class="refcl">'+g.cl+'</div><div class="refso">'+g.so+'</div><div class="refnote">'+g.note+'</div></div>';
    });
  });
  html+='</div>';
  const v=el(html);
  v.querySelector('#drill-terroir').onclick=()=>startDrill('Terroir: Climate & Soil');
  return v;
}
/* ============ Producer Codex reference ============ */
var PRODUCERS=[
{country:"France, Bordeaux & Sauternes",rows:[
 {p:"Château Lafite Rothschild",r:"Pauillac",w:"Grand Vin (1st Growth)",t:"Cedar, graphite, cassis: the most perfumed and aristocratic First"},
 {p:"Château Latour",r:"Pauillac",w:"Grand Vin (1st Growth)",t:"Iron-fisted, dense, immortal: decades before it unclenches"},
 {p:"Château Margaux",r:"Margaux",w:"Grand Vin (1st Growth)",t:"Violets and silk over hidden power, Bordeaux's perfume house"},
 {p:"Pétrus",r:"Pomerol",w:"Pétrus (100% Merlot)",t:"Blue-clay Merlot: truffle, plum velvet, endless mid-palate"},
 {p:"Château Cheval Blanc",r:"Saint-Émilion",w:"Grand Vin (Cab Franc-led)",t:"Floral, exotic spice, satin tannin: Cab Franc's world summit"},
 {p:"Château d'Yquem",r:"Sauternes",w:"Yquem (PC Supérieur)",t:"Saffron, apricot, crème brûlée riding electric acidity for a century"}]},
{country:"France, Burgundy & Beaujolais",rows:[
 {p:"Domaine de la Romanée-Conti",r:"Vosne-Romanée",w:"Romanée-Conti; La Tâche; Montrachet",t:"Rose, spice, sous-bois: impossibly weightless intensity"},
 {p:"Domaine Leroy",r:"Vosne-Romanée",w:"Musigny, Richebourg (biodynamic)",t:"Whole-cluster perfume, ferocious purity: Lalou Bize-Leroy's grails"},
 {p:"Comte Georges de Vogüé",r:"Chambolle-Musigny",w:"Musigny Vieilles Vignes",t:"Lace and iron, Chambolle's floral silk with Grand Cru spine"},
 {p:"Domaine Leflaive",r:"Puligny-Montrachet",w:"Chevalier- & Bâtard-Montrachet",t:"White flowers, hazelnut, chalk: biodynamic Puligny precision"},
 {p:"Coche-Dury",r:"Meursault",w:"Meursault Perrières; Corton-Charlemagne",t:"Struck-match reduction, citrus oil, saline drive: the cult white style"},
 {p:"Domaine Raveneau",r:"Chablis",w:"Les Clos; Montée de Tonnerre",t:"Oyster shell, iodine, green apple steel: Chablis at maximum tension"},
 {p:"Château des Jacques (Jadot)",r:"Moulin-à-Vent",w:"Cru Beaujolais",t:"Serious Gamay: dark cherry, granite, structure that ages like Burgundy"}]},
{country:"France, Champagne",rows:[
 {p:"Krug",r:"Reims",w:"Grande Cuvée; Clos du Mesnil",t:"Oxidative depth: brioche, hazelnut, dried citrus, endless mousse"},
 {p:"Salon",r:"Le Mesnil-sur-Oger",w:"Cuvée 'S' Blanc de Blancs",t:"Chalk-and-lemon laser that needs 20 years to soften"},
 {p:"Bollinger",r:"Aÿ",w:"La Grande Année; R.D.",t:"Pinot-powered, barrel-fermented: toast, red apple, umami richness"},
 {p:"Jacques Selosse",r:"Avize",w:"Substance (solera BdB)",t:"Sherry-kissed, vinous, polarizing: the grower movement's prophet"},
 {p:"Pol Roger",r:"Épernay",w:"Cuvée Sir Winston Churchill",t:"Classic balance: white flowers, pastry, chalk; Churchill's daily pour"}]},
{country:"France: Rhône, Loire, Alsace & South",rows:[
 {p:"E. Guigal",r:"Côte-Rôtie",w:"La Mouline · La Landonne · La Turque",t:"The 'La Las': smoked violets, bacon, new-oak opulence, 42 months in barrel"},
 {p:"Domaine J.L. Chave",r:"Hermitage",w:"Hermitage Rouge & Blanc",t:"Granite Syrah of olive, pepper, and iron; honeyed immortal Marsanne"},
 {p:"Château de Beaucastel",r:"Châteauneuf-du-Pape",w:"CNdP; Roussanne Vieilles Vignes",t:"Mourvèdre-inflected: garrigue, leather, game over kirsch"},
 {p:"Château Rayas",r:"Châteauneuf-du-Pape",w:"Rayas (100% Grenache)",t:"Pale, haunting Grenache from sand: Pinot-like kirsch and incense"},
 {p:"Didier Dagueneau",r:"Pouilly-Fumé",w:"Silex; Pur Sang",t:"Gunflint and grapefruit at Grand Cru intensity, Sauvignon's outer limit"},
 {p:"Clos Rougeard",r:"Saumur-Champigny",w:"Le Bourg; Les Poyeux",t:"Cult Cabernet Franc: raspberry, graphite, Burgundian silk"},
 {p:"Domaine Huet",r:"Vouvray",w:"Le Haut-Lieu, Le Mont, Clos du Bourg",t:"Chenin across all sweetness: quince, wool, beeswax, razor acid"},
 {p:"Trimbach",r:"Alsace",w:"Clos Ste. Hune Riesling",t:"Bone-dry, austere, stony: Alsace Riesling's cathedral"},
 {p:"Domaine Tempier",r:"Bandol",w:"Bandol Rouge & Rosé",t:"Mourvèdre: black olive, wild herbs, blood and leather with age"}]},
{country:"Italy",rows:[
 {p:"Giacomo Conterno",r:"Serralunga d'Alba",w:"Barolo Riserva Monfortino",t:"Tar, rose, dried cherry, iron: traditional Barolo's summit"},
 {p:"Bartolo Mascarello",r:"Barolo",w:"Barolo (blended crus)",t:"'No barrique, no Berlusconi': pale, perfumed, fiercely classical"},
 {p:"Gaja",r:"Barbaresco",w:"Barbaresco; Sorì crus",t:"Polished modern Nebbiolo: dark fruit, spice, French-oak sheen"},
 {p:"Giuseppe Quintarelli",r:"Valpolicella",w:"Amarone; Alzero",t:"Slow-aged Amarone: fig, balsamic, spice-box, monumental yet lifted"},
 {p:"Romano Dal Forno",r:"Valpolicella",w:"Amarone Monte Lodoletta",t:"Inky, opulent, modern: Amarone at maximum density"},
 {p:"Biondi-Santi",r:"Montalcino",w:"Brunello Riserva",t:"The inventor's style: high-toned cherry, tea, acid-driven longevity"},
 {p:"Tenuta San Guido",r:"Bolgheri",w:"Sassicaia",t:"Cassis, Mediterranean herbs, cedar: Italy's first Cabernet icon"},
 {p:"Fontodi",r:"Chianti Classico (Panzano)",w:"Flaccianello della Pieve",t:"100% Sangiovese: dark cherry, iris, espresso, organic Conca d'Oro fruit"},
 {p:"Valentini",r:"Abruzzo",w:"Trebbiano d'Abruzzo",t:"The impossible Trebbiano: smoke, orchard fruit, decades of life"}]},
{country:"Spain & Portugal",rows:[
 {p:"Vega Sicilia",r:"Ribera del Duero",w:"Único",t:"Tempranillo-Cabernet aged ~10 years pre-release: leather, tobacco, eternal"},
 {p:"Dominio de Pingus",r:"Ribera del Duero",w:"Pingus",t:"Old-vine Tinto Fino: opaque, plush, biodynamic cult density"},
 {p:"López de Heredia",r:"Rioja (Haro)",w:"Viña Tondonia Reserva & Blanco",t:"Time-capsule Rioja: dried cherry, dill, oxidative white of legend"},
 {p:"CVNE",r:"Rioja",w:"Imperial Gran Reserva",t:"Classical Rioja polish: red fruit, cedar, American-oak spice"},
 {p:"Álvaro Palacios",r:"Priorat",w:"L'Ermita",t:"Old-vine Garnacha on llicorella: mineral, floral, profound"},
 {p:"Quinta do Noval",r:"Douro",w:"Nacional Vintage Port",t:"From ungrafted vines: violet, black fruit, mythic concentration"},
 {p:"Casa Ferreirinha",r:"Douro",w:"Barca Velha",t:"Portugal's first great table red (1952), released only in top years"},
 {p:"Niepoort",r:"Douro",w:"Redoma; Vintage Port",t:"Dirk Niepoort's fresher Douro, schist minerality over polish"}]},
{country:"Germany & Austria",rows:[
 {p:"Egon Müller",r:"Saar (Scharzhofberg)",w:"Scharzhofberger Riesling TBA",t:"The world's most expensive white, apricot nectar on impossible acidity"},
 {p:"J.J. Prüm",r:"Mosel (Wehlen)",w:"Wehlener Sonnenuhr Spätlese/Auslese",t:"Feather-light, spritzy youth aging into honeyed slate for decades"},
 {p:"Dönnhoff",r:"Nahe",w:"Niederhäuser Hermannshöhle GG",t:"Crystalline Riesling, stone fruit over volcanic-slate precision"},
 {p:"Klaus Peter Keller",r:"Rheinhessen",w:"G-Max Riesling",t:"The cult dry Riesling: limestone tension, myth-level scarcity"},
 {p:"F.X. Pichler",r:"Wachau",w:"Kellerberg Riesling Smaragd",t:"Baroque power: exotic stone fruit on gneiss, Austria's benchmark"},
 {p:"Kracher",r:"Burgenland (Illmitz)",w:"Numbered TBA Collection",t:"Lake Neusiedl botrytis: mango, honey, Nouvelle Vague oak or steel"}]},
{country:"United States",rows:[
 {p:"Screaming Eagle",r:"Oakville, Napa",w:"Cabernet Sauvignon",t:"The cult of cults: cassis liqueur, velvet, waiting-list mythology"},
 {p:"Harlan Estate",r:"Oakville hills",w:"Proprietary Red",t:"Hillside density: dark fruit, espresso, tobacco, 'First Growth' ambition"},
 {p:"Dominus Estate",r:"Yountville (Napanook)",w:"Dominus",t:"Christian Moueix's Napa: Bordeaux restraint, dusty tannin, savory depth"},
 {p:"Ridge Vineyards",r:"Santa Cruz Mountains",w:"Monte Bello",t:"Mountain Cabernet: American oak, iron, decades-long curve; Paris-tasting royalty"},
 {p:"Chateau Montelena",r:"Calistoga",w:"Chardonnay; Estate Cabernet",t:"The 1976 Paris white, orchard fruit and restraint over butter"},
 {p:"Au Bon Climat",r:"Santa Barbara",w:"Pinot Noir & Chardonnay",t:"Jim Clendenen's Burgundian California: savory, fresh, food-first"},
 {p:"The Eyrie Vineyards",r:"Dundee Hills, Oregon",w:"Pinot Noir",t:"David Lett's 1965 pioneer: pale, earthy, red-fruited Willamette blueprint"},
 {p:"Quilceda Creek",r:"Columbia Valley, WA",w:"Cabernet Sauvignon (Champoux)",t:"Washington's 100-point Cab: pure black fruit, seamless power"},
 {p:"Leonetti Cellar",r:"Walla Walla",w:"Cabernet & Merlot",t:"Walla Walla's first winery (1977): plush, spiced, collector staple"},
 {p:"Hermann J. Wiemer",r:"Finger Lakes",w:"Dry & Late Harvest Riesling",t:"Seneca's German-rooted precision: lime, slatey mineral, nervy acid"}]},
{country:"Australia & New Zealand",rows:[
 {p:"Penfolds",r:"South Australia",w:"Grange",t:"Multi-region Shiraz in American oak: black fruit, mocha, iron will"},
 {p:"Henschke",r:"Eden Valley",w:"Hill of Grace",t:"Single-vineyard 1860s Shiraz: sage, dark plum, silken gravity"},
 {p:"Leeuwin Estate",r:"Margaret River",w:"Art Series Chardonnay",t:"Australia's white flagship: grapefruit, white peach, oatmeal length"},
 {p:"Clonakilla",r:"Canberra District",w:"Shiraz–Viognier",t:"Côte-Rôtie down under: lifted florals, white pepper, silk"},
 {p:"Cloudy Bay",r:"Marlborough",w:"Sauvignon Blanc",t:"The bottle that launched NZ: passionfruit, gooseberry, limey snap"},
 {p:"Ata Rangi",r:"Martinborough",w:"Pinot Noir",t:"NZ Pinot benchmark: dark cherry, dried herb, fine-boned structure"},
 {p:"Felton Road",r:"Bannockburn, Central Otago",w:"Block 3 & 5 Pinot Noir",t:"Schist-grown, biodynamic: thyme, black cherry, vivid line"}]},
{country:"South Africa & South America",rows:[
 {p:"Sadie Family Wines",r:"Swartland",w:"Columella; Palladius",t:"Old-vine Rhône-style blends: fynbos, stone, the new South Africa"},
 {p:"Klein Constantia",r:"Constantia",w:"Vin de Constance",t:"Napoleon's Muscat reborn (1986): candied citrus, tea, fresh sweetness"},
 {p:"Kanonkop",r:"Stellenbosch",w:"Pinotage; Paul Sauer",t:"Pinotage's standard-bearer: mulberry, smoke, structured Bordeaux blend"},
 {p:"Hamilton Russell",r:"Hemel-en-Aarde",w:"Pinot Noir & Chardonnay",t:"Clay-grown, Burgundian: dark cherry, forest, saline Chardonnay"},
 {p:"Catena Zapata",r:"Mendoza (Gualtallary)",w:"Adrianna Vineyard wines",t:"High-altitude Malbec & Chardonnay: floral, chalky, defining Argentina"},
 {p:"Bodega Chacra",r:"Río Negro, Patagonia",w:"Treinta y Dos Pinot Noir",t:"Incisa della Rocchetta's desert Pinot: rosehip, spice, crystalline"},
 {p:"Concha y Toro",r:"Puente Alto, Maipo",w:"Don Melchor",t:"Chile's first icon Cabernet: cassis, Andean herbs, fine gravel tannin"},
 {p:"Errázuriz",r:"Aconcagua",w:"Seña; Don Maximiano",t:"The Berlin Tasting victor, polished mountain Cabernet blends"}]}
];

function prodView(){
  let html='<div><div class="viewhead"><h2>Producer Codex</h2><div class="sub">The names that anchor every country: signature bottlings and how they taste. Study, then drill.</div></div>';
  html+='<button class="btn gold" id="drill-prod" style="margin:10px 0 4px">Drill Producers &amp; Icons →</button>';
  PRODUCERS.forEach(c=>{
    html+='<div class="refcountry">'+c.country+'</div>';
    c.rows.forEach(g=>{
      html+='<div class="refrow"><div class="refr">'+g.p+'</div><div class="refcl">'+g.r+'</div><div class="refso">'+g.w+'</div><div class="refnote">'+g.t+'</div></div>';
    });
  });
  html+='</div>';
  const v=el(html);
  v.querySelector('#drill-prod').onclick=()=>startDrill('Producers & Icons');
  return v;
}
/* ============ Grape Flashcards: Certified tasting list ============ */
var GRAPES=[
{g:"Albariño",c:"w",st:"Body light–med · Acid HIGH · Alc moderate · Dry",fruit:"White peach, apricot, lemon-lime, honeydew",other:"Saline / sea spray, white flowers, wet stone: no oak",tell:"Stone fruit wrapped in salt air with racy acid",regions:"Rías Baixas (Galicia); Vinho Verde as Alvarinho (Monção e Melgaço)",confuse:"Dry Riesling shows lime + petrol; Pinot Grigio is more neutral, less saline"},
{g:"Chardonnay",c:"w",st:"Body med–full · Acid med(+) cool / med warm · Alc mod–high · Dry",fruit:"Cool: green apple, citrus, pear · Warm: yellow apple, peach, pineapple",other:"Butter (MLF), vanilla/toast (oak), hazelnut, oyster shell & struck match (Chablis)",tell:"The shape-shifter; read the WINEMAKING: MLF butter + oak + lees, or steely and lean",regions:"Chablis (steely), Côte de Beaune (nutty, structured), California RRV/Carneros (ripe, creamy), Margaret River/Yarra",confuse:"Unoaked Chard vs Chenin: Chenin brings lanolin wool + higher acid; vs Pinot Gris: PG oilier, spiced pear"},
{g:"Chenin Blanc",c:"w",st:"Body medium · Acid HIGH · Alc moderate · Dry → sweet",fruit:"Quince, yellow apple, pear, chamomile, honey (sweet styles)",other:"Lanolin / wet wool, beeswax, straw; South Africa: baked apple, smoke",tell:"Screaming acid + waxy lanolin + honeyed quince, any sweetness level",regions:"Vouvray & Savennières (Loire), South Africa (Steen: old-vine Swartland, Stellenbosch)",confuse:"Riesling shows lime + petrol instead of wool; Chardonnay lacks the lanolin and the acid edge"},
{g:"Gewürztraminer",c:"w",st:"Body FULL · Acid LOW · Alc high · Often off-dry · Deep gold",fruit:"LYCHEE, rose petal, ginger, mango, tangerine",other:"Turkish delight, allspice, oily/phenolic texture, sometimes pink-copper tint",tell:"Lychee + rose + oily body + low acid; nothing else smells like it",regions:"Alsace (benchmark, VT/SGN sweets), Alto Adige (its namesake Tramin)",confuse:"Muscat is grapey orange blossom and lighter; Viognier is apricot-honeysuckle, more acid"},
{g:"Grüner Veltliner",c:"w",st:"Body light–med · Acid HIGH · Alc moderate · Dry",fruit:"Green apple, citrus, white peach",other:"WHITE PEPPER, lentil/legume, radish, green herbs, wet stone",tell:"White pepper + lentil greenness over racy citrus",regions:"Wachau, Kamptal, Kremstal (Austria): Steinfeder→Federspiel→Smaragd in the Wachau",confuse:"Sauvignon Blanc is grassy/passionfruit pyrazine; GV is peppery/leguminous. Dry Riesling shows lime + petrol"},
{g:"Muscat Blanc",c:"w",st:"Body light–med · Acid low–med · Dry (Alsace) → lusciously sweet (VDN, Asti)",fruit:"Table grape, peach, orange blossom, musk",other:"Floral perfume, honey when sweet: the aroma of the grape itself",tell:"The only wine that smells exactly like eating grapes",regions:"Alsace (dry, noble grape), Muscat de Beaumes-de-Venise (VDN), Moscato d'Asti, Rutherglen (fortified)",confuse:"Gewürz is lychee-rose and oilier; Torrontés mimics the nose but finishes drier with more acid"},
{g:"Pinot Gris / Grigio",c:"w",st:"Grigio: light, crisp, neutral · Gris (Alsace): med–full, oily, off-dry, low–med acid",fruit:"Pear, lemon, white nectarine; Alsace: ripe pear, baked apple",other:"Almond, honey, smoke, ginger (Alsace); faint copper/pink tint possible",tell:"Either near-neutral crispness (Italy) or smoky honeyed pear with real weight (Alsace)",regions:"Alsace (noble grape), Friuli/Alto Adige, Oregon (in-between style)",confuse:"Albariño is saline with more acid; Gewürz brings lychee and even less acid"},
{g:"Riesling",c:"w",st:"Body light · Acid HIGH · Alc low–mod · Dry → sweet · Never oaked",fruit:"Lime, green apple, apricot, nectarine, white peach",other:"PETROL (TDN, with age), slate/wet stone, jasmine, beeswax",tell:"Piercing acidity + lime/petrol + transparent purity",regions:"Mosel (off-dry, feather-light ~8–10% alc), Alsace (dry, fuller), Clare/Eden (bone-dry lime, screwcap), Finger Lakes",confuse:"Chenin shows lanolin wool; Grüner shows white pepper; Albariño is saline stone fruit"},
{g:"Sauvignon Blanc",c:"w",st:"Body light–med · Acid HIGH · Alc moderate · Dry",fruit:"Grapefruit, gooseberry, passionfruit (NZ), lime, green melon",other:"Fresh-cut grass, jalapeño/bell-pepper pyrazine, boxwood, flint/gunsmoke (silex Loire)",tell:"Pyrazine greenness + tropical thiols over screaming acid",regions:"Sancerre/Pouilly-Fumé (restrained, mineral), Marlborough (explosive passionfruit), California Fumé (touch of oak)",confuse:"Grüner is pepper/lentil rather than grass; Albariño trades greenness for salinity"},
{g:"Torrontés",c:"w",st:"Body light–med · Acid med(+) · Dry despite the nose",fruit:"Peach, lemon, table grape",other:"Rose, geranium, orange blossom; lightly bitter phenolic finish",tell:"Smells sweet like Muscat, drinks dry and fresh; think Argentina",regions:"Salta / Cafayate, some of the world's highest vineyards",confuse:"Muscat and Gewürz share the perfume but carry less acid; Gewürz is oilier with lychee"},
{g:"Viognier",c:"w",st:"Body FULL · Acid LOW–med · Alc HIGH · Dry",fruit:"APRICOT, ripe peach, tangerine",other:"Honeysuckle, jasmine, oily glycerol texture, occasional oak cream",tell:"Apricot-and-honeysuckle perfume on a full, oily, warm frame",regions:"Condrieu & Château-Grillet (100%), co-ferment partner in Côte-Rôtie, California/Australia",confuse:"Gewürz is lychee-rose; Alsace Pinot Gris is smokier, less floral"},
{g:"Cabernet Franc",c:"r",st:"Body medium · Acid med–high · Tannin medium, chalky · Ruby",fruit:"Raspberry, red currant, red plum",other:"PENCIL SHAVINGS/graphite, bell pepper–jalapeño pyrazine, violet, potpourri, chili flake",tell:"Crunchy red fruit + pyrazine + pencil lead, lighter frame than Cab Sauv",regions:"Chinon, Bourgueil, Saumur-Champigny (Loire); supporting role on Bordeaux's Right Bank",confuse:"Cab Sauv is darker-fruited with heavier tannin; cool-climate Merlot is plummier without the pencil"},
{g:"Cabernet Sauvignon",c:"r",st:"Body FULL · Acid med(+) · Tannin HIGH, drying · Alc high · Deep ruby",fruit:"CASSIS/blackcurrant, blackberry, black cherry",other:"Cedar/pencil box, graphite, tobacco, mint–eucalyptus (Coonawarra/Napa hillsides), bell pepper when cool; vanilla & spice from oak",tell:"Cassis + cedar over a firm, drying tannic spine",regions:"Left Bank Bordeaux (austere, graphite), Napa (plush, high alc), Coonawarra (cassis + mint on terra rossa)",confuse:"Merlot is softer and plummier; Malbec is violet-scented and juicier; Syrah brings pepper and meat"},
{g:"Gamay",c:"r",st:"Body LIGHT · Acid HIGH · Tannin low · Alc low–mod · Bright violet-ruby",fruit:"Tart cherry, cranberry, raspberry",other:"Banana/bubblegum (carbonic), violet, peony; Cru level: crushed granite, potting soil",tell:"Light, tart, and candy-fresh; takes a chill beautifully",regions:"Beaujolais: Nouveau (pure carbonic) → the 10 Crus (Morgon Côte du Py, Moulin-à-Vent age-worthy)",confuse:"Pinot Noir is silkier with forest-floor earth; Gamay leans candied and crunchier"},
{g:"Grenache / Garnacha",c:"r",st:"Body med–full · Acid low–med · Tannin low–med, soft · Alc HIGH · Pale ruby, fast orange rim",fruit:"Strawberry, kirsch, raspberry jam",other:"GARRIGUE (dried thyme/rosemary), white pepper, lavender, leather, alcohol warmth",tell:"Pale color that drinks hot, kirsch + herbs + 15% heat",regions:"Châteauneuf-du-Pape & S. Rhône blends, Priorat (old-vine, denser), Spain, McLaren Vale",confuse:"Pinot is cooler and earthier at the same color; Zinfandel is briary blackberry jam with baking spice"},
{g:"Malbec",c:"r",st:"Body FULL · Acid medium · Tannin medium, plush · Deep purple, MAGENTA rim",fruit:"Black plum, blackberry, black cherry, blueberry",other:"VIOLET florals, cocoa, sweet tobacco; Cahors: iron, leather, drier grip",tell:"Opaque magenta color + violets + plush sweet black fruit",regions:"Mendoza (Luján, Uco: floral and fresh at altitude), Cahors (the rustic original)",confuse:"Merlot lacks the violet lift and magenta rim; Syrah brings pepper and savory meat"},
{g:"Merlot",c:"r",st:"Body med–full · Acid medium · Tannin medium, soft · Alc med–high · Ruby",fruit:"Red & black plum, black cherry, fruitcake",other:"Milk chocolate, bay leaf, cedar and vanilla from oak: round, fleshy mid-palate",tell:"Plummy and soft-centered, the wine of mediums",regions:"Right Bank Bordeaux (structured, clay-grown), Washington (firmer), California (plush)",confuse:"Cab Sauv is cassis with firm drying tannin; Malbec shows violets and a magenta rim"},
{g:"Nebbiolo",c:"r",st:"PALE garnet, orange rim · Acid HIGH · Tannin HIGH, drying · Alc high · Full structure",fruit:"Tart cherry, red plum, cranberry, dried strawberry",other:"TAR AND ROSES, licorice, leather, dried herbs, potpourri",tell:"Looks like Pinot, grips like Barolo: pale garnet hiding massive tannin and acid",regions:"Barolo & Barbaresco (Langhe), Alto Piemonte as Spanna, Valtellina as Chiavennasca",confuse:"By eye it's Pinot/Sangiovese, the tannin assault and rose-tar nose settle it; Sangiovese adds tomato leaf instead"},
{g:"Pinot Noir",c:"r",st:"Body light–med · Acid med–high · Tannin low–med, SILKY · Translucent ruby",fruit:"Red cherry, raspberry, strawberry, cranberry (cool climates)",other:"Mushroom/forest floor, rose, baking spice, beetroot, cola (California)",tell:"Translucent ruby + silk texture + red fruit over earth",regions:"Burgundy (earth, structure), Willamette (dark cherry, forest), California (riper, cola), Central Otago (vivid, thyme)",confuse:"Gamay is candied and simpler; Nebbiolo shares the color but savages the palate; Grenache runs hotter and jammier"},
{g:"Sangiovese",c:"r",st:"Body med–full · Acid HIGH · Tannin med–high, dusty · Ruby-garnet",fruit:"SOUR RED CHERRY, red plum, fig",other:"TOMATO LEAF, dried oregano/balsamic herbs, leather, earth, espresso from oak",tell:"Sour cherry + tomato leaf riding high acid and dusty tannin",regions:"Chianti Classico, Brunello di Montalcino (fullest), Vino Nobile (as Prugnolo Gentile)",confuse:"Nebbiolo is paler with tar-rose and bigger tannin; Tempranillo swaps tomato leaf for dill-coconut American oak"},
{g:"Syrah / Shiraz",c:"r",st:"Body FULL · Acid medium · Tannin med–high · Deep opaque purple-ruby",fruit:"Blackberry, blueberry, black plum",other:"BLACK PEPPER (rotundone), olive tapenade, smoked meat/bacon fat, violet; Shiraz: chocolate, sweet spice",tell:"Opaque and savory: cracked pepper, olives, and charcuterie",regions:"Northern Rhône (savory, floral), Barossa/McLaren Vale (opulent Shiraz), Washington (the midpoint)",confuse:"Cab is cassis-cedar; Malbec is violet without the pepper; Zin is jammier with raisin edges"},
{g:"Tempranillo",c:"r",st:"Body med–full · Acid medium · Tannin med–high · Garnet, bricking with age",fruit:"Dried red cherry, red plum, fig",other:"DILL & COCONUT (American oak), vanilla, leather, tobacco, cedar",tell:"Red fruit under a canopy of dill-coconut oak and leather = Rioja",regions:"Rioja (Crianza→Gran Reserva oak ladder), Ribera del Duero (darker, French oak), Toro (as Tinta de Toro)",confuse:"Sangiovese runs higher acid with tomato leaf; Garnacha is paler and hotter"},
{g:"Zinfandel",c:"r",st:"Body FULL · Acid med(+) · Tannin medium · Alc HIGH (often 15%+) · Medium ruby, not opaque",fruit:"Blackberry JAM, raspberry, dried fig & raisin (uneven ripening), bramble",other:"Black pepper, sweet baking spice, tobacco, alcohol warmth",tell:"Briary jam with a raisin edge and real heat, yet only medium color",regions:"California: Dry Creek, Lodi & Sierra Foothills old vines; Puglia as Primitivo",confuse:"Grenache is kirsch-garrigue; Syrah is darker and savory; Port-like heat but dry"}
];

function startFlash(){
  S.view='flash';
  if(!S.fc)S.fc={dir:'n2p',filter:'all'};
  flashDeck();
  render();
}
function flashDeck(){
  const f=S.fc.filter;
  const idxs=GRAPES.map((g,i)=>i).filter(i=>f==='all'||GRAPES[i].c===f);
  S.fc.deck=shuffle(idxs);S.fc.flip=false;S.fc.done=0;S.fc.again=0;S.fc.total=idxs.length;
}
function flashFilter(f){S.fc.filter=f;flashDeck();render();}
function flashDir(){S.fc.dir=S.fc.dir==='n2p'?'p2n':'n2p';S.fc.flip=false;render();}
function flashFlip(){if(S.fc.deck.length){S.fc.flip=!S.fc.flip;render();}}
function flashGrade(ok){
  if(!S.fc.flip)return;
  const cur=S.fc.deck.shift();
  if(ok){S.fc.done++;}
  else{S.fc.again++;S.fc.deck.splice(Math.min(4,S.fc.deck.length),0,cur);}
  S.fc.flip=false;render();
}

function flashView(){
  const fc=S.fc;
  const pills=(k,l)=>'<button class="btn small '+(fc.filter===k?'gold':'ghost')+'" data-f="'+k+'">'+l+'</button>';
  let inner;
  if(!fc.deck.length){
    inner='<div class="result-hero">'+
      '<div class="passfail pass">Deck complete</div>'+
      '<div class="sub2">'+fc.done+' known · '+fc.again+' sent back for review along the way</div></div>'+
      '<div class="centerrow"><button class="btn" id="fc-restart">Restart deck</button></div>';
  }else{
    const q=GRAPES[fc.deck[0]];
    const chip='<span class="gchip '+(q.c==='w'?'gw':'gr')+'">'+(q.c==='w'?'WHITE':'RED')+'</span>';
    const profile='<div class="frow"><b>Structure</b>'+q.st+'</div>'+
      '<div class="frow"><b>Fruit</b>'+q.fruit+'</div>'+
      '<div class="frow"><b>Non-fruit</b>'+q.other+'</div>';
    const idPack='<div class="frow tellrow"><b>Giveaway</b>'+q.tell+'</div>'+
      '<div class="frow"><b>Regions</b>'+q.regions+'</div>'+
      '<div class="frow"><b>Don\u2019t confuse</b>'+q.confuse+'</div>';
    let front,back;
    if(fc.dir==='n2p'){
      front='<div class="fcname">'+q.g+'</div>'+chip+'<div class="fchint">tap to reveal profile</div>';
      back='<div class="fcname sm">'+q.g+'</div>'+profile+idPack;
    }else{
      front=chip+profile+'<div class="fchint">tap to name the grape</div>';
      back='<div class="fcname">'+q.g+'</div>'+idPack;
    }
    inner='<div class="fcstage"><div class="fcard'+(fc.flip?' flip':'')+'" id="fcard">'+
      '<div class="fface ffront">'+front+'</div>'+
      '<div class="fface fback">'+back+'</div></div></div>'+
      '<div class="fcbtns">'+(fc.flip?
        '<button class="btn ghost" id="fc-again">Again <span class="key2">1</span></button>'+
        '<button class="btn gold" id="fc-got">Got it <span class="key2">2</span></button>':
        '<button class="btn" id="fc-flip">Flip <span class="key2">space</span></button>')+'</div>';
  }
  const v=el('<div>'+
    '<div class="viewhead"><h2>Grape Flashcards</h2><div class="sub">The Certified tasting list: structure, aromas, giveaways, and the grapes each one impersonates.</div></div>'+
    '<div class="fctools">'+pills('all','All '+GRAPES.length)+pills('w','Whites')+pills('r','Reds')+
    '<button class="btn small ghost" id="fc-dir">'+(fc.dir==='n2p'?'Mode: Name → Profile':'Mode: Profile → Name')+'</button></div>'+
    '<div class="fcprog">'+(fc.deck.length?('Cards left: '+fc.deck.length+' · Known: '+fc.done+(fc.again?' · Re-queued: '+fc.again:'')):'')+'</div>'+
    inner+'</div>');
  v.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>flashFilter(b.dataset.f));
  const dir=v.querySelector('#fc-dir');if(dir)dir.onclick=flashDir;
  const card=v.querySelector('#fcard');if(card)card.onclick=flashFlip;
  const fb=v.querySelector('#fc-flip');if(fb)fb.onclick=flashFlip;
  const ag=v.querySelector('#fc-again');if(ag)ag.onclick=()=>flashGrade(false);
  const gt=v.querySelector('#fc-got');if(gt)gt.onclick=()=>flashGrade(true);
  const rs=v.querySelector('#fc-restart');if(rs)rs.onclick=()=>{flashDeck();render();};
  return v;
}
