/* First Light: The Floor Book.

   Stoic reframes for situations that actually happen on a shift, in trade
   vocabulary. Each card holds four movements: the situation, the honest first
   thought (named, not shamed: pretending the thought does not arrive is how
   this material curdles into denial), the turn, and one question to carry back
   through the doors.

   One card teaches the boundary. Stoicism misread as endure-everything is
   actively harmful to service workers, who are already trained to absorb; the
   discipline of assent governs your judgment of the event, never your right to
   end it. That card is the reason this file exists.

   Content only: nothing here is recorded, counted, or surfaced anywhere else. */

const FLOOR_CARDS = [
  { t: "The camper",
    sit: "Table 12 finished forty minutes ago. They are on coffee number three and your section is cut in half.",
    thought: "They are stealing from me.",
    turn: "They are not thinking about you at all, which is the insult and also the cure. The table was never yours; the turn rate never was. What is yours: the water glass kept full without theatre, the check dropped warmly at the right moment, and the arithmetic of the section you still have.",
    carry: "Can I be generous to the last table of their night while running the first table of someone else's?" },
  { t: "The walked check",
    sit: "The four-top by the window is gone. The check is not paid, and the house policy makes it your problem.",
    thought: "That came out of my pocket.",
    turn: "Two separate injuries: the strangers' theft, and the policy. The first belongs to people you will never see again; carrying their act home doubles it. The second is real and has a real venue: the manager, the policy conversation, in daylight, calmly, once. Epictetus lost more to actual thieves and logged it as a lesson in what was ever his.",
    carry: "Which of these two things has a door I can actually knock on, and will I knock on it, or just carry it?" },
  { t: "Last-call belligerence",
    sit: "You called it, politely. He is loud now, and the room is watching how you handle him.",
    thought: "Do not let him win.",
    turn: "There is no contest to win: the law already decided, and you are only its messenger. His volume is his; your evenness is the whole performance the room actually remembers. The Stoics called it the discipline of assent: the insult lands only if you sign for it.",
    carry: "Can my voice get quieter as his gets louder?" },
  { t: "The line",
    sit: "The regular, the one who tips well, says the thing about your body again, with the smile that dares you to mind.",
    thought: "I need this table. Let it go.",
    turn: "Steadiness is not tolerance, and this book does not teach you to absorb it. The comment is his; the consequence is also his. What is yours is the line, and drawing it (out loud, to him, or to a manager, tonight) is not the failure of your composure. It IS your composure. A tip is not a licence, and the discipline of assent governs your judgment of an event, never your right to end it.",
    carry: "What are the exact words of my line, so I do not have to write them mid-sentence?" },
  { t: "The eight percent",
    sit: "Flawless service. Great table, laughing, thanked you by name. The tip is eight percent.",
    thought: "That was a verdict on me.",
    turn: "You are reading a stranger's arithmetic as a review of your worth, but you graded the service yourself, live, all night, and you know what it was. Marcus's move was to look inside the judges themselves: see what kind of judges you were afraid of (Meditations 9.18). Some judges are broke, some are foreign to the custom, some are just like that. Your standard survived them.",
    carry: "Did I serve for the twenty percent, or was the service itself the thing I would sign?" },
  { t: "The cut section",
    sit: "Saturday, and the floor chart has you on three tables while the new hire gets the rail.",
    thought: "This is personal.",
    turn: "Maybe. You cannot see the manager's whole board: the training plan, the complaint you never heard about, the favour owed. Sorting it as 'not mine' is not surrender; the conversation about the pattern is fully yours, in daylight, with the calm the three-table night just gave you time to prepare.",
    carry: "Three tables tonight: can they get the best service in the building, as a matter of private record?" },
  { t: "The slam",
    sit: "Kitchen is forty minutes behind, it is not your fault, and every table in your section is looking at you.",
    thought: "I am being blamed for something I cannot fix.",
    turn: "True, and irrelevant. You are not the kitchen; you are the weather report, and rooms forgive honest weather reports. Walk the section once with the truth and a timeline, comp what the house allows, and let the ticket times belong to the expo. The apology is a craft skill, not a confession.",
    carry: "Can I tell six tables the same true thing and mean it warmly all six times?" },
  { t: "The review",
    sit: "Two in the morning, and a stranger has posted three paragraphs with your name in the second one.",
    thought: "Everyone will read this.",
    turn: "A keyboard at 2am is not a jurisdiction you serve in. If there is one true sentence buried in it, take that sentence like a free correction and leave the rest with its author. Marcus took notes from his critics and then went back to work. The review cannot pour a drink or turn a table. You can.",
    carry: "Is there one useful sentence in it, and can I take just that one, the way I would take it from a chef?" },
  { t: "The rush that will not end",
    sit: "You are four deep at the well, the printer will not stop, and there is no horizon on it.",
    thought: "I cannot do all of this.",
    turn: "Correct: no one can do all of it, and no one is being asked to. You are being asked to do the next one. The rail is a rosary: one ticket, then one ticket, then one ticket. Panic is the attempt to serve the whole board at once; craft is the refusal to.",
    carry: "What is the next single ticket, and can I let it be the only one that exists while my hands are on it?" },
  { t: "The determined unhappy",
    sit: "They arrived disappointed. The food will not fix it, the comp will not fix it, and you can feel yourself trying harder for less.",
    thought: "I can turn this table around.",
    turn: "Some guests bring the ending written, and the harder you perform for the unpersuadable, the more of your shift they own. Serve them the meal they refuse to enjoy (completely, correctly, kindly) and let the outcome remain theirs. The other nineteen tables get the part of you this one was eating.",
    carry: "Am I still serving this table, or auditioning for it?" }
];

FL_VIEWS.floor = {
  label: 'The Floor Book',
  title: 'The Floor Book',
  hidden: true,   // reached from Today's sorting card; content, not a destination
  render: function () {
    var open = FL_VIEWS.floor._open;
    var cards = FLOOR_CARDS.map(function (c, i) {
      var isOpen = open === i;
      return '<div class="canon">' +
        '<button class="drawrow" style="width:100%;background:none;border:0;cursor:pointer;color:inherit;font:inherit;text-align:left" ' +
          'data-act="floorOpen" data-i="' + i + '" aria-expanded="' + isOpen + '">' +
          '<span class="pt">' + esc(c.t) + '</span><span class="ds">' + (isOpen ? '−' : '+') + '</span></button>' +
        (isOpen
          ? '<p class="px" style="margin-top:8px">' + esc(c.sit) + '</p>' +
            '<p class="px" style="color:var(--faint)"><em>The first thought: “' + esc(c.thought) + '”</em></p>' +
            '<p class="px">' + esc(c.turn) + '</p>' +
            '<p class="refl" style="margin-top:10px">' + esc(c.carry) + '</p>'
          : '') +
        '</div>';
    }).join('');
    return '<div class="kick">Reframes for real tables</div>' +
      '<h1>The Floor Book</h1>' +
      '<p class="note">Ten situations, each in four movements: what happened, the honest first thought, ' +
      'the turn, and one question to carry back through the doors. The first thought is named on purpose: ' +
      'it always arrives, and pretending otherwise is how this material curdles.</p>' +
      '<p class="px" style="color:var(--faint)">One of these teaches a boundary, not endurance. ' +
      'Steadiness is not tolerance; that distinction is the whole card.</p>' +
      cards;
  }
};

FL_ACTS.floorOpen = function (el) {
  var i = +el.getAttribute('data-i');
  FL_VIEWS.floor._open = FL_VIEWS.floor._open === i ? null : i;
  render();
};
