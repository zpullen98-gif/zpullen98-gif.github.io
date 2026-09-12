/* ---------------- READING A SPEC LINE ----------------

   Turns "2 oz bourbon or rye" into something the stock matcher can answer
   questions about. The vocabulary it resolves against is js/data-ingredients.js;
   this file is only the reading.

   THE ONE RULE THAT MATTERS: an ingredient this file cannot recognise comes
   back with a null id, and reqsOf turns that into a requirement nobody's shelf
   can satisfy. Before this existed, an unrecognised line was SILENT, so a drink
   whose spirit the ledger could not read was a drink with no spirit in it, and
   the Zero-proof station offered a Whiskey Highball. Failing closed is the
   whole point: the ledger would rather say "I do not know" than say "yes".

   Loaded after data-ingredients.js and before engine.js, because engine.js
   calls stockSatisfies at match time.
   ---------------- */

/* ---- the index ---------------------------------------------------------- */

var ING = {};
var ALIASES = [];          /* [alias, id], longest alias first */

(function buildIndex() {
	for (var i = 0; i < INGREDIENTS.length; i++) {
		var row = INGREDIENTS[i];
		ING[row.id] = row;
		var al = row.alias || [];
		for (var j = 0; j < al.length; j++) ALIASES.push([String(al[j]).toLowerCase(), row.id]);
	}
	/* Longest first is the whole defence against the lemonade-is-a-lemon class:
	   "sparkling lemonade" is checked before "lemonade" and before "lemon", so
	   it wins on length rather than on where its row happens to sit. There is
	   no ordering dependency in the table for anyone to break later. */
	ALIASES.sort(function (a, b) { return b[0].length - a[0].length; });
})();

/* Every id this one IS: itself, then its parents. Stock the specific and a
   call for the generic is satisfied, because Old Tom is gin. */
function isaChain(id) {
	var out = [], seen = {}, cur = id;
	while (cur && ING[cur] && !seen[cur]) {
		seen[cur] = 1;
		out.push(cur);
		cur = ING[cur].parent;
	}
	return out;
}

/* Every id that may stand IN FOR this one. Walks upward only while each child
   carries up:true, so the substitution stops the moment somebody decided the
   drink would not survive it. Orange liqueur covers Cointreau; nothing covers
   blue curacao. */
function upChain(id) {
	var out = [], seen = {}, cur = id;
	while (cur && ING[cur] && ING[cur].up && ING[cur].parent && !seen[cur]) {
		seen[cur] = 1;
		cur = ING[cur].parent;
		out.push(cur);
	}
	return out;
}

/* Does anything on this shelf answer a call for `req`? */
function stockSatisfies(shelf, req) {
	if (!shelf || !shelf.length) return false;
	if (shelf.indexOf(req) >= 0) return true;
	var up = upChain(req);
	for (var i = 0; i < shelf.length; i++) {
		var s = shelf[i];
		if (up.indexOf(s) >= 0) return true;            /* generic covers the specific */
		if (isaChain(s).indexOf(req) >= 0) return true; /* specific answers the generic */
	}
	return false;
}

/* ---- what a row carries, once inheritance is taken into account ----------

   Three rules, and each one was a bug waiting to happen that a verifier
   caught before it shipped:

   1. WALK `parent`, NEVER `upChain`. upChain stops at any child that lacks
      up:true, and eighteen rows do (oldtom, genever, calvados, pisco, wrum,
      arum, islay, bourbon, rye, scotch and the rest). A lookup built on
      upChain returns nothing for every one of them.

   2. AN AUTHORED ZERO IS A VALUE. Written as `row.abv || inherited` it is
      silently discarded, and the zero-proof rows exist precisely to say
      zero. hasOwnProperty, every time.

   3. AN EITHER/OR TAKES THE MAX OF ITS MEMBERS. A ref with `anyOf` has no
      id at all, so an id-keyed lookup returns nothing for eleven
      volume-bearing lines including the Old Fashioned and the Dirty Martini,
      and the ledger reads them as containing no alcohol. Max rather than
      first or mean, because understating how much was poured is the
      dangerous direction and this number is responsible-service teaching. */
function rowValue(id, field) {
	var seen = {}, cur = id, hops = 0;
	while (cur && hops++ < 50 && !seen[cur]) {
		seen[cur] = 1;
		var row = ING[cur];
		if (!row) return undefined;
		if (Object.prototype.hasOwnProperty.call(row, field)) return row[field];
		cur = row.parent;
	}
	return undefined;
}

/* The strength of one REF, which may be an id, an either/or, or a fragment
   the vocabulary could not read. An unreadable fragment returns undefined
   rather than 0, so a caller can tell 'no alcohol' apart from 'no idea'. */
