/* ---------------- HELPERS & STORAGE ---------------- */
const shuffle = (arr) => { const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const sample = (arr,n) => shuffle(arr).slice(0,n);
const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
/* Storage is one record per device again; see KEY() below. The line that used
   to stand here said storage goes through OOT.profiles so each person on a
   shared bar tablet keeps
   their own record. A function rather than a const because the answer changes
   when somebody else taps their name. With no profile chosen it returns the
   original key unchanged, so a bar that never names anyone loses nothing. */
const KEY_BASE = 'bartenders-ledger-v1';

/* ONE record on this device, which is what the Ledger had before names and
   what it has again. The naming of a person came out of this wing on the
   owner's call: it belongs to a manager mode that does not exist yet, and a
   control that asks a bartender who they are before it will keep their work is
   a toll gate when there is nothing on the other side of it.

   The key is bare again rather than profile-namespaced. adoptNamedRecord()
   below is why that costs nobody their work. */
function KEY(){ return KEY_BASE; }

/* A record written while this wing DID namespace by profile sits at
   'bartenders-ledger-v1::<id>' and nothing would read it any more. When there
   is exactly one of those and no bare record, it IS this device's ledger, so
   move it across. Two or more and the honest thing is to touch none of them:
   merging two people's drills invents a history neither of them has, and the
   records stay where they are for the manager mode that will read them.

   localStorage only, deliberately: the profile layer writes there, so that is
   the only place a namespaced record can be. */
function adoptNamedRecord(){
  try {
    if (localStorage.getItem(KEY_BASE) !== null) return;
    const named = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(KEY_BASE + '::') === 0) named.push(k);
    }
    if (named.length !== 1) return;
    const v = localStorage.getItem(named[0]);
    if (v) localStorage.setItem(KEY_BASE, v);
  } catch(e){}
}
adoptNamedRecord();
const mem = {};
const store = {
  async get(k){
    try{ if(window.storage){ const r = await window.storage.get(k); if(r) return r.value; } }catch(e){}
    try{ const v = localStorage.getItem(k); if(v!==null) return v; }catch(e){}
    return mem[k] || null;
  },
  async set(k,v){
    try{ if(window.storage){ await window.storage.set(k,v); return; } }catch(e){}
    try{ localStorage.setItem(k,v); store.degraded = false; return; }catch(e){}
    /* The in-memory fallback keeps the session alive, and dies with the tab.
       Every save was reporting success while the browser refused to persist,
       so the flag lets the UI say so while there is still time to export. */
    mem[k]=v;
    store.degraded = true;
  }
};

/* ---- family standards ----------------------------------------------------
   The marks live on FAMILIES (data-core) and render identically everywhere a
   drink is judged: the families view, the library detail, and My Bar. One
   renderer so the three cannot drift. `label` names WHOSE standard is being
   read: a house drink is judged AS a Sour, and saying so is the teaching. */
function familyMarksHTML(famName, label){
  const f = FAMILIES[famName];
  if(!f || !f.marks) return '';
  const items = f.marks.map(m => '<li class="small lh" style="margin-bottom:6px">'+esc(m)+'</li>').join('');
  return '<div class="col-sm" style="gap:8px;margin-top:4px">'
    + '<div class="eyebrow">'+esc(label || ('How to tell it went right: the '+famName+' standard'))+'</div>'
    + '<ul style="padding-left:18px;margin:0">'+items+'</ul>'
    + '<div class="tiny lh" style="color:var(--brass)"><span class="bold">Where it goes wrong · </span>'+esc(f.fault)+'</div>'
    + '</div>';
}

/* ---- the bottle book -------------------------------------------------------
   Spirits invoices creep, and the previous price is the one number a reprice
   destroys unless something keeps it. Keyed by lowercased name; history is
   newest-first, capped, and a same-price refile is a no-op: the history is
   of CHANGES, not of visits to the tool. */
const BOTTLE_HISTORY_CAP = 12;
function recordBottle(name, price, sizeMl){
  const nm = String(name||'').trim();
  const p = Number(price), ml = Number(sizeMl);
  if(!nm || !(p > 0) || !(ml > 0)) return false;
  if(!progress.bottles) progress.bottles = [];
  const key = nm.toLowerCase();
  const i = progress.bottles.findIndex(b => b.name.toLowerCase() === key);
  if(i < 0){
    progress.bottles.push({ name:nm, price:p, sizeMl:ml, ts:Date.now(),
      history:[{ price:p, sizeMl:ml, at:Date.now() }] });
    return true;
  }
  const b = progress.bottles[i];
  if(b.price === p && b.sizeMl === ml){
    if(b.name !== nm){ b.name = nm; return true; }   /* spelling fix, no fake move */
    return false;
  }
  b.history = [{ price:p, sizeMl:ml, at:Date.now() }, ...(b.history||[])].slice(0, BOTTLE_HISTORY_CAP);
  b.price = p; b.sizeMl = ml; b.ts = Date.now(); b.name = nm;
  return true;
}
/* The move since last time, in percent: null until there is a last time,
   and only within comparable sizes (a 700ml at the 750ml price is not a cut). */
