const MEDALS = { 1: "🥇", 2: "🥈", 3: "🥉" };
const SUITS = ["♠", "♥", "♦", "♣"];
const MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const euro = (n) => `${n.toLocaleString("de-DE")} €`;

const medalSuffix = (place) => (MEDALS[place] ? ` ${MEDALS[place]}` : "");

// Datum als Poker-Chip: Tag groß, Monat + Jahr klein
function renderDateChip(iso) {
    const [y, m, d] = iso.split("-");
    return `
        <time class="chip" datetime="${iso}">
            <span class="chip__day">${Number(d)}</span>
            <span class="chip__month">${MONTHS[m - 1]} ${y.slice(2)}</span>
        </time>`;
}

// Wer hat (geteilt) den besten Platz geholt?
function winnerLine(t) {
    const best = Math.min(...t.results.map(([, place]) => place));
    const names = t.results.filter(([, place]) => place === best).map(([name]) => esc(name));
    const label = names.length > 1 ? "Split" : "Sieg";
    return `${MEDALS[best] ?? ""} ${label}: ${names.join(" · ")}`;
}

function renderTournament(t, i) {
    const suit = SUITS[i % SUITS.length];
    const red = suit === "♥" || suit === "♦";

    const prizes = t.prizes
        .map((amount, idx) => {
            const place = t.results[idx][1];
            const label = MEDALS[place] ?? `<span class="prizes__place">${place}. Platz</span>`;
            return `<li>${label} ${euro(amount)}</li>`;
        })
        .join("");

    const rows = t.results
        .map(
            ([name, place]) => `
                <tr${t.easterEgg === name ? ' id="egg-btn"' : ""}${MEDALS[place] ? ` class="podium-${place}"` : ""}>
                    <td class="results__place"><span>${place}</span></td>
                    <td>${esc(name)}${medalSuffix(place)}</td>
                </tr>`,
        )
        .join("");

    const slides = t.photos
        .map(
            ([src, alt]) => `
                <div class="swiper-slide">
                    <button type="button" class="gallery__zoom" aria-label="Foto vergrößern">
                        <img loading="lazy" src="${esc(src)}" alt="${esc(alt)}">
                    </button>
                </div>`,
        )
        .join("");

    return `
        <details class="tournament${red ? " is-red" : ""}" data-suit="${suit}" style="--i: ${i}">
            <summary>
                ${renderDateChip(t.date)}
                <div class="tournament__head">
                    <h3 class="tournament__title">${esc(t.title)}</h3>
                    <p class="tournament__meta"><span>${winnerLine(t)}</span> <span class="tournament__players">${t.results.length} Spieler</span></p>
                </div>
                <span class="toggle" aria-hidden="true"></span>
            </summary>
            <div class="tournament__body">
                <dl class="facts">
                    <div><dt>Location</dt><dd>${esc(t.location)}</dd></div>
                    <div><dt>Einsatz</dt><dd>${euro(t.buyIn)}</dd></div>
                    <div><dt>Bounty</dt><dd>${euro(t.bounty)}</dd></div>
                    <div class="facts__wide"><dt>Preisgeld</dt><dd><ul class="prizes">${prizes}</ul></dd></div>
                </dl>
                ${t.mostBounties ? `<p class="callout">☠️ Bounty Jäger des Abends: <strong>${esc(t.mostBounties)}</strong></p>` : ""}
                ${t.note ? `<p class="note">${esc(t.note)}</p>` : ""}
                <table class="results">
                    <thead>
                        <tr><th scope="col">Platz</th><th scope="col">Spieler</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
                <div class="swiper js-swiper gallery">
                    <div class="swiper-wrapper">${slides}</div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
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
        (a, b) => b[1] - a[1] || b[2] - a[2] || b[3] - a[3] || b.starts - a.starts || a.name.localeCompare(b.name, "de"),
    );
}

function renderMedalTable(tournaments) {
    const cell = (n) => `<td class="${n ? "" : "is-zero"}">${n || "–"}</td>`;
    return computeMedalTable(tournaments)
        .map(
            (p) => `
                <tr>
                    <th scope="row">${esc(p.name)}</th>
                    ${cell(p[1])}${cell(p[2])}${cell(p[3])}
                    <td class="standings__starts">${p.starts}</td>
                </tr>`,
        )
        .join("");
}

// Wie oft war jemand "Bounty Jäger des Abends"? (tournaments ist neueste zuerst sortiert)
function computeBountyTable(tournaments) {
    const hunters = new Map();
    for (const t of tournaments) {
        if (!t.mostBounties) continue;
        const h = hunters.get(t.mostBounties) ?? { name: t.mostBounties, titles: 0, last: t };
        h.titles++;
        hunters.set(t.mostBounties, h);
    }
    return [...hunters.values()].sort((a, b) => b.titles - a.titles || b.last.date.localeCompare(a.last.date));
}

function renderBountyTable(tournaments) {
    return computeBountyTable(tournaments)
        .map(
            (h) => `
                <tr>
                    <th scope="row">${esc(h.name)}</th>
                    <td>${h.titles}</td>
                    <td class="standings__text">${esc(h.last.title)}</td>
                </tr>`,
        )
        .join("");
}

function renderStats(tournaments) {
    const players = new Set(tournaments.flatMap((t) => t.results.map(([name]) => name)));
    const pot = tournaments.reduce((sum, t) => sum + t.prizes.reduce((a, b) => a + b, 0), 0);
    const stat = (value, label) => `<div><dt>${label}</dt><dd>${value}</dd></div>`;
    return stat(tournaments.length, "Turniere") + stat(players.size, "Spieler") + stat(euro(pot), "ausgespielt");
}

// Render
const sorted = [...TOURNAMENTS].sort((a, b) => b.date.localeCompare(a.date));
document.getElementById("tournaments").innerHTML = sorted.map(renderTournament).join("");
document.getElementById("medal-table").innerHTML = renderMedalTable(sorted);
document.getElementById("stats").innerHTML = renderStats(sorted);
const bountyRows = renderBountyTable(sorted);
document.getElementById("bounty-table").innerHTML = bountyRows;
document.getElementById("bounty-section").hidden = !bountyRows;

// Swiper erst beim ersten Öffnen starten (im geschlossenen <details> hat es keine Größe)
document.querySelectorAll(".tournament").forEach((details) => {
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
            navigation: {
                prevEl: ele.querySelector(".swiper-button-prev"),
                nextEl: ele.querySelector(".swiper-button-next"),
            },
            a11y: {
                prevSlideMessage: "Vorheriges Foto",
                nextSlideMessage: "Nächstes Foto",
            },
        });
    });
});

// Lightbox (PhotoSwipe): erst beim ersten Antippen eines Fotos laden.
// PhotoSwipe braucht Breite/Höhe; die lesen wir aus den Slider-Bildern.
document.getElementById("tournaments").addEventListener("click", async (e) => {
    const button = e.target.closest(".gallery__zoom");
    if (!button) return;
    const gallery = button.closest(".js-swiper");
    const imgs = [...gallery.querySelectorAll("img")];

    // noch nicht geladene (lazy) Bilder jetzt laden, damit ihre Größe bekannt ist
    imgs.forEach((img) => (img.loading = "eager"));
    const [{ default: PhotoSwipe }] = await Promise.all([
        import("https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe.esm.min.js"),
        ...imgs.map((img) => img.decode().catch(() => {})),
    ]);

    const pswp = new PhotoSwipe({
        dataSource: imgs.map((img) => ({
            src: img.src,
            alt: img.alt,
            width: img.naturalWidth,
            height: img.naturalHeight,
        })),
        index: imgs.indexOf(button.querySelector("img")),
        showHideAnimationType: "fade",
        closeTitle: "Schließen",
        zoomTitle: "Zoomen",
        arrowPrevTitle: "Vorheriges Foto",
        arrowNextTitle: "Nächstes Foto",
        errorMsg: "Das Foto konnte nicht geladen werden.",
    });
    // iOS Safari scrollt beim Fokussieren der (fixierten) Lightbox nach oben: Position merken und wiederherstellen
    const scrollY = window.scrollY;
    const restoreScroll = () => window.scrollY !== scrollY && window.scrollTo({ top: scrollY, behavior: "instant" });
    // nach dem Schließen steht der Slider auf dem zuletzt angesehenen Foto
    pswp.on("close", () => {
        gallery.swiper?.slideTo(pswp.currIndex, 0);
        restoreScroll();
    });
    pswp.on("destroy", restoreScroll);
    pswp.init();
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
