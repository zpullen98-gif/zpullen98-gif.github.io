/* Spoken practice is a self-assessment, not an automatic service grade.
   Keyword coverage remains an offline aid. Only an explicit assessment of
   the exact checked answer enters the existing house question record. */
var V50_CRITERIA = [
  { key: 'accuracy', title: 'Accurate and precise', say: 'I identified the wine and place correctly, used the relevant facts accurately, and separated confirmed facts from details to check.', guest: 'My facts, wine identities and service information are correct. I identified uncertainty instead of inventing availability, price or procedure.' },
  { key: 'reasoning', title: 'Reasoned and relevant', say: 'I can explain why the stated style, structure or production detail matters to this wine and to the guest. My explanation is more than a list of terms.', guest: 'I addressed the guest\'s actual preferences, budget or concern where relevant, and gave a defensible reason for my recommendation or next action.' },
  { key: 'complete', title: 'Complete for this task', say: 'My selected-length description carries the required ideas without misleading omissions. I can answer follow-up questions using the full wine reading.', guest: 'I answered every part of the request, gave the appropriate next service action, and identified what needs confirmation. An alternative answer is supported by the evidence.' },
  { key: 'delivery', title: 'Clear and hospitable', say: 'I spoke a coherent guest-facing description aloud, with intelligible wine names, clear language and appropriate pace. I stayed within this exercise\'s word cap.', guest: 'I rehearsed the answer aloud with clear names, courtesy and an appropriate level of detail. I listened to the request and avoided unsupported promises or unnecessary jargon.' }
];

function v50State(kind) { return kind === 'say' ? v27SayState() : v27GuestState(); }
function v50Prefix(kind) { return kind === 'say' ? 'hs' : 'hg'; }
function v50Identity(kind) {
  var h = v27Current(), st = v50State(kind), item, model = '';
  if (kind === 'say') {
    item = v27Wine(st.id);
    model = item && v27Kept(item.lines) && item.lines.value ? item.lines.value[st.length] || '' : '';
    return JSON.stringify([h && h.id, st.id, st.length, model, item && item.ts]);
  }
  var card = v27GuestCard();
  item = card && v49Find(h, card.id);
  model = item ? v49Kept(item, card.mix ? 'difference' : 'you') || '' : '';
  return JSON.stringify([h && h.id, card && card.id, !!(card && card.mix), model, item && item.ts]);
}
function v50Current(kind) {
  var st = v50State(kind), a = st._v50assessment;
  return !!(a && st.grade && a.said === st.said && a.identity === v50Identity(kind));
}
function v50Invalidate(kind, changed) {
  var st = v50State(kind), had = !!st._v50assessment || !!st.grade;
  st._v50assessment = null; st.grade = null; st.recorded = false;
  st._v50changed = !!(changed && had);
}
function v50Snapshot(kind, grade) {
  var st = v50State(kind);
  st._v50changed = false;
  st._v50assessment = grade ? { identity: v50Identity(kind), said: st.said, checks: [null, null, null, null], outcome: null } : null;
  return grade;
}
function v50CanRecord(kind) {
  var st = v50State(kind), a = st._v50assessment;
  return v50Current(kind) && !st.recorded && !!a.said.trim() && a.checks.length === V50_CRITERIA.length
    && a.checks.every(function (c) { return c === 'met' || c === 'practice'; });
}
function v50Outcome(kind) {
  if (!v50CanRecord(kind)) return null;
  var st = v50State(kind), a = st._v50assessment;
  return a.checks.every(function (c) { return c === 'met'; }) && !(kind === 'say' && st.grade.words > st.grade.cap);
}
function v50Assess(kind, index, value) {
  if (!v50Current(kind) || v50State(kind).recorded || index < 0 || index >= V50_CRITERIA.length || ['met', 'practice'].indexOf(value) < 0) return false;
  v50State(kind)._v50assessment.checks[index] = value;
  return true;
}
function v50AssessmentHtml(kind, st) {
  var p = v50Prefix(kind), a = st._v50assessment;
  if (!a) return '';
  var html = '<section class="v50-assessment" aria-labelledby="' + p + '-assessment-title"><h3 id="' + p + '-assessment-title">Assess the complete answer</h3>'
    + '<p>Use the saved response and Learn why reading to check meaning, not wording. A sound paraphrase or alternative needs evidence and reasoning. Assess all four criteria; uncertainty or a substantive error means Needs practice.</p>'
    + '<p class="v50-boundary">This is your self-assessment for rigorous service preparation. It is not a CMS examination mark or an observation of tasting or physical service.</p>';
  V50_CRITERIA.forEach(function (c, i) {
    html += '<fieldset class="v50-criterion"' + (st.recorded ? ' disabled' : '') + '><legend>' + v27Esc(c.title) + '</legend><p>' + v27Esc(c[kind]) + '</p><div class="v50-options">';
    ['met', 'practice'].forEach(function (value) {
      var id = p + '-assess-' + c.key + '-' + value;
      html += '<label for="' + id + '"><input type="radio" id="' + id + '" name="' + p + '-assess-' + c.key + '" value="' + value
        + '" data-v50-kind="' + kind + '" data-v50-criterion="' + i + '"' + (a.checks[i] === value ? ' checked' : '') + '> '
        + (value === 'met' ? 'Met' : 'Needs practice') + '</label>';
    });
    html += '</div></fieldset>';
  });
  if (kind === 'say' && st.grade.words > st.grade.cap) html += '<p class="v50-cap">This answer exceeds the selected word cap. It can be recorded as Needs practice, or revised and checked again.</p>';
  html += '<div class="sarow" role="group" aria-label="Record this self-assessment">';
  html += st.recorded ? '<span class="lvltag" role="status">Recorded self-assessment: ' + (a.outcome ? 'Met all four criteria' : 'Needs practice') + '</span>'
    : '<button class="btn gold" type="button" id="' + p + '-record"' + (v50CanRecord(kind) ? '' : ' disabled') + '>Record self-assessment</button>';
  html += '<button class="btn ghost" type="button" id="' + p + '-again">Try again</button><button class="btn ghost" type="button" id="' + p + '-next2">Next ' + (kind === 'say' ? 'wine' : 'guest') + '</button></div>';
  return html + '<p class="v50-record-help" id="' + p + '-assessment-status" role="status">' + v50RecordHelp(kind) + '</p></section>';
}
function v50RecordHelp(kind) {
  var st = v50State(kind), a = st._v50assessment;
  if (!a) return 'Answer changed. Check it again before assessing or recording.';
  if (st.recorded) return 'Your explicit self-assessment was saved to this house exercise. Course and exam marks are unchanged.';
  if (!a.said.trim()) return 'Enter an answer, then check it again.';
  if (!v50CanRecord(kind)) return 'Assess each criterion against the evidence before recording. Nothing has been recorded.';
  return v50Outcome(kind) ? 'Ready to record: you assessed all four criteria as met.' : 'Ready to record: Needs practice. Revisit the unmet criteria and try again.';
}
function v50MatchRow(label, hit, applicable) {
  return '<li><span>' + v27Esc(label) + '</span><span>' + (applicable === false ? 'Not checked in this length' : hit ? 'Matching terms found' : 'No matching terms found') + '</span></li>';
}
function v50AssistanceIntro(kind, count, total, words, cap) {
  return '<section class="v50-feedback" aria-label="Keyword assistance"><h3>Key terms found</h3><p class="v50-match-count">' + count + ' of ' + total + ' reference '
    + (kind === 'say' ? 'parts' : 'clauses') + ' contain matching terms. ' + words + (cap ? ' of ' + cap : '') + ' words.</p>'
    + '<p>Word matching does not understand negation, prove factual accuracy, or recognise every valid paraphrase. A full match is not a passing assessment.</p>';
}