function bottleMovePct(b){
  const h = (b.history||[]).filter(x => x && x.price > 0);
  if(h.length < 2) return null;
  const prev = h.slice(1).find(x => x.sizeMl === h[0].sizeMl && x.price !== h[0].price);
  if(!prev) return null;
  return ((h[0].price - prev.price) / prev.price) * 100;
}

/* `path` is the first-week induction, which used to be kept on the profile.
   With no profile to keep it on it lives here, with the rest of this
   bartender's work, which is where it always belonged: the checklist is about
   the Ledger, not about a person. Shape: { stepId: whenItWasTicked }. */
let progress = { cards:{}, quizzes:[], path:{} };
const saveProgress = () => store.set(KEY(), JSON.stringify(progress));

const state = {
  tab:'home',
  lib:{ q:'', fam:'All', tier:'All', open:null },
  fc:{ stage:'setup', mode:null, src:'All', boardSrc:'All', tier:'All', family:'All', spirit:'All', special:'All', smart:false,
       deck:[], idx:0, flipped:false, right:0, wrong:0, missed:[],
       pool:[], sel:[], checked:false, lastOk:null, clozeIdx:0, opts:[], picked:null, boardOpen:null },
  quiz:{ stage:'setup', mode:'mixed', round:null, idx:0, picked:null, score:0, missedQ:[] },
  riff:{ frame:null, deal:null, revealed:false },
  tools:{ view:'batch', drink:3, serv:8, dilute:false, shelf:[], shelfSrc:'Cocktails', eightySix:null,
          convVal:1, convFrom:'oz', bottlePrice:30, bottleMl:750, targetPour:20, dilPct:25 },
  prep:{ cat:'Syrups', open:null, listOpen:null, safeOpen:null },
  svc:{ dom:'beer', rowOpen:null, refOpen:null },
  prod:{ cat:'All', open:null, primerOpen:null },
  practice:{ view:'drills', flightOpen:null, methodOpen:null, noteOpen:null, subjects:{}, timers:{}, rail:null },
  tast:{ cat:'Whiskey', label:'', appearance:null, nose:[], palate:{}, finish:null, notes:'' },
  mybar:{ form:null, editing:null, open:null },
  na:{ view:'list', cat:'All', open:null, pOpen:null, tOpen:null, sOpen:null, drill:false, order:[], idx:0, revealed:false },
  shots:{ view:'board', cat:'All', open:null, svc:null, drill:false, order:[], idx:0, revealed:false,
          rDrink:0, rCount:6, lay:null },
  famOpen: Object.keys(FAMILIES)[0],
  noteOpen: STUDY[0].title,
};

/* ---------------- SHARED PIECES ---------------- */
function ticketHTML(c, hideName){
  const specLines = c.spec.map(l => '<div class="spec-line"><span>·</span><span>'+esc(l)+'</span></div>').join('');
  const note = (!hideName && c.note) ? '<div class="tix-rule"></div><div class="tix-note">'+esc(c.note)+'</div>' : '';
  const bal = hideName ? '' : balanceLineHTML(c);
  const gi = (!hideName && typeof glassIcon==='function') ? '<span class="tix-glass">'+glassIcon(c.glass)+'</span>' : '';
  return '<div class="ticket"><div class="ticket-inner">'+gi
    + '<div class="tc"><div class="tix-label">The Bartender\'s Ledger · Drink Ticket</div>'
    + '<div class="tix-name">'+(hideName ? '- ? -' : esc(c.name.toUpperCase()))+'</div></div>'
    + '<div class="tix-rule"></div>' + specLines + '<div class="tix-rule"></div>'
    /* an empty field prints the dash HERE, so no record has to carry one */
    + '<div><span class="tix-label">Method </span>'+esc(c.method || '-')+'</div>'
    + '<div><span class="tix-label">Glass </span>'+esc(c.glass || '-')+'</div>'
    + '<div><span class="tix-label">Garnish </span>'+esc(c.garnish || '-')+'</div>'
    + bal + note + '</div></div>';
}
const idxOf = (name) => COCKTAILS.findIndex(c => c.name === name);

