document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.getElementById("form-container");
  const contactForm = document.getElementById("contact-form");
  const formContainerSuccess = document.getElementById(
    "form-container--success"
  );
  const formContainerError = document.getElementById("form-container--error");
  const formMessageSuccess = document.getElementById("form-message--success");
  const formMessageError = document.getElementById("form-message--error");
  const overlay = document.getElementById("form-overlay");
  const openFormBtns = document.querySelectorAll(".open-form-btn");
  const closeBtns = document.querySelectorAll(".close");

  // Открытие формы
  openFormBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Блокируем скролл
      formContainer.style.display = "block";
    });
  });

  function resetForm() {
    contactForm.reset();
    hideErrorMessages();

    if (
      !!formContainerSuccess &&
      formContainerSuccess.style.display === "block"
    ) {
      formContainerSuccess.style.display = "none";
      formMessageSuccess.className = "form-message";
      formMessageSuccess.style.display = "none";
    }

    if (!!formContainerError && formContainerError.style.display === "block") {
      formContainerError.style.display = "none";
      formMessageError.className = "form-message";
      formMessageError.style.display = "none";
    }
  }

  function closeForm() {
    console.timeLog("closeForm");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto"; // Разблокируем скролл
    resetForm();
  }

  // Закрытие формы по клику на overlay
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeForm();
    }
  });

  // Закрытие формы по кнопке
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      closeForm();
    });
  });

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

  // Валидация формы
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm() && !isSpam()) {
      submitForm();
    }
  });

  function submitForm() {
    // Показываем loading state
    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Отправка...";
    submitBtn.disabled = true;

    // Собираем данные формы
    const formData = new FormData(contactForm);

    // Отправляем AJAX запрос
    fetch("send_email.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          formContainerSuccess.style.display = "block";
          formMessageSuccess.textContent = data.message;
          formMessageSuccess.className = "form-message success";
          contactForm.reset();
        } else {
          formContainerError.style.display = "block";
          formMessageError.textContent = data.message;
          formMessageError.className = "form-message error";
          contactForm.reset();
        }
      })
      .catch((error) => {
        formContainerError.style.display = "block";
        formMessageError.textContent = "Произошла ошибка при отправке формы";
        formMessageError.className = "form-message error";
        contactForm.reset();

        console.error("Error:", error);
      })
      .finally(() => {
        formContainer.style.display = "none";
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  }
});
