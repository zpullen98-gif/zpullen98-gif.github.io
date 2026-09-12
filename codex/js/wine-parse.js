/* ---------------- A WINE LIST, AS TEXT, TURNED INTO ROWS ----------------

   PORTED VERBATIM from BartendersLedger/js/menu-parse.js, which was itself
   ported from the World Table's src/lib/menu-parse.ts. Three copies of one
   parser now exist and they are kept LINE FOR LINE the same on purpose, so
   that a fix to any of them can be diffed into the other two. Only the export
   name and this header differ. Do not tidy it to taste.

   Everything below this header is the food-menu parser's own comment, and it
   is kept because the comments ARE the specification.

   WHAT THE RULE BECOMES FOR WINE. The Ledger's version of the never-invent
   rule is QUANTITIES: a menu that prints "Gin, elderflower, cucumber" says
   nothing about how much, so the parser produces a price as printed and never
   a measure. A wine list is worse, because it prints things that LOOK like
   facts and are not: a producer name that is really an importer, a region in
   the section heading that does not apply to every wine under it, a grape the
   list omitted. So this file produces NOTHING but what the line actually said.
   The splitting into producer, wine and vintage happens in js/wine-rows.js,
   where it can be gated, and where a field it cannot read comes back EMPTY.

   Proved by .scripts/check-wine-import.js. */
