/* First Light: personal chart, changing sky, and a small path through the language.
   The birth record stays in FL.prefs.birth. Computed monthly data stays in memory.
   Astronomy gives the positions; the reflective prompts are editorial symbolism. */
var astroDisplayedMonth = '';
var astroMonthRequest = 0;
var ASTRO_FUNCTIONS = {
  Sun: ['purpose and vitality', 'What deserves your wholehearted attention?'],
  Moon: ['feelings and familiar rhythms', 'What helps you feel settled enough to respond thoughtfully?'],
  Mercury: ['learning and communication', 'What could you explain more clearly, or listen to more carefully?'],
  Venus: ['values, pleasure and connection', 'What makes an ordinary encounter feel welcoming?'],
  Mars: ['initiative and assertiveness', 'Where would one measured action help more than urgency?'],
  Jupiter: ['perspective and exploration', 'What would you like to understand beyond your familiar experience?'],
  Saturn: ['structure and responsibility', 'What small commitment can you realistically sustain?'],
  Uranus: ['experimentation and independence', 'Which familiar approach is worth testing in a different way?'],
  Neptune: ['imagination and ideals', 'How can you give an inspiring idea a clear, practical shape?'],
  Pluto: ['power and deep change', 'What habit or expectation would you like to examine honestly?'],
  Ascendant: ['your way of approaching experience', 'How would you like to enter a room or begin a conversation?'],
  Midheaven: ['vocation and public contribution', 'What would you like the quality of your work to communicate?']
};
var ASTRO_HOUSE_AREAS = ['approach and presence', 'resources and values', 'learning and communication',
  'home and foundations', 'creativity and enjoyment', 'routines and service', 'partnership and collaboration',
  'shared responsibilities', 'study and exploration', 'vocation and contribution', 'friendship and community', 'solitude and reflection'];
var ASTRO_ASPECT_READINGS = {
  Conjunction: 'Bring the two themes into one conversation. What needs to be integrated?',
  Sextile: 'Look for a modest opportunity to practise these themes together.',
  Square: 'Notice competing needs. What adjustment would make room for both?',
  Trine: 'Consider a strength you can use deliberately instead of taking for granted.',
  Opposition: 'Try looking from both sides before deciding how to respond.'
};

function astroCurrentMonth() { return flToday().slice(0, 7); }
function astroMonthKey(y, m) { return String(y).padStart(4, '0') + '-' + String(m).padStart(2, '0'); }
function astroMonthSelection(arg) {
  var current = astroCurrentMonth(), match = /^month\/(\d{4})-(\d{2})$/.exec(arg || '');
  var key = match ? match[1] + '-' + match[2] : current;
  var y = Number(key.slice(0, 4)), m = Number(key.slice(5, 7));
  var invalid = !!arg && (!match || y < 1700 || y > 2200 || m < 1 || m > 12);
  if (invalid) { key = current; y = Number(key.slice(0, 4)); m = Number(key.slice(5, 7)); }
  return { year: y, month: m, key: key, current: current, invalid: invalid };
}
function astroMonthTitle(sel) { return new Date(Date.UTC(sel.year, sel.month - 1, 15)).toLocaleDateString(undefined, { month: 'long', year: 'numeric', timeZone: 'UTC' }); }
function astroNav(active) {
  return '<nav class="astro-main-nav" aria-label="Astrology chapters">' +
    [['month', '#/astro', 'This month'], ['chart', '#/chart', 'My birth chart'], ['learn', '#/astro/learn', 'Learn the language']].map(function (x) {
      return '<a href="' + x[1] + '"' + (active === x[0] ? ' aria-current="page"' : '') + '>' + x[2] + '</a>';
    }).join('') + '</nav>';
}
function astroOpening(active, title, intro) {
  return '<header class="astro-opening"><div class="kick">A lantern for the inner journey</div><h1>' + title +
    '</h1><p class="note">' + intro + '</p></header>' + astroNav(active);
}
function astroDateLabel(date, zone) {
  return date.toLocaleString(undefined, { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: zone, timeZoneName: 'short' });
}
function astroPosition(lon) { var s = signOf(lon); return s.deg + '° ' + s.name + ' ' + String(s.min).padStart(2, '0') + '′'; }
function astroDetails(title, html, open) {
  return '<details class="astro-fold"' + (open ? ' open' : '') + '><summary>' + esc(title) + '</summary><div class="astro-fold-body">' + html + '</div></details>';
}
function astroMonthTools(s) {
  var prev = new Date(Date.UTC(s.year, s.month - 2, 15)), next = new Date(Date.UTC(s.year, s.month, 15));
  var link = function (d, label) { return d.getUTCFullYear() < 1700 || d.getUTCFullYear() > 2200 ? '<span>' + label + '</span>' : '<a href="#/astro/month/' + astroMonthKey(d.getUTCFullYear(), d.getUTCMonth() + 1) + '">' + label + '</a>'; };
  return '<div class="astro-month-tools"><div class="astro-month-arrows">' + link(prev, 'Previous month') +
    '<a href="#/astro">Current month</a>' + link(next, 'Next month') + '</div>' +
    '<div class="astro-month-picker"><label for="am-month">Explore a month</label><div><input id="am-month" type="month" min="1700-01" max="2200-12" value="' + s.key + '">' +
    '<button class="btn" data-act="astroChooseMonth">Open month</button></div></div></div>';
}
FL_ACTS.astroChooseMonth = function () {
  var input = document.getElementById('am-month');
  if (!input || !input.value || !input.checkValidity() || astroMonthSelection('month/' + input.value).invalid) { if (input) input.reportValidity(); toast('Choose a month between January 1700 and December 2200.'); return; }
  location.hash = '#/astro/month/' + input.value;
};
FL_ACTS.astroRetry = function () { render(); };