/* Keep the complete layer49 readings. The obsolete automatic verdict and its
   overconfident notes are replaced, not hidden with CSS. */
v27SayResultHtml = function (g, st) {
  if (!v50Current('say')) return '';
  var graded = (g.parts || []).filter(function (p) { return p.terms && p.terms.length && p.inLine; });
  var hits = graded.filter(function (p) { return p.hit; }).length;
  var h = v27Current(), item = v49Find(h, g.itemId);
  var html = v50AssistanceIntro('say', hits, graded.length, g.words, g.cap)
    + '<ul class="v50-matches">' + (g.parts || []).map(function (p) { return v50MatchRow(p.label, p.hit, p.inLine); }).join('') + '</ul>'
    + '<p class="sub">Name words: ' + (g.nameSaid ? 'a matching name term was found; check the full identity yourself.' : 'no matching name term was found; check the full identity yourself.') + '</p>'
    + '<h4>Saved model response</h4><div class="dispute">' + v27Esc(g.keptLine) + '</div>'
    + '<h4>Your checked answer</h4><div class="dispute">' + (v27Esc(st._v50assessment.said) || 'Nothing yet') + '</div></section>';
  html += v49Reading(item && item.name, v49Part('Build a useful description', 'Start with the wine and its place, add the most useful flavour or texture, then connect it to the guest. The word check is a rehearsal aid; review the meaning and accuracy yourself.') + v49Profile(item, h));
  return html + v50AssessmentHtml('say', st);
};
v27GuestResultHtml = function (g, st) {
  if (!v50Current('guest')) return '';
  var h = v27Current(), card = v27GuestCard(), source = card && v49Find(h, card.id);
  var hits = (g.clauses || []).filter(function (c) { return c.hit; }).length;
  var html = v50AssistanceIntro('guest', hits, (g.clauses || []).length, g.words)
    + '<ul class="v50-matches">' + (g.clauses || []).map(function (c) { return v50MatchRow(c.label, c.hit, true); }).join('') + '</ul>';
  if ((g.items || []).length) html += '<h4>Item-name matching</h4><ul class="v50-matches">' + g.items.map(function (i) { return v50MatchRow(i.name, i.named, true); }).join('') + '</ul>';
  html += '<h4>Saved model response</h4><div class="dispute">' + v27Esc(g.keptYou) + '</div>';
  if (g.principle) html += '<h4>The principle</h4><p>' + v27Esc(g.principle) + '</p>';
  html += '<h4>Your checked answer</h4><div class="dispute">' + (v27Esc(st._v50assessment.said) || 'Nothing yet') + '</div></section>';
  var body = v49Part('The full response', g.keptYou) + v49Part('The service principle', g.principle);
  var ids = source ? source.itemIds || [source.aId, source.bId].filter(Boolean) : [];
  ids.forEach(function (id) { var item = v49Find(h, id); if (item) body += '<details class="v49-example"><summary>Understand ' + v27Esc(item.name) + '</summary>' + v49Profile(item, h) + '</details>'; });
  body += v49Part('Practise the reasoning', 'Name what the guest needs, explain the recommendation and identify any detail that requires confirmation. Matching words alone does not establish a safe or thoughtful response.');
  return html + v49Reading(card && card.title, body) + v50AssessmentHtml('guest', st);
};

