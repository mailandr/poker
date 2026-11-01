# CLAUDE.md

Static, single-page results site for the private "Hosalotri" home poker game. Content is German.

## Stack
- Plain HTML/CSS/JS — no build step, no package manager, no tests.
- `tournaments.js`: **all tournament data** (`TOURNAMENTS` array). This is the only file to edit for new results.
- `index.html`: page shell (header, `#tournaments` container, medal-table `<tbody id="medal-table">`). It holds no results.
- `script.js`: renders each tournament as a `<details>` accordion and **calculates the Medaillenspiegel** from the data. It sorts by gold, silver, bronze, then starts, then name. Swiper starts lazily on a tournament's first open. It also wires the easter egg (`easterEgg` field → `#egg-btn` → `#egg`).
- `style.css`: plain CSS with **native nesting** (not Sass — no Sass functions like `rgba(white, .5)`). `html { font-size: 62.5% }`, so `1rem = 10px`.
- Swiper 11 comes from the jsDelivr CDN. Tournament photos are on ImageKit (`ik.imagekit.io/izitp12v9/Turnier%20N/...`), not in the repo.
- Font: Funnel Display, self-hosted in `assets/fonts/` and loaded via `assets/fonts/font.css`.
- Formatting: Prettier (`.prettierrc`: 4 spaces, semicolons, printWidth 120 so photo entries in `tournaments.js` stay one per line).

## Adding a tournament
1. Add an object at the top of `TOURNAMENTS` in `tournaments.js`, with:
   - `date` (ISO, e.g. `"2026-02-07"`; display order comes from it)
   - `title`, `location`, `buyIn`, `bounty`
   - `prizes` (amounts, in the same order as the top results; places 4+ show as "4. 50€"; include rebuy money here)
   - `results` (`[name, place]` pairs)
   - `photos` (`[url, alt]` pairs)
   - optional `mostBounties`: name of the player with the most bounties, shown under Preisgeld as "☠️ Bounty Jäger des Abends"
   - optional `note`: free text shown under Preisgeld when the tournament is opened
2. Places 1–3 get 🥇🥈🥉 automatically. For a chop, the players who split share the lower place number (e.g. two players at 2 and no 1).
3. Don't touch the medal table; it is calculated. Spell player names exactly as before, or they count as a new player.
4. Bump the `?v=YYYYMMDD` cache-buster in `index.html` for every changed file (`tournaments.js`, `script.js`, `style.css`). Otherwise phones keep showing the old results.

## Notes
- The site is deliberately not indexed (`robots.txt` Disallow, `noindex` meta). Keep it that way.
- Player names are nicknames; keep their spelling consistent across tables (e.g. "Tobi Z.", "klie Tobi").
- Preview locally: `python3 -m http.server`, then open http://localhost:8000.
