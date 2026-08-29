/* First Light: A Life Well Lived. The five-tier goal ladder.

   Checkbox ids stay exactly as the artifact wrote them ("g-<tier>-<goal>") so the
   migrated fl2:checks keys still line up. Changing the id scheme would silently
   unmark everything a reader had already checked. */

FL_ACTS.toggleGoal = function (el) {
  var id = el.getAttribute('data-id');
  if (el.checked) FL.checks[id] = 1; else delete FL.checks[id];
  flSave();
};

FL_VIEWS.life = {
  label: 'A Life Well Lived',
  title: 'A Life Well Lived',
  render: function () {
    var tiers = LIFE.map(function (tier, ti) {
      var goals = tier[2].map(function (g, gi) {
        var id = 'g-' + ti + '-' + gi;
        return '<div class="goal">' +
          '<input type="checkbox" id="' + id + '" data-change="toggleGoal" data-id="' + id + '"' +
            (FL.checks[id] ? ' checked' : '') + '>' +
          '<div><label for="' + id + '" class="gt">' + esc(g[0]) + '</label>' +
          '<div class="gq">' + esc(FL.prefs.canonLines === 'on' ? g[1] : (LIFE_ALT[g[0]] || g[1])) + '</div></div></div>';
      }).join('');
      return '<div class="tier"><div class="label">The ' + esc(tier[0]) + ' Goals</div>' +
             '<p class="px" style="margin-bottom:10px;color:var(--faint)">' + esc(tier[1]) + '</p>' +
             goals + '</div>';
    }).join('');

    return '' +
      '<div class="kick">The Council of Wisdom</div>' +
      '<h1>A Life Well Lived</h1>' +
      '<p class="note">Goals at five altitudes, from the atoms of a day to the milestones of a year. Check them honestly; they reset only when you reset them.</p>' +
      '<div>' + tiers + '</div>' +
      '<div class="label">The compass</div>' +
      '<div class="card"><p class="pt">You will lose the way</p>' +
      '<p class="px">That is the human condition, and no teacher quoted in this guide was exempt from it. ' +
      'The great ones were not those who never strayed — they were those who returned to the path faster, ' +
      'without theater and without self-punishment. Return at the turn of every week, every month, every quarter, ' +
      'and every year: not as a checklist to be judged by, but as a compass to come back to. ' +
      'Beginning again is not failure. Beginning again is the practice.</p></div>';
  }
};
