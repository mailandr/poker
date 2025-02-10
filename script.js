let swiper_elements = document.querySelectorAll(".js-swiper");

if (swiper_elements !== null) {
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
                el: ".swiper-pagination",
              },

        });
    });
}
