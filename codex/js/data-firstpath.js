/* ============ The first week ============
   What a new hire does before anyone expects them to know anything.

   Seven steps, each finishable in a break, ordered so that each one makes the
   next one easier to hold: a chapter, then how to read a bottle, then the
   grapes, then the venue's own list, then the two things that go wrong at the
   table, then ten questions to prove it took.

   It is deliberately short. An induction nobody finishes teaches nothing, and
   the point of finishing is that you have seen every room in here once.

   Every title names what the step actually opens. `go` names the tile the
   step sends a person to, which is how this stays in step with the app: a
   tile that gets renamed keeps working, and a tile that is removed makes its
   step obviously dead rather than silently broken. Three steps open a place
   inside a tile rather than the tile itself (codex14's PATH_OPEN): the
   classifications and labels chapter, the corked-bottle film, and a counted
   ten-question Régionale round.
   ============ */

var FIRST_PATH = [
  { id: 'words',  t: 'Read one study chapter',                  go: 't-prim',    mins: 8 },
  { id: 'label',  t: 'Classifications and label terms',         go: 't-prim',    mins: 6 },
  { id: 'grapes', t: 'The grape flashcards',                    go: 'm-flash',   mins: 10 },
  { id: 'ourlist', t: 'Our list, by the glass',                 go: 't-cellar',  mins: 15 },
  { id: 'service', t: 'The service ritual: opening and pouring', go: 't-svc',    mins: 10 },
  { id: 'faults', t: 'Watch: handling a corked bottle',         go: 't-vid',     mins: 6 },
  { id: 'first',  t: 'Your first ten questions',                go: 'm-endless', mins: 8 }
];