function astroBigThree(chart) {
  var sun = chart.points.find(function (p) { return p.name === 'Sun'; });
  var moon = chart.points.find(function (p) { return p.name === 'Moon'; });
  return '<section aria-labelledby="astro-roots"><h2 id="astro-roots">Your fixed points</h2><p>Your birth chart stays the same. The sky below changes around it.</p><div class="astro-big-three">' +
    [[sun.name, sun.lon, sun.house], [moon.name, moon.lon, moon.house], ['Ascendant', chart.asc, houseOf(chart.asc, chart.cusps)]].map(function (x) {
      var sign = signOf(x[1]), definition = SIGNS.find(function (s) { return s.n === sign.name; });
      return '<article><span class="astro-eyebrow">' + x[0] + '</span><h3>' + esc(sign.name) + '</h3>' +
        '<p class="astro-degree">' + esc(astroPosition(x[1])) + (x[0] !== 'Ascendant' ? ' · House ' + x[2] : ' · Eastern horizon') + '</p>' +
        '<p>' + esc(ASTRO_FUNCTIONS[x[0]][0]) + '</p><p class="astro-subtle">' + esc(definition.el + ' · ' + definition.mo + ' · ' + definition.kw) + '</p></article>';
    }).join('') + '</div><p class="astro-subtle">Tropical zodiac. House system: ' + esc(chart.houseSystem) +
    '. The Ascendant is the rising degree; it need not be the first house cusp in whole-sign houses.</p>' +
    '<a class="keep" href="#/chart">See every placement and edit birth details</a>' +
    astroDetails('Your chart in plain language', '<p>Read each placement as a symbolic question. The descriptions are prompts for reflection, not statements about what you must be like.</p>' +
      chart.points.filter(function (p) { return !p.minor; }).map(function (p) {
        var s = SIGNS.find(function (x) { return x.n === p.sign.name; });
        return '<article><h3>' + esc(p.name + ' in ' + p.sign.name) + '</h3><p><strong>Theme:</strong> ' + esc(ASTRO_FUNCTIONS[p.name][0]) +
          '. <strong>Style:</strong> ' + esc(s.el.toLowerCase() + ', ' + s.mo.toLowerCase() + '; ' + s.kw.toLowerCase()) +
          '. <strong>Area:</strong> house ' + p.house + ', ' + esc(ASTRO_HOUSE_AREAS[p.house - 1]) + '.</p>' +
          '<p><strong>Qualities to explore:</strong> ' + esc(s.s) + '. <strong>Questions for growth:</strong> ' + esc(s.gr) + '.</p>' +
          '<p class="astro-prompt">' + esc(ASTRO_FUNCTIONS[p.name][1]) + '</p></article>';
      }).join('') + '<p>To study relationships between these placements, open the aspect table on your birth chart. The monthly alignments below compare the moving sky with these fixed positions.</p>') + '</section>';
}
function astroEventTitle(e) { return e.transit + ' ' + e.aspect.toLowerCase() + ' natal ' + e.natal; }
function astroFocusCard(e, zone) {
  var moving = ASTRO_FUNCTIONS[e.transit], fixed = ASTRO_FUNCTIONS[e.natal];
  return '<article class="astro-focus"><p class="astro-eyebrow">' + esc(astroDateLabel(e.utc, zone)) + '</p><h3>' + esc(astroEventTitle(e)) + '</h3>' +
    '<p><strong>Two themes:</strong> ' + esc(moving[0] + ' meets ' + fixed[0]) + '.</p>' +
    '<p>' + esc(ASTRO_ASPECT_READINGS[e.aspect]) + '</p><p class="astro-prompt">' + esc(fixed[1]) + '</p>' +
    '<p class="astro-subtle">' + e.angle + '° alignment · Moving through natal house ' + e.house + ': ' + esc(ASTRO_HOUSE_AREAS[e.house - 1]) +
    (e.retro ? ' · Retrograde pass' : '') + '</p></article>';
}
function astroMonthContent(month, chart, birthIssue) {
  var focus = [], used = {};
  month.highlights.forEach(function (e) { if (focus.length < 3 && !used[e.transit]) { focus.push(e); used[e.transit] = true; } });
  month.highlights.forEach(function (e) { if (focus.length < 3 && focus.indexOf(e) < 0) focus.push(e); });
  focus.sort(function (a, b) { return a.utc - b.utc; });
  var out = '<p class="astro-status">Calculated on this device. Times shown in ' + esc(month.zone) + '.</p>';
  if (chart) out += astroBigThree(chart);
  else out += '<section class="astro-welcome"><h2>Make this sky your own</h2><p>' + esc(birthIssue || 'Save your birth date, local time and place to connect this month to your own chart.') + '</p><a class="btn" href="#/chart">Set up my birth chart</a><p class="astro-subtle">You can explore the lunar calendar below while you do.</p></section>';
  if (chart) out += '<section aria-labelledby="astro-focus-heading"><h2 id="astro-focus-heading">' + (focus.length === 3 ? 'Three invitations for the month' : 'Invitations for the month') + '</h2>' +
    '<p>These are reflection prompts drawn from traditional symbolism, not predictions. An alignment describes an angle in the chart, not an event that must happen to you.</p>' +
    (focus.length ? focus.map(function (e) { return astroFocusCard(e, month.zone); }).join('') : '<p>No exact major alignments were found this month. You can still use the lunar rhythm and learning path below.</p>') + '</section>';
  var phasePrompts = { 'New Moon': 'Name one intention you can act on.', 'First Quarter': 'Try one practical step and notice what needs adjusting.', 'Full Moon': 'Review what you can now see more clearly.', 'Last Quarter': 'Keep what helped; release an unhelpful expectation.' };
  out += '<section aria-labelledby="astro-lunar-heading"><h2 id="astro-lunar-heading">A lunar rhythm</h2><p>Use these four phases as optional reminders to begin, practise, reflect and simplify. These are astronomical phase times, not recommendations for health or important decisions.</p><div class="astro-phases">' + month.phases.map(function (p) {
    return '<article><h3>' + esc(p.name) + '</h3><p><time datetime="' + p.utc.toISOString() + '">' + esc(astroDateLabel(p.utc, month.zone)) + '</time></p><p class="astro-subtle">' +
      esc(astroPosition(p.lon)) + (chart ? ' · Natal house ' + p.house : '') + '</p><p>' + esc(phasePrompts[p.name] || 'Pause and notice what has changed.') + '</p></article>';
  }).join('') + '</div></section>';
  out += '<section aria-labelledby="astro-study-heading"><h2 id="astro-study-heading">Learn a little each week</h2><ol class="astro-study-path">' +
    '<li><strong>Week one: start with your three anchors.</strong> Read the Sun, Moon and Ascendant. Describe one quality you recognise and one you do not.</li>' +
    '<li><strong>Week two: connect a planet, sign and house.</strong> Read these as a theme, a style and an area of life. Use your own experience to test the description.</li>' +
    '<li><strong>Week three: explore an aspect.</strong> Find one alignment below. Name both themes before you read its interpretation.</li>' +
    '<li><strong>Week four: reflect without forcing a fit.</strong> What was useful? What felt too broad? Keep a concrete example of something you learned or practised.</li></ol>' +
    '<div class="astro-actions"><a class="keep" href="#/astro/learn">Open the learning guide</a><a class="keep" href="#/journal">Write a reflection</a></div></section>';
  if (chart) {
    var rows = month.events.map(function (e) { return '<tr><td><time datetime="' + e.utc.toISOString() + '">' + esc(astroDateLabel(e.utc, month.zone)) + '</time></td><th scope="row">' + esc(astroEventTitle(e)) + '</th><td>' + e.angle + '°' + (e.retro ? ' · Retrograde' : '') + '</td><td>' + e.house + '</td></tr>'; }).join('');
    out += astroDetails('All ' + month.events.length + ' personal alignments this month', '<p>These are computed moments of exact angular alignment, shown to the minute for reading. They are estimates from the ephemeris. Repeated passes can occur during retrograde motion. A wider symbolic influence period is not calculated.</p>' +
      '<p>Sun, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune and Pluto are compared with your ten natal bodies, Ascendant and Midheaven. The moving Moon is omitted from this list to keep it readable.</p>' +
      '<div class="tablewrap"><table class="charttable astro-events"><caption>Transits to your birth chart</caption><thead><tr><th>Time</th><th>Alignment</th><th>Angle / motion</th><th>Natal house occupied by moving planet</th></tr></thead><tbody>' + rows + '</tbody></table></div>');
  }
  var changes = month.ingresses.map(function (e) { return { utc: e.utc, text: e.body + ' enters ' + e.sign.name + (e.retro ? ' in retrograde motion' : '') }; }).concat(month.stations.map(function (e) { return { utc: e.utc, text: e.body + ' stations ' + e.direction }; })).sort(function (a, b) { return a.utc - b.utc; });
  out += astroDetails('The wider sky: sign changes and retrogrades', '<p>Retrograde means apparent backward motion as seen from Earth. The planet does not reverse its orbit. This is a shared sky calendar, not a personal prediction.</p>' +
    (changes.length ? '<ul class="astro-changes">' + changes.map(function (e) { return '<li><strong>' + esc(e.text) + '</strong><br>' + esc(astroDateLabel(e.utc, month.zone)) + '</li>'; }).join('') + '</ul>' : '<p>No sign changes or stations in the selected bodies this month.</p>') +
    '<p class="astro-subtle">Sign changes exclude the fast-moving Moon. Pluto is included as an astrological body; astronomically it is a dwarf planet.</p>');
  out += astroDetails('Planet positions across this month', '<p>Compare the opening and closing boundaries of the selected calendar month. The closing position is measured at the start of the following month. Retrograde loops can make the path between these positions longer than it looks.</p>' +
    '<div class="tablewrap"><table class="charttable astro-events"><caption>Geocentric tropical longitudes</caption><thead><tr><th>Body</th><th>Opening position</th><th>Closing position</th></tr></thead><tbody>' + month.positions.map(function (p) {
      return '<tr><th scope="row">' + esc(p.body) + '</th><td>' + esc(astroPosition(p.startLon)) + '</td><td>' + esc(astroPosition(p.endLon)) + '</td></tr>';
    }).join('') + '</tbody></table></div>');
  return out + astroMethod();
}
function astroMethod() {
  return astroDetails('How the readings are made', '<p>Planet positions and lunar phases are calculated with <a href="https://github.com/cosinekitty/astronomy" target="_blank" rel="noopener noreferrer">Astronomy Engine</a>, using geocentric ecliptic longitudes of date. The library is designed for roughly one arcminute accuracy. The tropical zodiac divides the ecliptic into twelve equal signs from the March equinox; signs are not the uneven astronomical constellations.</p>' +
    '<p>Personal alignments use conjunctions (0°), sextiles (60°), squares (90°), trines (120°) and oppositions (180°). Highlights favour slower-moving planets and contacts to the Sun, Moon and chart angles, with a variety of moving planets where available. This is an editorial selection, not a measure of importance or certainty. Open the full list to see every calculated alignment.</p>' +
    '<p>Birth time is converted with your selected IANA time zone and the historical offset in your browser. A manual offset is available for uncertain historical records. House placements use the house system you choose on your chart. Approximate time or location makes the angles and houses less certain.</p>' +
    '<p>New months are calculated when you open or return to this page. The current month follows First Light\'s study-day boundary in Settings, so a late-night session can finish in the previous month. While this page is visible it checks each minute. A month you deliberately browse stays selected. Event dates always use the actual calendar and your device time zone.</p><p>The first visit downloads the astronomy library; after it has been cached, calculations work offline. No monthly subscription or server request with your birth details is needed.</p>' +
    '<p>The astronomical calculations and the symbolic interpretations are different things. Astrology is offered here as a reflective tradition, not an established way to predict events or determine personality.</p>');
}

