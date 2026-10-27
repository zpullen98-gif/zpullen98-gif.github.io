/* Atlas destinations are reading context, never grading data. A wine uses its
   recorded origin; a question uses its owner, stem, correct answer and explanation.
   Distractors, grape associations and producer headquarters are not origins. */
function v52PlainText(value) {
  var text = String(value == null ? '' : value).replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ').replace(/<[^>]*>/g, ' ');
  if (typeof document !== 'undefined' && document.createElement) {
    var node = document.createElement('textarea'); node.innerHTML = text; text = node.value;
  } else {
    text = text.replace(/&#(x[0-9a-f]+|[0-9]+);/gi, function (all, n) { var code = /^x/i.test(n) ? parseInt(n.slice(1), 16) : Number(n); return code > 0 && code <= 1114111 ? String.fromCodePoint(code) : all; })
      .replace(/&(amp|quot|apos|lt|gt|nbsp|rsquo|lsquo|rdquo|ldquo|eacute);/g, function (all, name) { return { amp:'&', quot:'"', apos:"'", lt:'<', gt:'>', nbsp:' ', rsquo:"'", lsquo:"'", rdquo:'"', ldquo:'"', eacute:'é' }[name]; });
  }
  return text.replace(/\s+/g, ' ').trim();
}
function v52Fold(value) { return v39Fold(v52PlainText(value)); }
function v52Has(text, word) { return !!word && (' ' + text + ' ').indexOf(' ' + word + ' ') >= 0; }
function v52Unique(targets) {
  var seen = {}, out = [];
  targets.forEach(function (t) { if (!t || !t.view || !t.arg || !t.label) return; var key = t.view + '/' + t.arg; if (!seen[key]) { seen[key] = 1; out.push({ view:t.view, arg:t.arg, label:t.label }); } });
  return out;
}
function v52CountryTargets(key, text) {
  var folded = v52Fold(text), maps = typeof v45CountryMaps === 'function' ? v45CountryMaps(key) : [];
  if (maps.length) {
    var specific = maps.filter(function (m) { return v52Has(folded, v52Fold(m.title)) || v52Has(folded, v52Fold(m.id.replace(/^country-/, '')))
      || (typeof V52_GEOGRAPHY !== 'undefined' && V52_GEOGRAPHY[m.id] || '').split('|').some(function (name) { return v52Has(folded, v52Fold(name)); }); });
    if (specific.length) maps = specific;
    return maps.map(function (m) { return { view:'fieldmap', arg:m.id, label:m.title + ' overview' }; });
  }
  var country = typeof v39CountryOf === 'function' ? v39CountryOf(key) : null;
  if (country && country.sheet) return [{ view:'worldmap', arg:country.sheet, label:country.name + ' overview' }];
  if (key === 'usa') return ['california', 'oregon', 'washington', 'new-york'].reduce(function (all, k) { return all.concat(v52CountryTargets(k, '')); }, []);
  return [];
}
function v52PlaceTargets(key, text) {
  var region = typeof v39Find === 'function' ? v39Find(key) : null;
  if (region) {
    var map = typeof v45Map === 'function' ? v45Map(key) : null;
    return map ? [{ view:'fieldmap', arg:map.id, label:region.name + ' field map' }] : v52CountryTargets(region.sheet, text);
  }
  var direct = typeof v45Map === 'function' ? v45Map(key) : null;
  return direct ? [{ view:'fieldmap', arg:direct.id, label:direct.title + ' overview' }] : v52CountryTargets(key, text);
}

/* Some canonical aliases lead to a neighbouring chapter for learning. They
   are not claims that those places sit inside that chapter's mapped region. */
var V52_WIDER_PLACES = {
  australia:'adelaide hills|adelaide plains|beechworth|alpine valleys|wrattonbully',
  california:'anderson valley|mendocino|north coast',
  italy:'basilicata|aglianico del vulture|calabria|marche|verdicchio dei castelli di jesi|verdicchio di matelica|castelli romani|lazio|frascati|molise',
  austria:'carnuntum|wagram|thermenregion|traisental',
  spain:'valdeorras|ribeira sacra|monterrei|ribeiro|valencia|alicante|almansa|bullas|catalonia|catalunya|andalucia|andalusia',
  'south-africa':'cape south coast|cape agulhas|tulbagh|breedekloof|calitzdorp|klein karoo',
  chile:'san antonio valley|leyda|leyda valley'
};
function v52WiderPlace(place) {
  var found = ''; Object.keys(V52_WIDER_PLACES).some(function (country) { return V52_WIDER_PLACES[country].split('|').some(function (name) { if (place !== name) return false; found = country; return true; }); }); return found;
}
var V52_GRAPE_INDEX = { src:null, names:{} };
function v52GrapeNames() {
  var data = typeof REGIONS !== 'undefined' ? REGIONS : null;
  if (V52_GRAPE_INDEX.src !== data) {
    var names = {}; Object.keys(v39Join().grapes).forEach(function (name) { names[v39Fold(name)] = 1; });
    V52_GRAPE_INDEX = { src:data, names:names };
  }
  return V52_GRAPE_INDEX.names;
}
function v52WineTargets(item) {
  var region = item && typeof item.region === 'string' ? item.region.trim() : '';
  if (!region || typeof v39SlugFor !== 'function') return [];
  var folded = v52Fold(region), parts = region.split(',').map(v52Fold), ix = v39Index();
  if (!ix) return [];
  var grapes = v52GrapeNames();
  /* A recorded country is reliable, but Georgia in a US origin is not the
     Caucasus. An unknown custom region must not reverse-match a short alias. */
  if (v52Has(folded, 'georgia') && /\b(?:usa|united states|u s a)\b/.test(folded)) return [];
  var first = parts[0], wider = v52WiderPlace(first);
  if (wider) return v52CountryTargets(wider, region);
  var explicit = parts.some(function (part) {
    return !!ix.article[part] || !!ix.country[part] || !!ix.words[part]
      || ix.articleKeys.concat(ix.countryKeys).some(function (key) { return key.length > 3 && v52Has(part, key); });
  });
  if (!explicit) return [];
  var key = v39SlugFor(region);
  if (v39Find(key)) {
    var geographic = ix.articleKeys.some(function (name) {
      return !grapes[name] && ix.article[name].indexOf(key) >= 0
        && parts.some(function (part) { return part === name || name.length > 3 && v52Has(part, name); });
    });
    if (!geographic) {
      var countries = parts.filter(function (part) { return !!ix.country[part] || !!ix.words[part]; });
      return countries.length ? v52WineTargets({region:countries.join(', ')}) : [];
    }
  }
  return v52Unique(v52PlaceTargets(key, region));
}

/* Curated geographic aliases only. Do not scan REGIONS.join.aliases wholesale:
   it includes Aligoté, Auxerrois, colours, producer names and ordinary words.
   The broad course category is used only when a more precise place is absent. */
var V52_GEOGRAPHY = {
  champagne:'montagne de reims|vallee de la marne|cote des blancs|cote des bar|cote de sezanne|reims|epernay',
  alsace:'haut rhin|bas rhin',
  loire:'loire|sancerre|pouilly fume|vouvray|muscadet|sevre et maine|chinon|bourgueil|anjou|saumur|savennieres|quarts de chaume|bonnezeaux|touraine|menetou salon|montlouis',
  burgundy:'bourgogne|chablis|cote d or|cote de nuits|cote de beaune|cote chalonnaise|maconnais|meursault|puligny montrachet|chassagne montrachet|gevrey chambertin|vosne romanee|nuits saint georges|volnay|pommard|pouilly fuisse|corton|mercurey|rully|givry|montagny|bouzeron',
  beaujolais:'morgon|fleurie|moulin a vent|brouilly|chenas|chiroubles|julienas|saint amour|regnie',
  rhone:'rhone|cote rotie|hermitage|crozes hermitage|cornas|condrieu|chateau grillet|saint joseph|chateauneuf du pape|gigondas|vacqueyras|tavel|lirac|vinsobres|rasteau|cairanne|beaumes de venise',
  provence:'bandol|cotes de provence|coteaux d aix',
  bordeaux:'medoc|haut medoc|pauillac|margaux|saint julien|saint estephe|pessac leognan|saint emilion|pomerol|sauternes|barsac|entre deux mers|fronsac',
  'languedoc-roussillon':'languedoc|roussillon|corbieres|minervois|saint chinian|faugeres|pic saint loup|limoux|banyuls|maury|rivesaltes|picpoul de pinet',
  piedmont:'piemonte|barolo|barbaresco|langhe|roero|gattinara|ghemme|gavi|barbera d asti|barbera d alba|brachetto d acqui|moscato d asti|asti docg|alta langa',
  lombardy:'lombardia|franciacorta|valtellina|oltrepo pavese',
  veneto:'valpolicella|amarone della valpolicella|soave|bardolino|breganze|asolo|conegliano valdobbiadene',
  friuli:'friuli venezia giulia|collio|colli orientali|ramandolo|rosazzo',
  'trentino-alto-adige':'trentino|alto adige|sudtirol|trento|trentodoc',
  tuscany:'toscana|chianti|montalcino|brunello di montalcino|rosso di montalcino|vino nobile di montepulciano|bolgheri|vernaccia di san gimignano|carmignano|morellino di scansano',
  umbria:'montefalco|orvieto|torgiano',
  abruzzo:'abruzzi|montepulciano d abruzzo|trebbiano d abruzzo',
  campania:'taurasi|greco di tufo|fiano di avellino|falerno del massico',
  puglia:'apulia|salice salentino|primitivo di manduria|castel del monte|gioia del colle',
  sicily:'sicilia|etna|marsala|cerasuolo di vittoria|pantelleria',
  sardinia:'sardegna|vermentino di gallura|cannonau di sardegna|vernaccia di oristano',
  'rias-baixas':'rias baixas', rioja:'haro|rioja alta|rioja alavesa|rioja oriental', 'rueda-toro':'rueda|toro', penedes:'penedes', 'jumilla-yecla':'jumilla|yecla', jerez:'jerez|sanlucar de barrameda|el puerto de santa maria|sherry|sherry triangle',
  douro:'douro|vila nova de gaia|porto|baixo corgo|cima corgo|douro superior',
  'vinho-verde':'minho|moncao e melgaco', setubal:'peninsula de setubal',
  mosel:'saar|ruwer|bernkastel|piesport|wehlen|scharzhofberg|wiltinger braune kupp', rheingau:'rudesheim|johannisberg|assmannshausen',
  'wachau-kamptal-kremstal':'wachau|kamptal|kremstal', wien:'wien|vienna', steiermark:'steiermark|styria',
  'napa-sonoma':'napa|napa valley|sonoma|sonoma coast|russian river valley|alexander valley|dry creek valley|carneros|oakville|rutherford|stag s leap district|stags leap district|howell mountain|mount veeder|diamond mountain',
  'central-coast':'central coast|paso robles|santa barbara|santa maria valley|santa ynez valley|santa rita hills|sta rita hills|monterey|santa lucia highlands|arroyo seco|edna valley|santa cruz mountains',
  'willamette-valley':'willamette|dundee hills|eola amity hills|chehalem mountains|yamhill carlton|ribbon ridge',
  'columbia-valley':'columbia valley|yakima valley|walla walla|red mountain|horse heaven hills|wahluke slope',
  'finger-lakes':'finger lakes|seneca lake|cayuga lake', 'long-island':'long island|north fork of long island',
  salta:'salta|cafayate|calchaqui', mendoza:'mendoza|uco valley|lujan de cuyo|maipu', patagonia:'patagonia|rio negro|neuquen',
  'elqui-limari':'elqui|limari', 'aconcagua-casablanca':'aconcagua|casablanca', 'maipo-valley':'maipo', colchagua:'colchagua|rapel|cachapoal', 'curico-maule':'curico|maule', 'itata-bio-bio':'itata|bio bio',
  'margaret-river':'margaret river', 'barossa-eden':'barossa|eden valley', 'clare-valley':'clare valley', 'mclaren-vale':'mclaren vale', 'hunter-valley':'hunter valley', 'yarra-valley':'yarra valley',
  'hawkes-bay':'hawke s bay|hawkes bay|gimblett gravels', martinborough:'martinborough|wairarapa', 'canterbury-waipara':'waipara|north canterbury', 'walker-bay':'walker bay|hemel en aarde',
  tokaj:'tokaji|tokaj hegyalja', badacsony:'badacsony', 'la-rioja':'la rioja argentina', kefalonia:'cephalonia|cefalonia',
  france:'jura|savoie|corsica|arbois|chateau chalon|cotes du jura|madiran|cahors|jurancon|bergerac|irouleguy',
  italy:'prosecco doc|emilia romagna|lambrusco|lazio|frascati|marche|basilicata|calabria|molise|valle d aosta|liguria',
  canada:'niagara|okanagan|british columbia|ontario|prince edward county',
  england:'english wine|english sparkling|sussex|kent|wales|united kingdom',
  lebanon:'bekaa|beqaa', mexico:'baja california|valle de guadalupe', switzerland:'valais|vaud|lavaux|ticino',
  argentina:'argentine|argentinian|argentines', chile:'chilean', uruguay:'uruguayan|canelones|maldonado', greece:'greek|hellenic|attica|athens|patras|limnos', hungary:'hungarian', australia:'australian|south australian',
  'country-georgia':'kakheti|kakhetian|tsinandali|kindzmarauli|alazani valley',
  'country-croatia':'croatia|croatian|dalmatia', 'country-slovenia':'slovenia|slovenian|goriska brda|vipava',
  'country-romania':'romania|romanian', 'country-bulgaria':'bulgaria|bulgarian', 'country-moldova':'moldova|moldovan',
  'country-czechia':'czechia|czech republic|moravia', 'country-slovakia':'slovakia|slovakian'
};
var V52_ATLAS_INDEX = null;
function v52AtlasIndex() {
  var data = typeof REGIONS !== 'undefined' ? REGIONS : null;
  if (V52_ATLAS_INDEX && V52_ATLAS_INDEX.data === data) return V52_ATLAS_INDEX;
  var ix = { data:data, names:[], owners:{}, categories:{} };
  function add(name, key) { var word = v52Fold(name); if (word.length > 2) ix.names.push({ word:word, key:key }); }
  function own(qs, key) { (qs || []).forEach(function (q) { if (q && q.id) (ix.owners[q.id] || (ix.owners[q.id] = [])).push(key); }); }
  v39Regions().forEach(function (r) {
    add(r.name, r.slug); add(r.name.replace(/\([^)]*\)/g, '').trim(), r.slug);
    own(r.questions, r.slug); ix.categories[v52Fold(r.name)] = r.slug;
  });
  Object.keys(v39Countries()).forEach(function (key) { var c = v39Country(key); add(c.name, key); own(c.questions, key); ix.categories[v52Fold(c.name)] = key; });
  Object.keys(V52_GEOGRAPHY).forEach(function (key) { V52_GEOGRAPHY[key].split('|').forEach(function (name) { add(name, key); }); });
  Object.keys(V52_WIDER_PLACES).forEach(function (key) { V52_WIDER_PLACES[key].split('|').forEach(function (name) { add(name, key); }); });
  add('United States', 'usa'); add('United States of America', 'usa');
  ix.categories.loire = 'loire'; ix.categories.rhone = 'rhone';
  ix.categories['italy north'] = 'italy'; ix.categories['italy central south'] = 'italy';
  ix.categories['southern france'] = 'france'; ix.categories['jura savoie corsica'] = 'france'; ix.categories['united states'] = 'usa';
  ix.names.sort(function (a, b) { return b.word.length - a.word.length; });
  V52_ATLAS_INDEX = ix; return ix;
}
function v52TextTargets(value, category) {
  var text = v52Fold(value), ix = v52AtlasIndex(), keys = [], spans = [];
  ix.names.forEach(function (entry) {
    var word = ' ' + entry.word + ' ', hay = ' ' + text + ' ', start = -1;
    while ((start = hay.indexOf(word, start + 1)) >= 0) {
      var end = start + word.length;
      if (spans.some(function (s) { return s[0] <= start && s[1] >= end; })) continue;
      /* A colour description is not Burgundy's geography; "La Rioja" without
         a country does not distinguish the Spanish and Argentine names. */
      if (entry.key === 'burgundy' && /\b(?:burgundy (?:colou?r|hue)|(?:colou?r|hue) burgundy)\b/.test(text)) continue;
      if ((entry.key === 'rioja' || entry.key === 'la-rioja') && v52Has(text, 'la rioja')) {
        var arg = /\b(?:argentina|argentine|argentinian)\b/.test(text) || v52Fold(category) === 'argentina';
        var spain = /\b(?:spain|spanish)\b/.test(text) || v52Fold(category) === 'spain';
        if (arg && entry.key !== 'la-rioja' || spain && entry.key !== 'rioja' || !arg && !spain) continue;
      }
      spans.push([start, end]); if (keys.indexOf(entry.key) < 0) keys.push(entry.key);
    }
  });
  /* Georgia needs Caucasian context, except an exact answer to an explicitly
     geographic question. Washington DC and people are not Washington wine. */
  if (v52Has(text, 'georgia') && !/\b(?:usa|united states|atlanta|savannah)\b/.test(text)
      && /\b(?:qvevri|kakheti|caucasus|saperavi|rkatsiteli|country of georgia|georgian wine)\b/.test(text)) keys.push('country-georgia');
  if (v52Has(text, 'port') && /\b(?:fortified|portugal|douro|tawny|ruby|vintage port|port wine|white port|crusted port|colheita|ivdp|port s fermentation|port regulations|port and sherry)\b/.test(text + ' ' + v52Fold(category))) keys.push('douro');
  /* Cava is also a Greek ageing term; Prosecco DOC spans two Italian regions.
     These style names therefore lead to a properly labelled broad overview. */
  if (v52Has(text, 'cava') && !/\b(?:greek|greece)\b/.test(text) && /\b(?:sparkling|spain|spanish|traditional method|cava do|cava doc)\b/.test(text + ' ' + v52Fold(category))) keys.push('spain');
  if (v52Has(text, 'prosecco')) keys.push('italy');
  if (/\b(?:george washington|washington d c|washington dc)\b/.test(text)) keys = keys.filter(function (key) { return key !== 'washington'; });
  var specific = keys.filter(function (key) { return !!v39Find(key); });
  keys = keys.filter(function (key) { return !specific.some(function (slug) { return v39Find(slug).sheet === key; }); });
  if (!keys.length && ix.categories[v52Fold(category)]) keys.push(ix.categories[v52Fold(category)]);
  return v52Unique(keys.reduce(function (all, key) { return all.concat(v52PlaceTargets(key, value)); }, []));
}
function v52House() { try { return typeof v27Current === 'function' ? v27Current() : null; } catch (e) { return null; } }
function v52HouseItem(h, id) {
  var found = null; ['wines','dishes','cocktails','components','lexicon'].some(function (key) { return (h && h[key] || []).some(function (item) { if (item.id !== id) return false; found = item; return true; }); });
  return found;
}
function v52Kept(item, key) { var mark = item && item[key]; return mark && mark.by === 'person' ? mark.value : null; }
function v52QuestionTargets(q) {
  if (!q) return [];
  var h = v52House(), id = q._v52itemId || '', kind = q._v52kind || '', match = /^(?:h-)?([a-z]+-[a-z0-9]{8})-(.+)$/.exec(q.id || '');
  if (!id && match) { id = match[1]; kind = match[2]; }
  if (id) {
    var item = v52HouseItem(h, id), pairing = v52Kept(item, 'pairing');
    if (!item && typeof v27BottleById === 'function') item = v27BottleById(id);
    if (kind === 'firstPickFor' || kind === 'producerPour') return pairing ? v52WineTargets(v52HouseItem(h, pairing.wineId)) : [];
    if (kind === 'zeroProofFor') return [];
    if (kind === 'producerWhere' || kind === 'producerDish') {
      var row = typeof v38RowById === 'function' ? v38RowById(h, id) : null;
      return row ? v52Unique((row.wines || []).reduce(function (all, w) { return all.concat(v52WineTargets(v52HouseItem(h, w.id))); }, [])) : [];
    }
    return v52WineTargets(item);
  }
  var correct = q.sa ? q.ans : Array.isArray(q.opts) && Number.isInteger(q.a) ? q.opts[q.a] : '';
  if (typeof ansOf === 'function') { try { correct = ansOf(q); } catch (e) { } }
  else if (Array.isArray(correct)) correct = correct.map(function (i) { return Array.isArray(q.opts) ? q.opts[i] : ''; }).filter(Boolean).join(', ');
  var text = [q.q, correct, q.exp].filter(function (value) { return typeof value === 'string'; }).join(' ');
  var ix = v52AtlasIndex(), owners = ix.owners[q.id] || [], targets = owners.reduce(function (all, key) { return all.concat(v52PlaceTargets(key, text)); }, []);
  return v52Unique(targets.concat(v52TextTargets(text, owners.length ? '' : q.cat)));
}
function v52ListTargets(row) {
  if (!row) return [];
  var h = v52House(), item = row.card && v52HouseItem(h, row.card);
  if (item) return v52WineTargets(item);
  var places = typeof V29_LIST !== 'undefined' && V29_LIST.places || {}, p = places[row.place];
  var parts = String(row.place || '').split('~').reverse(), targets = [];
  /* Printed headings say "beyond Champagne" as well as "Champagne". Prefer
     the actual hierarchy, narrowest first, over a comparative display title. */
  parts.some(function (part) {
    if (/\bchampagne\s*(?:&|and)\s*sparkling\b/i.test(part)) return false;
    targets = v52TextTargets(part, ''); return targets.length > 0;
  });
  if (targets.length) return targets;
  var title = p && p.title || '';
  if (!/\b(?:beyond|outside|except|other than)\b/i.test(title)) targets = v52TextTargets(title, '');
  var section = row.section || '';
  return targets.length ? targets : /\bchampagne\s*(?:&|and)\s*sparkling\b/i.test(section) ? [] : v52TextTargets(section, '');
}
