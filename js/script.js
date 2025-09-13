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

// JavaScript для смены порядка в блоке PRODUCTS
function swapElements() {
  const container = document.querySelector(".product__wrapper--order");
  const item1 = document.querySelector(".product__info--left");
  const item2 = document.querySelector(".product__image--right");

  if (window.innerWidth <= 800) {
    if (container.firstElementChild === item1) {
      container.insertBefore(item2, item1);
    }
  } else {
    if (container.firstElementChild === item2) {
      container.insertBefore(item1, item2);
    }
  }
}
window.addEventListener("load", swapElements);
window.addEventListener("resize", swapElements);

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

// Убираем обрезание моб.меню
// Установка правильной высоты
function setMenuHeight() {
  const menu = document.querySelector(".mobile-menu");
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  menu.style.height = window.innerHeight + "px";
}

// Инициализация
setMenuHeight();

// Обновление при ресайзе и ориентации
window.addEventListener("resize", setMenuHeight);
window.addEventListener("orientationchange", setMenuHeight);

Fancybox.bind("[data-fancybox]", {});