/* The strength of a ROW, with the one default that is safe to assume: a juice,
   a syrup, a mixer, a garnish and a larder item are zero, and authoring
   ninety-one zeros by hand would be ninety-one chances to typo one.

   The default is deliberately NOT extended to the alcoholic kinds. There,
   absent means nobody authored it, which is a bug the gate must be able to
   see, and defaulting it to zero would hide exactly the failure this whole
   field exists to prevent. */
var NONBOOZE_KINDS = ['juice', 'syrup', 'mixer', 'dairy', 'produce', 'pantry'];
function rowAbv(id) {
	var v = rowValue(id, 'abv');
	if (v !== undefined) return v;
	var row = ING[id];
	if (row && NONBOOZE_KINDS.indexOf(row.kind) >= 0) return 0;
	return undefined;
}

function refAbv(ref) {
	if (!ref) return undefined;
	if (ref.anyOf && ref.anyOf.length) {
		var best;
		for (var i = 0; i < ref.anyOf.length; i++) {
			var v = rowAbv(ref.anyOf[i]);
			if (v === undefined) continue;
			if (best === undefined || v > best) best = v;
		}
		return best;
	}
	return ref.id ? rowAbv(ref.id) : undefined;
}

/* And the balance role of one ref. Same walk; an either/or takes its FIRST
   readable member, because the alternatives in this bank are always the same
   role (bourbon or rye is two spirits, never a spirit or a syrup). */
function refBal(ref) {
	if (!ref) return undefined;
	if (ref.anyOf && ref.anyOf.length) {
		for (var i = 0; i < ref.anyOf.length; i++) {
			var v = rowValue(ref.anyOf[i], 'bal');
			if (v !== undefined) return v;
		}
		return undefined;
	}
	return ref.id ? rowValue(ref.id, 'bal') : undefined;
}

/* ---- normalising a fragment --------------------------------------------- */

var ING_FRACTION = '(?:\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d+(?:\\.\\d+)?|[\\u00BC-\\u00BE\\u2150-\\u215E])';
var ING_UNIT = '(?:oz|ml|cl|dash(?:es)?|drops?|barspoons?|bar spoons?|bsp|tsp|tbsp|teaspoons?|' +
	'tablespoons?|parts?|cups?|pinch(?:es)?|sprigs?|leaves|leaf|slices?|wedges?|discs?|cubes?|' +
	'sticks?|shots?|cans?|bottles?|pints?|handfuls?|scoops?|glass(?:es)?|splash(?:es)?|heaping tbsp)';
