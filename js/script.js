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

// МОБИЛЬНОЕ МЕНЮ
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");

  // Блокировка скролла
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
});

// Закрытие по клику на overlay
overlay.addEventListener("click", () => {
  burgerBtn.classList.remove("active");
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});

// Закрытие по клику на ссылку
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    burgerBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Закрытие по ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    burgerBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});
