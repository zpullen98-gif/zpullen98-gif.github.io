/* First Light: the two registries every view writes into.

   This exists only to be loaded first. Each ui-*.js does `FL_VIEWS.today = {...}` at
   parse time, and classic scripts create their `var` bindings when they execute, not
   when the parser first sees them, so declaring these in app.js, which loads last,
   would mean every view file throws a ReferenceError before app.js ever ran.

   FL_VIEWS  view id -> { label, title, render(arg), after(arg)?, hidden? }
             Key order is nav order.
   FL_ACTS   action name -> handler(el, event), reached by data-act / data-change. */

var FL_VIEWS = {};
var FL_ACTS = {};
