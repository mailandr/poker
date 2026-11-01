// Alle Turniere. Neues Turnier einfach oben in die Liste einfügen.
//
// results: [Name, Platz] in Reihenfolge der Platzierung.
//          Bei einem Chop teilen sich die Spieler den jeweils schlechteren Platz
//          (z. B. zwei Spieler auf Platz 2 und kein Platz 1).
//          Platz 1–3 bekommt automatisch 🥇🥈🥉 und zählt im Medaillenspiegel.
// prizes:  Preisgeld in € für die ersten Plätze, in derselben Reihenfolge wie results.
//          Ab Platz 4 wird statt Medaille die Platzierung angezeigt (z. B. "4. 50€").
// photos:  [URL, Alt-Text]
// mostBounties (optional): Name des Spielers mit den meisten Bounties (unter dem Preisgeld).
// note (optional): Zusatztext unter dem Preisgeld (nur im aufgeklappten Turnier sichtbar).
// easterEgg (optional): Name des Spielers, dessen Zeile das Easter-Egg auslöst.

const IMG = "https://ik.imagekit.io/izitp12v9";

const TOURNAMENTS = [
    {
        date: "2026-10-31",
        title: "Halloween Poker - 2026",
        location: "Sali",
        buyIn: 50,
        bounty: 10,
        prizes: [300, 200, 100, 50], // inkl. 1 Rebuy
        mostBounties: "Roland",
        results: [
            ["Stef", 1],
            ["Sali", 2],
            ["Cle", 3],
            ["Roland", 4],
            ["Gas", 5],
            ["Simon", 6],
            ["klie Tobi", 7],
            ["Tobi Z.", 8],
            ["Muri", 9],
            ["Milan", 10],
            ["Päsc", 11],
            ["Hülli", 12],
        ],
        photos: [
            [`${IMG}/Turnier%206/Turnier-6-8.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%206/Turnier-6-6.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%206/Turnier-6-5.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%206/Turnier-6-1.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%206/Turnier-6-3.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%206/Turnier-6-4.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%206/Turnier-6-7.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%206/Turnier-6-9.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%206/Turnier-6-10.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%206/Turnier-6-11.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%206/flyer.jpeg`, "Flyer"],
            [`${IMG}/Turnier%206/Turnier-6-2.jpeg`, "Turnierfoto"],
        ],
    },
    {
        date: "2026-02-07",
        title: "Sali & Hülli Geburtstags Pökerle",
        location: "Sali",
        buyIn: 50,
        bounty: 10,
        prizes: [230, 120, 50],
        results: [
            ["Lui", 1],
            ["Sali", 2],
            ["Luki", 3],
            ["Milan", 4],
            ["Martin", 5],
            ["Cle", 6],
            ["Hülli", 7],
            ["Tobi Z.", 8],
        ],
        photos: [
            [`${IMG}/Turnier%205/Turnier-5-2`, "Siegerfoto"],
            [`${IMG}/Turnier%205/Turnier-5-1`, "Siegerfoto"],
            [`${IMG}/Turnier%205/Turnier-5-3`, "Siegerfoto"],
            [`${IMG}/Turnier%205/Turnier-5-4`, "Siegerfoto"],
            [`${IMG}/Turnier%205/Turnier-5-5`, "Flyer"],
        ],
    },
    {
        date: "2025-12-26",
        title: "End of year poker - 2025",
        location: "Sali",
        buyIn: 50,
        bounty: 10,
        prizes: [200, 150, 150],
        results: [
            ["Hülli", 3],
            ["Gas", 3],
            ["Milan", 3],
            ["Simon", 4],
            ["Sali", 5],
            ["Eri", 6],
            ["Stef", 7],
            ["Lui", 8],
            ["Martin", 9],
            ["Tobi Z.", 10],
        ],
        photos: [
            [`${IMG}/Turnier%204/turnier-4-2.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%204/turnier-4-1.jpeg`, "Turnierfoto"],
            [`${IMG}/Turnier%204/turnier-4-3.jpeg`, "Turnierfoto"],
        ],
    },
    {
        date: "2025-10-31",
        title: "Halloween Poker - 2025",
        location: "Sali",
        buyIn: 50,
        bounty: 10,
        prizes: [225, 225, 100],
        easterEgg: "Gas",
        results: [
            ["Sali", 2],
            ["Gas", 2],
            ["Cle", 3],
            ["Milan", 4],
            ["Lui", 5],
            ["Muri", 6],
            ["Stef", 7],
            ["klie Tobi", 8],
            ["Simon", 9],
            ["Tobi Z.", 10],
            ["Martin", 11],
        ],
        photos: [
            [`${IMG}/Turnier%203/turnier-3-4.jpeg?updatedAt=1762003328004`, "Turnierfoto"],
            [`${IMG}/Turnier%203/turnier-3-3.jpeg?updatedAt=1762003327919`, "Turnierfoto"],
            [`${IMG}/Turnier%203/turnier-3-2.jpeg?updatedAt=1762003327903`, "Turnierfoto"],
            [`${IMG}/Turnier%203/turnier-3-1.jpeg?updatedAt=1762003327148`, "Turnierfoto"],
            [`${IMG}/Turnier%203/turnier-3-5.jpeg?updatedAt=1762003327990`, "Turnierfoto"],
            [`${IMG}/Turnier%203/turnier-3-6.jpeg?updatedAt=1762003327950`, "Turnierfoto"],
            [`${IMG}/Turnier%203/tournament-3-flyer.jpeg?updatedAt=1762003327718`, "Flyer"],
        ],
    },
    {
        date: "2025-02-07",
        title: "Salis Geburtstags Pökerle",
        location: "Sali",
        buyIn: 10,
        bounty: 5,
        prizes: [40, 40, 10],
        results: [
            ["Simon", 2],
            ["Bitschi", 2],
            ["klie Tobi", 3],
            ["Lui", 4],
            ["Tobi Z.", 5],
            ["Milan", 6],
            ["Sali", 7],
            ["Luki", 8],
            ["Cle", 9],
        ],
        photos: [
            [`${IMG}/Turnier%202/turnier2-3.jpeg?updatedAt=1762003298329`, "Siegerfoto"],
            [`${IMG}/Turnier%202/turnier2-1.jpeg?updatedAt=1762003298329`, "Siegerfoto"],
            [`${IMG}/Turnier%202/turnier2-2.jpeg?updatedAt=1762003298210`, "Siegerfoto"],
            [`${IMG}/Turnier%202/turnier2-4.jpeg?updatedAt=1762003298157`, "Siegerfoto"],
        ],
    },
    {
        date: "2024-12-29",
        title: "End of year poker - 2024",
        location: "Sali",
        buyIn: 50,
        bounty: 0,
        prizes: [250, 150, 100],
        results: [
            ["Sali", 1],
            ["Stef", 2],
            ["Luki", 3],
            ["Cle", 4],
            ["Milan", 5],
            ["Eri", 6],
            ["Simon", 7],
            ["Tobi Z.", 8],
            ["Lui", 9],
            ["Päsc", 10],
        ],
        photos: [
            [`${IMG}/Turnier%201/1-2.jpeg?updatedAt=1762003271315`, "Siegerfoto"],
            [`${IMG}/Turnier%201/1-1.jpeg?updatedAt=1762003271310`, "Siegerfoto"],
        ],
    },
];