var _v50SayCheck = v27SayCheck;
v27SayCheck = function () { v27StopListening(); return v50Snapshot('say', _v50SayCheck.apply(this, arguments)); };
var _v50GuestCheck = v27GuestCheck;
v27GuestCheck = function () { v27StopListening(); return v50Snapshot('guest', _v50GuestCheck.apply(this, arguments)); };

/* Check the rendered field as well as the state. This also rejects a script or
   delayed recogniser that changed the DOM without dispatching input. */
function v50Record(kind) {
  var st = v50State(kind), a = st._v50assessment, p = v50Prefix(kind);
  var field = typeof document !== 'undefined' ? document.getElementById(p + '-said') : null;
  if (field && field.value !== st.said) { st.said = field.value; v50Invalidate(kind, true); v27Say('Answer changed. Check it again before recording.'); return null; }
  if (!v50Current(kind)) { v50Invalidate(kind, true); v27Say('Answer changed. Check it again before recording.'); return null; }
  if (!v50CanRecord(kind)) return null;
  var g = st.grade, ok = v50Outcome(kind), card = kind === 'guest' ? v27GuestCard() : null;
  var id = kind === 'say' ? 'h-' + g.itemId + '-say-' + g.length : 'h-' + g.scenarioId + '-guest';
  var key = v27RecordHouse(id, kind === 'say' ? V27_SAY_SECTION : V27_GUEST_SECTION, kind === 'say' ? g.name : card.title, ok);
  if (!key) return null;
  st.recorded = true; a.outcome = ok;
  v27Say('Recorded self-assessment: ' + (ok ? 'Met all four criteria.' : 'Needs practice.'));
  return key;
}
v27SayRecord = function () { return v50Record('say'); };
v27GuestRecord = function () { return v50Record('guest'); };

/* Selection changes discard an assessment even if later returning to the same
   wine, length or guest. Ordinary rendering and Back retain a valid attempt. */
var _v50SayPick = v27SayPick;
v27SayPick = function () { var r = _v50SayPick.apply(this, arguments); if (r) v50Invalidate('say', false); return r; };
var _v50SayLength = v27SayLength;
v27SayLength = function () { var r = _v50SayLength.apply(this, arguments); if (r) v50Invalidate('say', false); return r; };
var _v50SayAgain = v27SayAgain;
v27SayAgain = function () { _v50SayAgain.apply(this, arguments); v50Invalidate('say', false); };
var _v50GuestPick = v27GuestPick;
v27GuestPick = function () { var r = _v50GuestPick.apply(this, arguments); if (r) v50Invalidate('guest', false); return r; };
var _v50GuestMove = v27GuestMove;
v27GuestMove = function () { var r = _v50GuestMove.apply(this, arguments); if (r) v50Invalidate('guest', false); return r; };
var _v50GuestAgain = v27GuestAgain;
v27GuestAgain = function () { _v50GuestAgain.apply(this, arguments); v50Invalidate('guest', false); };

