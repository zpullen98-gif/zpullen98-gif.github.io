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
    /* The shared layer runs the same decision across every wing at once and
       writes what it decided. Where it refused, because two people own
       records on this device, this must not quietly overrule it. */
    if (localStorage.getItem('oot-personal-v1') === 'held') return;
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
   drink is judged: the families view, the library detail, and the Menu tab. One
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
  tools:{ view:'batch', drink:3, serv:8, dilute:false, shelf:[],
          convVal:1, convFrom:'oz', bottlePrice:30, bottleMl:750, targetPour:20, dilPct:25 },
  prep:{ cat:'Syrups', open:null, listOpen:null, safeOpen:null },
  svc:{ dom:'beer', rowOpen:null, refOpen:null },
  prod:{ cat:'All', open:null, primerOpen:null },
  practice:{ view:'drills', flightOpen:null, methodOpen:null, noteOpen:null, subjects:{}, timers:{}, rail:null },
  tast:{ cat:'Whiskey', label:'', appearance:null, nose:[], palate:{}, finish:null, notes:'' },
  /* The Menu tab. `view` is which of the three sub-views is showing;
     `pane` is which chip is open inside an expanded drink; `src` is what
     the stock report is measured against and defaults to the venue's own
     list, because that is the question a bartender on shift is asking.
     `drill` is the 86 exercise's transient pick, which is NOT tonight's
     86 list: that lives in progress.eightySix, because it is a fact about
     the bar rather than a training choice. */
  menu:{ view:'menu', form:null, editing:null, open:null, pane:null, src:'My Bar', drill:null, err:null },
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
/* ---- WHAT A BAR STOCKS -------------------------------------------------
   104 hand-written regexes stood here, and their failure was invisible: a
   line no pattern matched became a need the matcher could not see, and a
   need it could not see was a need that did not exist. A drink whose spirit
   was unreadable read as MAKEABLE. Measured before the change: 169 of 817
   spec lines matched nothing, and the Zero-proof station offered a Whiskey
   Highball.

   The vocabulary in js/data-ingredients.js replaced them. SHELF is derived
   from it now and is only the chip list: the third slot held the pattern,
   nothing reads it any more, and it stays null so the shape is unchanged
   and the absence is loud rather than silently undefined. */
const SHELF = INGREDIENTS.filter(function(x){ return x.shelf; })
                         .map(function(x){ return [x.id, x.label, null]; });
const WELL_PRESET = ['gin','vodka','wrum','bourbon','rye','teq','sv','dv','campari','ol','ango','ob','lemon','lime','simple','soda','tonic','gb','mint'];
/* Presets a working bar recognises. The 'Starter home bar' that stood
   second in this list is gone: the Menu tab is for a professional at
   their workplace, and a preset named for a home is the whole home
   bartending framing in five words. */
const SHELF_PRESETS = [
  ['Classic well', WELL_PRESET],
  ['Craft cocktail bar', WELL_PRESET.concat(['arum','scotch','cognac','mezcal','irish','aperol','cynar','fernet','mara','chart','bene','abs','pey','elder','orgeat','honey','gfj','pine','cran','egg','cream','oj','sherry','champ','lillet','nonino','cassis','apricot','falernum','allspice','maple','agave','oprum'])],
  ['Tiki station', ['wrum','arum','oprum','teq','falernum','allspice','orgeat','ol','mara','abs','ango','lime','lemon','gfj','pine','oj','simple','honey','gren','coco','mint','cinn']],
  ['Zero-proof station', ['lemon','lime','gfj','oj','pine','cran','simple','honey','ginger','mint','soda','tonic','gb','ga','cola','tomato','coco','espresso','brewedcoffee','cream','milk','agave','maple']],
];
/* A requirement the ledger could not read is shown as what it is, rather
   than as a bare id nobody can act on. */
