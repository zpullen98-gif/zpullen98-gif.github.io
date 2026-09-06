/* ---------------- THE INGREDIENT VOCABULARY ----------------

   What a bottle is called, what it is a kind of, and every way the ledger's
   own specs spell it. This is the table the stock matcher reads.

   IT REPLACES 104 REGEXES, and the reason is worth writing down, because the
   regexes worked for years and their failure was invisible.

   Measured on the shipped data before this file existed: 817 distinct spec
   lines across 525 drinks, of which 169 matched no shelf row at all. 112 of
   those carried a real measured volume, across 109 drinks. A drink whose
   spirit line matched nothing was not "unknown", it was MAKEABLE: the matcher
   only asked what a drink needs, so a need it could not see was a need that
   did not exist. The Zero-proof station preset, a shelf with no alcohol on it,
   offered a Hot Toddy, a Whiskey Highball, a Whiskey Ginger, a Ti' Punch, a
   Chuflay, a Midori Sour and a Clarified Milk Punch. Bare "2 oz whiskey" and
   "2 oz brandy" matched nothing at all.

   The other direction leaked too, and more quietly. "ginger beer" matched the
   ginger beer row AND the beer row, so a Mule demanded a lager. "lemon-lime
   soda" matched lemons AND limes AND soda, so a Tequila Slammer demanded fresh
   citrus. "sparkling lemonade" was a champagne. "sugar cube" was simple syrup.

   ALIASES ARE SURFACE STRINGS, NEVER PATTERNS. A fragment resolves to the row
   carrying the LONGEST alias that matches it, which is what kills the whole
   class: "sparkling lemonade" is a longer phrase than "lemonade" and longer
   than "lemon", so it wins on length rather than on the order rows happen to
   sit in. There is no ordering dependency here to get wrong later.

   PARENT MEANS IS-A, AND IT IS NOT SYMMETRIC. `parent` says pouring this
   satisfies a call for that: stock Old Tom, and a drink asking for gin is
   satisfied, because Old Tom is gin. That direction is entailment and is
   always on. The other direction, stock the generic and satisfy a call for the
   specific, is a judgement about whether the DRINK SURVIVES, so it is off by
   default and switched on per row with `up:true`. Orange liqueur covers a call
   for Cointreau. It does not cover a call for blue curacao, because a blue
   Sidecar is not a Sidecar. Rum does not cover rhum agricole, because a Ti'
   Punch made with Bacardi is a different drink.

   The asymmetry is deliberate and it is about who pays. This screen tells a
   bartender mid-service that they can make something. A false yes sends them
   to build a drink they cannot finish with a guest at the rail. A false no
   costs them one drink they would have found anyway. Default to the cheap
   failure.

   `stock:false` is for things every bar has and nobody stocks as a decision:
   ice, water, salt, pepper. They resolve, so the gate can tell "this is salt"
   apart from "the ledger has no idea what this is", but they are never a
   requirement and never a chip.

   THE IDS ARE THE OLD IDS. Roughly ninety of the original 104 survive
   unchanged, which is not laziness: `progress.shelf` holds them, so reusing
   them IS the migration, and the twelve that had to split are listed in
   SHELF_ID_MIGRATION below. Never rename one without a clause there.
   ---------------- */

