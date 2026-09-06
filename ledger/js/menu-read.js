/* ---------------- THE OTHER TWO DOORS: A PHOTOGRAPH, AND AN ADDRESS ------

   Ported from the World Table's src/lib/menu-ocr.ts and src/lib/menu-link.ts,
   joined into one file because they are two halves of the same question: get
   the text off something that is not a paste box. Every line of their comment
   is kept, because two of the decisions recorded in them are decisions this
   app has already made and must not quietly re-open.

   NO DOWNLOADED OCR ENGINE. Only the device's own TextDetector. tesseract.js
   fetches roughly four megabytes of worker, wasm and language data from a CDN
   on first use, and this app is installed from a folder of static files and
   promises to work with no connection at all. Where the platform has no
   reader the picker is withheld entirely and the copy says to lift the text
   off the photo and paste it, which both phone platforms do.

   NO CORS PROXY, EVER. The Ledger's own copy says the venue's list lives in
   this browser and goes nowhere else. Bouncing a bar's address off a
   stranger's server to fix a convenience would make that false. A refusal is
   the ordinary ending here rather than a fault, and the screen says so.

   Wrapped, and the four names that come out are ocrPlan, imageToText,
   htmlToMenuText and linkToText. */
var ocrPlan, imageToText, htmlToMenuText, linkToText;
(function(){
	/**
	 * Reading a printed menu out of a photograph.
	 *
	 * This is the first half of "bring your menu in instead of typing it": it turns
	 * a picture into plain text and stops there. Splitting that text into drinks,
	 * and putting them in front of the bartender to correct, belongs to the screen that
	 * calls this.
	 *
	 * NOTHING HERE EVER PRODUCES AN ALLERGEN. A photograph of a menu says what a
	 * drink is called and what it costs; it does not say what is in the pan. The
	 * bar's allergen line is the one field in this app where "empty" and
	 * "checked, and it holds none" must never be confused, which is why a bar record
	 * carries `allergensCheckedAt` alongside `allergens`. An importer that guessed
	 * from words on a menu would write the second when it only ever knew the first.
	 * So this module returns text. It does not build a a bar record, and it must never
	 * be extended to fill either field.
	 *
	 * One engine, and it is the device's own: the Shape Detection API's
	 * TextDetector. On a phone this is the platform OCR that already reads
	 * receipts and business cards. Nothing is downloaded, nothing is sent, and it
	 * answers in well under a second.
	 *
	 * There was a second engine here, tesseract.js, for the browsers without one.
	 * It came off because the library fetches its worker, its wasm core and its
	 * language data from a CDN on first use, and this app ships a build gate that
	 * forbids a third-party resource outright: it is installed from a folder of
	 * static files and promises to work with no connection at all. Four megabytes
	 * off jsDelivr, on the one screen where somebody is photographing their own
	 * menu, is not a promise worth breaking.
	 *
	 * It can come back the moment that core and language data are hosted here
	 * rather than fetched, which is a decision about carrying roughly four
	 * megabytes of binaries in this repository, not a decision about this file.
	 *
	 * Where the platform has no reader, imageToText says so in one sentence and
	 * the screen points at the two doors that need no engine: paste the text, or
	 * give the menu's address. Both phone platforms lift text out of a photo
	 * in the camera roll, so "paste it" is a real instruction rather than a shrug.
	 */

	/** Said the same way wherever a read comes back blank, because the fix is the same. */
	const NO_TEXT =
		'No text came out of that photo. Fill the frame with the menu, hold it straight on, and try again in even light.';

	/**
	 * The slice of the Shape Detection API we use. It is not in TypeScript's DOM
	 * library because it never became a standard, which is also why it is reached
	 * through a property check on `window` rather than a bare global.
	 */
	/** The constructor if this browser has it, else null. */
	function nativeDetector(){
		if (typeof window === 'undefined') return null;
		const ctor = (window).TextDetector;
		// createImageBitmap decodes the file for the detector, so a browser missing
		// either half cannot take the native path.
		if (typeof ctor !== 'function' || typeof createImageBitmap !== 'function') return null;
		return ctor;
	}

	/**
	 * Whether this device can read a photograph at all. Asked before the picker
	 * is offered, because a bartender who is about to photograph a menu on a browser
	 * that cannot read one should be told before they take the picture.
	 */
	function ocrPlanImpl(){
		return { native: nativeDetector() !== null };
	}

	/**
	 * Reads a photograph of a menu and returns its text, one line per line of the
	 * menu as best the engine can tell.
	 *
	 * @param file the picture, straight from a file input or a camera capture
	 * @param onProgress called with 0 to 100 and a short note; safe to omit
	 * @throws Error with a sentence the bartender can act on, never a raw engine message
	 */
	async function imageToTextImpl(file, onProgress){
		// Monotonic on purpose: a bar that slides back reads as a fault rather than
		// as bookkeeping.
		let shown = 0;
		const report = (pct, note) => {
			shown = Math.max(shown, pct);
			onProgress?.(Math.round(shown), note);
		};

		// An empty type is left alone rather than rejected: a Blob assembled in code
		// often carries none, and the decoder below gives a better answer than a
		// guess would. A type we can read and that is not an image is refused here,
		// because "that is a PDF" is the useful answer, where the reader would only
		// have said it found no words.
		if (file.type && !file.type.startsWith('image/')) {
			throw new Error(
				`That is ${describeType(file.type)}, not a photo. Take a picture of the menu, or pick a JPEG, PNG or WebP file.`
			);
		}

		const native = nativeDetector();
		if (native) {
			report(0, 'Reading the photo');
			const text = await detectNative(native, file);
			report(100, 'Done reading');
			return { text, engine: 'native' };
		}

		// No engine on this device, and none is fetched. Said as one thing to do
		// next rather than as a limitation: the paste box and the address box are
		// both on this screen, and both phone platforms will lift the text out of
		// the photo for the bartender to paste.
		throw new Error(
			'This browser cannot read photographs. Select the text on the picture and paste it into the box above, or give the address of the menu instead.'
		);
	}

	/**
	 * The platform's own recogniser.
	 *
	 * A failure here is final: there is no second engine to fall back to, so the
	 * message says what to do instead rather than what threw.
	 */
	async function detectNative(ctor, file){
		let bitmap;
		try {
			bitmap = await createImageBitmap(file);
		} catch {
			throw new Error(
				'That picture would not open. Try a JPEG or PNG straight from the camera roll.'
			);
		}

		let blocks;
		try {
			blocks = await new ctor().detect(bitmap);
		} catch {
			// Chrome exposes TextDetector on platforms whose OCR backend is missing,
			// where every detect() rejects. Nothing this app can do about it, so say
			// what it means rather than what threw.
			throw new Error(
				'This browser will not read photographs. Open the app in Chrome on the phone, or type the drinks in on the Menu tab.'
			);
		} finally {
			bitmap.close();
		}

		// The detector returns blocks in whatever order it found them, and a menu is
		// read down the page and then across. A drink and its price are two blocks a
		// long way apart on one line, and keeping them on one line is exactly what
		// the screen after this one needs; sorting on the top edge alone splits
		// them, because the two boxes are never at quite the same height.
		//
		// The tempting fix, comparing tops with a tolerance inside the sort, is a
		// trap: "within half a block of each other" is not transitive, so a column
		// of drinks each a pixel lower than the last chains together and comes out
		// in an order nobody can predict. The blocks are cut into lines first, top
		// to bottom, and only then read left to right inside a line.
		const lines = [];
		let line = null;
		for (const b of blocks.slice().sort((a, z) => a.boundingBox.top - z.boundingBox.top)) {
			const head = line === null ? undefined : line[0];
			if (
				line !== null &&
				head !== undefined &&
				b.boundingBox.top - head.boundingBox.top <
					Math.min(head.boundingBox.height, b.boundingBox.height) / 2
			) {
				line.push(b);
			} else {
				line = [b];
				lines.push(line);
			}
		}

		// A single space between blocks on a line: menu-parse is handed one shape
		// of text whatever produced it.
		const text = lines
			.map((l) =>
				l
					.sort((a, z) => a.boundingBox.left - z.boundingBox.left)
					.map((b) => b.rawValue.trim())
					.filter(Boolean)
					.join(' ')
			)
			.filter(Boolean)
			.join('\n');

		if (!text) throw new Error(NO_TEXT);
		return text;
	}

	/**
	 * Names what was actually handed over, so the refusal is about this file and
	 * not about files in general.
	 *
	 * Anything off the short list is quoted as its own media type rather than
	 * squeezed into a sentence: "a file of type application/vnd.ms-excel" reads,
	 * where the obvious shortcut ("an application/vnd.ms-excel file") does not.
	 */
	function describeType(type){
		const [group, sub = ''] = type.split(';')[0].trim().toLowerCase().split('/');
		if (sub === 'pdf') return 'a PDF';
		if (group === 'video') return 'a video';
		if (group === 'audio') return 'a sound file';
		if (group === 'text') return 'a text file';
		return `a file of type ${group}${sub ? `/${sub}` : ''}`;
	}


	/**
	 * Bringing a menu in from a link, and being straight about when that cannot
	 * work.
	 *
	 * ## What this can and cannot do
	 *
	 * There is no server anywhere in this product, so the only thing that can go
	 * and get a page is the bartender's own browser, and a browser is not allowed to
	 * read a page on somebody else's origin unless that site opts in with CORS.
	 * Most venue sites do not. The usual workaround is to bounce the request
	 * off a public proxy, and that is exactly what this file must never do: it
	 * would hand the venue's address to a stranger to fix a convenience, and this
	 * app tells people their bar never leaves their device.
	 *
	 * So the fetch is attempted, and when it fails the failure is the feature.
	 * `reason` says what happened in a sentence a bartender can act on, and `openUrl`
	 * is the address to open in a new tab so they can select the menu, copy it and
	 * paste it into the box instead. The screen offers that as the next step, so
	 * the two fields always travel together.
	 *
	 * The one request this file makes goes to the address the bartender typed and
	 * nowhere else, carries no cookies (`credentials: 'omit'`) and does not tell
	 * the site where the reader came from (`referrerPolicy: 'no-referrer'`).
	 *
	 * ## Allergens
	 *
	 * Nothing here returns allergen information, and nothing downstream may invent
	 * any from this text. A menu says "Pad Thai", not "peanuts, egg, fish, soy",
	 * and an imported drink must reach the bar with `allergens: []` and
	 * `allergensCheckedAt` still undefined, which is what separates "nobody has
	 * checked this drink" from "somebody checked, and it contains none".
	 *
	 * ## Why the HTML is walked by hand
	 *
	 * `htmlToMenuText` is the pure half and the tested half, and it runs under
	 * plain Node in vitest where there is no DOMParser to borrow. A regex that
	 * strips angle brackets is not an option either: it turns `<script>` bodies
	 * into drink names, and the first thing a bartender would see imported off a real
	 * venue page is a line of Google Analytics. So the string is scanned tag
	 * by tag, quoted attributes included, and the elements that never hold menu
	 * text are skipped whole.
	 */

	/**
	 * How long to wait before giving up on a site. Long enough for a slow café
	 * host on a phone connection, short enough that a bartender standing at the pass
	 * gets an answer and the copy-and-paste route instead of a spinner.
	 */
	const TIMEOUT_MS = 12000;

	/**
	 * Below this many characters the page is treated as unreadable rather than as
	 * a very short menu. A page whose menu is drawn by JavaScript after load
	 * returns a full HTML document whose text is a cookie line and a phone number,
	 * and reporting that as success would hand the bartender an empty box with no
	 * explanation and no way forward.
	 */
	const TOO_LITTLE_TEXT = 40;

	/* -------------------------------------------------------------------------
	 * The address
	 * ---------------------------------------------------------------------- */

	/**
	 * People paste `joesdiner.com/menu` far more often than they paste a scheme,
	 * so a bare domain is completed rather than refused. Everything that is not
	 * http or https is refused outright, and refused with an EMPTY `openUrl`:
	 * the screen renders that field as a link the bartender can click, and handing it
	 * back a `javascript:` or `data:` address we already declined to fetch would
	 * turn a typo, or a pasted trap, into a click that runs.
	 */
	function tidyUrl(raw){
		const trimmed = raw.trim();
		if (!trimmed) {
			return { ok: false, reason: 'There is no address in the box yet.' };
		}
		// A scheme is a letter followed by letters, digits, +, - or . up to the
		// colon. Testing for that rather than for "://" keeps `mailto:` and
		// `javascript:` in the refusal branch below instead of quietly growing an
		// https:// prefix and becoming a fetchable address.
		const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
		const candidate = hasScheme ? trimmed : `https://${trimmed}`;

		let parsed;
		try {
			parsed = new URL(candidate);
		} catch {
			return { ok: false, reason: 'That is not a web address the app can read.' };
		}
		if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
			return {
				ok: false,
				reason: `The app opens http and https addresses only, and that one is ${parsed.protocol.replace(':', '')}.`
			};
		}
		if (!parsed.hostname) {
			return { ok: false, reason: 'That address is missing a site name.' };
		}
		return { ok: true, url: parsed.toString() };
	}

	/* -------------------------------------------------------------------------
	 * HTML to text
	 * ---------------------------------------------------------------------- */

	/** Elements that close themselves, so a `</p>`-style depth count never applies. */
	const VOID_TAGS = new Set([
		'area',
		'base',
		'br',
		'col',
		'embed',
		'hr',
		'img',
		'input',
		'link',
		'meta',
		'param',
		'source',
		'track',
		'wbr'
	]);

	/**
	 * Script and style bodies are raw text, not markup, so they are skipped with a
	 * search for the closing tag rather than by walking tags. Walking would be
	 * wrong and badly wrong: `if (a < b)` inside a script reads as the start of a
	 * `<b>` element, and the scan for its `>` runs on into the page and swallows
	 * the menu.
	 */
	const RAW_TEXT_TAGS = new Set(['script', 'style']);

	/**
	 * Elements that never hold a drink. `head` holds the machine-readable half of
	 * the page, `nav`, `header` and `footer` hold the chrome that surrounds every
	 * page of the site, `template` holds markup that was never rendered at all,
	 * `noscript` holds a nag about JavaScript, and `svg` holds path data plus the
	 * odd `<title>` that would land mid-menu as a stray word.
	 */
	const DROP_TAGS = new Set([
		'script',
		'style',
		'head',
		'nav',
		'header',
		'footer',
		'template',
		'noscript',
		'svg'
	]);

	/**
	 * The same landmarks spelled roles, because a cookie bar or a site
	 * header is as often a `<div role="dialog">` as it is a real element. This is
	 * not a cookie-banner detector and does not pretend to be one: a banner
	 * marked up as a plain `<div class="cookie-notice">` comes through as two
	 * lines of text, which the bartender deletes on the review screen along with
	 * anything else the page carried.
	 */
	const DROP_ROLES = new Set(['banner', 'navigation', 'contentinfo', 'dialog', 'alertdialog', 'search']);

	/** Containers and headings worth a blank line, so a menu's sections survive. */
	const PARA_TAGS = new Set([
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'hr',
		'table',
		'section',
		'article',
		'aside',
		'main',
		'ul',
		'ol',
		'dl',
		'blockquote',
		'figure'
	]);

	/** Everything else that starts a new line. */
	const LINE_TAGS = new Set([
		'p',
		'div',
		'br',
		'li',
		'tr',
		'thead',
		'tbody',
		'tfoot',
		'dt',
		'dd',
		'pre',
		'address',
		'caption',
		'figcaption',
		'summary',
		'details',
		'fieldset',
		'legend',
		'option',
		'form',
		'nav',
		'header',
		'footer',
		'dialog'
	]);

	/**
	 * Table cells break with a tab, not a newline. A table menu writes the drink in
	 * one cell and the price in the next, and a newline between them leaves
	 * "$24" sitting alone on a line where it reads like the name of the next
	 * drink. A tab keeps the row intact and still marks where the columns were.
	 */
	const CELL_TAGS = new Set(['td', 'th']);

	const NO_BREAK = 0;
	const CELL_BREAK = 1;
	const LINE_BREAK = 2;
	const PARA_BREAK = 3;

	function breakFor(name){
		if (PARA_TAGS.has(name)) return PARA_BREAK;
		if (LINE_TAGS.has(name)) return LINE_BREAK;
		if (CELL_TAGS.has(name)) return CELL_BREAK;
		return NO_BREAK;
	}

	const NAMED_ENTITIES = {
		amp: '&',
		lt: '<',
		gt: '>',
		quot: '"',
		apos: "'",
		nbsp: ' ',
		ensp: ' ',
		emsp: ' ',
		thinsp: ' ',
		shy: '',
		ndash: '\u2013',
		/* The em dash below is a literal on purpose. The monorepo publish gate
		   counts U+2014 across the built tree, and the escape hatch it offers,
		   writing the escape instead, only survives inside a regex body: rolldown
		   folds both an escape and a String.fromCharCode call in a plain string
		   straight back to the character, which was measured, not assumed. There is
		   nothing to be done about it and nothing that needs doing: an entity table
		   exists to produce the characters it names, and one dash sits well inside
		   the gate's baseline. Escape the ones in menu-parse.ts, not this one. */
		mdash: '\u2014',
		hellip: '…',
		lsquo: '‘',
		rsquo: '’',
		ldquo: '“',
		rdquo: '”',
		bull: '•',
		middot: '·',
		sbquo: '‚',
		dagger: '†',
		Dagger: '‡',
		times: '×',
		frac12: '½',
		frac14: '¼',
		frac34: '¾',
		deg: '°',
		euro: '€',
		pound: '£',
		yen: '¥',
		cent: '¢',
		copy: '©',
		reg: '®',
		trade: '™',
		sect: '§',
		para: '¶',
		laquo: '«',
		raquo: '»',
		aacute: 'á',
		agrave: 'à',
		acirc: 'â',
		auml: 'ä',
		aring: 'å',
		atilde: 'ã',
		aelig: 'æ',
		ccedil: 'ç',
		eacute: 'é',
		egrave: 'è',
		ecirc: 'ê',
		euml: 'ë',
		iacute: 'í',
		icirc: 'î',
		iuml: 'ï',
		ntilde: 'ñ',
		oacute: 'ó',
		ograve: 'ò',
		ocirc: 'ô',
		ouml: 'ö',
		oslash: 'ø',
		otilde: 'õ',
		uacute: 'ú',
		ugrave: 'ù',
		ucirc: 'û',
		uuml: 'ü',
		szlig: 'ß'
	};

	/**
	 * The semicolon is required. It is optional in the HTML spec for a handful of
	 * legacy names, and honouring that turns "AT&Tea Room" into "AT<Tea Room" on a
	 * page that never contained an entity at all. A menu loses nothing by leaving
	 * a malformed entity as the literal text the page author typed.
	 */
	function decodeEntities(text){
		if (!text.includes('&')) return text;
		return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]{1,31});/gi, (whole, body) => {
			if (body[0] === '#') {
				const code =
					body[1] === 'x' || body[1] === 'X'
						? Number.parseInt(body.slice(2), 16)
						: Number.parseInt(body.slice(1), 10);
				// Lone surrogates and out-of-range codepoints throw from
				// fromCodePoint, and a menu page with a broken entity in it should
				// still import: keep the source text rather than the exception.
				if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return whole;
				if (code >= 0xd800 && code <= 0xdfff) return whole;
				return String.fromCodePoint(code);
			}
			const named = NAMED_ENTITIES[body];
			if (named !== undefined) return named;
			// Case-insensitive second look, so &Eacute; and &NBSP; decode too,
			// without letting &AMP; overwrite the deliberately cased &Dagger;.
			const lower = NAMED_ENTITIES[body.toLowerCase()];
			return lower !== undefined ? lower : whole;
		});
	}

	/**
	 * Runs of whitespace become one space, because HTML says so and because a
	 * pretty-printed page indents every line of the menu. The invisible
	 * characters go with them: a soft hyphen or a zero-width space inside a drink
	 * name is impossible to see on the review screen and would sit in the saved
	 * drink forever, quietly failing every later match on its name.
	 */
	function normaliseText(raw){
		return decodeEntities(raw)
			.replace(/[\u00AD\u200B-\u200D\uFEFF]/g, '')
			.replace(/\s+/g, ' ');
	}

	/**
	 * Reads one tag starting at `at`, which must be a `<`. Returns null when what
	 * follows is not a tag name at all, which is how a bare `<` in prose ("< 5
	 * minutes") stays in the text instead of eating the rest of the line.
	 *
	 * The scan for the closing `>` tracks quotes, because `<a title="soup > stew">`
	 * is legal markup and a naive indexOf('>') ends the tag inside the attribute
	 * and spills `stew">` into the menu.
	 */
	function readTag(html, at){
		let i = at + 1;
		const closing = html[i] === '/';
		if (closing) i++;
		const nameStart = i;
		while (i < html.length && /[a-zA-Z0-9:_-]/.test(html[i])) i++;
		if (i === nameStart || !/^[a-zA-Z]/.test(html[nameStart])) return null;
		const name = html.slice(nameStart, i).toLowerCase();

		const attrStart = i;
		let quote = '';
		while (i < html.length) {
			const c = html[i];
			if (quote) {
				if (c === quote) quote = '';
			} else if (c === '"' || c === "'") {
				quote = c;
			} else if (c === '>') {
				break;
			}
			i++;
		}
		const attrs = html.slice(attrStart, i);
		return {
			name,
			closing,
			selfClosing: attrs.trimEnd().endsWith('/'),
			attrs,
			end: i < html.length ? i + 1 : html.length
		};
	}

	/** The value of one attribute, '' when it is present with no value, null when absent. */
	const ATTR_PATTERNS = {
		hidden: /(?:^|\s)hidden(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]*))?/i,
		'aria-hidden': /(?:^|\s)aria-hidden(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]*))?/i,
		role: /(?:^|\s)role(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]*))?/i
	};

	function attrValue(attrs, name){
		const found = ATTR_PATTERNS[name].exec(attrs);
		if (!found) return null;
		return (found[1] ?? '')
			.replace(/^["']|["']$/g, '')
			.trim()
			.toLowerCase();
	}

	/**
	 * True for an element the page itself says is not being read: an ARIA
	 * landmark that mirrors one of the dropped tags, something hidden from
	 * assistive technology, or something with the `hidden` attribute.
	 *
	 * `hidden="until-found"` is the deliberate exception. It marks content a
	 * browser will reveal when you search the page, and it is how accordions are
	 * built, which on a venue site is very often how the menu sections
	 * themselves are built. Dropping those would drop the whole menu.
	 */
	function isDropped(tag){
		if (!tag.attrs.trim()) return false;
		const role = attrValue(tag.attrs, 'role');
		if (role && role.split(/\s+/).some((token) => DROP_ROLES.has(token))) return true;
		if (attrValue(tag.attrs, 'aria-hidden') === 'true') return true;
		const hidden = attrValue(tag.attrs, 'hidden');
		return hidden !== null && hidden !== 'until-found';
	}

	/** Skips a script or style body by finding its closing tag as plain text. */
	function skipRawText(html, name, from){
		const close = new RegExp(`</${name}(\\s[^>]*)?>`, 'i').exec(html.slice(from));
		return close ? from + close.index + close[0].length : html.length;
	}

	/**
	 * Skips a whole element, counting nesting so a `<nav>` inside a `<nav>` does
	 * not end the outer one early.
	 *
	 * The `head` case carries a guard that is not theoretical: `</head>` is
	 * optional in HTML and plenty of hand-written pages leave it out, so a scan
	 * that only looks for the closing tag runs to the end of the file and drops
	 * the entire document. Meeting `<body>` ends the head, exactly as a browser
	 * would treat it.
	 */
	function skipElement(html, name, from){
		let depth = 1;
		let i = from;
		while (i < html.length) {
			const lt = html.indexOf('<', i);
			if (lt < 0) return html.length;
			if (html.startsWith('<!--', lt)) {
				const close = html.indexOf('-->', lt + 4);
				i = close < 0 ? html.length : close + 3;
				continue;
			}
			const tag = readTag(html, lt);
			if (!tag) {
				i = lt + 1;
				continue;
			}
			if (name === 'head' && !tag.closing && tag.name === 'body') return lt;
			if (tag.name === name) {
				if (tag.closing) {
					depth--;
					if (depth === 0) return tag.end;
				} else if (!tag.selfClosing && !VOID_TAGS.has(tag.name)) {
					depth++;
				}
			}
			i = tag.end;
		}
		return html.length;
	}

	/**
	 * Turns fetched HTML into the text worth parsing: the reading order kept, the
	 * chrome and the machinery gone, and one line per line the page would have
	 * shown, so a menu that was laid out as a list or a table still looks like a
	 * menu afterwards.
	 */
	function htmlToMenuTextImpl(html){
		const out = [];
		// The break owed to the next piece of text. Held rather than written so a
		// run of `</div></div><div>` costs one newline instead of three blank
		// lines, and so a break at the very start of the document writes nothing.
		let pending = NO_BREAK;
		// Whitespace seen between two pieces of text with no block boundary
		// between them. `<b>Sopa</b> <i>de Lima</i>` has to stay two words.
		let spaced = false;

		const write = (text) => {
			if (out.length === 0) {
				// Nothing emitted yet, so there is nothing to break away from.
				pending = NO_BREAK;
				spaced = false;
			}
			if (pending === PARA_BREAK) out.push('\n\n');
			else if (pending === LINE_BREAK) out.push('\n');
			else if (pending === CELL_BREAK) out.push('\t');
			else if (spaced) out.push(' ');
			out.push(text);
			pending = NO_BREAK;
			spaced = false;
		};

		/**
		 * Writes one run of page text, keeping the space that sat beside a tag.
		 * The leading and trailing spaces are the whole reason this is not just
		 * write(text.trim()): the source of "Sopa <b>de</b> Lima" arrives as three
		 * runs, and dropping the space each one carried spells "Sopade Lima".
		 */
		const writeText = (text) => {
			const trimmed = text.trim();
			if (!trimmed) {
				if (text) spaced = true;
				return;
			}
			if (text.startsWith(' ')) spaced = true;
			write(trimmed);
			if (text.endsWith(' ')) spaced = true;
		};

		let i = 0;
		while (i < html.length) {
			const lt = html.indexOf('<', i);
			if (lt < 0) {
				writeText(normaliseText(html.slice(i)));
				break;
			}
			if (lt > i) writeText(normaliseText(html.slice(i, lt)));

			if (html.startsWith('<!--', lt)) {
				const close = html.indexOf('-->', lt + 4);
				i = close < 0 ? html.length : close + 3;
				continue;
			}
			// The doctype, and processing instructions from XML-ish exports.
			if (html.startsWith('<!', lt) || html.startsWith('<?', lt)) {
				const close = html.indexOf('>', lt + 1);
				i = close < 0 ? html.length : close + 1;
				continue;
			}

			const tag = readTag(html, lt);
			if (!tag) {
				// Not markup at all: "< 5 minutes" in a description.
				write('<');
				i = lt + 1;
				continue;
			}

			if (!tag.closing) {
				if (RAW_TEXT_TAGS.has(tag.name)) {
					i = skipRawText(html, tag.name, tag.end);
					continue;
				}
				const skippable = !tag.selfClosing && !VOID_TAGS.has(tag.name);
				if (skippable && (DROP_TAGS.has(tag.name) || isDropped(tag))) {
					i = skipElement(html, tag.name, tag.end);
					// What the removal leaves behind is the gap the element itself
					// would have made: a line where a nav or a hidden div stood, and
					// only a space where a decorative span sat. Breaking the line for
					// every dropped element put the price of "Suadero <span
					// aria-hidden>*</span> 4.50" on a line of its own, where it reads
					// as the name of the next drink.
					const gap = breakFor(tag.name);
					if (gap > pending) pending = gap;
					spaced = gap === NO_BREAK;
					continue;
				}
			}

			const strength = breakFor(tag.name);
			if (strength > pending) pending = strength;
			if (strength !== NO_BREAK) spaced = false;
			i = tag.end;
		}

		return tidyLines(out.join(''));
	}

	/** Trims every line, drops the empty ones down to at most one in a row. */
	function tidyLines(text){
		const lines = text.split('\n').map((line) => line.replace(/^[ \t]+|[ \t]+$/g, ''));
		const kept = [];
		for (const line of lines) {
			if (line === '' && (kept.length === 0 || kept[kept.length - 1] === '')) continue;
			kept.push(line);
		}
		while (kept.length && kept[kept.length - 1] === '') kept.pop();
		return kept.join('\n');
	}

	/* -------------------------------------------------------------------------
	 * The fetch
	 * ---------------------------------------------------------------------- */

	/**
	 * What a failed read hands back: what happened, and the address to open in a
	 * new tab so the bartender can copy the menu themselves.
	 */
	function failed(reason, openUrl){
		return { ok: false, reason, openUrl };
	}

	/** Said by both places that can run out of patience: the headers and the body. */
	function tookTooLong(){
		return `That site took longer than ${Math.round(TIMEOUT_MS / 1000)} seconds to answer.`;
	}

	/** Plain-language shape of an HTTP status, so the reason is not a number alone. */
	function statusReason(status){
		if (status === 404 || status === 410) return 'That page is not there any more (404).';
		if (status === 401 || status === 403) return `That site refused the request (${status}).`;
		if (status === 429) return 'That site is asking for fewer requests right now (429).';
		if (status >= 500) return `That site is having trouble of its own (${status}).`;
		return `That site answered with an error (${status}).`;
	}

	/**
	 * Fetches a page and returns the text worth parsing, or the reason it could
	 * not, paired with the address to open by hand.
	 *
	 * @param url what the bartender typed, scheme optional
	 * @param fetchImpl the fetch to use; the tests pass their own
	 */
	async function linkToTextImpl(url, fetchImpl){
		const tidied = tidyUrl(url);
		// No openUrl on a refused address, deliberately: see tidyUrl. The screen
		// hides the "open it yourself" step when there is nothing safe to open.
		if (!tidied.ok) return failed(tidied.reason, '');
		const target = tidied.url;

		const doFetch =
			fetchImpl ?? (typeof fetch === 'function' ? fetch.bind(globalThis) : undefined);
		if (!doFetch) {
			return failed('This browser cannot fetch a page on its own.', target);
		}

		const controller = new AbortController();
		// A flag rather than a check on the error, because what a failed fetch
		// throws is not the same object in every browser and the difference
		// between "gave up waiting" and "was refused" is the whole message.
		let timedOut = false;
		const timer = setTimeout(() => {
			timedOut = true;
			controller.abort();
		}, TIMEOUT_MS);

		// The timer runs until the text is in hand, not until the headers are: a
		// site that answers and then stalls partway through its body is a real
		// ending, and clearing the clock early left this waiting for good.
		try {
			let res;
			try {
				res = await doFetch(target, {
					signal: controller.signal,
					redirect: 'follow',
					// Nothing about this bartender goes with the request: no cookies for
					// the venue's site, and no referrer telling it where the reader
					// came from. There are no custom headers either, which keeps this
					// a plain GET that never triggers a CORS preflight.
					credentials: 'omit',
					referrerPolicy: 'no-referrer'
				});
			} catch {
				if (timedOut) return failed(tookTooLong(), target);
				if (typeof navigator !== 'undefined' && navigator.onLine === false) {
					return failed('This device is offline, so the app could not reach that site.', target);
				}
				// The ordinary ending. A cross-origin read needs the site to opt in,
				// and a venue site has no reason to have done that.
				return failed(
					'That site did not allow the app to read its page, which is how most bar and venue sites are set up.',
					target
				);
			}

			if (!res.ok) return failed(statusReason(res.status), target);

			const type = (res.headers.get('content-type') ?? '').toLowerCase();
			if (type.includes('pdf')) {
				return failed('That link is a PDF, and the app reads web pages only.', target);
			}
			const isHtml = type.includes('html') || type.includes('xml');
			const isText = type.startsWith('text/') || type === '';
			if (!isHtml && !isText) {
				return failed(
					`That link gives back ${type.split(';')[0]}, which is not a web page the app can read.`,
					target
				);
			}

			let body;
			try {
				body = await res.text();
			} catch {
				if (timedOut) return failed(tookTooLong(), target);
				return failed('That page stopped sending partway through.', target);
			}

			// A page served as text/plain is already the menu. Running it through
			// the HTML pass would collapse its newlines into one paragraph, which is
			// the one shape a menu cannot survive.
			const looksLikeHtml = isHtml || /<\/?[a-z][a-z0-9]*[\s/>]/i.test(body);
			const text = looksLikeHtml ? htmlToMenuText(body) : tidyLines(body.replace(/\r\n?/g, '\n'));

			if (text.trim().length < TOO_LITTLE_TEXT) {
				return failed(
					'That page came back with almost no text, which usually means its menu is drawn after the page loads.',
					target
				);
			}
			return { ok: true, text };
		} finally {
			clearTimeout(timer);
		}
	}

	/* the four exports */
	ocrPlan = ocrPlanImpl;
	imageToText = imageToTextImpl;
	htmlToMenuText = htmlToMenuTextImpl;
	linkToText = linkToTextImpl;
})();