function shelfLabel(id){
  if(typeof id === 'string' && id.charAt(0)==='?') return 'Unrecognised: ' + id.slice(1);
  return (ING[id] && ING[id].label) || id;
}
/* What a drink needs, per line and per ingredient.

   It used to join every spec line into one blob and test 104 patterns
   against it, which made three separate mistakes at once: an "optional"
   anywhere dropped the WHOLE line, so "1/2 oz lime (optional)" removed
   lime even when another line needed it; a compound line was never split;
   and an unreadable line was silent.

   THE SENTINEL IS THE POINT. An ingredient the vocabulary cannot read
   becomes '?' + the text, which is on nobody's shelf and therefore makes
   the drink unmakeable. Failing closed is the whole inversion: the ledger
   would rather say it does not know than say yes.

   The memo is non-enumerable because a My Bar record is JSON.stringify-ed
   into localStorage by saveProgress, and a memo baked into a saved record
   would outlive the vocabulary that produced it. */
function reqsOf(c){
  if(c._reqs) return c._reqs;
  const seen = {}, out = [];
  (c.spec||[]).forEach(function(line){
    specRefs(line).forEach(function(r){
      if(r.role !== 'ingredient' || r.optional) return;
      if(r.anyOf){
        const ids = r.anyOf.filter(function(x){ return !ING[x] || ING[x].stock !== false; });
        if(!ids.length) return;
        const k = 'any:' + ids.slice().sort().join('|');
        if(!seen[k]){ seen[k] = 1; out.push(ids); }
        return;
      }
      if(!r.id){ const k = '?' + r.text; if(!seen[k]){ seen[k] = 1; out.push(k); } return; }
      if(ING[r.id] && ING[r.id].stock === false) return;
      if(!seen[r.id]){ seen[r.id] = 1; out.push(r.id); }
    });
  });
  try { Object.defineProperty(c, '_reqs', { value: out, enumerable: false, configurable: true }); }
  catch(e){ c._reqs = out; }
  return out;
}
/* @param shelf optional. Defaults to what is stocked, so every existing
   one-argument call site is unchanged; eightySixReport passes a shelf with
   one bottle removed, which is the only honest way to ask what dies. */
function missingFor(c, shelf){
  shelf = shelf || state.tools.shelf;
  const have = function(id){ return stockSatisfies(shelf, id); };
  return reqsOf(c).filter(function(r){
    return Array.isArray(r) ? !r.some(have) : !have(r);
  });
}
/* ---- WHAT IS OUT TONIGHT ------------------------------------------------
   86 is a different sentence from missing, and the difference matters on a
   Friday. Missing means the bar never carried it. 86 means it was there at
   six and it is gone at ten, and the drink comes off the board until the
   delivery. So they are separate fields and they read differently on screen.

   The implementation is deliberately one function rather than two matchers:
   take the 86'd bottles off the shelf and ask missingFor the same question.
   That makes the either-or case correct for free, and it is the case that
   catches people out: a drink calling for bourbon or rye is not 86'd when the
   rye dies, only when the live shelf answers neither. A second matcher would
   have had to rediscover that, and would have got it wrong. */
function liveShelf(shelf){
  shelf = shelf || state.tools.shelf;
  const out = progress.eightySix || [];
  return out.length ? shelf.filter(function(k){ return out.indexOf(k) < 0; }) : shelf;
}
/* Un-stocking a bottle must drop it from the 86 list. They are separate
   fields on purpose, and separate fields drift: a bottle the bar no longer
   carries at all cannot also be 86'd tonight, and leaving it there would
   print '86: no rye' next to a drink that was never makeable. Called from
   every act that changes the stock list. */
function dropDeadEightySix(){
  const out = progress.eightySix;
  if(!out || !out.length) return;
  const kept = out.filter(function(k){ return state.tools.shelf.indexOf(k) >= 0; });
  if(kept.length !== out.length){ progress.eightySix = kept; progress.eightySixAt = Date.now(); }
}

/* A requirement is either an id or an array of alternatives, and both shapes
   need one stable key to compare by and one readable label to print. */
function reqKey(r){ return Array.isArray(r) ? r.join('|') : r; }
function reqLabel(r){
  return Array.isArray(r) ? r.map(shelfLabel).join(' or ') : shelfLabel(r);
}
/* What a drink is short of because a bottle died tonight, rather than because
   the bar never stocked it. Subtracting what was already missing is what keeps
   the two sentences apart: a drink the bar cannot make anyway is not 86'd. */
function outFor(c){
  if(!(progress.eightySix || []).length) return [];
  const before = missingFor(c).map(reqKey);
  return missingFor(c, liveShelf()).filter(function(r){ return before.indexOf(reqKey(r)) < 0; });
}