var parseWineText;
(function(){
	/**
	 * A venue's own menu, as text, turned into rows a bartender can correct.
	 *
	 * The venue types The Bar's Menu in by hand today, one drink at a time. This
	 * reads a photographed or pasted menu instead and produces a DRAFT: every row is
	 * meant to be looked at and fixed before it is saved. That is why every row
	 * carries `raw`, the source line it came from, and why `confidence` exists.
	 * Nothing here writes to the session; the screen does that, after a person has
	 * agreed to it.
	 *
	 * THE RULE IT WAS WRITTEN FOR, AND THE RULE IT SERVES HERE. In the World
	 * Table this parser never produces allergen information, because a photograph
	 * of a menu cannot tell anybody what is in a dish and there is no allergen
	 * field on a parsed row at all, which is the cheapest way to make that
	 * mistake impossible rather than merely discouraged.
	 *
	 * The Ledger has no allergens. Its version of the same rule is QUANTITIES,
	 * and it is exactly as sharp. A menu prints 'Gin, elderflower, cucumber'
	 * and says nothing whatever about how much of each. An ounce invented here
	 * would reach lineOz, and from there balanceOf, estimateABV, the batch sheet
	 * and the pour-cost sheet, and a bartender would be shown a printed
	 * percentage with a dollar sign in front of it that came from nowhere. So
	 * this parser produces `price` as PRINTED and never a measure, the cocktail
	 * layer in js/menu-drinks.js never puts one on a spec line, and
	 * tools/check-import.mjs asserts that no produced line matches lineOz's own
	 * pattern. Blank is a true answer. A guess is not.
	 *
	 * `tags` carries the dietary MARKS THE MENU ITSELF PRINTED, the (v) and the
	 * [GF] the bar chose to put on the page, and nothing is ever derived for it.
	 * A bar record has no field for them, so the drinks layer drops them; they
	 * are kept here because this file is shared with the World Table and losing
	 * them would make the two stop diffing.
	 *
	 * ON CASE, AND WHY SECTION NAMES COME BACK AS PRINTED. A heading typed
	 * "STARTERS" is returned as "STARTERS", not tidied to "Starters". Title-casing
	 * is a lie waiting to happen the moment a menu says BBQ, PX, DOP or IPA, and the
	 * bartender is already editing these rows, so retyping one heading costs less than a
	 * wrong one shipped silently on every drink under it.
	 *
	 * ON OCR DAMAGE. The dirty-input rules here are about WHITESPACE and stray
	 * characters, never about spelling or digits. An OCR pass that reads 9.5 as
	 * "9.S" leaves a row with no price and `confidence: 'low'`, and that is the
	 * correct outcome: repairing it to 9.5 would be the parser inventing a price,
	 * which is the one thing a menu importer must never do.
	 */

	/** One draft row. Every field reports what the text said; none of them is a claim about the drink. */
	/**
	 * The size guard. A menu is a page or two: a long one runs to about 6kB of text,
	 * and a photographed one is shorter still. The cap sits two orders of magnitude
	 * above that because this runs synchronously on the main thread of a tab and the
	 * input is a paste box, which means one day it will contain a novel, a whole PDF
	 * dump or a log file. Everything past the cap is dropped rather than parsed, and
	 * `skipped` is told so in words, because reading half a menu and saying nothing
	 * about it would be the parser lying about how much of the page it saw.
	 */
	const MAX_CHARS = 200000;
	const MAX_LINES = 5000;
	const TRUNCATION_NOTICE =
		'Only the first 200,000 characters were read. Split the menu up and bring the rest in separately.';

	/**
	 * How far back from the end of a line a price is allowed to start, in tokens.
	 * Real price tails are short: 'Glass 8 Bottle 30' is already the long end at
	 * four. The limit stops the tail walk eating a whole sentence that happens to
	 * end in a number, and it bounds the work done per line on a pasted wall of text.
	 */
	const PRICE_TAIL_TOKENS = 8;

	/** Past this many characters a name is almost certainly a whole sentence read as one. */
	const LONG_NAME = 60;

	/** At most this many following lines can belong to the drink above as its description. */
	const MAX_CONTINUATION_LINES = 2;

	const CURRENCY_SYMBOL = '[\\u00A3\\u0024\\u20AC\\u00A5\\u20B9\\u20A9\\u0E3F\\u20BD\\u20BA\\u20AA]';
	const CURRENCY_CODE = '(?:GBP|USD|EUR|AUD|NZD|CAD|CHF|SEK|NOK|DKK|ZAR|JPY|INR|PLN|kr|p)';

	/**
	 * A price with its currency attached on either side: '£12', '12€', '50p'. With a
	 * currency present the digits are unambiguous, so up to five of them are allowed.
	 */
	const PRICED_WITH_CURRENCY = new RegExp(
		'^(?:' +
			CURRENCY_SYMBOL +
			'\\s?\\d{1,5}(?:[.,]\\d{1,2})?|\\d{1,5}(?:[.,]\\d{1,2})?\\s?(?:' +
			CURRENCY_SYMBOL +
			'|' +
			CURRENCY_CODE +
			'))$',
		'i'
	);

	/**
	 * A bare number with no currency anywhere.
	 *
	 * THE ONE PLACE THIS FILE DIVERGES FROM THE LEDGER AND WORLD TABLE COPIES,
	 * and it is here because a wine list prints numbers a food menu never does.
	 * The original capped a bare whole number at three digits, and its comment
	 * explained that the cap is what keeps 'Pinot Noir 2019' a dish name rather
	 * than a two-thousand-pound bottle. On a food menu that costs nothing. On a
	 * wine list it loses the top of the list: a bottle at 1250 or 4200 was not a
	 * price, so the number stayed inside the wine's name, or, when the line
	 * followed a priced one, the whole line was absorbed as the previous
	 * bottle's tasting note and that bottle left the import without a word.
	 *
	 * So the thing the cap was really protecting is named directly: four and
	 * five figure numbers are prices UNLESS they read 19xx or 20xx, which is a
	 * vintage. A thousands separator is read as one, because a list printing
	 * 1,250 means 1,250. A number carrying decimals is plainly a price.
	 */
	const PRICED_BARE = /^(?:\d{1,3}|\d{1,5}[.,]\d{1,2}|\d{1,3}[.,]\d{3}|(?!(?:19|20)\d{2}$)\d{4,5})$/;

	/** Market price in the forms menus actually print, kept exactly as printed. */
	const MARKET_PRICE = /^(?:m\.?p\.?|m\/p|mkt|p\.?o\.?a\.?)$/i;

	/**
	 * Words that sit next to a price without being one: sizes, measures and the
	 * per-head qualifiers. They may join a price tail but never start one on their
	 * own, which is what leaves 'Half chicken 14' a drink called Half chicken.
	 */
	const SIZE_WORD =
		/^(?:glass|gls|bottle|btl|carafe|pitcher|jug|half|full|small|large|sm|lg|reg|regular|pint|schooner|single|double|cup|pot|scoop|slice|each|ea|pp|supp|supplement|\d{2,4}\s?(?:ml|cl|oz))$/i;

	/** Punctuation that joins two prices together rather than separating a price from a name. */
	const CONNECTOR = /^(?:[/|,&]|[-–\u2014]+)$/;

	/** A currency standing alone as its own token: the '£' of '£ 12', the 'GBP' of '14 GBP'. */
	const LONE_CURRENCY = new RegExp('^(?:' + CURRENCY_SYMBOL + '|' + CURRENCY_CODE + ')$', 'i');

	/**
	 * The dietary marks a menu prints, and the only spellings accepted. Deliberately
	 * short: these are MARKS, so '(v)' and '(vegan)' are in and '(contains nuts)' is
	 * not, because that is prose about contents and this parser does not read
	 * contents. Anything not on the list leaves its bracket alone and stays in the
	 * drink name, where a person can see it and decide for themselves.
	 */
	const MARKS = {
		v: 'v',
		veg: 'v',
		vegetarian: 'v',
		vg: 'vg',
		ve: 'vg',
		vgn: 'vg',
		vegan: 'vg',
		gf: 'gf',
		glutenfree: 'gf',
		df: 'df',
		dairyfree: 'df',
		n: 'n'
	};

	/**
	 * The short marks, and the only ones allowed to be taken off the end of a line
	 * without brackets around them. Written-out words are excluded on purpose: 'Mixed
	 * veg 4' would otherwise come back as a drink called Mixed, tagged vegetarian.
	 */
	const BARE_MARK = /^(?:v|vg|ve|gf|df|n)$/i;

	/**
	 * Lines where the menu is talking about itself rather than selling anything.
	 * Kept as separate named patterns so it stays obvious what each one is for, and
	 * so a wrong one can be removed without unpicking a wall of alternation.
	 *
	 * The allergy notice earns its place twice over. It is not a drink, and it is
	 * also the line on a menu most likely to be mistaken for allergen data by
	 * something reading in a hurry, so it is named and dropped rather than left to
	 * fall through into a row.
	 */
	const NOISE = [
		/\bhttps?:\/\//i,
		/\bwww\.[a-z]/i,
		/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
		/\bfollow us\b|\binstagram\b|\bfacebook\b|\btwitter\b|\btiktok\b|(?:^|\s)@[a-z0-9_.]{3,}/i,
		/\b(vat|service charge|gratuity|discretionary|cover charge)\b/i,
		/\bprices?\s+(are|include|includes|including|inclusive|subject|shown)\b/i,
		/\ballerg(y|ies|en|ens|ic)\b|\bintoleranc/i,
		/\b(please|kindly)\s+(inform|note|tell|ask|advise|speak|let|make)\b/i,
		/\b(tel|telephone|phone|call us|reservations?|bookings?)\b.*\d{3}/i,
		/\bwe (cannot|can not|do not|don't) guarantee\b/i,
		/^(?:page\s*)?[\s~*_.\-–\u2014]*\d{1,3}[\s~*_.\-–\u2014]*$/i,
		/\b[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}\b/,
		/\b\d+[a-z]?\s+[\w'-]+\s+(street|road|avenue|lane|drive|square|place|terrace|gardens|gdns)\b/i
	];

	/** Days of the week in the abbreviations menus actually use. */
	const DAY_WORD =
		/\b(mon|tue|tues|wed|weds|thu|thur|thurs|fri|sat|sun)(?:day|s|nesday|rsday|urday|esday)?\b/i;

	/**
	 * A clock time, or a range of them. Only ever consulted about a line that turned
	 * out to have no price, because '18.50' reads as a time and as a price and the
	 * price is the reading that matters: 'Sunday roast 18.50' is a drink and 'Sunday
	 * 12 to 4' is opening hours.
	 */
	const CLOCK = /\d\s*(?:am|pm)\b|\d{1,2}[:.]\d{2}\b|\d\s*(?:[-–\u2014]|to|till|until)\s*\d/i;

	/** Small words a section heading may leave lower case without ceasing to be title case. */
	const SMALL_WORDS = new Set([
		'a',
		'an',
		'the',
		'of',
		'and',
		'to',
		'for',
		'from',
		'on',
		'in',
		'with',
		'by',
		'at',
		'&',
		'de',
		'du',
		'la',
		'le',
		'del'
	]);

	/** Everything one source line turned out to be, worked out before any of it is placed. */
	/** @returns true when the token is a price on its own, including a two-size '6/9'. */
	function isPrice(token){
		if (PRICED_WITH_CURRENCY.test(token) || PRICED_BARE.test(token)) return true;
		if (!token.includes('/')) return false;
		const parts = token.split('/');
		return (
			parts.length > 1 && parts.every((p) => PRICED_WITH_CURRENCY.test(p) || PRICED_BARE.test(p))
		);
	}

	/** How many prices a token stands for, so '6/9' counts as the two sizes it is. */
	function priceValues(token){
		if (MARKET_PRICE.test(token)) return 1;
		if (!isPrice(token)) return 0;
		return token.includes('/') ? token.split('/').length : 1;
	}


	function kindOf(token){
		if (isPrice(token)) return 'price';
		if (MARKET_PRICE.test(token)) return 'market';
		if (SIZE_WORD.test(token)) return 'size';
		if (LONE_CURRENCY.test(token)) return 'currency';
		if (CONNECTOR.test(token)) return 'connector';
		return 'other';
	}

	/**
	 * Split a line into what it is selling and what it costs, by walking in from the
	 * end and taking tokens for as long as they could be part of a price.
	 *
	 * Walking in from the end rather than matching a pattern against the whole line
	 * is what makes the awkward ones fall out for free: dot leaders have already
	 * become spaces by the time this runs, a two-size 'Glass 8 Bottle 30' is just a
	 * longer tail, and a name that merely contains a number ('Pizza 12 inch', 'Half
	 * and half 12') stops the walk at the first word that is not price-shaped.
	 *
	 * The tail is then trimmed at the front, and a size word may only lead when the
	 * tail holds two prices or more. That is the whole difference between 'Glass 8
	 * Bottle 30' (one wine sold two ways, kept verbatim) and 'Half chicken 14' (a
	 * drink called Half chicken, priced 14).
	 */
	function splitPrice(text){
		const tokens = text.split(' ').filter(Boolean);
		if (tokens.length < 2) return { name: text, price: '' };

		// 'Market price' written out in full is two tokens. Joined here so the walk
		// below can see the one price it is, the same way it already sees 'MP'.
		if (
			tokens.length > 2 &&
			/^market$/i.test(tokens[tokens.length - 2]) &&
			/^price\.?$/i.test(tokens[tokens.length - 1])
		) {
			const joined = tokens.slice(-2).join(' ');
			return { name: tokens.slice(0, -2).join(' '), price: joined };
		}

		let start = tokens.length;
		const floor = Math.max(1, tokens.length - PRICE_TAIL_TOKENS);
		while (start > floor && kindOf(tokens[start - 1]) !== 'other') start--;
		if (start === tokens.length) return { name: text, price: '' };

		let end = tokens.length;
		while (end > start && kindOf(tokens[end - 1]) === 'connector') end--;

		let values = 0;
		for (let i = start; i < end; i++) values += priceValues(tokens[i]);
		if (values === 0) return { name: text, price: '' };

		// One price keeps only the price itself; two or more is a list of sizes and
		// is kept whole, size words and all.
		if (values < 2) {
			while (start < end) {
				const kind = kindOf(tokens[start]);
				if (kind === 'price' || kind === 'market' || kind === 'currency') break;
				start++;
			}
		}

		return { name: tokens.slice(0, start).join(' '), price: tokens.slice(start, end).join(' ') };
	}

	/** @returns the mark a bracketed word stands for, or null when it is an ordinary word. */
	function markOf(word){
		const key = word.toLowerCase().replace(/[^a-z]/g, '');
		return key in MARKS ? MARKS[key] : null;
	}

	/** Decoration a menu hangs off the end of a drink name, whose legend lives elsewhere on the page. */
	function stripTrailingSymbols(text){
		return text.replace(/[\s*†‡♦◆●▪✿❋✹]+$/, '');
	}

	/**
	 * Take the dietary marks off a line and hand back the line without them.
	 *
	 * A bracketed group is only removed when EVERY word inside it is a mark, so '(v)'
	 * and '[GF, DF]' come off and '(served cold)' stays exactly where the bar put
	 * it. Bare marks are taken from the end of the line too, since 'Falafel v 8.50'
	 * is a common printing, but only the one and two letter marks: 'Mixed veg 4' must
	 * not come back as a drink called Mixed.
	 *
	 * Decorative symbols are removed from the name and produce NO tag. A star or a
	 * diamond means whatever the legend printed elsewhere on the menu says it means,
	 * this parser cannot see that legend, and deciding a diamond meant gluten free
	 * would be inventing a dietary claim on the bar's behalf.
	 */
	function takeMarks(text){
		const tags = [];
		const add = (mark) => {
			if (!tags.includes(mark)) tags.push(mark);
		};

		let out = text.replace(/[([]([^)\]]{1,40})[)\]]/g, (whole, inside) => {
			const inner = inside.split(/[\s,/&+.]+/).filter(Boolean);
			if (inner.length === 0) return whole;
			const marks = inner.map(markOf);
			if (marks.some((m) => m === null)) return whole;
			for (const m of marks) add(m);
			return ' ';
		});

		out = stripTrailingSymbols(out);
		for (;;) {
			const bare = out.match(/^(.*\S)\s+([A-Za-z]{1,2})$/);
			if (!bare || !BARE_MARK.test(bare[2])) break;
			add(markOf(bare[2]));
			out = stripTrailingSymbols(bare[1]);
		}

		return { text: out.replace(/\s{2,}/g, ' ').trim(), tags };
	}

	/** A line the menu prints about itself: a website, a notice, an address, a page number. */
	function isNoise(text){
		return NOISE.some((pattern) => pattern.test(text));
	}

	/**
	 * Opening hours, and telephone numbers however they have been punctuated. Both
	 * are asked only about a line that produced no price, because a drink line is a
	 * drink line: 'Sunday roast 18.50' carries a day name and a number that reads as
	 * a clock time, and it is still dinner.
	 */
	function isScheduleOrNumber(text){
		if (DAY_WORD.test(text) && CLOCK.test(text)) return true;
		const digits = text.replace(/\D/g, '');
		const letters = text.replace(/[^A-Za-z]/g, '');
		return digits.length >= 9 && digits.length <= 15 && letters.length <= 12;
	}

	/**
	 * Lines with nothing on them to sell: a rule of dashes, a lone price, and the
	 * single stray characters an OCR pass leaves behind when it finds a speck on the
	 * paper. The letter test is Unicode-wide on purpose, so a menu written in a
	 * script with no Latin letters is not thrown away as specks.
	 */
	function isJunk(text){
		if (!/\p{L}/u.test(text)) return true;
		return /^[A-Za-z]{1,2}$/.test(text);
	}

	function stripDecoration(text){
		return text
			.replace(/^[\s~*=+_.·•<>«»\-–\u2014#]+/, '')
			.replace(/[\s~*=+_.·•<>«»\-–\u2014#:]+$/, '')
			.trim();
	}

	function words(text){
		return text.split(/\s+/).filter(Boolean);
	}

	/**
	 * A heading the menu has shouted, decorated or punctuated, which therefore needs
	 * no help from its surroundings to be recognised: 'STARTERS', '~ Mains ~',
	 * a rule of dashes around 'Puddings', 'Sides:'.
	 *
	 * The shouting test insists on at least one A-Z, because a script without letter
	 * case has no capitals to shout with and every line of such a menu would
	 * otherwise qualify as a heading.
	 */
	function isStrongHeading(text){
		const core = stripDecoration(text);
		if (!core || !/\p{L}/u.test(core) || words(core).length > 6) return false;
		if (/^[~*=+_·•<>«»#\-–\u2014]/.test(text) && /[~*=+_·•»>#\-–\u2014]$/.test(text)) return true;
		if (text.trim().endsWith(':')) return true;
		return /[A-Z]/.test(core) && !/[a-z]/.test(core);
	}

	/**
	 * A heading in ordinary title case: 'To Begin', 'From the Grill', 'Sides'.
	 *
	 * This shape on its own is never enough to act on, because 'Bread' sitting under
	 * 'Chips 4' has exactly the same shape and is a side the bar sells. The
	 * caller insists on a blank line above and a priced line below before treating
	 * one of these as a heading; parseWineText says why that is the safer way round.
	 */
	function isWeakHeading(text){
		const core = stripDecoration(text);
		const parts = words(core);
		if (parts.length === 0 || parts.length > 5) return false;
		if (/[\d,]/.test(core)) return false;
		if (!/[a-z]/.test(core)) return false;
		return parts.every((w) => SMALL_WORDS.has(w.toLowerCase()) || /^\p{Lu}/u.test(w));
	}

	/**
	 * Where the name stops and the description starts.
	 *
	 * A dash, a colon or a pipe is punctuation the bar chose in order to separate
	 * the two, so a row split on one of those is trusted. A comma is not: 'Crispy
	 * squid, lemon aioli' splits correctly and 'Ham, egg and chips' does not, and
	 * nothing in the line says which one it is looking at. Rows split on a comma come
	 * back marked ambiguous so the screen can flag them, and the bartender can run an eye
	 * down the column and fix the two that are wrong.
	 *
	 * Neither split may happen INSIDE a bracket. A menu that keys its allergens on
	 * the drink prints 'Sticky toffee pudding (N, G, D)', and splitting on the first
	 * comma there gave a drink called 'Sticky toffee pudding (N' with 'G, D)' for a
	 * description: two halves of a bracket, in two fields, and neither of them a
	 * drink. The letters themselves are still never read as allergens, here or
	 * anywhere else in this module. They are the menu's own legend and the bartender is
	 * the one who checks a drink.
	 */
	function splitAt(text, re){
		/* Walk the candidates and take the first that sits at bracket depth zero. */
		const rx = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
		let depth = 0;
		const opens = { '(': ')', '[': ']', '{': '}' };
		const closes = new Set([')', ']', '}']);
		for (let i = 0; i < text.length; i++) {
			const ch = text[i];
			if (opens[ch]) depth++;
			else if (closes.has(ch)) depth = Math.max(0, depth - 1);
			else if (depth === 0) {
				rx.lastIndex = i;
				const m = rx.exec(text);
				if (m && m.index === i) {
					const head = text.slice(0, i).trim();
					const tail = text.slice(i + m[0].length).trim();
					if (head && tail) return [head, tail];
				}
			}
		}
		return null;
	}

	function splitDescription(name){
		const clear = splitAt(name, /(?:\s[-–\u2014]\s|:\s|\s?\|\s?)/);
		if (clear) return { name: clear[0], description: clear[1], ambiguous: false };

		const comma = splitAt(name, /,\s*/);
		if (comma) return { name: comma[0], description: comma[1], ambiguous: true };

		return { name: name.trim(), description: '', ambiguous: false };
	}

	/**
	 * The index number a takeaway menu prints in front of every drink: '12. Sweet and
	 * sour pork', '13) Kung po chicken', '14 - Egg fried rice'.
	 *
	 * Taken off the front because it is the menu's own numbering rather than part of
	 * what the drink is called, and because leaving it on was worse than untidy. The
	 * dash form fed straight into the name and description split, which reads ' - '
	 * as punctuation the bar chose in order to separate the two, so '14 - Egg
	 * fried rice 3.90' came back as a drink called '14' carrying 'Egg fried rice' for
	 * a description, and came back marked 'high' because on that reading nothing had
	 * to be guessed. A wrong row that says it is sure is the one shape this parser
	 * must not produce.
	 *
	 * A letter has to follow the number, and that guard is doing three jobs: a bare
	 * '12.' stays a page number for the noise rules to throw away, a price standing
	 * on its own line is never read as an index, and a decimal like '12.50 Soup' on
	 * a menu that prints the price first keeps its price. The dash form additionally
	 * insists on the spaces a menu's numbering puts round the dash, which is what
	 * leaves a hyphenated name such as '5-spice duck' alone.
	 */
	const ITEM_NUMBER = /^\d{1,3}(?:\s*[.)]\s*|\s+[-–\u2014]\s+)(?=[^\s\d])/;

	/** Everything a single line is, worked out once so the placing pass can look ahead cheaply. */
	function scan(raw){
		const collapsed = raw
			// A photographed or pasted menu arrives full of non-breaking, thin and
			// narrow spaces. They are invisible in an editor and they break every
			// split on ' ', so they become ordinary spaces before anything else runs.
			.replace(/[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
			// Dot and underscore leaders are a printer drawing the eye across to the
			// price. Turned into a space, they stop being a problem for anything below.
			.replace(/(?:[.·_]{2,}|…+)/g, ' ')
			.replace(/(\S)\s*[-–\u2014]{3,}\s*(\S)/g, '$1 $2')
			.replace(/\s+/g, ' ')
			.trim()
			// Last, so the whitespace above has already been made ordinary and the
			// number is where the pattern expects to find it. `raw` still carries the
			// line as printed, so a row worth checking still shows the bartender the
			// numbering that was taken off it.
			.replace(ITEM_NUMBER, '');
		const base = {
			raw,
			text: collapsed,
			blank: collapsed === '',
			indented: /^[ \t]{2,}|^\t/.test(raw),
			noise: false,
			tags: [],
			price: '',
			name: ''
		};
		if (base.blank) return base;
		if (isNoise(collapsed) || isJunk(collapsed)) return { ...base, noise: true };

		const marked = takeMarks(collapsed);
		const split = splitPrice(marked.text);
		if (split.price === '' && isScheduleOrNumber(collapsed)) return { ...base, noise: true };

		// A mark sits after the price as readily as before it, so the name is swept a
		// second time now that the price is out of the way: 'Falafel v 8.50'.
		const trailing = takeMarks(split.name);
		return {
			...base,
			tags: [...marked.tags, ...trailing.tags.filter((t) => !marked.tags.includes(t))],
			price: split.price,
			name: stripDecoration(trailing.text)
		};
	}

	/** Build one row and add it to the draft. */
	function emit(s, section, dishes){
		const split = splitDescription(s.name);
		const dish = {
			section,
			name: split.name,
			description: split.description,
			price: s.price,
			tags: s.tags,
			// Three ways a row earns a second look: nobody could find a price, the name
			// is long enough to be a whole sentence read as one, or the split between
			// name and description was made on a comma and could be wrong.
			confidence: s.price === '' || split.name.length > LONG_NAME || split.ambiguous ? 'low' : 'high',
			raw: s.raw
		};
		dishes.push(dish);
		return dish;
	}

	/**
	 * Read a menu.
	 *
	 * Total by construction: any string in, a result out, no throw. A line it cannot
	 * place becomes a low-confidence row rather than disappearing, because a junk row
	 * on screen is one click to delete and a dropped drink is invisible.
	 *
	 * THE ONE JUDGEMENT CALL WORTH KNOWING ABOUT is what happens to a priceless line
	 * in title case. 'Sides' and 'Bread' are the same shape and a menu prints both.
	 * Treating every one of them as a heading loses the side silently; treating none
	 * of them as a heading leaves 'To Begin' sitting in the drink column. So a
	 * title-case line becomes a heading only when it has a blank line above it and a
	 * priced line below, which is how menus lay headings out and is not how a side in
	 * the middle of a list looks. Shouted, decorated and colon-terminated headings
	 * need none of that, being unmistakable on their own. When the test fails the
	 * line becomes a low-confidence row, which is the recoverable direction.
	 */
	function parseWineTextImpl(text){
		const dishes = [];
		const skipped = [];
		if (typeof text !== 'string' || text === '') return { dishes, skipped };

		let truncated = false;
		let body = text;
		if (body.length > MAX_CHARS) {
			body = body.slice(0, MAX_CHARS);
			truncated = true;
		}
		const lines = body.replace(/\r\n?/g, '\n').split('\n');
		if (lines.length > MAX_LINES) {
			lines.length = MAX_LINES;
			truncated = true;
		}

		const scans = lines.map(scan);

		/** @returns true when the next line worth reading is a priced drink. */
		const pricedLineFollows = (from) => {
			for (let i = from + 1; i < scans.length; i++) {
				if (scans[i].blank || scans[i].noise) continue;
				return scans[i].price !== '';
			}
			return false;
		};

		let section = '';
		let current = null;
		let continuations = 0;

		for (let i = 0; i < scans.length; i++) {
			const s = scans[i];
			if (s.blank) {
				current = null;
				continue;
			}
			if (s.noise) {
				skipped.push(s.raw);
				current = null;
				continue;
			}
			if (s.name === '') {
				// The line was nothing but a price, or nothing but marks. There is no drink
				// here to name, and a row with no name is never emitted.
				skipped.push(s.raw);
				continue;
			}

			if (s.price !== '') {
				current = emit(s, section, dishes);
				continuations = 0;
				continue;
			}

			const weak = isWeakHeading(s.text);
			const afterBreak = scans[i - 1] === undefined || scans[i - 1].blank;
			if (isStrongHeading(s.text) || (weak && afterBreak && pricedLineFollows(i))) {
				section = stripDecoration(s.text);
				current = null;
				continuations = 0;
				continue;
			}

			// A description running on below its drink. A heading-shaped line is not
			// allowed to be one, because gluing 'Bread' onto the chips above it would
			// lose a side the bar sells. An indented line is allowed to be one
			// whatever its shape, because headings do not sit in from the margin.
			if (current && continuations < MAX_CONTINUATION_LINES && (!weak || s.indented)) {
				current.description = current.description ? current.description + ' ' + s.text : s.text;
				current.raw += '\n' + s.raw;
				for (const t of s.tags) if (!current.tags.includes(t)) current.tags.push(t);
				continuations++;
				continue;
			}

			current = emit(s, section, dishes);
			continuations = 0;
		}

		if (truncated) skipped.push(TRUNCATION_NOTICE);
		return { dishes, skipped };
	}

/* the one export */
parseWineText = parseWineTextImpl;
})();
