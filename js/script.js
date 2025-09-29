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

const swiper7 = new Swiper(".swiper-custom-4-1", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
});
const swiper8 = new Swiper(".swiper-custom-4-2", {
  loop: true,
  spaceBetween: 10,
  thumbs: {
    swiper: swiper7,
  },
});

const swiper9 = new Swiper(".swiper-custom-5-1", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
});
const swiper10 = new Swiper(".swiper-custom-5-2", {
  loop: true,
  spaceBetween: 10,
  thumbs: {
    swiper: swiper9,
  },
});

// JavaScript для смены порядка в блоке PRODUCTS
function swapElements() {
  const containers = document.querySelectorAll(".product__wrapper--order");

  containers.forEach((container, index) => {
    const item1 = container.querySelector(".product__info--left");
    const item2 = container.querySelector(".product__image--right");

    if (!item1 || !item2) {
      console.warn("Элементы не найдены в контейнере", index);
      return;
    }

    if (window.innerWidth <= 800) {
      if (container.firstElementChild === item1) {
        container.insertBefore(item2, item1);
      }
    } else {
      if (container.firstElementChild === item2) {
        container.insertBefore(item1, item2);
      }
    }
  });
}

// Дебаунс для оптимизации resize событий
let resizeTimeout;
function debouncedSwap() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(swapElements, 250);
}

window.addEventListener("load", swapElements);
window.addEventListener("resize", debouncedSwap);

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

// Фикс для IOS
// Проверяем поддержку aspect-ratio
function supportsAspectRatio() {
  return CSS.supports("aspect-ratio", "16/9");
}

// Если не поддерживается, добавляем padding hack
if (!supportsAspectRatio()) {
  document.querySelectorAll(".flex-item").forEach((item) => {
    item.style.position = "relative";
    const padding = document.createElement("div");
    padding.style.paddingTop = "56.25%";
    item.insertBefore(padding, item.firstChild);

    const img = item.querySelector("img");
    if (img) {
      img.style.position = "absolute";
      img.style.top = "0";
      img.style.left = "0";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
    }
  });
}

// Фиксированный Header при скролле в моб.версии
// Получаем элементы
const header = document.getElementById("header");

// Порог скролла для срабатывания
const SCROLL_THRESHOLD = 100;

// Функция для обработки скролла
function handleScroll() {
  const scrollY = window.scrollY;

  if (scrollY > SCROLL_THRESHOLD) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Оптимизация производительности с requestAnimationFrame
let ticking = false;
window.addEventListener("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(function () {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", function () {
  handleScroll(); // Проверяем начальную позицию
});
