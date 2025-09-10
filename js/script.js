const swiper1 = new Swiper(".swiper-custom-1-1", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
});
const swiper2 = new Swiper(".swiper-custom-1-2", {
  loop: true,
  spaceBetween: 10,
  thumbs: {
    swiper: swiper1,
  },
});

const swiper3 = new Swiper(".swiper-custom-2-1", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
});
const swiper4 = new Swiper(".swiper-custom-2-2", {
  loop: true,
  spaceBetween: 10,
  thumbs: {
    swiper: swiper3,
  },
});

const swiper5 = new Swiper(".swiper-custom-3-1", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
});
const swiper6 = new Swiper(".swiper-custom-3-2", {
  loop: true,
  spaceBetween: 10,
  thumbs: {
    swiper: swiper5,
  },
});