function v50OnText(kind, box, text) {
  var st = v50State(kind), a = st._v50assessment;
  st.said = text;
  if (a && (text !== a.said || !v50Current(kind))) v50Invalidate(kind, true);
  if (!st._v50changed) return;
  Array.prototype.forEach.call(box.querySelectorAll('.v50-feedback,.v50-assessment,.v49-learn'), function (n) { n.remove(); });
  var notice = box.querySelector('.v50-stale');
  if (!notice) {
    notice = document.createElement('p'); notice.className = 'v50-stale'; notice.setAttribute('role', 'status');
    var check = box.querySelector('#' + v50Prefix(kind) + '-check');
    if (check) check.parentNode.insertAdjacentElement('afterend', notice);
  }
  notice.textContent = 'Answer changed. Check it again, then reassess the complete response before recording.';
}
function v50WireAssessment(box, kind) {
  var p = v50Prefix(kind), field = box.querySelector('#' + p + '-said');
  if (field) field.addEventListener('input', function () { v50OnText(kind, box, field.value); });
  Array.prototype.forEach.call(box.querySelectorAll('[data-v50-criterion]'), function (input) {
    input.addEventListener('change', function () {
      if (field && field.value !== v50State(kind).said) v50OnText(kind, box, field.value);
      if (!v50Assess(kind, Number(input.getAttribute('data-v50-criterion')), input.value)) return;
      var button = box.querySelector('#' + p + '-record'), status = box.querySelector('#' + p + '-assessment-status');
      if (button) button.disabled = !v50CanRecord(kind);
      if (status) status.textContent = v50RecordHelp(kind);
    });
  });
  var check = box.querySelector('#' + p + '-check'); if (check) check.textContent = 'Check terms and review';
}
var _v50WireSay = v27WireSay;
v27WireSay = function (box) { _v50WireSay.apply(this, arguments); v50WireAssessment(box, 'say'); };
var _v50WireGuest = v27WireGuest;
v27WireGuest = function (box) { _v50WireGuest.apply(this, arguments); v50WireAssessment(box, 'guest'); };
var _v50WireSpeak = v27WireSpeak;
v27WireSpeak = function (box, id, field, onText) {
  return _v50WireSpeak.call(this, box, id, field, function (text) {
    /* A recogniser may emit one late event after stop/navigation. It belongs
       to its original field and must not alter a newly checked attempt. */
    if ((id === 'hs-speak' || id === 'hg-speak') && (!field || !field.isConnected || !box.contains(field))) return;
    onText(text);
    if (id === 'hs-speak' || id === 'hg-speak') v50OnText(id === 'hs-speak' ? 'say' : 'guest', box, text);
  });
};
function v50BeforeHtml(kind) {
  var st = v50State(kind);
  if (st.grade && !v50Current(kind)) v50Invalidate(kind, true);
}
function v50IntroHtml(html, kind) {
  var old = kind === 'say' ? 'Pick a wine and a length, say the pour aloud or type it, then Check. ' : 'The guest speaks; answer them aloud or type it, then Check. The guests who ask about the wine come first. ';
  var next = kind === 'say' ? 'Pick a wine and a length. Give the complete description aloud, then type or dictate the words you used. Check terms, review the evidence and assess all four criteria. ' : 'Listen to the whole request. Rehearse a complete, reasoned response aloud, then type or dictate it. Check terms, review the evidence and assess all four criteria. Wine guests come first. ';
  html = html.replace(old + V27_NEVER_COUNTED, next + 'Nothing is recorded until you choose Record self-assessment. This practice does not change course or exam marks.');
  if (v50State(kind)._v50changed) html = html.replace('<div class="sarow"><button class="btn gold" type="button" id="' + v50Prefix(kind) + '-check">Check</button></div>', '<div class="sarow"><button class="btn gold" type="button" id="' + v50Prefix(kind) + '-check">Check</button></div><p class="v50-stale" role="status">Answer changed. Check it again, then reassess before recording.</p>');
  return html;
}
var _v50SayHtml = v27SayHtml;
v27SayHtml = function () { v50BeforeHtml('say'); return v50IntroHtml(_v50SayHtml.apply(this, arguments), 'say'); };
var _v50GuestHtml = v27GuestHtml;
v27GuestHtml = function () { v50BeforeHtml('guest'); return v50IntroHtml(_v50GuestHtml.apply(this, arguments), 'guest'); };
var _v50SayLine = v27SayLine;
v27SayLine = function () { return _v50SayLine.apply(this, arguments).replace('graded here, offline', 'offline word assistance and explicit self-assessment'); };
var _v50GuestLine = v27GuestLine;
v27GuestLine = function () { return _v50GuestLine.apply(this, arguments).replace('graded here, offline', 'offline word assistance and explicit self-assessment'); };

if (typeof document !== 'undefined') document.addEventListener('keydown', function (event) {
  if (event.target && event.target.closest && event.target.closest('.v50-assessment') && /^(Enter| |[1-4])$/.test(event.key)) event.stopPropagation();
}, true);
