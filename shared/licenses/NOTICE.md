# Bundled fonts

Every font family shipped with Outside Of Time is licensed under the
**SIL Open Font License, Version 1.1**, which permits bundling and
redistribution with this project. The full licence text is in
[OFL.txt](OFL.txt) beside this file; the official copy lives at
<https://openfontlicense.org/open-font-license-official-text/>.

The files are the subsets served by Google Fonts (or built by
`@fontsource`, which packages the same releases). No modifications were
made to the font data. Each family's copyright notice and any Reserved
Font Name are those of its release, viewable on the family's page at
<https://fonts.google.com>.

| Wing | Families bundled |
|---|---|
| The Sommelier's Codex (`codex/fonts/`) | Cinzel, Cinzel Decorative, EB Garamond |
| The Bartender's Ledger (`ledger/fonts/`) | Rye, Courier Prime, Libre Franklin (also noticed in `ledger/fonts/NOTICE.md`) |
| The World Table (`table/_app/immutable/assets/`) | Cormorant Garamond, EB Garamond |
| First Light (`light/fonts/`) | Cormorant Garamond, Karla |
| Calendar For Life | none bundled; loads Cinzel, Cinzel Decorative, IM Fell English, IM Fell English SC, Pinyon Script and UnifrakturMaguntia from Google Fonts at runtime |
| The hub | none; system font stacks only |

The World Table's font files carry build-hashed names and are regenerated
by every rebuild, which is why their notice lives here rather than beside
the files.