function astroLearnRender() {
  var text = function (s) { return esc(String(s).replace(/<\/?em>/g, '').replace(/[\u2013\u2014]/g, ', ')); };
  var rows = function (items) { return items.map(function (r) { return '<article><h3>' + text(r[0]) + '</h3>' + r.slice(1).map(function (p) { return '<p>' + text(p) + '</p>'; }).join('') + '</article>'; }).join(''); };
  var opts = SIGNS.map(function (s) { return '<option value="' + esc(s.n) + '">' + esc(s.n) + '</option>'; }).join('');
  return '<div class="astro-learn"><p>Begin with the first chapter. Keep your own chart beside the ideas, and treat interpretations as questions you can accept, adapt or decline.</p>' +
    astroDetails('1. Read a chart in one sentence', '<p><strong>Planet = theme. Sign = style. House = area of life. Aspect = relationship between themes.</strong></p>' +
      '<p>For example, Mercury in an air sign in the third house can be read symbolically as communication expressed through ideas in the area of everyday learning. That is an interpretive sentence, not a factual diagnosis of a person.</p>' +
      '<p><strong>Natal</strong> means the chart at birth. A <strong>transit</strong> compares a body moving now with a fixed point in that natal chart. Your natal Moon is fixed; the Moon in this month\'s lunar calendar is moving.</p>' +
      '<p><strong>Try it:</strong> Open your birth chart, choose one planet and identify its sign and house. Write one sentence in your own words before looking up every detail.</p><a class="keep" href="#/chart">Read my chart</a>', true) +
    astroDetails('2. The Sun, Moon and rising sign', '<p>The <strong>Sun</strong> is associated with purpose and vitality. The <strong>Moon</strong> with feelings, habits and familiar rhythms. The <strong>Ascendant</strong>, or rising sign, is the eastern horizon\'s intersection with the ecliptic at birth and is associated with your approach to experience.</p>' +
      '<p>Birth time matters most for the angles and houses, and also matters for the Moon and a Sun close to a sign boundary. A birthday alone cannot settle every cusp question. Your saved chart uses the recorded local time and historical time zone.</p>' +
      '<p>A tropical sign is one of twelve equal 30° divisions. It is not the same thing as an astronomical constellation. Near a boundary, the calculated longitude belongs to one sign; this app does not assign a combined cusp sign.</p>') +
    astroDetails('3. Elements and modalities', '<p>The four elements are symbolic families. The three modalities describe beginning, sustaining and adapting. Seasonal language comes from the Northern Hemisphere tradition; it does not describe the local weather at every birthplace.</p>' + rows(A_ELEMENTS) + rows(A_MODES)) +
    astroDetails('4. The twelve signs', '<p>These are traditional symbolic portraits, not reliable descriptions of everyone born under a sign. Qualities and growth questions can be useful without being unique to you. Historical body correspondences are cultural symbolism, not health guidance.</p>' +
      SIGNS.map(function (s) { return signCard(s, 'Traditional symbolism'); }).join('')) +
    astroDetails('5. The planets and their themes', '<p>Astrology calls the Sun and Moon luminaries and includes them among its chart bodies. The Sun is a star, the Moon is Earth\'s satellite, and Pluto is a dwarf planet. Travel times below are rough averages; retrograde loops make individual stays vary.</p>' + rows(A_PLANETS)) +
    astroDetails('6. Houses and angles', '<p>Houses are divisions tied to birth time, location and a chosen calculation convention. In <strong>Whole Sign</strong>, all of the rising sign is house one. In <strong>Equal</strong>, house one begins at the rising degree. <strong>Placidus</strong> is based on divisions of diurnal motion and may be undefined at high latitudes.</p>' +
      '<p>The Ascendant and Descendant mark the horizon. The Midheaven (MC) and Imum Coeli (IC) are meridian angles. They are not automatically the tenth and fourth house cusps in Whole Sign or Equal houses. Changing the house system changes the houses, not the planetary longitudes.</p>' + rows(A_HOUSES)) +
    astroDetails('7. Aspects, orbs and retrograde motion', '<p>An aspect is an angular separation measured in degrees. An <strong>orb</strong> is the allowance around the exact angle. Schools use different allowances; these are the ones used in your natal chart here. The monthly list instead shows the computed crossing of the exact angle.</p>' + rows(A_ASPECTS) +
      '<p>A degree-based aspect can cross a sign boundary, so a trine is not always between planets in signs of the same element. Sign relationships and measured planetary aspects are related conventions, not interchangeable calculations.</p>' +
      '<p><strong>Retrograde</strong> is apparent backward motion against the sky from our viewpoint on Earth. A <strong>station</strong> is the turning point. A planet may pass the same natal degree more than once; the monthly calendar retains each pass. There is no rule here that you must avoid travel, contracts or relationships during a retrograde.</p>') +
    astroDetails('8. Compare the symbolism of two signs', '<p>This compares signs, not people. It cannot determine compatibility, trustworthiness or whether a relationship will work. Use the contrast to practise the vocabulary.</p>' +
      '<div class="drawrow"><label class="chart-field">First sign<select id="a-sign1" data-change="compareSigns">' + opts + '</select></label>' +
      '<label class="chart-field">Second sign<select id="a-sign2" data-change="compareSigns">' + opts + '</select></label></div><div id="a-compare-result"></div>') +
    astroDetails('9. Read the whole chart thoughtfully', rows(A_HOWTO) + '<p>Keep a record of what did not fit as well as what did. Broad statements can feel personal even when they describe many people. Let reflection support your choices, not replace judgement or evidence.</p>') +
    astroDetails('10. The historical journey', rows(A_HISTORY) + '<p>The historical record explains how a tradition developed; it does not establish its predictive claims. For the mathematics behind this app, see the calculation notes below.</p>') +
    astroMethod() + '</div>';
}

