# CLAUDE.md

Static, single-page results site for the private "Hosalotri" home poker game. Content is German.

## Stack
- Plain HTML/CSS/JS — no build step, no package manager, no tests.
- `index.html`: all content, written by hand. Newest tournament first, then the "Medaillenspiegel" (medal table) at the bottom.
- `style.css`: plain CSS with **native nesting** (not Sass — no Sass functions like `rgba(white, .5)`). `html { font-size: 62.5% }`, so `1rem = 10px`.
- `script.js`: Swiper init for every `.js-swiper` (each finds its own `.swiper-pagination`) and the easter egg (`#egg-btn` → `#egg`).
- Swiper 11 comes from the jsDelivr CDN. Tournament photos are on ImageKit (`ik.imagekit.io/izitp12v9/Turnier%20N/...`), not in the repo.
- Font: Funnel Display, self-hosted in `assets/fonts/` and loaded via `assets/fonts/font.css`.
- Formatting: Prettier (`.prettierrc`: 4 spaces, semicolons).

## Adding a tournament
1. Copy `tournament-template.html` to the top of the tournament list in `index.html`, above the previous newest one, with an `<!-- dd.mm.yy -->` comment.
2. Set a unique checkbox `id` and the matching label `for` (the date, e.g. `07.02.26`), plus the title, location, Einsatz, Bounty and Preisgeld.
3. Results: mark medals with 🥇 `&#129351;`, 🥈 `&#129352;`, 🥉 `&#129353;`. For a chop, the players who split share the lower place number (e.g. two players at "2." and no "1.").
4. **Update the Medaillenspiegel by hand**: medal counts and "Starts" for every participant. Keep rows sorted by gold, then silver, then bronze. Recount against all tournament tables, because this table drifts easily.
5. If `style.css` changed, bump the cache-buster `style.css?v=YYYYMMDD`.

## Notes
- The site is deliberately not indexed (`robots.txt` Disallow, `noindex` meta). Keep it that way.
- Player names are nicknames; keep their spelling consistent across tables (e.g. "Tobi Z.", "klie Tobi").
- Preview locally: `python3 -m http.server`, then open http://localhost:8000.