const INGREDIENTS = [

	/* The root every base spirit hangs from. Not a chip: nobody stocks
	   "spirit". It exists so that "4 oz spirit of choice" is a REQUIREMENT,
	   answered by any bottle underneath it. Marking it stock:false instead was
	   this file's own version of the bug it was written to kill: a Clarified
	   Milk Punch came out makeable on a shelf with no alcohol on it. */
	{ id: 'spirit', label: 'Any spirit', kind: 'spirit', abv: 0.4, bal: 'strong',
	  alias: ['spirit of choice', 'spirit', 'base spirit'] },

	/* ---- whiskey ----------------------------------------------------------
	   `whiskey` is a parent and NOT a chip. Nobody stocks "whiskey"; they stock
	   bourbon and rye. But 8 spec lines ask for it plainly, and every one of
	   them is satisfied by any bottle underneath. That is the whole reason a
	   parent relation exists in this file. */
	{ id: 'whiskey', label: 'Whiskey', kind: 'spirit', parent: 'spirit',
	  alias: ['whiskey', 'whisky'] },
	{ id: 'bourbon', label: 'Bourbon', kind: 'spirit', abv: 0.43, shelf: true, parent: 'whiskey',
	  alias: ['bourbon', 'bacon fat-washed bourbon', 'high-rye bourbon'] },
	{ id: 'rye', label: 'Rye', kind: 'spirit', abv: 0.45, shelf: true, parent: 'whiskey',
	  alias: ['rye', 'rye whiskey', 'canadian rye'] },
	{ id: 'scotch', label: 'Scotch', kind: 'spirit', shelf: true, parent: 'whiskey',
	  alias: ['scotch', 'blended scotch', 'blended scotch whisky'] },
	/* CHIPS, not up:true. If a bar stocks ordinary scotch it cannot make a Blue
	   Blazer, which is set on fire and depends on the proof to light: standing a
	   40% bottle in for a 58% one is a false yes, and a false yes sends somebody
	   to build a drink they cannot finish mid service.

	   Bottled at cask strength, and the canon pours them by volume: the Blue
	   Blazer takes 2 oz and the Blue Blazer Shot 1.5 oz. Without these rows
	   both inherited their parent's 40% and the ledger understated a 58% pour
	   by nearly a third, in the one drink that is set on fire. */
	{ id: 'caskscotch', label: 'Cask-strength scotch', kind: 'spirit', shelf: true, parent: 'scotch', abv: 0.58,
	  alias: ['cask-strength scotch', 'cask strength scotch'] },
	{ id: 'caskbourbon', label: 'Cask-proof bourbon', kind: 'spirit', shelf: true, parent: 'bourbon', abv: 0.62,
	  alias: ['cask-proof bourbon', 'barrel-proof bourbon', 'cask-strength bourbon'] },
	{ id: 'islay', label: 'Islay scotch', kind: 'spirit', abv: 0.43, shelf: true, parent: 'scotch',
	  alias: ['islay scotch', 'islay single malt', 'peated scotch', 'smoky islay scotch'] },
	{ id: 'irish', label: 'Irish whiskey', kind: 'spirit', shelf: true, parent: 'whiskey',
	  alias: ['irish whiskey'] },
	{ id: 'canadian', label: 'Canadian whisky', kind: 'spirit', shelf: true, parent: 'whiskey',
	  alias: ['canadian whisky', 'canadian whiskey'] },
	{ id: 'tennessee', label: 'Tennessee whiskey', kind: 'spirit', shelf: true, parent: 'whiskey',
	  alias: ['tennessee whiskey'] },
	{ id: 'cinnwhisky', label: 'Cinnamon whisky', kind: 'liqueur', abv: 0.35, bal: 'sweet', shelf: true,
	  alias: ['cinnamon whisky', 'cinnamon whiskey'] },

	/* ---- rum --------------------------------------------------------------
	   Rum was spelled 23 ways across 49 lines. `rum` is the parent; the named
	   styles carry up:true where a bar would happily pour the generic, and
	   withhold it where the style IS the drink. */
	{ id: 'rum', label: 'Rum', kind: 'spirit', parent: 'spirit', alias: ['rum'] },
	{ id: 'wrum', label: 'White rum', kind: 'spirit', shelf: true, parent: 'rum',
	  alias: ['white rum', 'light rum', 'silver rum', 'aguardiente'] },
	{ id: 'arum', label: 'Aged/dark rum', kind: 'spirit', shelf: true, parent: 'rum',
	  alias: ['aged rum', 'dark rum', 'gold rum', 'anejo rum', 'añejo rum',
	          'demerara rum', 'gold demerara rum', 'jamaican rum', 'dark jamaican rum',
	          'aged jamaican rum', 'jamaican pot-still rum', 'barbados rum',
	          'gold puerto rican rum', 'blackstrap rum', 'puerto rican rum'] },
	{ id: 'oprum', label: 'Overproof rum', kind: 'spirit', abv: 0.755, shelf: true, parent: 'rum',
	  alias: ['overproof rum', '151 demerara rum', '151 rum', 'overproof jamaican rum',
	          'jamaican overproof rum', '151'] },
	{ id: 'crum', label: 'Coconut rum', kind: 'liqueur', abv: 0.21, bal: 'sweet', shelf: true,
	  alias: ['coconut rum'] },
	{ id: 'spicedrum', label: 'Spiced rum', kind: 'spirit', shelf: true, parent: 'rum',
	  alias: ['spiced rum'] },
	/* No up:true. A Ti' Punch made with white rum is a different drink, which
	   is the whole reason the ledger carries agricole as its own line. */
	{ id: 'agricole', label: 'Rhum agricole', kind: 'spirit', abv: 0.5, shelf: true, parent: 'rum',
	  alias: ['rhum agricole', 'rhum agricole blanc', 'aged rhum agricole', 'agricole'] },
	{ id: 'cachaca', label: 'Cachaça', kind: 'spirit', shelf: true, parent: 'spirit',
	  alias: ['cachaça', 'cachaca'] },

	/* ---- gin --------------------------------------------------------------
	   Sloe gin is deliberately NOT a child of gin. It is a sweet red liqueur at
	   26%, and a Martini made with it is not a dry Martini, it is a mistake. */
	{ id: 'gin', label: 'Gin', kind: 'spirit', abv: 0.44, shelf: true, parent: 'spirit',
	  alias: ['gin', 'dry gin', 'london dry gin', 'london dry'] },
	{ id: 'oldtom', label: 'Old Tom gin', kind: 'spirit', shelf: true, parent: 'gin',
	  alias: ['old tom gin', 'old tom'] },
	{ id: 'genever', label: 'Genever', kind: 'spirit', parent: 'gin',
	  alias: ['genever', 'jenever'] },
	{ id: 'sloegin', label: 'Sloe gin', kind: 'liqueur', abv: 0.26, bal: 'sweet', shelf: true,
	  alias: ['sloe gin'] },

	/* ---- vodka ------------------------------------------------------------ */
	{ id: 'vodka', label: 'Vodka', kind: 'spirit', shelf: true, parent: 'spirit',
	  alias: ['vodka', 'bison grass vodka', 'wheat vodka', 'potato vodka'] },
	{ id: 'citronvodka', label: 'Citrus vodka', kind: 'spirit', parent: 'vodka', up: true,
	  alias: ['citron vodka', 'citrus vodka', 'lemon vodka'] },
	{ id: 'vanillavodka', label: 'Vanilla vodka', kind: 'spirit', parent: 'vodka', up: true,
	  alias: ['vanilla vodka'] },
	{ id: 'raspvodka', label: 'Raspberry vodka', kind: 'spirit', parent: 'vodka', up: true,
	  alias: ['raspberry vodka'] },

	/* ---- agave ------------------------------------------------------------ */
	{ id: 'teq', label: 'Tequila', kind: 'spirit', shelf: true, parent: 'spirit',
	  alias: ['tequila'] },
	{ id: 'blanco', label: 'Blanco tequila', kind: 'spirit', parent: 'teq', up: true,
	  alias: ['blanco tequila', 'silver tequila'] },
	{ id: 'repo', label: 'Reposado tequila', kind: 'spirit', parent: 'teq', up: true,
	  alias: ['reposado tequila', 'reposado'] },
	{ id: 'anejoteq', label: 'Añejo tequila', kind: 'spirit', parent: 'teq', up: true,
	  alias: ['añejo tequila', 'anejo tequila'] },
	{ id: 'mezcal', label: 'Mezcal', kind: 'spirit', abv: 0.45, shelf: true, parent: 'spirit',
	  alias: ['mezcal'] },

	/* ---- brandy -----------------------------------------------------------
	   `brandy` is both a chip and a parent: 6 lines ask for it plainly and a
	   bar does stock a well brandy. */
	{ id: 'brandy', label: 'Brandy', kind: 'spirit', shelf: true, parent: 'spirit',
	  alias: ['brandy'] },
	{ id: 'cognac', label: 'Cognac', kind: 'spirit', shelf: true, parent: 'brandy', up: true,
	  alias: ['cognac', 'vs cognac', 'vsop cognac'] },
	{ id: 'calvados', label: 'Calvados / applejack', kind: 'spirit', shelf: true, parent: 'brandy',
	  alias: ['calvados', 'applejack', 'apple brandy'] },
	{ id: 'pisco', label: 'Pisco', kind: 'spirit', shelf: true, parent: 'brandy',
	  alias: ['pisco'] },
	{ id: 'singani', label: 'Singani', kind: 'spirit', shelf: true, parent: 'brandy',
	  alias: ['singani'] },
	{ id: 'grappa', label: 'Grappa', kind: 'spirit', shelf: true, parent: 'brandy',
	  alias: ['grappa'] },
	{ id: 'blackberrybrandy', label: 'Blackberry brandy', kind: 'liqueur', abv: 0.35, bal: 'sweet', shelf: true,
	  alias: ['blackberry brandy'] },

	/* ---- other bases ------------------------------------------------------ */
	{ id: 'soju', label: 'Soju', kind: 'spirit', abv: 0.17, bal: 'strong', shelf: true, alias: ['soju'] },
	{ id: 'shochu', label: 'Shochu', kind: 'spirit', abv: 0.25, bal: 'strong', shelf: true, alias: ['shochu'] },
	{ id: 'sake', label: 'Sake', kind: 'wine', abv: 0.16, bal: 'modifier', shelf: true, alias: ['sake'] },
	{ id: 'abs', label: 'Absinthe', kind: 'spirit', abv: 0.62, bal: 'strong', shelf: true,
	  alias: ['absinthe', 'absinthe rinse'] },
	{ id: 'pastis', label: 'Pastis / anisette', kind: 'spirit', abv: 0.45, bal: 'strong', shelf: true,
	  alias: ['pastis', 'anisette'] },
	{ id: 'sambuca', label: 'Sambuca', kind: 'liqueur', abv: 0.4, bal: 'sweet', shelf: true, alias: ['sambuca'] },
	{ id: 'malort', label: 'Malört', kind: 'liqueur', abv: 0.35, bal: 'modifier', shelf: true,
	  alias: ['malört', "jeppson's malört", 'malort'] },
	{ id: 'jager', label: 'Jägermeister', kind: 'liqueur', abv: 0.35, bal: 'modifier', shelf: true,
	  alias: ['jägermeister', 'jagermeister', 'jager'] },
	{ id: 'yukon', label: 'Yukon Jack', kind: 'liqueur', abv: 0.5, bal: 'sweet', shelf: true, alias: ['yukon jack'] },
	{ id: 'socomfort', label: 'Southern Comfort', kind: 'liqueur', abv: 0.35, bal: 'sweet', shelf: true,
	  alias: ['southern comfort'] },

	/* ---- orange liqueur ---------------------------------------------------
	   Six ways to say one shelf slot. `triple sec` is an alias of the GENERIC
	   because the canon uses it loosely; Cointreau is its own row because the
	   canon names it when it means it. That distinction is the single most
	   useful thing a surface-string table can do that a pattern cannot. */
	{ id: 'ol', label: 'Orange liqueur', kind: 'liqueur', abv: 0.35, bal: 'sweet', shelf: true,
	  alias: ['orange liqueur', 'triple sec', 'orange curacao', 'orange curaçao',
	          'curacao', 'curaçao', 'dry curacao'] },
	{ id: 'cointreau', label: 'Cointreau', kind: 'liqueur', abv: 0.4, parent: 'ol', up: true,
	  alias: ['cointreau'] },
	{ id: 'gmarnier', label: 'Grand Marnier', kind: 'liqueur', abv: 0.4, parent: 'ol', up: true,
	  alias: ['grand marnier'] },
	/* No up:true: a blue Sidecar is not a Sidecar. */
	{ id: 'bluecuracao', label: 'Blue curaçao', kind: 'liqueur', abv: 0.25, shelf: true, parent: 'ol',
	  alias: ['blue curacao', 'blue curaçao'] },
	{ id: 'orangecordial', label: 'Orange cordial', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['orange cordial'] },

	/* ---- amari and bitter liqueurs ---------------------------------------- */
	{ id: 'amaro', label: 'Amaro', kind: 'liqueur', abv: 0.3, bal: 'modifier', alias: ['amaro', 'bitter amaro'] },
	{ id: 'campari', label: 'Campari', kind: 'liqueur', abv: 0.24, shelf: true, parent: 'amaro',
	  alias: ['campari'] },
	{ id: 'aperol', label: 'Aperol', kind: 'liqueur', abv: 0.11, shelf: true, parent: 'amaro',
	  alias: ['aperol'] },
	{ id: 'nonino', label: 'Amaro Nonino', kind: 'liqueur', abv: 0.35, shelf: true, parent: 'amaro', up: true,
	  alias: ['amaro nonino', 'nonino'] },
	{ id: 'fernet', label: 'Fernet-Branca', kind: 'liqueur', abv: 0.39, shelf: true, parent: 'amaro',
	  alias: ['fernet-branca', 'fernet'] },
	{ id: 'brancamenta', label: 'Branca Menta', kind: 'liqueur', abv: 0.28, shelf: true, parent: 'amaro',
	  alias: ['branca menta'] },
	{ id: 'cynar', label: 'Cynar', kind: 'liqueur', abv: 0.17, shelf: true, parent: 'amaro',
	  alias: ['cynar'] },
	{ id: 'averna', label: 'Averna', kind: 'liqueur', abv: 0.29, shelf: true, parent: 'amaro', up: true,
	  alias: ['averna', 'amaro averna'] },
	{ id: 'montenegro', label: 'Amaro Montenegro', kind: 'liqueur', abv: 0.23, parent: 'amaro', up: true,
	  alias: ['amaro montenegro', 'montenegro'] },
	{ id: 'picon', label: 'Amer Picon', kind: 'liqueur', abv: 0.39, shelf: true, parent: 'amaro',
	  alias: ['amer picon', 'picon'] },
	{ id: 'suze', label: 'Suze', kind: 'liqueur', abv: 0.2, bal: 'modifier', shelf: true, alias: ['suze'] },
	{ id: 'gentian', label: 'Gentian liqueur', kind: 'liqueur', abv: 0.2, bal: 'modifier', shelf: true,
	  alias: ['gentian liqueur', 'gentian'] },
	{ id: 'chart', label: 'Chartreuse', kind: 'liqueur', abv: 0.55, bal: 'sweet', shelf: true,
	  alias: ['chartreuse', 'green chartreuse', 'yellow chartreuse'] },
	{ id: 'bene', label: 'Bénédictine', kind: 'liqueur', abv: 0.4, bal: 'sweet', shelf: true,
	  alias: ['bénédictine', 'benedictine'] },
	{ id: 'drambuie', label: 'Drambuie', kind: 'liqueur', abv: 0.4, bal: 'sweet', shelf: true, alias: ['drambuie'] },
	{ id: 'galliano', label: 'Galliano', kind: 'liqueur', abv: 0.42, bal: 'sweet', shelf: true, alias: ['galliano'] },
	{ id: 'l43', label: 'Licor 43', kind: 'liqueur', abv: 0.31, bal: 'sweet', shelf: true, alias: ['licor 43'] },
	{ id: 'pimms', label: "Pimm's No. 1", kind: 'liqueur', abv: 0.25, bal: 'sweet', shelf: true,
	  alias: ["pimm's no. 1", "pimm's", 'pimms'] },

	/* ---- fruit, nut and cream liqueurs ------------------------------------ */
	{ id: 'mara', label: 'Maraschino', kind: 'liqueur', abv: 0.32, bal: 'sweet', shelf: true,
	  alias: ['maraschino', 'maraschino liqueur'] },
	{ id: 'viol', label: 'Crème de violette', kind: 'liqueur', abv: 0.22, bal: 'sweet', shelf: true,
	  alias: ['crème de violette', 'creme de violette', 'violette'] },
	{ id: 'cacao', label: 'Crème de cacao', kind: 'liqueur', abv: 0.25, bal: 'sweet', shelf: true,
	  alias: ['crème de cacao', 'creme de cacao', 'chocolate liqueur', 'white crème de cacao'] },
	{ id: 'mure', label: 'Crème de mûre', kind: 'liqueur', abv: 0.18, bal: 'sweet', shelf: true,
	  alias: ['crème de mûre', 'creme de mure', 'crème de mûre drizzle'] },
	{ id: 'cassis', label: 'Crème de cassis', kind: 'liqueur', abv: 0.2, bal: 'sweet', shelf: true,
	  alias: ['crème de cassis', 'creme de cassis', 'cassis'] },
	{ id: 'menthe', label: 'Crème de menthe', kind: 'liqueur', abv: 0.24, bal: 'sweet', shelf: true,
	  alias: ['crème de menthe', 'creme de menthe', 'white crème de menthe'] },
	{ id: 'coffee', label: 'Coffee liqueur', kind: 'liqueur', abv: 0.22, bal: 'sweet', shelf: true,
	  alias: ['coffee liqueur'] },
	{ id: 'amaretto', label: 'Amaretto', kind: 'liqueur', abv: 0.28, bal: 'sweet', shelf: true,
	  alias: ['amaretto', 'crème de noyaux', 'creme de noyaux', 'noyaux'] },
	{ id: 'frangelico', label: 'Frangelico', kind: 'liqueur', abv: 0.2, bal: 'sweet', shelf: true,
	  alias: ['frangelico', 'hazelnut liqueur'] },
	{ id: 'icream', label: 'Irish cream', kind: 'liqueur', abv: 0.17, bal: 'sweet', shelf: true,
	  alias: ['irish cream'] },
	/* 'horchata cream liqueur' was resolving to plain dairy cream, because
	   nothing longer than 'cream' claimed it. RumChata is 13.75%. */
	{ id: 'horchataliq', label: 'Horchata cream liqueur', kind: 'liqueur', abv: 0.1375, bal: 'sweet', shelf: true,
	  alias: ['horchata cream liqueur', 'rumchata', 'horchata liqueur'] },
	{ id: 'amarula', label: 'Amarula cream', kind: 'liqueur', abv: 0.17, bal: 'sweet', shelf: true,
	  alias: ['amarula cream', 'amarula'] },
	{ id: 'advocaat', label: 'Advocaat', kind: 'liqueur', abv: 0.17, bal: 'sweet', shelf: true, alias: ['advocaat'] },
	{ id: 'apricot', label: 'Apricot liqueur', kind: 'liqueur', abv: 0.25, bal: 'sweet', shelf: true,
	  alias: ['apricot liqueur', 'apricot brandy'] },
	{ id: 'peach', label: 'Peach liqueur', kind: 'liqueur', abv: 0.2, bal: 'sweet', shelf: true,
	  alias: ['peach liqueur', 'peach brandy', 'peach schnapps'] },
	{ id: 'banana', label: 'Banana liqueur', kind: 'liqueur', abv: 0.25, bal: 'sweet', shelf: true,
	  alias: ['banana liqueur', 'crème de banane', 'creme de banane'] },
	{ id: 'elder', label: 'St-Germain', kind: 'liqueur', abv: 0.2, bal: 'sweet', shelf: true,
	  alias: ['st-germain', 'elderflower liqueur', 'elderflower'] },
	{ id: 'heering', label: 'Cherry liqueur', kind: 'liqueur', abv: 0.24, bal: 'sweet', shelf: true,
	  alias: ['cherry heering', 'cherry liqueur'] },
	{ id: 'blackberryliq', label: 'Blackberry liqueur', kind: 'liqueur', abv: 0.17, bal: 'sweet', shelf: true,
	  alias: ['blackberry liqueur', 'chambord'] },
	{ id: 'melon', label: 'Melon liqueur', kind: 'liqueur', abv: 0.2, bal: 'sweet', shelf: true,
	  alias: ['melon liqueur', 'midori'] },
	{ id: 'watermelonliq', label: 'Watermelon liqueur', kind: 'liqueur', abv: 0.2, bal: 'sweet', shelf: true,
	  alias: ['watermelon liqueur'] },
	{ id: 'lychee', label: 'Lychee liqueur', kind: 'liqueur', abv: 0.2, bal: 'sweet', shelf: true,
	  alias: ['lychee liqueur'] },
	{ id: 'limoncello', label: 'Limoncello', kind: 'liqueur', abv: 0.3, bal: 'sweet', shelf: true, alias: ['limoncello'] },
	{ id: 'allspice', label: 'Allspice dram', kind: 'liqueur', abv: 0.22, bal: 'sweet', shelf: true,
	  alias: ['allspice dram', 'pimento dram'] },
	{ id: 'falernum', label: 'Falernum', kind: 'liqueur', abv: 0.11, bal: 'sweet', shelf: true, alias: ['falernum'] },
	{ id: 'passion', label: 'Passion fruit liqueur', kind: 'liqueur', abv: 0.2, bal: 'sweet', shelf: true,
	  alias: ['passion fruit liqueur'] },
	{ id: 'appleschnapps', label: 'Apple schnapps', kind: 'liqueur', abv: 0.2, bal: 'sweet', shelf: true,
	  alias: ['apple schnapps', 'sour apple schnapps'] },
	{ id: 'butterscotch', label: 'Butterscotch schnapps', kind: 'liqueur', abv: 0.15, bal: 'sweet', shelf: true,
	  alias: ['butterscotch schnapps'] },
	{ id: 'peppermintschnapps', label: 'Peppermint schnapps', kind: 'liqueur', abv: 0.5, bal: 'sweet', shelf: true,
	  alias: ['peppermint schnapps'] },
	{ id: 'cinnschnapps', label: 'Cinnamon schnapps', kind: 'liqueur', abv: 0.435, bal: 'sweet', shelf: true,
	  alias: ['cinnamon schnapps'] },

	/* ---- fortified and aromatised ----------------------------------------- */
	{ id: 'sv', label: 'Sweet vermouth', kind: 'fortified', abv: 0.16, bal: 'modifier', shelf: true,
	  alias: ['sweet vermouth', 'red vermouth', 'rosso vermouth', 'punt e mes'] },
	{ id: 'dv', label: 'Dry vermouth', kind: 'fortified', abv: 0.18, bal: 'modifier', shelf: true,
	  alias: ['dry vermouth', 'blanc vermouth', 'bianco vermouth', 'vermouth rinse'] },
	{ id: 'lillet', label: 'Lillet blanc', kind: 'fortified', abv: 0.17, bal: 'modifier', shelf: true,
	  alias: ['lillet blanc', 'lillet'] },
	{ id: 'dubonnet', label: 'Dubonnet', kind: 'fortified', abv: 0.19, bal: 'modifier', shelf: true,
	  alias: ['dubonnet rouge', 'dubonnet'] },
	{ id: 'sherry', label: 'Sherry', kind: 'fortified', abv: 0.17, bal: 'modifier', shelf: true,
	  alias: ['sherry', 'amontillado sherry', 'fino sherry', 'oloroso sherry',
	          'manzanilla sherry', 'px sherry', 'pedro ximénez'] },
	{ id: 'port', label: 'Port', kind: 'fortified', abv: 0.2, bal: 'modifier', shelf: true,
	  alias: ['port', 'ruby port', 'tawny port'] },

	/* ---- wine, beer, cider ------------------------------------------------ */
	{ id: 'champ', label: 'Sparkling wine', kind: 'wine', abv: 0.12, bal: 'long', shelf: true,
	  alias: ['sparkling wine', 'champagne', 'prosecco', 'cava'] },
	{ id: 'redwine', label: 'Red wine', kind: 'wine', abv: 0.135, bal: 'modifier', shelf: true,
	  alias: ['red wine', 'dry red wine'] },
	{ id: 'whitewine', label: 'White wine', kind: 'wine', abv: 0.125, bal: 'modifier', shelf: true,
	  alias: ['white wine', 'dry white wine', 'dry white'] },
	{ id: 'pipeno', label: 'Pipeño', kind: 'wine', abv: 0.12, shelf: true, parent: 'redwine',
	  alias: ['pipeño', 'pipeno'] },
	{ id: 'rosewine', label: 'Rosé wine', kind: 'wine', abv: 0.12, bal: 'modifier', shelf: true,
	  alias: ['rosé wine', 'rose wine', 'rosé'] },
	{ id: 'lager', label: 'Lager', kind: 'beer', abv: 0.05, bal: 'long', shelf: true,
	  alias: ['lager', 'mexican lager', 'beer'] },
	{ id: 'stout', label: 'Stout', kind: 'beer', abv: 0.05, bal: 'long', shelf: true,
	  alias: ['stout', 'guinness', 'irish stout'] },
	{ id: 'cider', label: 'Hard cider', kind: 'beer', abv: 0.05, bal: 'long', shelf: true, alias: ['hard cider', 'cider'] },

	/* ---- bitters ----------------------------------------------------------- */
	{ id: 'ango', label: 'Angostura', kind: 'bitters', abv: 0.447, bal: 'aromatic', shelf: true,
	  alias: ['angostura', 'angostura bitters', 'aromatic bitters'] },
	{ id: 'pey', label: "Peychaud's", kind: 'bitters', abv: 0.35, bal: 'aromatic', shelf: true,
	  alias: ["peychaud's", "peychaud's bitters", 'peychauds'] },
	{ id: 'ob', label: 'Orange bitters', kind: 'bitters', abv: 0.4, bal: 'aromatic', shelf: true,
	  alias: ['orange bitters'] },
	{ id: 'celerybitters', label: 'Celery bitters', kind: 'bitters', abv: 0.44, bal: 'aromatic', shelf: true,
	  alias: ['celery bitters'] },
	{ id: 'molebitters', label: 'Mole bitters', kind: 'bitters', abv: 0.44, bal: 'aromatic', shelf: true,
	  alias: ['mole bitters'] },
	{ id: 'chocbitters', label: 'Chocolate bitters', kind: 'bitters', abv: 0.44, bal: 'aromatic', shelf: true,
	  alias: ['chocolate bitters'] },

	/* ---- citrus and juice -------------------------------------------------- */
	/* A parent for the bare "2 oz citrus juice" a template spec uses. Any of
	   the four answers it, which is what a bartender would do. */
	{ id: 'citrus', label: 'Citrus', kind: 'juice', bal: 'sour',
	  alias: ['citrus juice', 'citrus', 'any tart juice or tea base', 'any tart juice'] },
	{ id: 'lemon', label: 'Lemons', kind: 'juice', shelf: true, parent: 'citrus',
	  alias: ['lemon', 'lemon juice', 'lemons', 'lemon wheel', 'lemon wedge',
	          'lemon quarters', 'lemon twist'] },
	{ id: 'lime', label: 'Limes', kind: 'juice', shelf: true, parent: 'citrus',
	  alias: ['lime', 'lime juice', 'limes', 'lime wheel', 'lime wedge',
	          'lime disc with plenty of peel'] },
	{ id: 'gfj', label: 'Grapefruit', kind: 'juice', shelf: true, parent: 'citrus',
	  alias: ['grapefruit', 'grapefruit juice'] },
	{ id: 'oj', label: 'Orange juice', kind: 'juice', bal: 'long', shelf: true, parent: 'citrus',
	  alias: ['orange juice'] },
	{ id: 'pine', label: 'Pineapple juice', kind: 'juice', bal: 'long', shelf: true,
	  alias: ['pineapple juice', 'pineapple'] },
	{ id: 'cran', label: 'Cranberry juice', kind: 'juice', bal: 'long', shelf: true,
	  alias: ['cranberry juice', 'cranberry'] },
	{ id: 'tomato', label: 'Tomato juice', kind: 'juice', bal: 'long', shelf: true,
	  alias: ['tomato juice', 'tomato', 'clamato'] },
	{ id: 'applejuice', label: 'Apple juice', kind: 'juice', bal: 'long', shelf: true,
	  alias: ['apple juice', 'cloudy apple juice'] },
	{ id: 'pomjuice', label: 'Pomegranate juice', kind: 'juice', bal: 'long', shelf: true,
	  alias: ['pomegranate juice'] },
	{ id: 'celeryjuice', label: 'Celery juice', kind: 'juice', bal: 'long', shelf: true,
	  alias: ['celery juice'] },
	{ id: 'watermelonjuice', label: 'Watermelon juice', kind: 'juice', bal: 'long', shelf: true,
	  alias: ['watermelon juice'] },
	{ id: 'cherryjuice', label: 'Tart cherry juice', kind: 'juice', bal: 'long', shelf: true,
	  alias: ['tart cherry juice'] },
	{ id: 'grapejuice', label: 'Grape juice', kind: 'juice', bal: 'long', shelf: true,
	  alias: ['concord grape juice', 'grape juice'] },
	{ id: 'mango', label: 'Mango', kind: 'juice', bal: 'long', shelf: true,
	  alias: ['mango purée', 'mango puree', 'mango juice', 'mango'] },
	{ id: 'passionjuice', label: 'Passion fruit', kind: 'juice', bal: 'sweet', shelf: true,
	  alias: ['passion fruit', 'passion fruit purée', 'passion fruit juice'] },
	{ id: 'verjus', label: 'Verjus', kind: 'juice', bal: 'sour', shelf: true, alias: ['verjus'] },

	/* ---- syrups and sweeteners --------------------------------------------
	   Nineteen spellings of sugar water. `simple` keeps its id and swallows
	   most of them; the ones a bar buys separately keep their own row. */
	{ id: 'simple', label: 'Simple / sugar', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['simple', 'simple syrup', 'sugar', 'sugar syrup', 'rich simple',
	          'rich simple syrup', 'rich syrup', 'caster sugar', 'white sugar',
	          'syrup', 'flavored syrup', 'flavoured syrup'] },
	{ id: 'demerarasyrup', label: 'Demerara syrup', kind: 'syrup', shelf: true, parent: 'simple', up: true,
	  alias: ['demerara syrup', 'demerara sugar', 'cane syrup', 'rock candy syrup',
	          'brown sugar', 'turbinado syrup'] },
	{ id: 'honey', label: 'Honey', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['honey', 'honey syrup'] },
	{ id: 'maple', label: 'Maple syrup', kind: 'syrup', bal: 'sweet', shelf: true, alias: ['maple syrup', 'maple'] },
	{ id: 'agave', label: 'Agave', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['agave', 'agave syrup', 'agave nectar'] },
	{ id: 'orgeat', label: 'Orgeat', kind: 'syrup', bal: 'sweet', shelf: true, alias: ['orgeat'] },
	{ id: 'gren', label: 'Grenadine', kind: 'syrup', bal: 'sweet', shelf: true, alias: ['grenadine'] },
	/* Rose's is roughly two thirds sugar, so a Gimlet made with cordial is
	   sweetened by it. Resolving to plain lime read it as pure acid and lost
	   the sugar out of the balance. */
	{ id: 'limecordial', label: 'Lime cordial', kind: 'syrup', abv: 0, bal: 'sweet', shelf: true,
	  alias: ['lime cordial'] },
	{ id: 'rasp', label: 'Raspberry syrup', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['raspberry syrup', 'raspberry'] },
	/* The syrup row owns the bare word 'raspberry', so it was swallowing
	   'raspberry liqueur' and the PB&J shot read as containing no alcohol.
	   A longer alias is the whole fix, same as the zero-proof homonyms. */
	{ id: 'raspliq', label: 'Raspberry liqueur', kind: 'liqueur', abv: 0.165, bal: 'sweet', shelf: true,
	  /* 'chambord' stays on blackberryliq, which already claims it and is a
	     defensible home for a black raspberry liqueur; check 2 caught the
	     duplicate the moment it was written. */
	  alias: ['raspberry liqueur'] },
	{ id: 'cinn', label: 'Cinnamon syrup', kind: 'syrup', bal: 'sweet', shelf: true, alias: ['cinnamon syrup'] },
	{ id: 'gingersyrup', label: 'Ginger syrup', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['ginger syrup', 'honey-ginger syrup'] },
	{ id: 'vanilla', label: 'Vanilla syrup', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['vanilla syrup', 'vanilla extract', 'vanilla'] },
	{ id: 'chocsyrup', label: 'Chocolate syrup', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['chocolate syrup'] },
	{ id: 'cherrysyrup', label: 'Cherry syrup', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['cherry syrup'] },
	{ id: 'lycheesyrup', label: 'Lychee syrup', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['lychee syrup'] },
	{ id: 'herbsyrup', label: 'Herb syrup', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['dill syrup', 'fennel syrup', 'lavender syrup', 'rosemary syrup',
	          'sage syrup', 'tarragon syrup', 'basil syrup', 'mint syrup',
	          'mint-vinegar syrup', 'hibiscus syrup'] },
	{ id: 'shrub', label: 'Shrub', kind: 'syrup', bal: 'sour', shelf: true,
	  alias: ['shrub', 'fruit shrub', 'blackberry shrub'] },
	{ id: 'tamarind', label: 'Tamarind', kind: 'syrup', bal: 'sour', shelf: true,
	  alias: ['tamarind concentrate', 'tamarind'] },
	{ id: 'chamoy', label: 'Chamoy', kind: 'syrup', bal: 'aromatic', shelf: true, alias: ['chamoy'] },
	{ id: 'marmalade', label: 'Orange marmalade', kind: 'syrup', bal: 'sweet', shelf: true,
	  alias: ['orange marmalade', 'marmalade'] },
	{ id: 'sourmix', label: 'Sour mix', kind: 'syrup', bal: 'sour', shelf: true,
	  alias: ['sour mix', 'sweet and sour', 'sweet & sour'] },

	/* ---- dairy and egg ----------------------------------------------------- */
	{ id: 'cream', label: 'Cream', kind: 'dairy', bal: 'texture', shelf: true,
	  alias: ['cream', 'heavy cream', 'double cream', 'cream float'] },
	{ id: 'milk', label: 'Milk', kind: 'dairy', bal: 'long', shelf: true,
	  alias: ['milk', 'whole milk', 'hot milk'] },
	{ id: 'condmilk', label: 'Condensed milk', kind: 'dairy', bal: 'long', shelf: true,
	  alias: ['condensed milk', 'sweetened condensed milk'] },
	{ id: 'evapmilk', label: 'Evaporated milk', kind: 'dairy', bal: 'long', shelf: true,
	  alias: ['evaporated milk'] },
	{ id: 'coco', label: 'Coconut cream', kind: 'dairy', bal: 'long', shelf: true,
	  alias: ['coconut cream', 'cream of coconut', 'coconut milk'] },
	{ id: 'yogurt', label: 'Yogurt', kind: 'dairy', bal: 'texture', shelf: true, alias: ['yogurt', 'yoghurt'] },
	{ id: 'icecream', label: 'Ice cream / sorbet', kind: 'dairy', bal: 'texture', shelf: true,
	  alias: ['ice cream', 'vanilla ice cream', 'pineapple ice cream', 'sorbet', 'lemon sorbet'] },
	{ id: 'egg', label: 'Eggs', kind: 'dairy', bal: 'texture', shelf: true,
	  alias: ['egg', 'egg white', 'egg yolk', 'whole egg'] },
	{ id: 'aquafaba', label: 'Aquafaba', kind: 'dairy', bal: 'texture', shelf: true, alias: ['aquafaba'] },
	{ id: 'butterbatter', label: 'Batter (butter / Tom & Jerry)', kind: 'dairy', bal: 'texture', shelf: true,
	  alias: ['spiced butter batter', 'tom & jerry batter', 'butter batter'] },

	/* ---- soft drinks and mixers -------------------------------------------
	   The false-positive cluster. Each of these used to match two or three
	   rows at once; each is now one row with the longest name winning. */
	{ id: 'soda', label: 'Soda water', kind: 'mixer', bal: 'long', shelf: true,
	  alias: ['soda', 'soda water', 'club soda', 'seltzer', 'sparkling water',
	          'sparkling mineral water', 'still or sparkling water'] },
	{ id: 'tonic', label: 'Tonic', kind: 'mixer', bal: 'long', shelf: true, alias: ['tonic', 'tonic water'] },
	{ id: 'gb', label: 'Ginger beer', kind: 'mixer', bal: 'long', shelf: true, alias: ['ginger beer'] },
	{ id: 'ga', label: 'Ginger ale', kind: 'mixer', bal: 'long', shelf: true, alias: ['ginger ale'] },
	{ id: 'cola', label: 'Cola', kind: 'mixer', bal: 'long', shelf: true, alias: ['cola', 'coca-cola', 'coke'] },
	{ id: 'lemonade', label: 'Lemonade', kind: 'mixer', bal: 'long', shelf: true,
	  alias: ['lemonade', 'sparkling lemonade', 'cloudy lemonade'] },
	{ id: 'lemonlime', label: 'Lemon-lime soda', kind: 'mixer', bal: 'long', shelf: true,
	  alias: ['lemon-lime soda', 'lemon soda', 'lemon lime soda', 'sprite', '7-up'] },
	{ id: 'gfsoda', label: 'Grapefruit soda', kind: 'mixer', bal: 'long', shelf: true,
	  alias: ['grapefruit soda', 'squirt', 'ting'] },
	{ id: 'energy', label: 'Energy drink', kind: 'mixer', bal: 'long', shelf: true,
	  alias: ['energy drink'] },
	{ id: 'phosphate', label: 'Acid phosphate', kind: 'mixer', bal: 'sour', shelf: true,
	  alias: ['acid phosphate'] },

	/* ---- tea and coffee ---------------------------------------------------- */
	{ id: 'brewedcoffee', label: 'Coffee', kind: 'mixer', bal: 'long', shelf: true,
	  alias: ['coffee', 'hot coffee', 'brewed coffee', 'cold brew', 'chicory-coffee brew',
	          'cold chicory-coffee brew', 'coffee beans'] },
	{ id: 'espresso', label: 'Espresso', kind: 'mixer', shelf: true, parent: 'brewedcoffee',
	  alias: ['espresso'] },
	{ id: 'tea', label: 'Tea', kind: 'mixer', bal: 'long', shelf: true,
	  alias: ['tea', 'black tea', 'cold black tea', 'black tea concentrate', 'hibiscus tea',
	          'lapsang souchong tea', 'masala chai', 'brewed thai tea', 'cascara tea',
	          'green tea', 'matcha'] },

	/* ---- produce and herbs -------------------------------------------------- */
	{ id: 'mint', label: 'Fresh mint', kind: 'produce', bal: 'aromatic', shelf: true,
	  alias: ['mint', 'mint sprig', 'mint leaves', 'fresh mint'] },
	{ id: 'basil', label: 'Fresh basil', kind: 'produce', bal: 'aromatic', shelf: true, alias: ['basil'] },
	{ id: 'ginger', label: 'Fresh ginger', kind: 'produce', bal: 'long', shelf: true, alias: ['ginger'] },
	{ id: 'cuke', label: 'Cucumber', kind: 'produce', bal: 'long', shelf: true, alias: ['cucumber'] },
	{ id: 'straw', label: 'Strawberries', kind: 'produce', bal: 'long', shelf: true,
	  alias: ['strawberries', 'strawberry', 'strawberry purée', 'strawberry puree'] },
	{ id: 'grapes', label: 'Grapes', kind: 'produce', bal: 'aromatic', shelf: true, alias: ['grapes'] },
	{ id: 'orange', label: 'Oranges', kind: 'produce', bal: 'aromatic', shelf: true,
	  alias: ['orange', 'orange slice', 'orange slices', 'orange peel', 'orange wheel',
	          'muddled orange slice', 'clove-studded orange peel'] },
	{ id: 'cherry', label: 'Cocktail cherries', kind: 'produce', bal: 'aromatic', shelf: true,
	  alias: ['cherry', 'cocktail cherry', 'brandied cherry', 'maraschino cherry'] },
	{ id: 'jalapeno', label: 'Chilli', kind: 'produce', bal: 'aromatic', shelf: true,
	  alias: ['jalapeño slices', 'jalapeño', 'chile', 'chilli', 'chile powder'] },
	{ id: 'olive', label: 'Olives / brine', kind: 'produce', bal: 'aromatic', shelf: true,
	  alias: ['olive', 'olives', 'olive brine'] },
	{ id: 'pickle', label: 'Pickle brine', kind: 'produce', bal: 'aromatic', shelf: true,
	  alias: ['pickle brine', 'pickle juice'] },
	{ id: 'celery', label: 'Celery', kind: 'produce', bal: 'aromatic', shelf: true, alias: ['celery'] },
	{ id: 'driedfruit', label: 'Dried fruit', kind: 'produce', bal: 'aromatic', shelf: true,
	  alias: ['dried fruit', 'seasonal fruit'] },
	/* The fruit, not the bottle. A Dirty Banana wants a banana off the counter
	   and a Banana Daiquiri wants creme de banane, and filing them together
	   would tell a bar it could make one because it stocks the other. */
	{ id: 'bananafruit', label: 'Bananas', kind: 'produce', bal: 'texture', shelf: true,
	  alias: ['banana', 'bananas'] },
	{ id: 'peachfruit', label: 'Peaches', kind: 'produce', bal: 'long', shelf: true,
	  alias: ['peach', 'peaches', 'white peach purée', 'white peach puree', 'peach purée'] },
	{ id: 'citruspeel', label: 'Citrus peel', kind: 'produce', bal: 'aromatic', shelf: true,
	  alias: ['citrus peel', 'lemon peel', 'grapefruit peel'] },
	{ id: 'sangrita', label: 'Sangrita', kind: 'mixer', bal: 'long', shelf: true,
	  alias: ['sangrita'] },

	/* ---- larder ------------------------------------------------------------- */
	{ id: 'worcs', label: 'Worcestershire', kind: 'pantry', bal: 'aromatic', shelf: true,
	  alias: ['worcestershire', 'worcestershire sauce'] },
	{ id: 'hotsauce', label: 'Hot sauce', kind: 'pantry', bal: 'aromatic', shelf: true,
	  alias: ['hot sauce', 'sauce'] },
	{ id: 'horseradish', label: 'Horseradish', kind: 'pantry', bal: 'aromatic', shelf: true,
	  alias: ['horseradish'] },
	{ id: 'orangeflower', label: 'Orange flower water', kind: 'pantry', bal: 'aromatic', shelf: true,
	  alias: ['orange flower water'] },
	{ id: 'rosewater', label: 'Rose water', kind: 'pantry', bal: 'aromatic', shelf: true, alias: ['rose water'] },
	/* 'apple cider vinegar' has to be named here explicitly. The applecider
	   row added in the zero-proof pass carries the alias 'apple cider', which
	   is longer than 'vinegar' and was therefore winning the whole fragment:
	   a drink calling for a splash of vinegar started demanding apple juice.
	   Fixing one homonym collision is how you make the next one. */
	{ id: 'vinegar', label: 'Vinegar', kind: 'pantry', bal: 'sour', shelf: true,
	  alias: ['apple cider vinegar', 'sherry vinegar', 'rice vinegar', 'vinegar'] },
	{ id: 'rice', label: 'Rice', kind: 'pantry', bal: 'texture', shelf: true, alias: ['long-grain rice', 'rice'] },

	/* ---- zero proof ---------------------------------------------------------
	   The Zero Proof tab's own bottles. They are ordinary rows, not a special
	   case: an NA aperitivo is a thing a bar stocks or does not. */
	{ id: 'naaperitivo', label: 'NA bitter aperitivo', kind: 'liqueur', bal: 'modifier', shelf: true, abv: 0,
	  alias: ['na bitter aperitivo', 'alcohol-free aperitivo', 'na aperitivo'] },
	{ id: 'nabitters', label: 'NA aromatic bitters', kind: 'bitters', bal: 'aromatic', shelf: true, abv: 0,
	  alias: ['na aromatic bitters', 'alcohol-free bitters', 'na bitters'] },
	{ id: 'naspirit', label: 'NA botanical spirit', kind: 'spirit', bal: 'strong', shelf: true, abv: 0,
	  alias: ['na botanical spirit', 'alcohol-free botanical spirit', 'na gin', 'na spirit'] },
	{ id: 'navermouth', label: 'NA red vermouth', kind: 'fortified', bal: 'modifier', shelf: true, abv: 0,
	  alias: ['na red vermouth alternative', 'alcohol-free red vermouth alternative',
	          'na red vermouth'] },

	/* ---- the zero-proof homonyms -------------------------------------------
	   Every row here exists because an ALCOHOLIC row was swallowing a
	   non-alcoholic line, and the Zero Proof tab was quietly requiring drink.
	   Measured before these were added: nine of the 85 zero-proof drinks could
	   not be made on a shelf with no alcohol on it, and a Root Beer Float
	   demanded a lager.

	   The mechanism is longest-alias-wins, so each of these carries an alias
	   LONGER than the one it has to outbid: 'apple cider' beats 'cider', 'root
	   beer' beats 'beer', 'elderflower cordial' beats 'elderflower'. Adding a
	   row is therefore the whole fix; nothing in the resolver changes.

	   abv: 0 is authored rather than left absent, because check 9 asks whether
	   a zero-proof drink requires anything that carries alcohol, and 'absent'
	   and 'zero' have to be different answers for that question to mean
	   anything. */
	{ id: 'rootbeer', label: 'Root beer', kind: 'mixer', shelf: true, abv: 0, bal: 'long',
	  alias: ['root beer', 'cold root beer'] },
	{ id: 'applecider', label: 'Apple cider', kind: 'juice', shelf: true, abv: 0, bal: 'long',
	  alias: ['apple cider', 'hot spiced apple cider', 'spiced apple cider',
	          'unfiltered apple cider'] },
	{ id: 'nasparkling', label: 'NA sparkling wine', kind: 'mixer', shelf: true, abv: 0, bal: 'long',
	  alias: ['na sparkling wine', 'alcohol-free sparkling wine',
	          'non-alcoholic sparkling wine', 'sparkling grape juice'] },
	{ id: 'naredwine', label: 'NA red wine', kind: 'mixer', shelf: true, abv: 0, bal: 'modifier',
	  alias: ['na red wine', 'alcohol-free red wine', 'non-alcoholic red wine'] },
	{ id: 'nalager', label: 'NA lager', kind: 'mixer', shelf: true, abv: 0, bal: 'long',
	  alias: ['na lager', 'alcohol-free lager', 'non-alcoholic lager', 'na beer'] },
	{ id: 'naelder', label: 'Elderflower cordial', kind: 'syrup', shelf: true, abv: 0, bal: 'sweet',
	  alias: ['elderflower cordial', 'elderflower syrup'] },
	{ id: 'nacoffeeliq', label: 'NA coffee liqueur', kind: 'syrup', shelf: true, abv: 0, bal: 'sweet',
	  alias: ['na coffee liqueur', 'alcohol-free coffee liqueur'] },
	{ id: 'gentiansyrup', label: 'Bitter gentian syrup', kind: 'syrup', shelf: true, abv: 0, bal: 'sweet',
	  alias: ['gentian or wormwood tincture-free bitter syrup',
	          'tincture-free bitter syrup', 'bitter syrup'] },
	{ id: 'narum', label: 'NA rum alternative', kind: 'mixer', shelf: true, abv: 0, bal: 'strong',
	  alias: ['na rum alternative', 'alcohol-free rum alternative', 'na rum'] },

	/* ---- everything a bar has and nobody stocks as a decision ---------------
	   These RESOLVE, which is the point: the gate can tell "this is salt" apart
	   from "the ledger has no idea what this is". They are never a requirement
	   and never a chip. */
	{ id: 'ice', label: 'Ice', kind: 'pantry', bal: 'texture', stock: false,
	  alias: ['ice', 'crushed ice', 'cracked ice', 'ice cubes'] },
	{ id: 'water', label: 'Water', kind: 'pantry', bal: 'long', stock: false,
	  alias: ['water', 'hot water', 'boiling water', 'cold water', 'warm water'] },
	{ id: 'salt', label: 'Salt', kind: 'pantry', bal: 'aromatic', stock: false,
	  alias: ['salt', 'sea salt', 'kosher salt', 'saline', 'saline solution',
	          'black salt', 'celery salt', 'salt rim', 'tajín rim', 'tajín'] },
	{ id: 'pepper', label: 'Pepper', kind: 'pantry', bal: 'aromatic', stock: false,
	  alias: ['pepper', 'black pepper', 'cayenne'] },
	{ id: 'spice', label: 'Baking spice', kind: 'pantry', bal: 'aromatic', stock: false,
	  alias: ['cinnamon', 'clove', 'cloves', 'star anise', 'nutmeg', 'grated nutmeg',
	          'cardamom', 'turmeric', 'roasted cumin', 'cumin', 'allspice berries'] },

	/* ---- the two the ledger names but cannot stock --------------------------
	   "spirit of choice" and "any tart juice" are the recipe declining to
	   choose. They resolve so the gate stays quiet, and they are never a
	   requirement, because requiring them would be requiring nothing. */
	/* 'spirit' and 'citrus' now carry these, as requirements rather than as
	   things the ledger agrees to ignore. See the roots above. */
	/* The husk you just squeezed, dropped in for the oils. It is not a bottle. */
	{ id: 'spentshell', label: 'The spent shell', kind: 'produce', bal: 'aromatic', stock: false,
	  alias: ['spent shell', 'the spent shell'] },
	/* A made drink used as a component. The line names its own parts in a
	   parenthetical, so the bartender is not left guessing; the ledger simply
	   has no single bottle to ask a bar to stock. */
	{ id: 'madeshot', label: 'A made shot', kind: 'spirit', abv: 0.2, bal: 'strong', stock: false,
	  alias: ['royal flush shot'] },
];

