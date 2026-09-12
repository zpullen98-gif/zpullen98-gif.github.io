# The world maps

Drop the map images here, one per file, named exactly as below. The app finds
them on its own: there is no list to edit and no index to regenerate. A name
that is not on this list is ignored, and a map whose file is absent is simply
not shown, so the folder can be filled in any order and at any pace.

## Names

| # | map | file |
|---|---|---|
| 1 | France | `france.jpg` |
| 2 | Italy | `italy.jpg` |
| 3 | Spain | `spain.jpg` |
| 4 | Portugal | `portugal.jpg` |
| 5 | Germany | `germany.jpg` |
| 6 | Austria | `austria.jpg` |
| 7 | California | `california.jpg` |
| 8 | Oregon | `oregon.jpg` |
| 9 | Washington | `washington.jpg` |
| 10 | New York | `new-york.jpg` |
| 11 | Argentina | `argentina.jpg` |
| 12 | Chile | `chile.jpg` |
| 13 | Australia | `australia.jpg` |
| 14 | New Zealand | `new-zealand.jpg` |
| 15 | South Africa | `south-africa.jpg` |

Lower case, hyphens not spaces, `.jpg` not `.jpeg`.

While this folder is empty the browser console shows fifteen 404s on every
load. That is the app asking whether each map is there yet and being told no.
It is not a fault, nothing is broken by it, and it stops the moment the files
land. The World Map door stays hidden until at least one of them does.

## Format

JPEG, longest edge about 2200 pixels, quality about 80, **each file under
600 KB and the whole folder under 9 MB.**

The size matters more than it looks. The app installs its own files in one
act of about 5 MB and holds two copies of them while it updates, so a folder
of full-size PNGs would be sixty megabytes and would make the app unusable on
a phone. 2200 pixels is enough to read a legend when the reader pinches in.

If a file arrives larger it will be re-encoded rather than rejected.

## What happens to them

They are **not** part of the app's own download, on purpose: a slow or
interrupted first visit must never leave somebody with a broken app. They
load like any other image, and the World Map tab offers to keep them on the
device, in a cache called `codexmaps-v1` that survives every later deploy.

## Adding a sixteenth

Two regions the app examines have no map: **Hungary and Greece** (Tokaj,
Eger, Santorini, Nemea, Naoussa) and **Canada** (Niagara, Okanagan). Virginia
and Texas are examined and are currently listed under New York with a note
saying they are on no map yet.

To add one, put the file here and add a row to `MAP_SHEETS` in
`js/data-maps.js`, giving its `id`, its `name`, the matching `INTRO_ATLAS`
country name, and the drill section it should offer. Then add the id to the
right group in `MAP_GROUPS`.
