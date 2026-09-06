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
	{ id: 'spirit', label: 'Any spirit', kind: 'spirit',
	  alias: ['spirit of choice', 'spirit', 'base spirit'] },

	/* ---- whiskey ----------------------------------------------------------
	   `whiskey` is a parent and NOT a chip. Nobody stocks "whiskey"; they stock
	   bourbon and rye. But 8 spec lines ask for it plainly, and every one of
	   them is satisfied by any bottle underneath. That is the whole reason a
	   parent relation exists in this file. */
	{ id: 'whiskey', label: 'Whiskey', kind: 'spirit', parent: 'spirit',
	  alias: ['whiskey', 'whisky'] },
	{ id: 'bourbon', label: 'Bourbon', kind: 'spirit', shelf: true, parent: 'whiskey',
	  alias: ['bourbon', 'bacon fat-washed bourbon', 'high-rye bourbon'] },
	{ id: 'rye', label: 'Rye', kind: 'spirit', shelf: true, parent: 'whiskey',
	  alias: ['rye', 'rye whiskey', 'canadian rye'] },
	{ id: 'scotch', label: 'Scotch', kind: 'spirit', shelf: true, parent: 'whiskey',
	  alias: ['scotch', 'blended scotch', 'blended scotch whisky'] },
	{ id: 'islay', label: 'Islay scotch', kind: 'spirit', shelf: true, parent: 'scotch',
	  alias: ['islay scotch', 'islay single malt', 'peated scotch', 'smoky islay scotch'] },
	{ id: 'irish', label: 'Irish whiskey', kind: 'spirit', shelf: true, parent: 'whiskey',
	  alias: ['irish whiskey'] },
	{ id: 'canadian', label: 'Canadian whisky', kind: 'spirit', shelf: true, parent: 'whiskey',
	  alias: ['canadian whisky', 'canadian whiskey'] },
	{ id: 'tennessee', label: 'Tennessee whiskey', kind: 'spirit', shelf: true, parent: 'whiskey',
	  alias: ['tennessee whiskey'] },
	{ id: 'cinnwhisky', label: 'Cinnamon whisky', kind: 'liqueur', shelf: true,
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
	{ id: 'oprum', label: 'Overproof rum', kind: 'spirit', shelf: true, parent: 'rum',
	  alias: ['overproof rum', '151 demerara rum', '151 rum', 'overproof jamaican rum',
	          'jamaican overproof rum', '151'] },
	{ id: 'crum', label: 'Coconut rum', kind: 'liqueur', shelf: true,
	  alias: ['coconut rum'] },
	{ id: 'spicedrum', label: 'Spiced rum', kind: 'spirit', shelf: true, parent: 'rum',
	  alias: ['spiced rum'] },
	/* No up:true. A Ti' Punch made with white rum is a different drink, which
	   is the whole reason the ledger carries agricole as its own line. */
	{ id: 'agricole', label: 'Rhum agricole', kind: 'spirit', shelf: true, parent: 'rum',
	  alias: ['rhum agricole', 'rhum agricole blanc', 'aged rhum agricole', 'agricole'] },
	{ id: 'cachaca', label: 'Cachaça', kind: 'spirit', shelf: true, parent: 'spirit',
	  alias: ['cachaça', 'cachaca'] },

	/* ---- gin --------------------------------------------------------------
	   Sloe gin is deliberately NOT a child of gin. It is a sweet red liqueur at
	   26%, and a Martini made with it is not a dry Martini, it is a mistake. */
	{ id: 'gin', label: 'Gin', kind: 'spirit', shelf: true, parent: 'spirit',
	  alias: ['gin', 'dry gin', 'london dry gin', 'london dry'] },
	{ id: 'oldtom', label: 'Old Tom gin', kind: 'spirit', shelf: true, parent: 'gin',
	  alias: ['old tom gin', 'old tom'] },
	{ id: 'genever', label: 'Genever', kind: 'spirit', parent: 'gin',
	  alias: ['genever', 'jenever'] },
	{ id: 'sloegin', label: 'Sloe gin', kind: 'liqueur', shelf: true,
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
	{ id: 'mezcal', label: 'Mezcal', kind: 'spirit', shelf: true, parent: 'spirit',
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
	{ id: 'blackberrybrandy', label: 'Blackberry brandy', kind: 'liqueur', shelf: true,
	  alias: ['blackberry brandy'] },

	/* ---- other bases ------------------------------------------------------ */
	{ id: 'soju', label: 'Soju', kind: 'spirit', shelf: true, alias: ['soju'] },
	{ id: 'shochu', label: 'Shochu', kind: 'spirit', shelf: true, alias: ['shochu'] },
	{ id: 'sake', label: 'Sake', kind: 'wine', shelf: true, alias: ['sake'] },
	{ id: 'abs', label: 'Absinthe', kind: 'spirit', shelf: true,
	  alias: ['absinthe', 'absinthe rinse'] },
	{ id: 'pastis', label: 'Pastis / anisette', kind: 'spirit', shelf: true,
	  alias: ['pastis', 'anisette'] },
	{ id: 'sambuca', label: 'Sambuca', kind: 'liqueur', shelf: true, alias: ['sambuca'] },
	{ id: 'malort', label: 'Malört', kind: 'liqueur', shelf: true,
	  alias: ['malört', "jeppson's malört", 'malort'] },
	{ id: 'jager', label: 'Jägermeister', kind: 'liqueur', shelf: true,
	  alias: ['jägermeister', 'jagermeister', 'jager'] },
	{ id: 'yukon', label: 'Yukon Jack', kind: 'liqueur', shelf: true, alias: ['yukon jack'] },
	{ id: 'socomfort', label: 'Southern Comfort', kind: 'liqueur', shelf: true,
	  alias: ['southern comfort'] },

	/* ---- orange liqueur ---------------------------------------------------
	   Six ways to say one shelf slot. `triple sec` is an alias of the GENERIC
	   because the canon uses it loosely; Cointreau is its own row because the
	   canon names it when it means it. That distinction is the single most
	   useful thing a surface-string table can do that a pattern cannot. */
	{ id: 'ol', label: 'Orange liqueur', kind: 'liqueur', shelf: true,
	  alias: ['orange liqueur', 'triple sec', 'orange curacao', 'orange curaçao',
	          'curacao', 'curaçao', 'dry curacao'] },
	{ id: 'cointreau', label: 'Cointreau', kind: 'liqueur', parent: 'ol', up: true,
	  alias: ['cointreau'] },
	{ id: 'gmarnier', label: 'Grand Marnier', kind: 'liqueur', parent: 'ol', up: true,
	  alias: ['grand marnier'] },
	/* No up:true: a blue Sidecar is not a Sidecar. */
	{ id: 'bluecuracao', label: 'Blue curaçao', kind: 'liqueur', shelf: true, parent: 'ol',
	  alias: ['blue curacao', 'blue curaçao'] },
	{ id: 'orangecordial', label: 'Orange cordial', kind: 'syrup', shelf: true,
	  alias: ['orange cordial'] },

	/* ---- amari and bitter liqueurs ---------------------------------------- */
	{ id: 'amaro', label: 'Amaro', kind: 'liqueur', alias: ['amaro', 'bitter amaro'] },
	{ id: 'campari', label: 'Campari', kind: 'liqueur', shelf: true, parent: 'amaro',
	  alias: ['campari'] },
	{ id: 'aperol', label: 'Aperol', kind: 'liqueur', shelf: true, parent: 'amaro',
	  alias: ['aperol'] },
	{ id: 'nonino', label: 'Amaro Nonino', kind: 'liqueur', shelf: true, parent: 'amaro', up: true,
	  alias: ['amaro nonino', 'nonino'] },
	{ id: 'fernet', label: 'Fernet-Branca', kind: 'liqueur', shelf: true, parent: 'amaro',
	  alias: ['fernet-branca', 'fernet'] },
	{ id: 'brancamenta', label: 'Branca Menta', kind: 'liqueur', shelf: true, parent: 'amaro',
	  alias: ['branca menta'] },
	{ id: 'cynar', label: 'Cynar', kind: 'liqueur', shelf: true, parent: 'amaro',
	  alias: ['cynar'] },
	{ id: 'averna', label: 'Averna', kind: 'liqueur', shelf: true, parent: 'amaro', up: true,
	  alias: ['averna', 'amaro averna'] },
	{ id: 'montenegro', label: 'Amaro Montenegro', kind: 'liqueur', parent: 'amaro', up: true,
	  alias: ['amaro montenegro', 'montenegro'] },
	{ id: 'picon', label: 'Amer Picon', kind: 'liqueur', shelf: true, parent: 'amaro',
	  alias: ['amer picon', 'picon'] },
	{ id: 'suze', label: 'Suze', kind: 'liqueur', shelf: true, alias: ['suze'] },
	{ id: 'gentian', label: 'Gentian liqueur', kind: 'liqueur', shelf: true,
	  alias: ['gentian liqueur', 'gentian'] },
	{ id: 'chart', label: 'Chartreuse', kind: 'liqueur', shelf: true,
	  alias: ['chartreuse', 'green chartreuse', 'yellow chartreuse'] },
	{ id: 'bene', label: 'Bénédictine', kind: 'liqueur', shelf: true,
	  alias: ['bénédictine', 'benedictine'] },
	{ id: 'drambuie', label: 'Drambuie', kind: 'liqueur', shelf: true, alias: ['drambuie'] },
	{ id: 'galliano', label: 'Galliano', kind: 'liqueur', shelf: true, alias: ['galliano'] },
	{ id: 'l43', label: 'Licor 43', kind: 'liqueur', shelf: true, alias: ['licor 43'] },
	{ id: 'pimms', label: "Pimm's No. 1", kind: 'liqueur', shelf: true,
	  alias: ["pimm's no. 1", "pimm's", 'pimms'] },

	/* ---- fruit, nut and cream liqueurs ------------------------------------ */
	{ id: 'mara', label: 'Maraschino', kind: 'liqueur', shelf: true,
	  alias: ['maraschino', 'maraschino liqueur'] },
	{ id: 'viol', label: 'Crème de violette', kind: 'liqueur', shelf: true,
	  alias: ['crème de violette', 'creme de violette', 'violette'] },
	{ id: 'cacao', label: 'Crème de cacao', kind: 'liqueur', shelf: true,
	  alias: ['crème de cacao', 'creme de cacao', 'chocolate liqueur', 'white crème de cacao'] },
	{ id: 'mure', label: 'Crème de mûre', kind: 'liqueur', shelf: true,
	  alias: ['crème de mûre', 'creme de mure', 'crème de mûre drizzle'] },
	{ id: 'cassis', label: 'Crème de cassis', kind: 'liqueur', shelf: true,
	  alias: ['crème de cassis', 'creme de cassis', 'cassis'] },
	{ id: 'menthe', label: 'Crème de menthe', kind: 'liqueur', shelf: true,
	  alias: ['crème de menthe', 'creme de menthe', 'white crème de menthe'] },
	{ id: 'coffee', label: 'Coffee liqueur', kind: 'liqueur', shelf: true,
	  alias: ['coffee liqueur'] },
	{ id: 'amaretto', label: 'Amaretto', kind: 'liqueur', shelf: true,
	  alias: ['amaretto', 'crème de noyaux', 'creme de noyaux', 'noyaux'] },
	{ id: 'frangelico', label: 'Frangelico', kind: 'liqueur', shelf: true,
	  alias: ['frangelico', 'hazelnut liqueur'] },
	{ id: 'icream', label: 'Irish cream', kind: 'liqueur', shelf: true,
	  alias: ['irish cream'] },
	{ id: 'amarula', label: 'Amarula cream', kind: 'liqueur', shelf: true,
	  alias: ['amarula cream', 'amarula'] },
	{ id: 'advocaat', label: 'Advocaat', kind: 'liqueur', shelf: true, alias: ['advocaat'] },
	{ id: 'apricot', label: 'Apricot liqueur', kind: 'liqueur', shelf: true,
	  alias: ['apricot liqueur', 'apricot brandy'] },
	{ id: 'peach', label: 'Peach liqueur', kind: 'liqueur', shelf: true,
	  alias: ['peach liqueur', 'peach brandy', 'peach schnapps'] },
	{ id: 'banana', label: 'Banana liqueur', kind: 'liqueur', shelf: true,
	  alias: ['banana liqueur', 'crème de banane', 'creme de banane'] },
	{ id: 'elder', label: 'St-Germain', kind: 'liqueur', shelf: true,
	  alias: ['st-germain', 'elderflower liqueur', 'elderflower'] },
	{ id: 'heering', label: 'Cherry liqueur', kind: 'liqueur', shelf: true,
	  alias: ['cherry heering', 'cherry liqueur'] },
	{ id: 'blackberryliq', label: 'Blackberry liqueur', kind: 'liqueur', shelf: true,
	  alias: ['blackberry liqueur', 'chambord'] },
	{ id: 'melon', label: 'Melon liqueur', kind: 'liqueur', shelf: true,
	  alias: ['melon liqueur', 'midori'] },
	{ id: 'watermelonliq', label: 'Watermelon liqueur', kind: 'liqueur', shelf: true,
	  alias: ['watermelon liqueur'] },
	{ id: 'lychee', label: 'Lychee liqueur', kind: 'liqueur', shelf: true,
	  alias: ['lychee liqueur'] },
	{ id: 'limoncello', label: 'Limoncello', kind: 'liqueur', shelf: true, alias: ['limoncello'] },
	{ id: 'allspice', label: 'Allspice dram', kind: 'liqueur', shelf: true,
	  alias: ['allspice dram', 'pimento dram'] },
	{ id: 'falernum', label: 'Falernum', kind: 'liqueur', shelf: true, alias: ['falernum'] },
	{ id: 'passion', label: 'Passion fruit liqueur', kind: 'liqueur', shelf: true,
	  alias: ['passion fruit liqueur'] },
	{ id: 'appleschnapps', label: 'Apple schnapps', kind: 'liqueur', shelf: true,
	  alias: ['apple schnapps', 'sour apple schnapps'] },
	{ id: 'butterscotch', label: 'Butterscotch schnapps', kind: 'liqueur', shelf: true,
	  alias: ['butterscotch schnapps'] },
	{ id: 'peppermintschnapps', label: 'Peppermint schnapps', kind: 'liqueur', shelf: true,
	  alias: ['peppermint schnapps'] },
	{ id: 'cinnschnapps', label: 'Cinnamon schnapps', kind: 'liqueur', shelf: true,
	  alias: ['cinnamon schnapps'] },

	/* ---- fortified and aromatised ----------------------------------------- */
	{ id: 'sv', label: 'Sweet vermouth', kind: 'fortified', shelf: true,
	  alias: ['sweet vermouth', 'red vermouth', 'rosso vermouth', 'punt e mes'] },
	{ id: 'dv', label: 'Dry vermouth', kind: 'fortified', shelf: true,
	  alias: ['dry vermouth', 'blanc vermouth', 'bianco vermouth', 'vermouth rinse'] },
	{ id: 'lillet', label: 'Lillet blanc', kind: 'fortified', shelf: true,
	  alias: ['lillet blanc', 'lillet'] },
	{ id: 'dubonnet', label: 'Dubonnet', kind: 'fortified', shelf: true,
	  alias: ['dubonnet rouge', 'dubonnet'] },
	{ id: 'sherry', label: 'Sherry', kind: 'fortified', shelf: true,
	  alias: ['sherry', 'amontillado sherry', 'fino sherry', 'oloroso sherry',
	          'manzanilla sherry', 'px sherry', 'pedro ximénez'] },
	{ id: 'port', label: 'Port', kind: 'fortified', shelf: true,
	  alias: ['port', 'ruby port', 'tawny port'] },

	/* ---- wine, beer, cider ------------------------------------------------ */
	{ id: 'champ', label: 'Sparkling wine', kind: 'wine', shelf: true,
	  alias: ['sparkling wine', 'champagne', 'prosecco', 'cava'] },
	{ id: 'redwine', label: 'Red wine', kind: 'wine', shelf: true,
	  alias: ['red wine', 'dry red wine'] },
	{ id: 'whitewine', label: 'White wine', kind: 'wine', shelf: true,
	  alias: ['white wine', 'dry white wine', 'dry white'] },
	{ id: 'pipeno', label: 'Pipeño', kind: 'wine', shelf: true, parent: 'redwine',
	  alias: ['pipeño', 'pipeno'] },
	{ id: 'rosewine', label: 'Rosé wine', kind: 'wine', shelf: true,
	  alias: ['rosé wine', 'rose wine', 'rosé'] },
	{ id: 'lager', label: 'Lager', kind: 'beer', shelf: true,
	  alias: ['lager', 'mexican lager', 'beer'] },
	{ id: 'stout', label: 'Stout', kind: 'beer', shelf: true,
	  alias: ['stout', 'guinness', 'irish stout'] },
	{ id: 'cider', label: 'Hard cider', kind: 'beer', shelf: true, alias: ['hard cider', 'cider'] },

	/* ---- bitters ----------------------------------------------------------- */
	{ id: 'ango', label: 'Angostura', kind: 'bitters', shelf: true,
	  alias: ['angostura', 'angostura bitters', 'aromatic bitters'] },
	{ id: 'pey', label: "Peychaud's", kind: 'bitters', shelf: true,
	  alias: ["peychaud's", "peychaud's bitters", 'peychauds'] },
	{ id: 'ob', label: 'Orange bitters', kind: 'bitters', shelf: true,
	  alias: ['orange bitters'] },
	{ id: 'celerybitters', label: 'Celery bitters', kind: 'bitters', shelf: true,
	  alias: ['celery bitters'] },
	{ id: 'molebitters', label: 'Mole bitters', kind: 'bitters', shelf: true,
	  alias: ['mole bitters'] },
	{ id: 'chocbitters', label: 'Chocolate bitters', kind: 'bitters', shelf: true,
	  alias: ['chocolate bitters'] },

	/* ---- citrus and juice -------------------------------------------------- */
	/* A parent for the bare "2 oz citrus juice" a template spec uses. Any of
	   the four answers it, which is what a bartender would do. */
	{ id: 'citrus', label: 'Citrus', kind: 'juice',
	  alias: ['citrus juice', 'citrus', 'any tart juice or tea base', 'any tart juice'] },
	{ id: 'lemon', label: 'Lemons', kind: 'juice', shelf: true, parent: 'citrus',
	  alias: ['lemon', 'lemon juice', 'lemons', 'lemon wheel', 'lemon wedge',
	          'lemon quarters', 'lemon twist'] },
	{ id: 'lime', label: 'Limes', kind: 'juice', shelf: true, parent: 'citrus',
	  alias: ['lime', 'lime juice', 'limes', 'lime wheel', 'lime wedge',
	          'lime disc with plenty of peel', 'lime cordial'] },
	{ id: 'gfj', label: 'Grapefruit', kind: 'juice', shelf: true, parent: 'citrus',
	  alias: ['grapefruit', 'grapefruit juice'] },
	{ id: 'oj', label: 'Orange juice', kind: 'juice', shelf: true, parent: 'citrus',
	  alias: ['orange juice'] },
	{ id: 'pine', label: 'Pineapple juice', kind: 'juice', shelf: true,
	  alias: ['pineapple juice', 'pineapple'] },
	{ id: 'cran', label: 'Cranberry juice', kind: 'juice', shelf: true,
	  alias: ['cranberry juice', 'cranberry'] },
	{ id: 'tomato', label: 'Tomato juice', kind: 'juice', shelf: true,
	  alias: ['tomato juice', 'tomato', 'clamato'] },
	{ id: 'applejuice', label: 'Apple juice', kind: 'juice', shelf: true,
	  alias: ['apple juice', 'cloudy apple juice'] },
	{ id: 'pomjuice', label: 'Pomegranate juice', kind: 'juice', shelf: true,
	  alias: ['pomegranate juice'] },
	{ id: 'celeryjuice', label: 'Celery juice', kind: 'juice', shelf: true,
	  alias: ['celery juice'] },
	{ id: 'watermelonjuice', label: 'Watermelon juice', kind: 'juice', shelf: true,
	  alias: ['watermelon juice'] },
	{ id: 'cherryjuice', label: 'Tart cherry juice', kind: 'juice', shelf: true,
	  alias: ['tart cherry juice'] },
	{ id: 'grapejuice', label: 'Grape juice', kind: 'juice', shelf: true,
	  alias: ['concord grape juice', 'grape juice'] },
	{ id: 'mango', label: 'Mango', kind: 'juice', shelf: true,
	  alias: ['mango purée', 'mango puree', 'mango juice', 'mango'] },
	{ id: 'passionjuice', label: 'Passion fruit', kind: 'juice', shelf: true,
	  alias: ['passion fruit', 'passion fruit purée', 'passion fruit juice'] },
	{ id: 'verjus', label: 'Verjus', kind: 'juice', shelf: true, alias: ['verjus'] },

	/* ---- syrups and sweeteners --------------------------------------------
	   Nineteen spellings of sugar water. `simple` keeps its id and swallows
	   most of them; the ones a bar buys separately keep their own row. */
	{ id: 'simple', label: 'Simple / sugar', kind: 'syrup', shelf: true,
	  alias: ['simple', 'simple syrup', 'sugar', 'sugar syrup', 'rich simple',
	          'rich simple syrup', 'rich syrup', 'caster sugar', 'white sugar',
	          'syrup', 'flavored syrup', 'flavoured syrup'] },
	{ id: 'demerarasyrup', label: 'Demerara syrup', kind: 'syrup', shelf: true, parent: 'simple', up: true,
	  alias: ['demerara syrup', 'demerara sugar', 'cane syrup', 'rock candy syrup',
	          'brown sugar', 'turbinado syrup'] },
	{ id: 'honey', label: 'Honey', kind: 'syrup', shelf: true,
	  alias: ['honey', 'honey syrup'] },
	{ id: 'maple', label: 'Maple syrup', kind: 'syrup', shelf: true, alias: ['maple syrup', 'maple'] },
	{ id: 'agave', label: 'Agave', kind: 'syrup', shelf: true,
	  alias: ['agave', 'agave syrup', 'agave nectar'] },
	{ id: 'orgeat', label: 'Orgeat', kind: 'syrup', shelf: true, alias: ['orgeat'] },
	{ id: 'gren', label: 'Grenadine', kind: 'syrup', shelf: true, alias: ['grenadine'] },
	{ id: 'rasp', label: 'Raspberry syrup', kind: 'syrup', shelf: true,
	  alias: ['raspberry syrup', 'raspberry'] },
	{ id: 'cinn', label: 'Cinnamon syrup', kind: 'syrup', shelf: true, alias: ['cinnamon syrup'] },
	{ id: 'gingersyrup', label: 'Ginger syrup', kind: 'syrup', shelf: true,
	  alias: ['ginger syrup', 'honey-ginger syrup'] },
	{ id: 'vanilla', label: 'Vanilla syrup', kind: 'syrup', shelf: true,
	  alias: ['vanilla syrup', 'vanilla extract', 'vanilla'] },
	{ id: 'chocsyrup', label: 'Chocolate syrup', kind: 'syrup', shelf: true,
	  alias: ['chocolate syrup'] },
	{ id: 'cherrysyrup', label: 'Cherry syrup', kind: 'syrup', shelf: true,
	  alias: ['cherry syrup'] },
	{ id: 'lycheesyrup', label: 'Lychee syrup', kind: 'syrup', shelf: true,
	  alias: ['lychee syrup'] },
	{ id: 'herbsyrup', label: 'Herb syrup', kind: 'syrup', shelf: true,
	  alias: ['dill syrup', 'fennel syrup', 'lavender syrup', 'rosemary syrup',
	          'sage syrup', 'tarragon syrup', 'basil syrup', 'mint syrup',
	          'mint-vinegar syrup', 'hibiscus syrup'] },
	{ id: 'shrub', label: 'Shrub', kind: 'syrup', shelf: true,
	  alias: ['shrub', 'fruit shrub', 'blackberry shrub'] },
	{ id: 'tamarind', label: 'Tamarind', kind: 'syrup', shelf: true,
	  alias: ['tamarind concentrate', 'tamarind'] },
	{ id: 'chamoy', label: 'Chamoy', kind: 'syrup', shelf: true, alias: ['chamoy'] },
	{ id: 'marmalade', label: 'Orange marmalade', kind: 'syrup', shelf: true,
	  alias: ['orange marmalade', 'marmalade'] },
	{ id: 'sourmix', label: 'Sour mix', kind: 'syrup', shelf: true,
	  alias: ['sour mix', 'sweet and sour', 'sweet & sour'] },

	/* ---- dairy and egg ----------------------------------------------------- */
	{ id: 'cream', label: 'Cream', kind: 'dairy', shelf: true,
	  alias: ['cream', 'heavy cream', 'double cream', 'cream float'] },
	{ id: 'milk', label: 'Milk', kind: 'dairy', shelf: true,
	  alias: ['milk', 'whole milk', 'hot milk'] },
	{ id: 'condmilk', label: 'Condensed milk', kind: 'dairy', shelf: true,
	  alias: ['condensed milk', 'sweetened condensed milk'] },
	{ id: 'evapmilk', label: 'Evaporated milk', kind: 'dairy', shelf: true,
	  alias: ['evaporated milk'] },
	{ id: 'coco', label: 'Coconut cream', kind: 'dairy', shelf: true,
	  alias: ['coconut cream', 'cream of coconut', 'coconut milk'] },
	{ id: 'yogurt', label: 'Yogurt', kind: 'dairy', shelf: true, alias: ['yogurt', 'yoghurt'] },
	{ id: 'icecream', label: 'Ice cream / sorbet', kind: 'dairy', shelf: true,
	  alias: ['ice cream', 'vanilla ice cream', 'pineapple ice cream', 'sorbet', 'lemon sorbet'] },
	{ id: 'egg', label: 'Eggs', kind: 'dairy', shelf: true,
	  alias: ['egg', 'egg white', 'egg yolk', 'whole egg'] },
	{ id: 'aquafaba', label: 'Aquafaba', kind: 'dairy', shelf: true, alias: ['aquafaba'] },
	{ id: 'butterbatter', label: 'Batter (butter / Tom & Jerry)', kind: 'dairy', shelf: true,
	  alias: ['spiced butter batter', 'tom & jerry batter', 'butter batter'] },

	/* ---- soft drinks and mixers -------------------------------------------
	   The false-positive cluster. Each of these used to match two or three
	   rows at once; each is now one row with the longest name winning. */
	{ id: 'soda', label: 'Soda water', kind: 'mixer', shelf: true,
	  alias: ['soda', 'soda water', 'club soda', 'seltzer', 'sparkling water',
	          'sparkling mineral water', 'still or sparkling water'] },
	{ id: 'tonic', label: 'Tonic', kind: 'mixer', shelf: true, alias: ['tonic', 'tonic water'] },
	{ id: 'gb', label: 'Ginger beer', kind: 'mixer', shelf: true, alias: ['ginger beer'] },
	{ id: 'ga', label: 'Ginger ale', kind: 'mixer', shelf: true, alias: ['ginger ale'] },
	{ id: 'cola', label: 'Cola', kind: 'mixer', shelf: true, alias: ['cola', 'coca-cola', 'coke'] },
	{ id: 'lemonade', label: 'Lemonade', kind: 'mixer', shelf: true,
	  alias: ['lemonade', 'sparkling lemonade', 'cloudy lemonade'] },
	{ id: 'lemonlime', label: 'Lemon-lime soda', kind: 'mixer', shelf: true,
	  alias: ['lemon-lime soda', 'lemon soda', 'lemon lime soda', 'sprite', '7-up'] },
	{ id: 'gfsoda', label: 'Grapefruit soda', kind: 'mixer', shelf: true,
	  alias: ['grapefruit soda', 'squirt', 'ting'] },
	{ id: 'energy', label: 'Energy drink', kind: 'mixer', shelf: true,
	  alias: ['energy drink'] },
	{ id: 'phosphate', label: 'Acid phosphate', kind: 'mixer', shelf: true,
	  alias: ['acid phosphate'] },

	/* ---- tea and coffee ---------------------------------------------------- */
	{ id: 'brewedcoffee', label: 'Coffee', kind: 'mixer', shelf: true,
	  alias: ['coffee', 'hot coffee', 'brewed coffee', 'cold brew', 'chicory-coffee brew',
	          'cold chicory-coffee brew', 'coffee beans'] },
	{ id: 'espresso', label: 'Espresso', kind: 'mixer', shelf: true, parent: 'brewedcoffee',
	  alias: ['espresso'] },
	{ id: 'tea', label: 'Tea', kind: 'mixer', shelf: true,
	  alias: ['tea', 'black tea', 'cold black tea', 'black tea concentrate', 'hibiscus tea',
	          'lapsang souchong tea', 'masala chai', 'brewed thai tea', 'cascara tea',
	          'green tea', 'matcha'] },

	/* ---- produce and herbs -------------------------------------------------- */
	{ id: 'mint', label: 'Fresh mint', kind: 'produce', shelf: true,
	  alias: ['mint', 'mint sprig', 'mint leaves', 'fresh mint'] },
	{ id: 'basil', label: 'Fresh basil', kind: 'produce', shelf: true, alias: ['basil'] },
	{ id: 'ginger', label: 'Fresh ginger', kind: 'produce', shelf: true, alias: ['ginger'] },
	{ id: 'cuke', label: 'Cucumber', kind: 'produce', shelf: true, alias: ['cucumber'] },
	{ id: 'straw', label: 'Strawberries', kind: 'produce', shelf: true,
	  alias: ['strawberries', 'strawberry', 'strawberry purée', 'strawberry puree'] },
	{ id: 'grapes', label: 'Grapes', kind: 'produce', shelf: true, alias: ['grapes'] },
	{ id: 'orange', label: 'Oranges', kind: 'produce', shelf: true,
	  alias: ['orange', 'orange slice', 'orange slices', 'orange peel', 'orange wheel',
	          'muddled orange slice', 'clove-studded orange peel'] },
	{ id: 'cherry', label: 'Cocktail cherries', kind: 'produce', shelf: true,
	  alias: ['cherry', 'cocktail cherry', 'brandied cherry', 'maraschino cherry'] },
	{ id: 'jalapeno', label: 'Chilli', kind: 'produce', shelf: true,
	  alias: ['jalapeño slices', 'jalapeño', 'chile', 'chilli', 'chile powder'] },
	{ id: 'olive', label: 'Olives / brine', kind: 'produce', shelf: true,
	  alias: ['olive', 'olives', 'olive brine'] },
	{ id: 'pickle', label: 'Pickle brine', kind: 'produce', shelf: true,
	  alias: ['pickle brine', 'pickle juice'] },
	{ id: 'celery', label: 'Celery', kind: 'produce', shelf: true, alias: ['celery'] },
	{ id: 'driedfruit', label: 'Dried fruit', kind: 'produce', shelf: true,
	  alias: ['dried fruit', 'seasonal fruit'] },
	/* The fruit, not the bottle. A Dirty Banana wants a banana off the counter
	   and a Banana Daiquiri wants creme de banane, and filing them together
	   would tell a bar it could make one because it stocks the other. */
	{ id: 'bananafruit', label: 'Bananas', kind: 'produce', shelf: true,
	  alias: ['banana', 'bananas'] },
	{ id: 'peachfruit', label: 'Peaches', kind: 'produce', shelf: true,
	  alias: ['peach', 'peaches', 'white peach purée', 'white peach puree', 'peach purée'] },
	{ id: 'citruspeel', label: 'Citrus peel', kind: 'produce', shelf: true,
	  alias: ['citrus peel', 'lemon peel', 'grapefruit peel'] },
	{ id: 'sangrita', label: 'Sangrita', kind: 'mixer', shelf: true,
	  alias: ['sangrita'] },

	/* ---- larder ------------------------------------------------------------- */
	{ id: 'worcs', label: 'Worcestershire', kind: 'pantry', shelf: true,
	  alias: ['worcestershire', 'worcestershire sauce'] },
	{ id: 'hotsauce', label: 'Hot sauce', kind: 'pantry', shelf: true,
	  alias: ['hot sauce', 'sauce'] },
	{ id: 'horseradish', label: 'Horseradish', kind: 'pantry', shelf: true,
	  alias: ['horseradish'] },
	{ id: 'orangeflower', label: 'Orange flower water', kind: 'pantry', shelf: true,
	  alias: ['orange flower water'] },
	{ id: 'rosewater', label: 'Rose water', kind: 'pantry', shelf: true, alias: ['rose water'] },
	{ id: 'vinegar', label: 'Vinegar', kind: 'pantry', shelf: true, alias: ['vinegar'] },
	{ id: 'rice', label: 'Rice', kind: 'pantry', shelf: true, alias: ['long-grain rice', 'rice'] },

	/* ---- zero proof ---------------------------------------------------------
	   The Zero Proof tab's own bottles. They are ordinary rows, not a special
	   case: an NA aperitivo is a thing a bar stocks or does not. */
	{ id: 'naaperitivo', label: 'NA bitter aperitivo', kind: 'liqueur', shelf: true,
	  alias: ['na bitter aperitivo', 'alcohol-free aperitivo', 'na aperitivo'] },
	{ id: 'nabitters', label: 'NA aromatic bitters', kind: 'bitters', shelf: true,
	  alias: ['na aromatic bitters', 'alcohol-free bitters', 'na bitters'] },
	{ id: 'naspirit', label: 'NA botanical spirit', kind: 'spirit', shelf: true,
	  alias: ['na botanical spirit', 'alcohol-free botanical spirit', 'na gin', 'na spirit'] },
	{ id: 'navermouth', label: 'NA red vermouth', kind: 'fortified', shelf: true,
	  alias: ['na red vermouth alternative', 'alcohol-free red vermouth alternative',
	          'na red vermouth'] },

	/* ---- everything a bar has and nobody stocks as a decision ---------------
	   These RESOLVE, which is the point: the gate can tell "this is salt" apart
	   from "the ledger has no idea what this is". They are never a requirement
	   and never a chip. */
	{ id: 'ice', label: 'Ice', kind: 'pantry', stock: false,
	  alias: ['ice', 'crushed ice', 'cracked ice', 'ice cubes'] },
	{ id: 'water', label: 'Water', kind: 'pantry', stock: false,
	  alias: ['water', 'hot water', 'boiling water', 'cold water', 'warm water'] },
	{ id: 'salt', label: 'Salt', kind: 'pantry', stock: false,
	  alias: ['salt', 'sea salt', 'kosher salt', 'saline', 'saline solution',
	          'black salt', 'celery salt', 'salt rim', 'tajín rim', 'tajín'] },
	{ id: 'pepper', label: 'Pepper', kind: 'pantry', stock: false,
	  alias: ['pepper', 'black pepper', 'cayenne'] },
	{ id: 'spice', label: 'Baking spice', kind: 'pantry', stock: false,
	  alias: ['cinnamon', 'clove', 'cloves', 'star anise', 'nutmeg', 'grated nutmeg',
	          'cardamom', 'turmeric', 'roasted cumin', 'cumin', 'allspice berries'] },

	/* ---- the two the ledger names but cannot stock --------------------------
	   "spirit of choice" and "any tart juice" are the recipe declining to
	   choose. They resolve so the gate stays quiet, and they are never a
	   requirement, because requiring them would be requiring nothing. */
	/* 'spirit' and 'citrus' now carry these, as requirements rather than as
	   things the ledger agrees to ignore. See the roots above. */
	/* The husk you just squeezed, dropped in for the oils. It is not a bottle. */
	{ id: 'spentshell', label: 'The spent shell', kind: 'produce', stock: false,
	  alias: ['spent shell', 'the spent shell'] },
	/* A made drink used as a component. The line names its own parts in a
	   parenthetical, so the bartender is not left guessing; the ledger simply
	   has no single bottle to ask a bar to stock. */
	{ id: 'madeshot', label: 'A made shot', kind: 'spirit', stock: false,
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