/* Lines that are method, not ingredient. Adding one here is a claim: this line
   names nothing a bar has to stock. Matched against the NORMALISED line, so
   quantity and case are already gone. */
const NOTE_LINES = [
	'heated gently',
	'macerated',
	'dribbled in',
	'poured over a spoon',
	'poured into the glass first',
	'poured over after blending',
	'served alongside',
	'blended and strained',
	'strained',
	'blended',
	'soaked overnight with cinnamon',
	'room temperature',
	'freezer-cold',
	'chilled',
	'sunk',
	'the spent shell',
	'spent shell',
	'half batch frozen piña colada',
	'frozen piña colada base',
];

/* Old chips that named two bottles. Owning the combined chip meant the old
   matcher treated you as owning both, so the split grants both. Never take an
   ingredient away from somebody who had it.

   tools/check-ingredients.mjs freezes the old 104 ids and proves every one of
   them still lands somewhere. */
const SHELF_ID_MIGRATION = {
	grappa: ['grappa', 'sambuca'],          /* was 'Grappa/Sambuca' */
	abs: ['abs', 'pastis'],                 /* was 'Absinthe/pastis' */
	heering: ['heering', 'blackberryliq'],  /* matched cherry AND blackberry liqueur */
	picon: ['picon', 'amaro'],              /* was 'Amer Picon/amaro' */
	calvados: ['calvados'],                 /* applejack folded in as an alias */
	menthe: ['menthe', 'brancamenta'],
	amaretto: ['amaretto'],                 /* noyaux folded in as an alias */
	whitewine: ['whitewine', 'pipeno'],
	beer: ['lager', 'stout'],               /* was 'Lager/stout' */
	condmilk: ['condmilk', 'evapmilk'],
	suze: ['suze', 'gentian'],              /* was 'Suze/gentian' */
	/* 'coffee' is NOT here: the old chip meant the liqueur and still does, so
	   there is nothing to move. Mapping it produced a chain with the line below
	   and made this table non-idempotent. */
	hotcoffee: ['brewedcoffee'],            /* the old 'hotcoffee' chip was the drink */
};