/* ---------------- BALANCE ENGINE (the sweet-sour correction) ---------------- */
function classifyLine(l){
  const s = l.toLowerCase();
  /* aromatics are dashes and rinses, but a measured pour of bitters is a base
     spirit (the Trinidad Sour is 1.5 oz of Angostura), so check volume first */
  if(/bitters|rinse|drops|flower water|dash/.test(s) && lineOz(l) === 0) return 'aromatic';
  /* non-spirit bulk: mixers, beer, dairy and juices that lengthen rather than sour */
  if(/champagne|prosecco|sparkling|\bsoda\b|tonic|ginger beer|ginger ale|\bcola\b|hot coffee|hot water|tomato|clamato|\bmilk\b|half-and-half|lager|\bstout\b|\bbeer\b|apple juice|lemonade|coconut water|grape juice|orange juice/.test(s)) return 'long';
  if(/egg|whipped cream/.test(s)) return 'texture';
  if(/vermouth|lillet|cocchi|dubonnet|punt e mes|\bsherry\b|\bport\b|campari|aperol|\bamaro\b|averna|montenegro|nonino|cynar|fernet|suze|amer picon|aperitivo/.test(s)) return 'modifier';
  /* sweet: syrups AND the liqueur shelf. These patterns mirror the SHELF table
     below: when you add one there, add it here or the two disagree. */
  if(/simple|sugar|honey|orgeat|agave|syrup|cura|cointreau|liqueur|midori|maraschino|chartreuse|cacao|dictine|violette|mûre|falernum|grenadine|cordial|coconut|amaretto|triple sec|grand marnier|drambuie|crème de|creme de|cassis|schnapps|st-?germain|cherry heering|galliano|frangelico|limoncello|advocaat|chambord|midori|kahl|baileys|irish cream|sambuca|licor 43|velvet falernum|allspice dram|pimm/.test(s)) return 'sweet';
  if(/\bcream\b/.test(s)) return 'texture';
  if(/juice|lemon|lime|grapefruit|cranberry|pineapple|espresso/.test(s)) return 'sour';
  /* non-alcoholic bulk that is neither mixer, sour nor sweet: water, purées,
     shrubs, brines, cold coffee and tea. Falling through to 'strong' had
     Pour Cost billing a Bellini's peach purée and a Pastis's five ounces of
     water at the spirit rate. balanceOf drops this bucket entirely. An
     infused spirit ("tea-infused gin") is still the spirit. */
  if(!/infus/.test(s) && /\bwater\b|pur[eé]e|shrub|brine|coffee|\btea\b|juice|syrup|nectar|\bice\b/.test(s)) return 'na';
  return 'strong';
}
function lineOz(l){
  let t = 0; const re = /(\d+\/\d+|\d+(?:\.\d+)?)\s*oz/g; let m;
  while((m = re.exec(l))){
    const tok = m[1];
    t += tok.includes('/') ? (Number(tok.split('/')[0]) / Number(tok.split('/')[1])) : parseFloat(tok);
  }
  /* "1/2 oz each: vodka, gin, rum, tequila, triple sec" is five half-ounces,
     not one; otherwise a Long Island reads as half an ounce of spirit */
  if(/\boz each\b/i.test(l)){
    const list = l.split(/:/)[1];
    if(list){
      const n = list.split(',').filter(x => x.trim()).length;
      if(n > 1) t *= n;
    }
  }
  return t;
}
function ozNice(x){
  const n = Math.round(x*4)/4;
  const whole = Math.floor(n), frac = Math.round((n - whole)*4);
  const sym = ['','¼','½','¾'][frac] || '';
  if(whole === 0 && sym) return sym;
  if(!sym && whole === 0) return String(Math.round(x*100)/100);
  return whole + sym;
}
/* Splits "1/2 oz each: gin, sweet vermouth, dry vermouth, orange juice" into
   per-item units so each ingredient is classified on its own. lineOz already
   multiplied these lines; classifyLine did not split them, so the whole
   two-ounce block landed in whichever bucket the first regex tripped: a
   Satan's Whiskers costed its vermouth and juice as gin. */
