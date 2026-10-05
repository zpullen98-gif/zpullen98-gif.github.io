/* Codex XXVI: the wine library within Outside Of Time.
   Presentation only. The existing topbar supplies the title, navigation,
   handlers and heading semantics. No records or study state are changed. */
var _v26Topbar = topbar;
topbar = function () {
  var bar = _v26Topbar.apply(this, arguments);
  var brand = bar.querySelector('.brand');
  if (!brand) return bar;
  document.body.setAttribute('data-codex-page', S.view || 'home');
  bar.classList.add('house-topbar');
  var mast = document.createElement('div');
  mast.className = 'house-masthead';
  var picture = document.createElement('picture');
  picture.className = 'house-art';
  picture.setAttribute('aria-hidden', 'true');
  var image = document.createElement('img');
  image.src = 'assets/codex-library-v1.webp';
  image.alt = '';
  image.width = 1536;
  image.height = 1024;
  image.decoding = 'async';
  image.setAttribute('fetchpriority', 'high');
  picture.appendChild(image);
  mast.appendChild(picture);
  bar.insertBefore(mast, brand);
  mast.appendChild(brand);
  return bar;
};

/* A turned card exposes only its active face to assistive technology.
   Pairing selections and marked answers also carry their state in words. */
function v26StudyState() {
  Array.prototype.forEach.call(document.querySelectorAll('input[id^="cl-"], textarea[id^="cl-"]'), function (field) {
    var caption = field.previousElementSibling;
    if (!field.hasAttribute('aria-label') && caption && caption.classList.contains('lvltag')) {
      field.setAttribute('aria-label', caption.textContent.trim());
    }
  });
  var card = document.getElementById('fcard');
  if (card) {
    var turned = card.classList.contains('flip');
    var front = card.querySelector('.ffront');
    var back = card.querySelector('.fback');
    if (front) front.setAttribute('aria-hidden', turned ? 'true' : 'false');
    if (back) back.setAttribute('aria-hidden', turned ? 'false' : 'true');
    /* The complete profile can be a long read on a phone. Keep the original
       flip and grading controls before it, without rebuilding their handlers. */
    var stage = card.parentNode;
    var controls = stage.parentNode.querySelector('.fcbtns');
    if (controls) stage.parentNode.insertBefore(controls, stage);
  }
  Array.prototype.forEach.call(document.querySelectorAll('.prlev'), function (button) {
    button.setAttribute('aria-pressed', button.classList.contains('on') ? 'true' : 'false');
  });
  Array.prototype.forEach.call(document.querySelectorAll('.prwine'), function (button) {
    if (button.querySelector('.house-answer-state')) return;
    var picked = S.pr && Number(button.getAttribute('data-i')) === S.pr.wine;
    var text = button.classList.contains('correct') ? (picked ? 'Your answer, correct' : 'Correct answer')
      : button.classList.contains('wrong') ? 'Your answer, incorrect' : '';
    if (!text) return;
    var label = document.createElement('span');
    label.className = 'house-answer-state';
    label.textContent = text;
    button.appendChild(label);
  });
}
var _v26Render = render;
render = function () {
  var result = _v26Render.apply(this, arguments);
  v26StudyState();
  return result;
};