/* Words that describe an ingredient without changing which bottle it is.
   Only ever stripped from the FRONT, which is why "chilled" can sit here and
   in TAILS at once: "chilled soda water" is soda, and a bare "chilled" left
   after a comma is a method. */
const ADJECTIVES = [
	'fresh', 'freshly squeezed', 'cold', 'hot', 'chilled', 'warm', 'strong',
	'good', 'quality', 'ripe', 'homemade', 'real', 'plain', 'whole',
	'freezer-cold', 'room temperature', 'brewed',
];

/* Tails that are method, not ingredient. A tail never sets an id.
   'blended' and 'strained' were briefly in ADJECTIVES above, which was wrong in
   a way worth recording: stripping them from the front turned "blended and
   strained" into "and strained" instead of recognising the whole thing as one
   instruction. They describe what was done to the drink, not which bottle. */
const TAILS = [
	'muddled', 'floated', 'float', 'floated on top', 'drizzled', 'grated', 'torn',
	'expressed', 'to top', 'top with', 'topped', 'cut in wedges', 'in wedges',
	'frozen into cubes', 'dribbled in', 'poured over a spoon', 'on the foam',
	'served alongside', 'only', 'rinse', 'macerated', 'heated gently',
	'to curdle and filter', 'to curdle', 'whisked in', 'simmered',
	'blended', 'strained', 'blended and strained', 'chilled', 'sunk',
	'freezer-cold', 'room temperature', 'poured into the glass first',
	'poured over after blending', 'alongside',
];