function specUnits(l){
  if(!/\boz each\b/i.test(l)) return [{ text:l, oz:lineOz(l) }];
  const m = l.match(/(\d+\/\d+|\d+(?:\.\d+)?)\s*oz/);
  const per = m ? (m[1].includes('/') ? Number(m[1].split('/')[0]) / Number(m[1].split('/')[1]) : parseFloat(m[1])) : 0;
  const list = l.split(/:/)[1];
  const items = list ? list.split(',').map(x => x.trim()).filter(Boolean) : [];
  return items.length ? items.map(x => ({ text:x, oz:per })) : [{ text:l, oz:lineOz(l) }];
}
function balanceOf(c){
  const b = { strong:0, sweet:0, sour:0, long:0, modifier:0 };
  const lines = [];
  c.spec.forEach(l => {
    specUnits(l).forEach(u => {
      const k = classifyLine(u.text);
      if(k === 'aromatic' || k === 'texture' || k === 'na') return;
      b[k] += u.oz;
      lines.push({ k:k, oz:u.oz });
    });
  });
  // Liqueur- and wine-based drinks (Aperol Spritz, Midori Sour, Mimosa) have no
  // conventional base spirit. Promote their largest sweet, or failing that,
  // largest modifier into the strong column so the read isn't misleading.
  // A 'long' line is never promoted: a mixer is not a base, and promoting one
  // made a Michelada read as 12 oz of spirit.
  if(b.strong === 0){
    ['sweet','modifier'].some(function(key){
      const cand = lines.filter(function(x){ return x.k===key && x.oz>0; })
                        .sort(function(a,z){ return z.oz-a.oz; })[0];
      if(cand){ b[key] -= cand.oz; b.strong += cand.oz; return true; }
      return false;
    });
  }
  return b;
}
function balanceLineHTML(c){
  const b = balanceOf(c); const parts = [];
  [['strong','strong'],['sour','sour'],['sweet','sweet'],['modifier','wine/bitter'],['long','long']].forEach(([k,label]) => {
    if(b[k] > 0.05) parts.push(label + ' ' + ozNice(b[k]));
  });
  if(!parts.length) return '';
  return '<div class="tix-rule"></div><div><span class="tix-label">Balance ≈ </span><span style="color:var(--ink-dim)">' + parts.join(' · ') + ' oz</span></div>';
}
const BALANCE_TIPS = {
  'Sour':"The dials: too tart → nudge the sweet up ⅛ oz; cloying → add ¼ oz citrus; thin → suspect your shake and your ice before the spec. Citrus varies daily: taste it before service.",
  'Old Fashioned':"Sweetness should whisper. If it drinks hot, the fix is usually ten more seconds of stirring: water is the missing ingredient, not sugar.",
  'Spirit & Vermouth':"The ratio is the personality: 2:1 is the modern standard, 1:1 is 1880s silk. If it tastes dull, suspect the vermouth's age before you blame the ratio.",
  'Highball':"Balance here is temperature and fizz, not math. Everything cold, gentle build, one lift of the spoon: a hard stir murders the carbonation.",
  'Egg & Cream':"Texture is the fourth ingredient. A lazy dry shake reads as thin foam; a proper one holds a straw upright.",
  'Julep & Smash':"Crushed ice does the sweetening math for you: an under-diluted julep tastes too strong and too sweet at the same time.",
  'Tiki':"Total the many sours and many sweets like one big sour: roughly 1 oz sour to 1 oz sweet per 2 oz of combined rums.",
  'Duo & Trio':"No citrus safety net here: the liqueur is the only sweetness, so measure it honestly and let dilution soften the edges.",
  'Punch':"Respect the rhyme's ratios, then let time do the mixing: an hour of rest marries flavors no shake can.",
  'Hot':"Heat amplifies both sweetness and alcohol burn. Under-sweeten slightly, and always pre-heat the glass.",
};

