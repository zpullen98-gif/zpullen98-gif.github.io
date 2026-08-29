/* ============ The first week, behind the stick ============
   Six steps, in the order a new bartender actually needs them: the shape of a
   drink before any particular drink, then the house's own list, then the two
   things that get a bar shut down.

   `go` is the tab a step opens. A renamed tab keeps working; a removed one
   makes its step visibly dead rather than silently broken.
   ============ */

var FIRST_PATH = [
  { id: 'families', t: 'The eight templates',            go: 'families',   mins: 10 },
  { id: 'build',    t: 'Reading a spec off a ticket',    go: 'library',    mins: 8 },
  { id: 'ourbar',   t: 'What we actually pour',          go: 'mybar',      mins: 15 },
  { id: 'method',   t: 'Shake, stir, build, and why',    go: 'notes',      mins: 8 },
  { id: 'service',  t: 'Beer, wine and the legal floor', go: 'service',    mins: 12 },
  { id: 'first',    t: 'Your first ten cards',           go: 'flashcards', mins: 8 }
];
