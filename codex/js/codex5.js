/* ============ Codex V: video scriptorium ============ */
var VIDEOS=[
{topic:"The Deductive Tasting",rows:[
 {t:"The CMS deductive tasting method, start to finish",w:"Watch a full grid walkthrough before you drill it; the order is the discipline.",q:"GuildSomm deductive tasting method"},
 {t:"Blind tasting a white wine, narrated",w:"Hear the language of sight, nose, palate, and conclusion in real time.",q:"master sommelier blind tasting white wine walkthrough"},
 {t:"Blind tasting a red wine, narrated",w:"Structure calls (tannin, acid, alcohol) are calibrated by watching, not reading.",q:"master sommelier blind tasting red wine walkthrough"},
 {t:"Calibrating acidity and tannin",w:"The two structure calls candidates misjudge most.",q:"how to assess acidity tannin wine tasting"},
 {t:"A Master of Wine tastes blind",w:"Konstantin Baum's format shows honest reasoning, including wrong turns.",q:"Konstantin Baum blind tasting"},
 {t:"Wines commonly confused blind",w:"Nebbiolo vs Xinomavro, Chablis vs Muscadet: learn the tie-breakers.",q:"wines commonly confused blind tasting sommelier"}]},
{topic:"Service Technique",rows:[
 {t:"Opening still wine tableside",w:"Foil below the lip, quiet worm, cork presentation: the exam's choreography.",q:"sommelier wine service opening bottle tableside"},
 {t:"Champagne service, cage to sigh",w:"The 30\u00b0 angle, six half-turns, thumb never leaving the cork.",q:"sommelier champagne service technique"},
 {t:"Decanting an old wine",w:"Candle, steady pour, stop at sediment; watch the hands.",q:"sommelier decanting wine candle demonstration"},
 {t:"Full Certified service exam simulation",w:"The entire sequence under exam pressure, with examiner commentary.",q:"certified sommelier service exam demonstration"},
 {t:"Glass polishing and handling",w:"Steam, lint-free cloth, stems only: small marks that separate candidates.",q:"how to polish wine glasses restaurant service"},
 {t:"Pouring without a drip",w:"The quarter-twist finish and the service napkin, in slow motion.",q:"wine pouring technique twist no drip sommelier"},
 {t:"Working the table: positions and order",w:"Serve from the right, move clockwise, host poured last; watch the footwork.",q:"formal wine service order of service etiquette"},
 {t:"Handling large formats",w:"Magnums and doubles need two hands and a plan.",q:"how to pour magnum large format wine service"},
 {t:"Coravin, demonstrated properly",w:"Needle angle, argon, and when the system earns its keep.",q:"coravin how to use demonstration"},
 {t:"Port service and the tongs",w:"Vintage Port decanted, plus the theatrical hot-tongs opening.",q:"vintage port service decanting port tongs"},
 {t:"Service temperatures and order of service",w:"Temperature calls are free exam points; watch them applied at the table.",q:"wine service temperature order sommelier"},
 {t:"Handling a corked bottle and returns",w:"The graceful recovery is part of the Certified floor standard.",q:"sommelier handling corked wine guest return"}]},
{topic:"Champagne & Sparkling",rows:[
 {t:"How Champagne is made",w:"See riddling, disgorgement, and dosage instead of memorizing them.",q:"methode champenoise traditional method explained"},
 {t:"Grower Champagne vs the houses",w:"RM vs NM on the label, and why lists care.",q:"grower champagne explained"},
 {t:"Prosecco, Cava, Franciacorta compared",w:"Tank vs traditional side by side.",q:"prosecco cava champagne difference explained"}]},
{topic:"Burgundy",rows:[
 {t:"Burgundy's classification, mapped",w:"Regional to Grand Cru drawn on the actual slope.",q:"burgundy wine classification explained map"},
 {t:"C\u00f4te de Nuits villages tour",w:"Put Gevrey, Chambolle, and Vosne in geographic order in your head.",q:"cote de nuits villages wine tour"},
 {t:"Chablis and Kimmeridgian soil",w:"The oyster-shell story told standing in the vineyard.",q:"chablis kimmeridgian soil terroir"}]},
{topic:"Bordeaux",rows:[
 {t:"Left Bank vs Right Bank",w:"Gravel Cabernet vs clay Merlot, with the Gironde between.",q:"bordeaux left bank right bank explained"},
 {t:"The 1855 Classification",w:"Napoleon III's price list that never let go.",q:"1855 bordeaux classification explained"},
 {t:"Sauternes and noble rot",w:"Botrytis on the berry is worth a thousand words.",q:"sauternes noble rot botrytis harvest"}]},
{topic:"Rh\u00f4ne, Loire & Alsace",rows:[
 {t:"Northern vs Southern Rh\u00f4ne",w:"Granite Syrah north, galets and Grenache south.",q:"northern southern rhone wine differences"},
 {t:"Loire from Muscadet to Sancerre",w:"One river, four grapes; travel it once and the map sticks.",q:"loire valley wine regions guide"},
 {t:"Alsace and its Grands Crus",w:"Varietal labeling, noble grapes, and the Vosges rain shadow.",q:"alsace wine region grand cru explained"},
 {t:"Chenin Blanc, Savennières to Vouvray",w:"One grape, every sweetness level: the Loire's hardest theory made visible.",q:"Chenin Blanc Loire Savennières Vouvray masterclass"},
 {t:"Sancerre and its satellites",w:"Menetou-Salon, Quincy, Reuilly: same grapes, different soils and prices.",q:"Sancerre Menetou-Salon Quincy Reuilly wine"},
 {t:"Muscadet and sur lie aging",w:"Why lees contact defines the style; the crus communaux upgrade the story.",q:"Muscadet sur lie explained wine"}]},
{topic:"Italy",rows:[
 {t:"Barolo and Barbaresco explained",w:"Nebbiolo, fog, and the MGA crus.",q:"barolo barbaresco nebbiolo explained"},
 {t:"Chianti Classico and Sangiovese",w:"The black rooster, Riserva, and Gran Selezione.",q:"chianti classico explained sangiovese"},
 {t:"Amarone and the appassimento method",w:"Watch grapes dry on racks; the style makes sense instantly.",q:"amarone appassimento method explained"},
 {t:"Etna's volcanic vineyards",w:"Contrade, old vines, and ash: Italy's Burgundy of the south.",q:"etna wine region nerello mascalese"},
 {t:"Sagrantino and Montefalco",w:"Italy's most tannic grape in its landlocked Umbrian home.",q:"Sagrantino Montefalco wine explained"},
 {t:"Verdicchio, the Marche's white",w:"Castelli di Jesi vs Matelica: coast against upland valley.",q:"Verdicchio Castelli di Jesi Matelica wine"}]},
{topic:"Spain & Portugal",rows:[
 {t:"Rioja's aging categories",w:"Crianza to Gran Reserva, barrels included.",q:"rioja crianza reserva gran reserva explained"},
 {t:"Sherry from flor to solera",w:"The criadera system animated; Fino vs Oloroso becomes obvious.",q:"sherry solera flor explained"},
 {t:"Port styles and the Douro",w:"Ruby, Tawny, Vintage, and the terraced schist they come from.",q:"port wine styles douro explained"}]},
{topic:"Germany & Austria",rows:[
 {t:"The Pr\u00e4dikat ladder",w:"Kabinett through TBA by must weight, not sweetness.",q:"german wine pradikat kabinett spatlese explained"},
 {t:"Reading a German label",w:"Village, Einzellage, VDP eagle: decoded line by line.",q:"how to read german wine label"},
 {t:"Wachau and Gr\u00fcner Veltliner",w:"Steinfeder to Smaragd on the Danube's terraces.",q:"wachau gruner veltliner smaragd explained"}]},
{topic:"The New World",rows:[
 {t:"Napa's AVAs toured",w:"Rutherford dust to Howell Mountain in one drive.",q:"napa valley ava differences explained"},
 {t:"Willamette Valley Pinot Noir",w:"Papa Pinot's legacy and the Dundee Hills.",q:"willamette valley pinot noir history"},
 {t:"Marlborough Sauvignon Blanc",w:"Why one region rewired a grape's identity.",q:"marlborough sauvignon blanc explained"},
 {t:"Barossa vs Eden Valley",w:"Old-vine Shiraz and high-altitude Riesling, side by side.",q:"barossa eden valley shiraz riesling"}]},
{topic:"Fortified & Sweet",rows:[
 {t:"Madeira's estufagem and canteiro",w:"Deliberately cooked wine; see the lodges.",q:"madeira wine production estufagem explained"},
 {t:"Tokaji Asz\u00fa and puttonyos",w:"Botrytised berries by the basket.",q:"tokaji aszu puttonyos explained"},
 {t:"Icewine harvest at \u22128\u00b0C",w:"Night picking frozen grapes makes the law memorable.",q:"icewine harvest canada niagara"},
 {t:"The solera system, walked through",w:"Fractional blending explained at the barrels; theory sticks after you see the scales.",q:"sherry solera system explained bodega"},
 {t:"Port styles, ruby to tawny to vintage",w:"One visit to the lodges sorts the whole style family.",q:"Port wine styles explained tawny vintage lodge"}]},
{topic:"Spirits, Beer & Sake",rows:[
 {t:"How whisky is made",w:"Malting to cask; one distillery tour covers a dozen questions.",q:"how whisky is made distillery tour"},
 {t:"Tequila from agave to bottle",w:"Jimadores, pi\u00f1as, and the ovens.",q:"how tequila is made agave harvest"},
 {t:"Sake brewing, rice to press",w:"Polishing ratios and koji in action.",q:"how sake is made brewery process"},
 {t:"Classic cocktail specs demonstrated",w:"Watch the builds; ratios stick when you see the jigger.",q:"classic cocktails bartender technique specs"}]},
{topic:"Bottle Craft & Preservation",rows:[
 {t:"The waiter's friend, mastered",w:"Worm placement, the two-step lever, and a silent cork; the only tool the exam allows.",q:"how to use waiters friend corkscrew properly"},
 {t:"Cutting foil cleanly",w:"Below the lower lip, two cuts and a lift, no sawing.",q:"how to cut wine foil capsule properly"},
 {t:"Opening an old, fragile cork",w:"The ah-so and the Durand: rescuing thirty-year corks intact.",q:"ah so durand opening old wine cork"},
 {t:"Waxed and flanged bottles",w:"Screw straight through the wax; do not chip it like ice.",q:"how to open wax sealed wine bottle"},
 {t:"Preserving an open bottle",w:"Stopper, fridge, argon, Coravin: what actually works and for how long.",q:"how to preserve open wine bottle methods tested"},
 {t:"Storing wine at home",w:"Temperature, light, position: a cellar's rules in a closet.",q:"how to store wine at home properly"}]},
{topic:"The Tasting Craft",rows:[
 {t:"How to actually taste wine",w:"Aeration, the slurp, and coating the palate; technique before vocabulary.",q:"how to taste wine properly technique slurp"},
 {t:"How to spit",w:"Unglamorous and essential; nobody passes a flight swallowing six wines.",q:"how to spit wine tasting technique"},
 {t:"Judging color and rim",w:"Tilt against white, read core to rim, spot age in the meniscus.",q:"how to assess wine color rim variation tasting"},
 {t:"Writing a CMS-style tasting note",w:"The grid's language, spoken aloud the way examiners expect.",q:"CMS tasting grid note example sommelier"},
 {t:"Building a blind flight at home",w:"Bag, number, randomize: how to practice honestly solo or with friends.",q:"how to set up blind wine tasting at home"},
 {t:"Classic blind-tasting traps",w:"Viognier vs oaked Chardonnay, Gamay vs Pinot: the confusions and their tells.",q:"blind tasting commonly confused wines tells"}]},
{topic:"Exam Strategy",rows:[
 {t:"How to pass the Certified exam",w:"Candidates and Master Sommeliers on what actually moves the needle.",q:"how to pass certified sommelier exam tips"},
 {t:"What the service examiners grade",w:"The rubric behind the tray: poise, accuracy, recovery.",q:"certified sommelier service exam what examiners look for"},
 {t:"Salesmanship under examination",w:"Recommending, upselling, and answering the aperitif question with confidence.",q:"sommelier exam salesmanship recommendation practice"},
 {t:"Theory pacing and study plans",w:"How passers structured the final eight weeks.",q:"certified sommelier theory study plan"},
 {t:"Spaced repetition, used well",w:"Why the Daily Review works, and how to trust the schedule.",q:"spaced repetition study method explained"}]},
{topic:"Bar, Beer & Sake Service",rows:[
 {t:"Stirred vs shaken, and the jigger",w:"Dilution and temperature are the recipe; watch the mechanics.",q:"stirring vs shaking cocktails technique jigger"},
 {t:"The citrus twist, expressed",w:"Oils over the surface, rim the glass, then garnish.",q:"how to express citrus twist cocktail"},
 {t:"Pouring beer with proper head",w:"The 45-degree start and the vertical finish; foam is aroma.",q:"how to pour beer proper head technique"},
 {t:"Sake service: temps and vessels",w:"Tokkuri, masu, and when warming honors or ruins the bottle.",q:"sake service temperature tokkuri guide"},
 {t:"Sherry and fortified service",w:"The copita pour, Fino cold, Oloroso not; small glasses, exact pours.",q:"sherry service copita fortified wine pours"}]},
{topic:"Food & Pairing",rows:[
 {t:"The principles of pairing",w:"Weight, acid, salt, and sweetness demonstrated at the table.",q:"food wine pairing principles explained"},
 {t:"Cheese and wine, matched live",w:"The board covered: fresh, washed, hard, blue.",q:"cheese wine pairing sommelier guide"}]},
{topic:"Pronunciation & The Floor",rows:[
 {t:"French wine terms pronounced",w:"From Aligot\u00e9 to Yquem, said slowly.",q:"french wine pronunciation guide sommelier"},
 {t:"German and Italian wine words",w:"Gew\u00fcrztraminer and Montepulciano without fear.",q:"german italian wine pronunciation guide"},
 {t:"A night on the floor with a sommelier",w:"The rhythm of real service: the exam imitates this.",q:"day in the life sommelier restaurant service"},
 {t:"Spanish, Portuguese, Greek and Hungarian terms",w:"Set 2: the non-French names examiners love to hear said correctly.",q:"Spanish Portuguese wine terms pronunciation"}]},
{topic:"Hungary & Greece",rows:[
 {t:"Santorini's basket-trained vineyards",w:"See the kouloura and the ungrafted, own-rooted vines; the image locks in the theory.",q:"Santorini vineyard kouloura basket trained Assyrtiko"},
 {t:"Assyrtiko, explained",w:"How one grape keeps searing acid in near-desert heat.",q:"Assyrtiko grape guide Santorini wine"},
 {t:"Xinomavro and Naoussa",w:"Watch the Nebbiolo comparison come alive: pale color, firm tannin, tomato leaf.",q:"Xinomavro Naoussa Greek wine explained"},
 {t:"The dry Furmint revolution",w:"Tokaj's modern face: taut, smoky whites beyond Aszú.",q:"dry Furmint Tokaj wine explained"},
 {t:"Greek wine regions crash course",w:"One pass over the PDO map before drilling the section.",q:"GuildSomm Greek wine regions explained"}]}
];
var CAT_TOPIC={
 "Burgundy":"Burgundy","Bordeaux":"Bordeaux","Champagne":"Champagne & Sparkling","Sparkling Wine World":"Champagne & Sparkling",
 "Loire":"Rh\u00f4ne, Loire & Alsace","Alsace":"Rh\u00f4ne, Loire & Alsace","Rh\u00f4ne":"Rh\u00f4ne, Loire & Alsace",
 "Southern France":"Rh\u00f4ne, Loire & Alsace","Jura, Savoie & Corsica":"Rh\u00f4ne, Loire & Alsace",
 "Italy North":"Italy","Italy Central & South":"Italy",
 "Spain":"Spain & Portugal","Portugal":"Spain & Portugal",
 "Germany":"Germany & Austria","Austria":"Germany & Austria","Hungary & Greece":"Hungary & Greece",
 "California":"The New World","Pacific NW, NY & Canada":"The New World","South America":"The New World",
 "Australia":"The New World","New Zealand":"The New World","South Africa":"The New World",
 "Fortified Wines":"Fortified & Sweet","Sweet Wines":"Fortified & Sweet",
 "Spirits & Cocktails":"Spirits, Beer & Sake","Beer & Cider":"Spirits, Beer & Sake","Sake":"Spirits, Beer & Sake",
 "Food & Pairing":"Food & Pairing","Service & Hospitality":"Service Technique","Business of the Sommelier":"Exam Strategy",
 "Wine Fundamentals":"The Tasting Craft","Viticulture & Winemaking":"The Deductive Tasting","Terroir: Climate & Soil":"The Deductive Tasting",
 "Wine Trade & Aging":"Bottle Craft & Preservation","Classifications & Labels":"Bordeaux","Producers & Icons":"Burgundy"
};
function watchURL(q){return "https://www.youtube.com/results?search_query="+encodeURIComponent(q);}
var TOPIC_KIND={"The Deductive Tasting":"Technique","Service Technique":"Technique","Bottle Craft & Preservation":"Technique","The Tasting Craft":"Technique","Bar, Beer & Sake Service":"Technique","Exam Strategy":"Strategy","Pronunciation & The Floor":"Strategy","Champagne & Sparkling":"Explainer","Fortified & Sweet":"Explainer","Spirits, Beer & Sake":"Tour","Food & Pairing":"Technique"};
function vidKind(topic){return TOPIC_KIND[topic]||"Tour";}
function vidView(){
  let html='<div><div class="viewhead"><h2>Video Scriptorium</h2><div class="sub">Curated viewing for the skills text cannot teach: technique, terrain, and the tasting grid. Links open video search; an internet connection is required for this page only.</div></div>';
  html+='<div class="vidnav">'+VIDEOS.map(function(g){return '<button class="vnav" data-t="'+g.topic.replace(/[^a-z]/gi,'')+'">'+g.topic+'</button>';}).join('')+'</div>';
  VIDEOS.forEach(function(g){
    const kind=vidKind(g.topic);
    html+='<div class="secgroup" id="vt-'+g.topic.replace(/[^a-z]/gi,'')+'">'+g.topic+'</div>';
    g.rows.forEach(function(r){
      html+='<a class="vidrow" target="_blank" rel="noopener" href="'+watchURL(r.q)+'">'
        +'<div><div class="vtitle">'+r.t+' <span class="vkind">'+(r.k||kind)+'</span></div><div class="vwhy">'+r.w+'</div></div></a>';
    });
  });
  html+='<div class="fmtnote" style="margin-top:16px">The panel\u0027s standing channel picks: GuildSomm for service and theory, Wine Folly for visual fundamentals, Jancis Robinson and Konstantin Baum MW for regions and tasting. Search their names alongside any topic above.</div></div>';
  const v=el(html);
  v.querySelectorAll('.vnav').forEach(function(b){
    b.onclick=function(){const tg=v.querySelector('#vt-'+b.dataset.t);if(tg)tg.scrollIntoView({behavior:'smooth',block:'start'});};
  });
  if(S.vidFocus){
    const target=v.querySelector('#vt-'+S.vidFocus.replace(/[^a-z]/gi,''));
    if(target)setTimeout(function(){target.scrollIntoView({behavior:'smooth',block:'start'});},80);
    S.vidFocus=null;
  }
  return v;
}
/* contextual watch link in the reveal block */
var _v4DecorateQuiz2=decorateQuiz;
decorateQuiz=function(){
  _v4DecorateQuiz2();
  if(!S.answered)return;
  const rev=document.querySelector('.reveal');
  const q=S.pool[S.idx];
  if(!rev||!q||rev.querySelector('.watchlink'))return;
  const topic=CAT_TOPIC[q.cat];
  if(!topic)return;
  const a=el('<button class="watchlink">Watch: '+topic+'</button>');
  a.onclick=function(){S.vidFocus=topic;S.view='videos';render();};
  const note=rev.querySelector('.notebox');
  if(note)rev.insertBefore(a,note); else rev.appendChild(a);
};
/* home tile + routing */
var _v4DecorateHome2=decorateHome;
decorateHome=function(){
  _v4DecorateHome2();
  const modes=document.querySelectorAll('.modes');
  const anchor=modes[modes.length-1];
  if(!anchor)return;
  const m5=el('<div class="modes" style="margin-top:14px"></div>');
  m5.appendChild(el('<button class="mode" id="t-vid"><div class="band"></div><h3>Video Scriptorium</h3><p>'+VIDEOS.reduce(function(a,g){return a+g.rows.length;},0)+' curated viewings across '+VIDEOS.length+' topics: bottle craft, service choreography, tasting technique, exam strategy, and every major region. Every answered question links here.</p></button>'));
  anchor.parentNode.insertBefore(m5,anchor.nextSibling);
  m5.querySelector('#t-vid').onclick=function(){S.view='videos';render();};
};
var _v4Render2=render;
render=function(){
  if(S.view==='videos'){
    if(S.qT){clearInterval(S.qT);S.qT=null;}
    const app=document.getElementById('app');
    app.innerHTML=''; app.appendChild(topbar()); app.appendChild(vidView());
    window.scrollTo(0,0); return;
  }
  _v4Render2();
};