/* Nearest relative in a pool: most shared ingredients, with family and base as
   bonuses. Extracted from eightySixReport so the Menu tab's canon comparison
   scores kinship on the same scale the 86 drill does. Two scales would drift,
   and the one the user saw second would look wrong.

   Sentinels are dropped: two drinks sharing 'the ledger cannot read this' do
   not share an ingredient and must not score as though they did. */
function kinFlat(d){
  return reqsOf(d).map(function(r){ return Array.isArray(r) ? r[0] : r; })
                  .filter(function(x){ return String(x).charAt(0) !== '?'; });
}
function kinFamily(d){ return d.family || d.group || ''; }
function nearestKin(d, pool){
  const mine = kinFlat(d);
  let best = null, bestScore = 1;
  pool.forEach(function(s){
    if(s === d || s.name === d.name) return;
    let score = kinFlat(s).filter(function(x){ return mine.indexOf(x) >= 0; }).length;
    if(kinFamily(s) && kinFamily(s) === kinFamily(d)) score += 2;
    if(s.spirit && s.spirit === d.spirit) score += 1;
    if(score > bestScore){ bestScore = score; best = s; }
  });
  /* say what actually matched: copy that asserts 'same family, same base' on
     every row is false about a third of the time, and a reader who checks once
     stops trusting the rest of the pane. */
  let why = null;
  if(best){
    const bits = [];
    if(kinFamily(best) && kinFamily(best) === kinFamily(d)) bits.push('same family');
    if(best.spirit && best.spirit === d.spirit) bits.push('same base');
    const shared = kinFlat(best).filter(function(x){ return mine.indexOf(x) >= 0; }).length;
    if(!bits.length && shared) bits.push(shared + ' shared ingredient' + (shared===1?'':'s'));
    why = bits.join(', ') || null;
  }
  return { match: best, why: why, score: best ? bestScore : 0 };
}
/* 86 drill: one stocked ingredient dies, and the trainee has to say what died
   with it before reading the answer. A training exercise, so it takes the
   bottle as an argument rather than reading tonight's 86 list.

   It asks the real question rather than 'does this drink list the bottle'.
   Under the vocabulary a drink asking for gin may have been satisfied by the
   Old Tom, so losing the Old Tom loses the drink even though it never named
   it. Re-running the match against the shelf minus one bottle is the only
   version of this that is true, and it is simpler than what it replaced. */
function eightySixReport(key, pool){
  const ready = pool.filter(function(d){ return missingFor(d).length===0; });
  const without = (state.tools.shelf||[]).filter(function(x){ return x !== key; });
  const lost = [], survivors = [];
  ready.forEach(function(d){ (missingFor(d, without).length ? lost : survivors).push(d); });
  return {
    stillReady: survivors.length,
    lostCount: lost.length,          /* the true figure: `lost` below is capped for display */
    lost: lost.slice(0, 14).map(function(d){
      const kin = nearestKin(d, survivors);
      return { name:d.name, family:kinFamily(d)||'Other', spirit:d.spirit||'Other',
               sub: kin.match ? kin.match.name : null, why: kin.why };
    }),
  };
}
/* Which single unstocked ingredient would unlock the most new drinks? */
function bestNextBottles(pool){
  const tally = {};
  pool.forEach(function(c){
    const miss = missingFor(c);
    if(miss.length!==1) return;
    const m = miss[0];
    /* For an either/or, name the most GENERIC member: the answer to 'what
       should I buy' is orange liqueur, not Cointreau. Shortest is-a chain
       wins, because a child always carries its parents behind it. */
    let key = Array.isArray(m)
      ? m.slice().sort(function(a,b){ return isaChain(a).length - isaChain(b).length; })[0]
      : m;
    /* You cannot buy a bottle of something the ledger could not read. */
    if(String(key).charAt(0) === '?') return;
    if(!tally[key]) tally[key] = { id:key, n:0, drinks:[] };
    tally[key].n++;
    if(tally[key].drinks.length<6) tally[key].drinks.push(c.name);
  });
  return Object.keys(tally).map(function(k){ return tally[k]; })
    .sort(function(a,b){ return b.n-a.n; }).slice(0,6);
}

