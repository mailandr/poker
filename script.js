const MEDALS = { 1: "🥇", 2: "🥈", 3: "🥉" };

const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// "2026-02-07" -> "07.02.26"
const formatDate = (iso) => {
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y.slice(2)}`;
};

const medalSuffix = (place) => (MEDALS[place] ? ` ${MEDALS[place]}` : "");

function renderTournament(t) {
    const prizes = t.prizes
        .map((amount, i) => `${MEDALS[t.results[i][1]] ?? ""} ${amount}€`)
        .join(", ");

    const rows = t.results
        .map(
            ([name, place]) => `
                <tr${t.easterEgg === name ? ' id="egg-btn"' : ""}>
                    <td>${esc(name)}${medalSuffix(place)}</td>
                    <td class="tournament__placement">${place}.</td>
                </tr>`,
        )
        .join("");

    const slides = t.photos
        .map(
            ([src, alt]) => `
                <div class="swiper-slide">
                    <div class="swiper-slide__wrapper">
                        <img loading="lazy" src="${esc(src)}" alt="${esc(alt)}">
                    </div>
                </div>`,
        )
        .join("");

    return `
        <details class="tournament__wrapper">
            <summary class="tournament__label">
                <h2>
                    ${esc(t.title)}
                    <span>${formatDate(t.date)}</span>
                </h2>
                <span class="tournament__label--icon"></span>
            </summary>
            <div class="tournament__table">
                <div class="tournament__info">
                    <div>Location: ${esc(t.location)}</div>
                    <div>Einsatz: ${t.buyIn}€</div>
                    <div>Bounty: ${t.bounty}€</div>
                    <div>Preisgeld: ${prizes}</div>
                </div>
                <table>
                    <thead>
                        <tr><th>Spieler</th><th>Platzierung</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
                <div class="swiper js-swiper tournament__imgs">
                    <div class="swiper-wrapper">${slides}</div>
                    <div class="swiper-pagination pagination"></div>
                </div>
            </div>
        </details>`;
}

function computeMedalTable(tournaments) {
    const players = new Map();
    for (const t of tournaments) {
        for (const [name, place] of t.results) {
            const p = players.get(name) ?? { name, 1: 0, 2: 0, 3: 0, starts: 0 };
            p.starts++;
            if (MEDALS[place]) p[place]++;
            players.set(name, p);
        }
    }
    return [...players.values()].sort(
        (a, b) =>
            b[1] - a[1] ||
            b[2] - a[2] ||
            b[3] - a[3] ||
            b.starts - a.starts ||
            a.name.localeCompare(b.name, "de"),
    );
}

function renderMedalTable(tournaments) {
    const cell = (n) => `<td class="tournament__placement">${n || "-"}</td>`;
    return computeMedalTable(tournaments)
        .map(
            (p) => `
                <tr>
                    <td>${esc(p.name)}</td>
                    ${cell(p[1])}${cell(p[2])}${cell(p[3])}
                    <td class="tournament__starts-item">${p.starts}</td>
                </tr>`,
        )
        .join("");
}

// Render
const sorted = [...TOURNAMENTS].sort((a, b) => b.date.localeCompare(a.date));
document.getElementById("tournaments").innerHTML = sorted
    .map(renderTournament)
    .join("");
document.getElementById("medal-table").innerHTML = renderMedalTable(sorted);

// Swiper erst beim ersten Öffnen starten (im geschlossenen <details> hat es keine Größe)
document.querySelectorAll(".tournament__wrapper").forEach((details) => {
    details.addEventListener("toggle", () => {
        const ele = details.querySelector(".js-swiper");
        if (!details.open || ele.swiper) return;
        new Swiper(ele, {
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },
            autoplay: {
                delay: 2000,
                disableOnInteraction: true,
            },
            pagination: {
                dynamicBullets: true,
                el: ele.querySelector(".swiper-pagination"),
            },
        });
    });
});

// easter-egg
const egg_btn = document.getElementById("egg-btn");
const egg = document.getElementById("egg");

if (egg_btn && egg) {
    egg_btn.addEventListener("click", () => {
        const x = Math.random() * (window.innerWidth - 220);
        const y = Math.random() * (window.innerHeight - 250);
        egg.style.left = `${x}px`;
        egg.style.top = `${y}px`;

        egg.style.animation = "none"; // vorherige Animation entfernen
        egg.offsetHeight; // Reflow erzwingen
        egg.style.animation = "fadeOut 2s forwards"; // neue Animation starten
    });
}