/* ---------------- RIFF BUILDER (the family-template correction) ---------------- */
const RIFFS = [
  { fam:'Sour', label:'The Sour Frame',
    lines:['2 oz [base]','3/4 oz [citrus]','3/4 oz [sweet]'],
    slots:{ base:['gin','vodka','white rum','aged rum','bourbon','rye','blanco tequila','mezcal','cognac','pisco','blended scotch'],
            citrus:['lemon juice','lime juice'],
            sweet:['simple syrup','honey syrup','orgeat','demerara syrup','ginger syrup','maple syrup'] },
    twists:['add an egg white and dry shake it','top with 2 oz soda and serve it long','swap 1/4 oz of the sweet for maraschino','float 1/2 oz of red wine on top','rinse the glass with absinthe','split the citrus half lemon, half lime'] },
  { fam:'Spirit & Vermouth', label:'The Manhattan Frame',
    lines:['2 oz [base]','1 oz [wine]','2 dashes [bitters]'],
    slots:{ base:['rye','bourbon','gin','blended scotch','aged rum','cognac','blanco tequila'],
            wine:['sweet vermouth','dry vermouth','blanc vermouth','fino sherry'],
            bitters:["Angostura","orange bitters","Peychaud's","mole bitters"] },
    twists:['add 1/4 oz maraschino, the Martinez move','swap the vermouth for an amaro','split the base between two spirits','add a bar spoon of absinthe','go equal parts with Campari, Negroni logic'] },
  { fam:'Old Fashioned', label:'The Old Fashioned Frame',
    lines:['2 oz [base]','1/4 oz [sweet]','2–3 dashes [bitters]'],
    slots:{ base:['bourbon','rye','aged rum','cognac','añejo tequila','apple brandy'],
            sweet:['simple syrup','demerara syrup','maple syrup','honey syrup'],
            bitters:["Angostura","Peychaud's","orange bitters","mole bitters"] },
    twists:['split the base 50/50 between two spirits','swap the sweet for a bar spoon of rich liqueur','express two different citrus peels over the top','add a single dash of absinthe alongside the bitters'] },
  { fam:'Highball', label:'The Highball Frame',
    lines:['2 oz [base]','4 oz [mixer]','squeeze of [citrus] (optional)'],
    slots:{ base:['gin','vodka','bourbon','blended scotch','white rum','blanco tequila','Campari','sweet vermouth'],
            mixer:['soda water','tonic','ginger beer','grapefruit soda','cola','dry sparkling wine'],
            citrus:['lime','lemon','grapefruit'] },
    twists:['add one pinch of salt to the drink','swap half the mixer for a second mixer','a dash of bitters over the top','float 1/2 oz of amaro'] },
];
function baseSpirit(b){
  b = b.toLowerCase();
  if(b.includes('rum')) return 'Rum';
  if(/bourbon|rye|scotch/.test(b)) return 'Whiskey';
  if(b.includes('gin')) return 'Gin';
  if(b.includes('vodka')) return 'Vodka';
  if(b.includes('tequila')) return 'Tequila';
  if(/cognac|apple|pisco/.test(b)) return 'Brandy';
  if(/campari|vermouth/.test(b)) return 'Aperitivo';
  return null;
}
function dealRiff(){
  const r = state.riff, f = r.frame;
  const picks = {};
  Object.keys(f.slots).forEach(k => { picks[k] = sample(f.slots[k],1)[0]; });
  const resolved = f.lines.map(l => l.replace(/\[(\w+)\]/g, (m,k) => picks[k] || m));
  r.deal = { picks, twist: sample(f.twists,1)[0], resolved };
  r.revealed = false;
}

/* ---------------- PRACTICE DRILLS (the hands-on correction) ---------------- */
const DRILLS = [
  { id:'consistency', name:'Consistency Test', unit:'g spread', dir:'low',
    desc:'Make the same Daiquiri three times in a row. Weigh each finished drink on a scale. Log the spread in grams between your heaviest and lightest. Under 8g is tight; under 4g is machine-like.' },
  { id:'pour', name:'Free-Pour Calibration', unit:'accurate of 10', dir:'high',
    desc:'Pour 1 oz, 1.5 oz, and 2 oz ten times each with a speed pourer, checking every pour against a jigger. Log how many of 10 landed within an eighth of an ounce. Re-run weekly: counts drift.' },
  { id:'speed', name:'Speed Round', unit:'seconds', dir:'low', pick:4,
    desc:'Four different cocktails from four different families, clean station at the end or it doesn\u2019t count. The drill deals them; picking your own four is how you quietly practise what you already know. Log total seconds. Under 360 is service-ready; under 240 is Saturday-night ready.' },
  { id:'blind', name:'Blind Tasting', unit:'correct of 3', dir:'high',
    desc:'Three spirits from one category, poured blind by a friend. Nose, sip, add water, sip again, write notes, then identify. Log how many of 3 you called. Your palate is a muscle.' },
  { id:'foam', name:'Dry-Shake Discipline', unit:'sec foam holds', dir:'high',
    desc:'Whiskey Sour with egg white: dry shake, shake, strain up. Log how many seconds the foam holds a straw upright. Under 5 means your dry shake is lazy; 15+ is meringue.' },
  { id:'garnish', name:'Garnish Prep Speed', unit:'sec for 20 twists + 10 wheels', dir:'low',
    desc:'Twenty lemon twists, no pith, and ten lime wheels slit for the rim: against the clock, into a clean caddy. This is where a slow bartender loses ten minutes of every prep hour, and it is the first thing a manager watches on a trail. Under 300 is respectable; under 180 is a professional.' },
  { id:'mise', name:'Station Setup', unit:'sec to set the station', dir:'low',
    desc:'From an empty rail: ice, tins, jiggers, strainers, bar spoon, muddler, juice, syrups, garnish caddy, towels: everything within a pivot, nothing you have to look for twice. Set it, time it, then stand in it and reach for six things blind. If you had to look, it is in the wrong place.' },
  { id:'glassware', name:'Glass Call', unit:'correct of 10', dir:'high', pick:10,
    desc:'The drill deals ten drinks. Say the glass out loud before you check: coupe or Nick & Nora, rocks or double rocks, Collins or highball. Glass choice is the first thing a guest sees and a standard interview question. Log how many of ten you called.' },
  /* hidden: run from its own Ticket Rail view, but charted with the rest */
  { id:'rail', name:'Ticket Rail', unit:'seconds', dir:'low', hidden:true,
    desc:'A full rail of tickets, built in the right order, against the clock.' },
  { id:'hold', name:'Hold the Round', hidden:true, unit:'correct of 5', dir:'high',
    desc:'A server calls a round while your hands are full. Hold it, then prove you held it.' },
  { id:'strain', name:'Double-Strain Discipline', unit:'sec, flecks-free', dir:'low',
    desc:'A Gin Basil Smash or any herb-shaken sour, double-strained into a chilled coupe. The clock runs from tin-open to glass-down, and the run only counts if the surface is clean: one green fleck and it is a failed attempt, not a slow one.' },
];