FL_VIEWS.astro = {
  label: 'Astrology', title: 'Your monthly sky',
  render: function (arg) {
    astroMonthRequest++;
    if (arg === 'learn') return astroOpening('learn', 'The language of the sky', 'A simple path from the first three placements to the whole chart.') + astroLearnRender();
    var s = astroMonthSelection(arg); astroDisplayedMonth = s.current;
    return '<div class="astro-month" data-month="' + s.key + '">' + astroOpening('month', 'Your monthly sky',
      'A changing sky, a familiar chart, and a few thoughtful moments for your selected month.') +
      '<h2 class="astro-month-title">' + esc(astroMonthTitle(s)) + '</h2>' + astroMonthTools(s) +
      (s.invalid ? '<p role="status">That month could not be opened. Showing the current month.</p>' : '') +
      '<div id="astro-month-content" aria-busy="true"><p role="status">Preparing the sky for ' + esc(astroMonthTitle(s)) + '…</p></div></div>';
  },
  after: function (arg) {
    if (arg === 'learn') { renderCompare(); chartEnsureLoaded().catch(function () {}); return; }
    var host = document.getElementById('astro-month-content'), token = astroMonthRequest, selection = astroMonthSelection(arg);
    chartEnsureLoaded().then(function () {
      if (!host.isConnected || token !== astroMonthRequest || flRoute.view !== 'astro') return;
      var natal = null, issue = '', birth = chartBirth();
      if (birth.date) { try { natal = chartFromBirth(birth); } catch (e) { issue = 'Your saved birth details need a small correction: ' + e.message; } }
      var month = astroMonthBuild(selection.year, selection.month, natal);
      host.innerHTML = astroMonthContent(month, natal, issue); host.setAttribute('aria-busy', 'false');
      announce('Your monthly sky is ready.');
    }).catch(function (error) {
      if (!host.isConnected || token !== astroMonthRequest) return;
      host.setAttribute('aria-busy', 'false');
      var message = error.message && !/^js\//.test(error.message) ? error.message : 'The astronomy data has not finished downloading. Connect and try again. Once saved, it works offline.';
      host.innerHTML = '<div class="astro-welcome"><h2>The sky could not be prepared</h2><p>' + esc(message) + '</p><button class="btn" data-act="astroRetry">Try again</button><a class="keep" href="#/astro/learn">Read the learning guide</a></div>';
    });
  }
};
function astroRefreshMonth() {
  if (document.visibilityState !== 'visible' || flRoute.view !== 'astro' || flRoute.arg) return;
  if (astroDisplayedMonth !== astroCurrentMonth()) render();
}
document.addEventListener('visibilitychange', astroRefreshMonth);
setInterval(astroRefreshMonth, 60000);
