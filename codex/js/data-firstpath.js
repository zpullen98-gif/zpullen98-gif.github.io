/* ============ The first week ============
   What a new hire does before anyone expects them to know anything.

   Seven steps, each finishable in a break, ordered so that each one makes the
   next one easier to hold: how the words work, then how to read a bottle, then
   the venue's own list, then the two things that go wrong at the table.

   It is deliberately short. An induction nobody finishes teaches nothing, and
   the point of finishing is that a manager can see it happened.

   `go` names the tile the step sends a person to, which is how this stays in
   step with the app: a tile that gets renamed keeps working, and a tile that is
   removed makes its step obviously dead rather than silently broken.
   ============ */

var FIRST_PATH = [
  { id: 'words',  t: 'How we talk about wine',        go: 't-prim',  mins: 8 },
  { id: 'label',  t: 'Reading a label',               go: 't-prim',  mins: 6 },
  { id: 'grapes', t: 'The grapes you will be asked about', go: 'm-flash', mins: 10 },
  { id: 'ourlist', t: 'Our list, by the glass',       go: 't-cellar', mins: 15 },
  { id: 'service', t: 'Opening and pouring at the table', go: 't-svc', mins: 10 },
  { id: 'faults', t: 'When a guest says it is corked', go: 't-svc',   mins: 6 },
  { id: 'first',  t: 'Your first ten questions',      go: 'm-endless', mins: 8 }
];