var ING_QTY_RE = new RegExp('^\\s*(' + ING_FRACTION + ')?\\s*(' + ING_UNIT + ')?\\s+', 'i');
var ING_BARE_UNIT_RE = new RegExp('^\\s*(' + ING_UNIT + ')\\s+', 'i');
/* The same shape with the unit REQUIRED, for every pass after the first. */
var ING_QTY_UNIT_RE = new RegExp('^\\s*(' + ING_FRACTION + ')\\s*(' + ING_UNIT + ')\\s+', 'i');
var ING_ADJ_RE = new RegExp('^(?:' + ADJECTIVES.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\s+', 'i');
var ING_TAIL_RE = new RegExp(',?\\s*(?:' + TAILS.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\s*$', 'i');

/* Ounces on a line, for the ref. engine.js keeps its own lineOz for the
   balance and batching engines; this one only fills in Ref.oz. */
function fragOz(s) {
	var m = String(s).match(new RegExp('(' + ING_FRACTION + ')\\s*oz', 'i'));
	if (!m) return 0;
	var t = m[1];
	if (t.indexOf('/') >= 0) {
		var parts = t.split(/\s+/);
		var whole = parts.length > 1 ? parseFloat(parts[0]) : 0;
		var frac = (parts.length > 1 ? parts[1] : parts[0]).split('/');
		return whole + (parseFloat(frac[0]) / parseFloat(frac[1]));
	}
	return parseFloat(t) || 0;
}

function normaliseFrag(s) {
	var out = String(s == null ? '' : s).toLowerCase();
	out = out.replace(/\s+/g, ' ').trim();
	var prev;
	/* THE FIRST PASS MAY STRIP A BARE NUMBER; NO LATER PASS MAY.

	   This ran to fixpoint with ING_QTY_RE, whose number and unit are BOTH
	   optional, so a bare number followed by a space was eaten again and again:
	   '1.5 oz 151 demerara rum' lost '1.5 oz ', then lost '151 ', resolved to
	   arum, and the ledger read a 75.5% pour as a 40% one across the Zombie,
	   the Jet Pilot, Cobra's Fang, the 151 Swizzle and three shots. A number
	   that survives the first pass is part of the NAME: 151 rum, Licor 43.

	   So the quantity comes off once, and the loop after it requires a unit. */
	out = out.replace(ING_QTY_RE, '').replace(ING_BARE_UNIT_RE, '');
	do { prev = out; out = out.replace(ING_QTY_UNIT_RE, '').replace(ING_BARE_UNIT_RE, ''); } while (out !== prev);
	do { prev = out; out = out.replace(ING_TAIL_RE, ''); } while (out !== prev);
	do { prev = out; out = out.replace(ING_ADJ_RE, ''); } while (out !== prev);
	out = out.replace(/^of\s+/, '').replace(/[.,;:]+$/, '').trim();
	return out;
}

/* The longest alias this fragment carries, or null. Exact first, then the
   longest phrase sitting on word boundaries inside it. */
function resolveFrag(frag) {
	if (!frag) return null;
	for (var i = 0; i < ALIASES.length; i++) if (ALIASES[i][0] === frag) return ALIASES[i][1];
	for (var k = 0; k < ALIASES.length; k++) {
		var a = ALIASES[k][0];
		var at = frag.indexOf(a);
		if (at < 0) continue;
		var before = at === 0 ? ' ' : frag.charAt(at - 1);
		var after = at + a.length >= frag.length ? ' ' : frag.charAt(at + a.length);
		if (/[a-z0-9]/.test(before) || /[a-z0-9]/.test(after)) continue;
		return ALIASES[k][1];
	}
	return null;
}

/* ---- splitting a line ---------------------------------------------------- */

/* Split only at bracket depth zero. "chocolate syrup (Fox's U-Bet,
   traditionally)" is one ingredient with an aside, and splitting on its comma
   produces a fragment called "traditionally)". */
function splitTopLevel(s, re) {
	var out = [], depth = 0, start = 0;
	for (var i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (c === '(' || c === '[') depth++;
		else if (c === ')' || c === ']') depth = Math.max(0, depth - 1);
		else if (depth === 0) {
			var m = s.slice(i).match(re);
			if (m && m.index === 0) { out.push(s.slice(start, i)); i += m[0].length - 1; start = i + 1; }
		}
	}
	out.push(s.slice(start));
	var clean = [];
	for (var j = 0; j < out.length; j++) { var t = out[j].trim(); if (t) clean.push(t); }
	return clean;
}

/* Commas and pluses only. `&` and `and` are deliberately NOT here: they split
   "sweet & sour", "Tom & Jerry batter" and "salt & pepper" alike, and only the
   last of those wants splitting. They are tried SECOND, on a segment that
   failed to resolve whole, which is the order that gets all three right. */
var ING_SEP_RE = /^(?:\s*\+\s*|\s*,\s*)/i;
var ING_AND_RE = /^(?:\s+&\s+|\s+and\s+)/i;
var ING_OR_RE = /^(?:\s+or\s+)/i;

/* A segment that is ONLY a method word belongs to the ingredient before it.
   Matched whole, at any length: "poured into the glass first" is five words
   and just as much a tail as "muddled". */
function isWholeTail(text) {
	for (var i = 0; i < TAILS.length; i++) if (TAILS[i] === text) return true;
	for (var j = 0; j < NOTE_LINES.length; j++) if (NOTE_LINES[j] === text) return true;
	return false;
}

function ingRef(raw, text, id, extra) {
	var r = { raw: raw, text: text, id: id || null, anyOf: null, qty: null, unit: null,
		oz: 0, optional: false, role: 'ingredient', note: null };
	if (extra) for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) r[k] = extra[k];
	return r;
}

/* Turns ONE spec line into one or more ingredient references. Never returns an
   empty array: a line that is not an ingredient comes back with role 'note'.
   That distinction is what the gate reads, because "resolved to nothing" and
   "declared not an ingredient" must never look the same. */
function parseSpecLine(line) {
	var raw = String(line == null ? '' : line);
	var flat = raw.toLowerCase().replace(/\s+/g, ' ').trim();

	/* A declared instruction. Checked against the normalised line so that
	   "heated gently" and "1 cup, heated gently" agree. */
	var bare = normaliseFrag(raw);
	if (!bare) return [ingRef(raw, '', null, { role: 'note', note: flat })];
	for (var n = 0; n < NOTE_LINES.length; n++) {
		if (bare === NOTE_LINES[n] || flat === NOTE_LINES[n]) {
			return [ingRef(raw, bare, null, { role: 'note', note: bare })];
		}
	}

	var oz = fragOz(raw);
	var optionalLine = false;
	var alternates = [];

	/* Parentheticals, by content, before anything splits. */
	var body = raw.replace(/\(([^)]*)\)/g, function (_, inner) {
		var t = String(inner).toLowerCase().trim();
		if (/optional/.test(t)) { optionalLine = true; return ' '; }
		if (/^or\s+/.test(t)) { alternates.push(t.replace(/^or\s+/, '')); return ' '; }
		return ' ';
	});

	/* "1/2 oz each: vodka, gin, white rum" and the head-noun rule that turns
	   "celery, orange, and Peychaud's bitters" into three kinds of bitters. */
	var segs;
	var each = body.match(/^(.*?)\beach:\s*(.+)$/i);
	if (each) {
		segs = splitTopLevel(each[2], ING_SEP_RE);
		var last = segs.length ? segs[segs.length - 1] : '';
		var words = last.split(/\s+/);
		var head = words.length > 1 ? words[words.length - 1] : '';
		if (head) {
			for (var s = 0; s < segs.length - 1; s++) {
				if (segs[s].toLowerCase().indexOf(head.toLowerCase()) < 0) segs[s] = segs[s] + ' ' + head;
			}
		}
	} else {
		segs = splitTopLevel(body, ING_SEP_RE);
	}

	var refs = [];
	for (var i = 0; i < segs.length; i++) {
		var seg = segs[i];

		/* " or " becomes an alternation only when BOTH sides resolve. Otherwise
		   the phrase is one thing that happens to contain the word: "any tart
		   juice or tea base" is not a choice between two bottles. */
		var sides = splitTopLevel(seg, ING_OR_RE);
		if (sides.length > 1) {
			var ids = [], allOk = true;
			for (var q = 0; q < sides.length; q++) {
				var sid = resolveFrag(normaliseFrag(sides[q]));
				if (!sid) { allOk = false; break; }
				if (ids.indexOf(sid) < 0) ids.push(sid);
			}
			if (allOk && ids.length > 1) {
				refs.push(ingRef(raw, normaliseFrag(seg), null,
					{ anyOf: ids, oz: oz, optional: optionalLine }));
				continue;
			}
		}

		var text = normaliseFrag(seg);
		if (!text) continue;
		var id = resolveFrag(text);

		/* A segment that is only a method word belongs to the ref before it,
		   and to nothing at all when it leads. */
		if (!id && isWholeTail(text)) {
			if (refs.length) refs[refs.length - 1].note = text;
			continue;
		}

		/* Only now try "&" and "and": a segment that resolves whole is left
		   whole, so "sweet & sour" and "Tom & Jerry batter" survive while
		   "salt & pepper" still becomes two. */
		if (!id) {
			var andParts = splitTopLevel(seg, ING_AND_RE);
			if (andParts.length > 1) {
				var got = [];
				for (var p = 0; p < andParts.length; p++) {
					var pt = normaliseFrag(andParts[p]);
					if (!pt) continue;
					if (isWholeTail(pt)) continue;
					got.push(ingRef(raw, pt, resolveFrag(pt), { oz: oz, optional: optionalLine }));
				}
				if (got.length) { refs = refs.concat(got); continue; }
			}
		}

		refs.push(ingRef(raw, text, id, { oz: oz, optional: optionalLine }));
	}

	/* "(or lime cordial)" folds into the head ref as an alternation. */
	if (alternates.length && refs.length) {
		var head0 = refs[0];
		var pool = head0.anyOf ? head0.anyOf.slice() : (head0.id ? [head0.id] : []);
		var ok = pool.length > 0;
		for (var a = 0; a < alternates.length; a++) {
			var aid = resolveFrag(normaliseFrag(alternates[a]));
			if (!aid) { ok = false; break; }
			if (pool.indexOf(aid) < 0) pool.push(aid);
		}
		if (ok && pool.length > 1) { head0.anyOf = pool; head0.id = null; }
	}

	if (!refs.length) return [ingRef(raw, bare, null, { role: 'note', note: bare })];
	return refs;
}

/* Memoised by raw line. 817 distinct lines app-wide, so the cache is small and
   every drink parses at most once. */
var ING_CACHE = {};
function specRefs(line) {
	var k = String(line);
	if (!Object.prototype.hasOwnProperty.call(ING_CACHE, k)) ING_CACHE[k] = parseSpecLine(k);
	return ING_CACHE[k];
}

/* ---- the shelf migration -------------------------------------------------
   Idempotent, like srsMigrate. An id it does not recognise is KEPT, not
   dropped: an unknown id satisfies nothing and costs nothing, whereas dropping
   it destroys a list somebody built by hand. */
function migrateShelf(list) {
	if (!Array.isArray(list)) return list;
	var out = [];
	for (var i = 0; i < list.length; i++) {
		var to = SHELF_ID_MIGRATION[list[i]];
		var add = to ? to : [list[i]];
		for (var j = 0; j < add.length; j++) if (out.indexOf(add[j]) < 0) out.push(add[j]);
	}
	return out;
}
