let swiper_elements = document.querySelectorAll(".js-swiper");

if (swiper_elements !== null) {
    let swiper_index = swiper_elements.length;
    swiper_elements.forEach((ele) => {
        let swiper = new Swiper(ele, {
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
                el: `.pagination-${swiper_index}`,
            },
        });
        swiper_index--;
    });
}

// easter-egg
const egg_btn = document.getElementById("egg-btn");
const egg = document.getElementById("egg");

egg_btn.addEventListener("click", () => {
    const x = Math.random() * (window.innerWidth - 220);
    const y = Math.random() * (window.innerHeight - 250);
    egg.style.left = `${x}px`;
    egg.style.top = `${y}px`;

    egg.style.animation = "none"; // vorherige Animation entfernen
    egg.offsetHeight; // Reflow erzwingen
    egg.style.animation = "fadeOut 2s forwards"; // neue Animation starten
});
