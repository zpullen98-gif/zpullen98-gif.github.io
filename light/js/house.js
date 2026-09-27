/* First Light: the dawn library. Presentation only, after the app boots.
   Keep the existing navigation, focus, practice engines and records intact. */
function flHousePresent() {
  var view = flRoute.view;
  document.body.setAttribute('data-firstlight-page', view);
  var host = document.getElementById('view');
  if (host) host.setAttribute('data-house-view', view);
  var guided = view === 'today' && (todayForceMode || FL.prefs.todayMode) === 'guided';
  document.body.classList.toggle('house-morning', view === 'today' && !guided);
}
var flHouseRenderNav = renderNav;
renderNav = function () {
  var result = flHouseRenderNav.apply(this, arguments);
  flHousePresent();
  return result;
};
flHousePresent();
