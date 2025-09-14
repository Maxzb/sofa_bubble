document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("form-overlay");
  const form = document.getElementById("contact-form");
  const openFormBtns = document.querySelectorAll(".open-form-btn");
  const closeBtn = document.querySelector(".close");
  const formMessage = document.getElementById("form-message");

  // Открытие формы
  openFormBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Блокируем скролл
    });
  });

  function resetForm() {
    form.reset();
    hideErrorMessages();
    formMessage.className = "form-message";
    formMessage.style.display = "none";
  }

  function closeForm() {
    overlay.classList.remove("active");
    document.body.style.overflow = ""; // Разблокируем скролл
    resetForm();
  }

  // Закрытие формы по клику на overlay
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeForm();
    }
  });

  // Закрытие формы по кнопке
  closeBtn.addEventListener("click", closeForm);

  // Закрытие формы по ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeForm();
    }
  });

  function hideErrorMessages() {
    document.querySelectorAll(".error-message").forEach(function (el) {
      el.style.display = "none";
    });
  }

  // Валидация формы
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm() && !isSpam()) {
      submitForm();
    }
  });

  function validateForm() {
    let isValid = true;
    hideErrorMessages();

    // Валидация имени
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("name-error");

    if (!nameInput.value.trim()) {
      nameError.textContent = "Пожалуйста, введите ваше имя";
      nameError.style.display = "block";
      isValid = false;
    }

    // Валидация телефона
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");
    const phoneRegex =
      /^(\+7|8)[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

    if (!phoneInput.value.trim()) {
      phoneError.textContent = "Пожалуйста, введите ваш телефон";
      phoneError.style.display = "block";
      isValid = false;
    } else if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ""))) {
      phoneError.textContent = "Пожалуйста, введите корректный номер телефона";
      phoneError.style.display = "block";
      isValid = false;
    }

    return isValid;
  }

  // Проверка на спам (бот заполнил скрытое поле)
  function isSpam() {
    const honeypot = document.getElementById("website");
    return honeypot.value !== "";
  }

  // Отправка формы
  function submitForm() {
    const submitBtn = form.querySelector(".submit-btn");
    const formData = new FormData(form);

    // Блокируем кнопку отправки
    submitBtn.disabled = true;
    submitBtn.textContent = "Отправка...";

    // Отправка данных на сервер
    fetch("send_email.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        return response.text();
      })
      .then((data) => {
        showMessage(data, "success");

        // Очищаем форму через 3 секунды
        setTimeout(function () {
          closeForm();
        }, 3000);
      })
      .catch((error) => {
        showMessage(
          "Произошла ошибка при отправке формы.Пожалуйста, попробуйте еще раз.",
          "error"
        );
        console.error("Ошибка:", error);
      })
      .finally(() => {
        // Разблокируем кнопку
        submitBtn.disabled = false;
        submitBtn.textContent = "Отправить";
      });
  }

  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "form-message " + type;
    formMessage.style.display = "block";
  }
});