/* Served-strength bands, shared by the Tools strength panel and the
   Dealer's Choice quiz: one scale, so the two can never disagree. */
function strengthBand(abvServed){
  return abvServed >= 30 ? { key:'very strong', line:'Very strong: a sipping drink, and one you pace a guest on.' }
    : abvServed >= 22 ? { key:'spirit-forward', line:'Spirit-forward. Standard for a stirred classic served up.' }
    : abvServed >= 14 ? { key:'moderate', line:'Moderate: a sour or a short highball.' }
    : abvServed >= 8 ? { key:'sessionable', line:'Sessionable. This is the strength most long drinks land at.' }
    : { key:'light', line:'Low-ABV. Aperitivo territory: you can serve two.' };
}

/* ---------------- SHELF KEYWORDS (inventory mode) ---------------- */
const SHELF = [
  ['gin','Gin',/\bgin\b/i],['vodka','Vodka',/vodka/i],['wrum','White rum',/white rum/i],['arum','Aged/dark rum',/(?<!151 )(?<!overproof )(aged|dark|gold|añejo|demerara|jamaican|barbados|blackstrap|puerto rican)[\w' ]{0,12}\brum\b/i],['crum','Coconut rum',/coconut rum/i],
  ['bourbon','Bourbon',/bourbon/i],['rye','Rye',/\brye\b/i],['scotch','Scotch',/\bscotch\b/i],['irish','Irish whiskey',/irish whiskey/i],
  ['teq','Tequila',/tequila/i],['cognac','Cognac',/cognac/i],['pisco','Pisco',/pisco/i],['cachaca','Cachaça',/cacha/i],
  ['sherry','Sherry',/sherry/i],['champ','Sparkling wine',/champagne|prosecco|cava|sparkling wine|sparkling lemonade/i],
  ['sv','Sweet vermouth',/sweet vermouth|punt e mes/i],['dv','Dry vermouth',/dry vermouth|blanc vermouth/i],['lillet','Lillet blanc',/lillet/i],
  ['campari','Campari',/campari/i],['aperol','Aperol',/aperol/i],['nonino','Amaro Nonino',/nonino/i],['fernet','Fernet',/fernet/i],
  ['ol','Orange liqueur',/orange liqueur|cointreau|cura|grand marnier|triple sec/i],['mara','Maraschino',/maraschino/i],['chart','Green Chartreuse',/chartreuse/i],
  ['bene','Bénédictine',/dictine/i],['viol','Crème de violette',/violette/i],['cacao','Crème de cacao',/cacao|chocolate liqueur/i],
  ['mure','Crème de mûre',/mûre/i],['coffee','Coffee liqueur',/coffee liqueur/i],['abs','Absinthe/pastis',/absinthe|pastis|anisette/i],
  ['ango','Angostura',/angostura/i],['pey',"Peychaud's",/peychaud/i],['ob','Orange bitters',/orange bitters/i],
  ['lemon','Lemons',/lemon/i],['lime','Limes',/lime/i],['gfj','Grapefruit',/grapefruit/i],['oj','Orange juice',/orange juice/i],
  ['pine','Pineapple juice',/pineapple/i],['cran','Cranberry juice',/cranberry/i],['tomato','Tomato juice',/tomato|clamato/i],
  ['simple','Simple/sugar',/simple|sugar/i],['honey','Honey',/honey/i],['orgeat','Orgeat',/orgeat/i],
  ['rasp','Raspberry syrup',/raspberry/i],['gren','Grenadine',/grenadine/i],
  ['mint','Fresh mint',/\bmint\b/i],['egg','Eggs',/\begg\b/i],['cream','Cream',/(?<!coconut )(?<!irish )(?<!ice )(?<!amarula )\bcream\b/i],['coco','Coconut cream',/coconut(?! rum)/i],
  ['soda','Soda water',/\bsoda\b/i],['tonic','Tonic',/tonic/i],['gb','Ginger beer',/ginger beer/i],
  /* 'ginger' itself: the Zero-proof station preset referenced this id and no
     row defined it: the preset silently stocked one item fewer than it
     claimed. The lookahead leaves beer and ale their own rows. */
  ['ginger','Fresh ginger / ginger syrup',/\bginger\b(?! beer| ale)/i],
  ['espresso','Espresso',/espresso/i],['hotcoffee','Hot coffee',/hot coffee/i],
  ['mezcal','Mezcal',/mezcal/i],['cynar','Cynar',/cynar/i],['averna','Averna',/averna/i],['suze','Suze/gentian',/suze|gentian/i],
  ['drambuie','Drambuie',/drambuie/i],['amaretto','Amaretto',/amaretto|noyaux/i],['icream','Irish cream',/irish cream/i],
  ['menthe','Crème de menthe',/menthe|branca menta/i],['galliano','Galliano',/galliano/i],['apricot','Apricot liqueur',/apricot/i],
  ['peach','Peach liqueur/brandy',/peach/i],['l43','Licor 43',/licor 43/i],['pimms',"Pimm's No. 1",/pimm/i],
  ['passion','Passion fruit',/passion fruit/i],['banana','Banana liqueur',/banana/i],['elder','St-Germain',/st-germain|elderflower/i],
  ['calvados','Calvados/applejack',/calvados|applejack|apple brandy/i],['allspice','Allspice dram',/allspice|pimento dram/i],
  ['falernum','Falernum',/falernum/i],['heering','Cherry liqueur',/cherry heering|cherry liqueur|blackberry liqueur/i],
  ['advocaat','Advocaat',/advocaat/i],['cassis','Crème de cassis',/cassis/i],['frangelico','Frangelico',/frangelico/i],
  ['grappa','Grappa/Sambuca',/grappa|sambuca/i],['limoncello','Limoncello',/limoncello/i],['port','Port',/\bport\b/i],
  ['beer','Lager/stout',/\blager\b|\bstout\b|\bbeer\b/i],['redwine','Red wine',/red wine/i],
  ['whitewine','White wine',/white wine|dry white|pipe\u00f1o/i],['cider','Hard cider',/\bcider\b/i],
  ['soju','Soju',/soju/i],['shochu','Shochu',/shochu/i],['oprum','Overproof rum',/151|overproof/i],
  ['cola','Cola',/\bcola\b/i],['maple','Maple syrup',/maple/i],['agave','Agave nectar',/agave/i],
  ['condmilk','Condensed milk',/condensed|evaporated milk/i],['dubonnet','Dubonnet',/dubonnet/i],
  ['picon','Amer Picon/amaro',/amer picon/i],['vanilla','Vanilla',/vanilla/i],['cinn','Cinnamon syrup',/cinnamon syrup/i],
  ['grapes','Grapes',/grapes/i],['basil','Fresh basil',/basil/i],['cuke','Cucumber',/cucumber/i],
  ['straw','Strawberries',/strawberr/i],['milk','Milk',/whole milk|hot milk|\d oz milk/i],
  ['icecream','Ice cream/sorbet',/ice cream|sorbet/i],['ga','Ginger ale',/ginger ale/i],
];
const WELL_PRESET = ['gin','vodka','wrum','bourbon','rye','teq','sv','dv','campari','ol','ango','ob','lemon','lime','simple','soda','tonic','gb','mint'];
const SHELF_PRESETS = [
  ['Classic well', WELL_PRESET],
  ['Starter home bar', ['gin','bourbon','wrum','teq','sv','ol','ango','lemon','lime','simple','soda','tonic','mint']],
  ['Craft cocktail bar', WELL_PRESET.concat(['arum','scotch','cognac','mezcal','irish','aperol','cynar','fernet','mara','chart','bene','abs','pey','elder','orgeat','honey','gfj','pine','cran','egg','cream','oj','sherry','champ','lillet','nonino','cassis','apricot','falernum','allspice','maple','agave','oprum'])],
  ['Tiki station', ['wrum','arum','oprum','teq','falernum','allspice','orgeat','ol','mara','abs','ango','lime','lemon','gfj','pine','oj','simple','honey','gren','coco','mint','cinn']],
  ['Zero-proof station', ['lemon','lime','gfj','oj','pine','cran','simple','honey','ginger','mint','soda','tonic','gb','ga','cola','tomato','coco','espresso','hotcoffee','cream','milk','agave','maple']],
];
function shelfLabel(id){ const e = SHELF.find(s => s[0]===id); return e ? e[1] : id; }
function reqsOf(c){
  if(c._reqs) return c._reqs;
  const txt = (c.spec||[]).filter(l => !/optional/i.test(l)).join(' ');
  let ids = SHELF.filter(([id,label,re]) => re.test(txt)).map(s => s[0]);
  if(/bourbon or rye/i.test(txt)){
    ids = ids.filter(i => i!=='bourbon' && i!=='rye');
    ids.push(['bourbon','rye']);
  }
  c._reqs = ids; return ids;
}
function missingFor(c){
  const shelf = state.tools.shelf;
  return reqsOf(c).filter(r => Array.isArray(r) ? !r.some(x => shelf.indexOf(x)>=0) : shelf.indexOf(r)<0);
}
/* 86 drill: one stocked ingredient dies. What dies with it, and what covers?
   Substitute = same family and same base spirit, still pourable on this shelf. */
function eightySixReport(key, pool){
  /* allDrinks() entries carry `group` where COCKTAILS carries `family` */
  const famOf = (d) => d.family || d.group || '';
  const flat = (d) => reqsOf(d).map(r => Array.isArray(r) ? r[0] : r);
  const needsIt = (d) => reqsOf(d).some(r => Array.isArray(r) ? r.indexOf(key)>=0 : r===key);
  const ready = pool.filter(d => missingFor(d).length===0);
  const lost = [], survivors = [];
  ready.forEach(d => (needsIt(d) ? lost : survivors).push(d));
  return {
    stillReady: survivors.length,
    lostCount: lost.length,          /* the true figure: `lost` below is capped for display */
    lost: lost.slice(0, 14).map(d => {
      /* closest survivor = most shared ingredients, with family and base as bonuses */
      const mine = flat(d);
      let best = null, bestScore = 1;
      survivors.forEach(s => {
        let score = flat(s).filter(x => mine.indexOf(x) >= 0).length;
        if(famOf(s) && famOf(s) === famOf(d)) score += 2;
        if(s.spirit && s.spirit === d.spirit) score += 1;
        if(score > bestScore){ bestScore = score; best = s; }
      });
      /* say what actually matched: the old copy asserted "same family, same base"
         on every row, which was false about a third of the time */
      let why = null;
      if(best){
        const bits = [];
        if(famOf(best) && famOf(best) === famOf(d)) bits.push('same family');
        if(best.spirit && best.spirit === d.spirit) bits.push('same base');
        const shared = flat(best).filter(x => mine.indexOf(x) >= 0).length;
        if(!bits.length && shared) bits.push(shared + ' shared ingredient' + (shared===1?'':'s'));
        why = bits.join(', ') || null;
      }
      return { name:d.name, family:famOf(d)||'-', spirit:d.spirit||'-', sub: best ? best.name : null, why:why };
    }),
  };
}

/* Which single unstocked ingredient would unlock the most new drinks? */
function bestNextBottles(pool){
  const shelf = state.tools.shelf;
  const tally = {};
  pool.forEach(function(c){
    const miss = missingFor(c);
    if(miss.length!==1) return;
    const m = miss[0];
    const key = Array.isArray(m) ? m[0] : m;
    if(!tally[key]) tally[key] = { id:key, n:0, drinks:[] };
    tally[key].n++;
    if(tally[key].drinks.length<6) tally[key].drinks.push(c.name);
  });
  return Object.keys(tally).map(function(k){ return tally[k]; })
    .sort(function(a,b){ return b.n-a.n; }).slice(0,6);
}

