const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const slideDots = document.querySelectorAll(".slide-dot");
let slideInterval;

document.addEventListener("DOMContentLoaded", function () {
  initializeSlideshow();
  initializeNavigation();
  initializeFormValidation();
  initializeSmoothScrolling();
  initializeAnimations();
});
function initializeSlideshow() {
  startSlideshow();

  slideDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      resetSlideshow();
    });
  });

  const slideshowContainer = document.querySelector(".slideshow-container");
  if (slideshowContainer) {
    slideshowContainer.addEventListener("mouseenter", pauseSlideshow);
    slideshowContainer.addEventListener("mouseleave", startSlideshow);
  }
}

function startSlideshow() {
  slideInterval = setInterval(nextSlide, 5000);
}

function pauseSlideshow() {
  clearInterval(slideInterval);
}

function resetSlideshow() {
  pauseSlideshow();
  startSlideshow();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlideshow();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlideshow();
}

function updateSlideshow() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  slideDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}
function initializeNavigation() {
  if (hamburger) {
    hamburger.addEventListener("click", toggleMobileMenu);
  }

  const mobileLinks = document.querySelectorAll(".mobile-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (e) => {
    if (
      hamburger &&
      mobileMenu &&
      !hamburger.contains(e.target) &&
      !mobileMenu.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  if (hamburger && mobileMenu) {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  }
}

function closeMobileMenu() {
  if (hamburger && mobileMenu) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
}
function initializeFormValidation() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", handleFormSubmit);

  const formInputs = contactForm.querySelectorAll("input, select, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const formValues = {
    name: formData.get("name").trim(),
    email: formData.get("email").trim(),
    type: formData.get("type"),
    description: formData.get("description").trim(),
  };

  let isValid = true;

  if (!formValues.name) {
    showFieldError("name", "Nome é obrigatório");
    isValid = false;
  } else if (formValues.name.length < 2) {
    showFieldError("name", "Nome deve ter pelo menos 2 caracteres");
    isValid = false;
  }

  if (!formValues.email) {
    showFieldError("email", "E-mail é obrigatório");
    isValid = false;
  } else if (!isValidEmail(formValues.email)) {
    showFieldError("email", "Por favor, insira um e-mail válido");
    isValid = false;
  }

  if (!formValues.type) {
    showFieldError("type", "Tipo é obrigatório");
    isValid = false;
  }

  if (!formValues.description) {
    showFieldError("description", "Descrição é obrigatória");
    isValid = false;
  } else if (formValues.description.length < 10) {
    showFieldError(
      "description",
      "Descrição deve ter pelo menos 10 caracteres"
    );
    isValid = false;
  }

  if (isValid) {
    submitForm(formValues);
  }
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;

  clearFieldError(field);

  switch (fieldName) {
    case "name":
      if (!value) {
        showFieldError(fieldName, "Nome é obrigatório");
        return false;
      } else if (value.length < 2) {
        showFieldError(fieldName, "Nome deve ter pelo menos 2 caracteres");
        return false;
      }
      break;

    case "email":
      if (!value) {
        showFieldError(fieldName, "E-mail é obrigatório");
        return false;
      } else if (!isValidEmail(value)) {
        showFieldError(fieldName, "Por favor, insira um e-mail válido");
        return false;
      }
      break;

    case "type":
      if (!value) {
        showFieldError(fieldName, "Tipo é obrigatório");
        return false;
      }
      break;

    case "description":
      if (!value) {
        showFieldError(fieldName, "Descrição é obrigatória");
        return false;
      } else if (value.length < 10) {
        showFieldError(
          fieldName,
          "Descrição deve ter pelo menos 10 caracteres"
        );
        return false;
      }
      break;
  }

  return true;
}

function showFieldError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorElement = document.getElementById(fieldName + "-error");

  if (field && errorElement) {
    field.classList.add("error");
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }
}

function clearFieldError(field) {
  const fieldName = field.name;
  const errorElement = document.getElementById(fieldName + "-error");

  if (field && errorElement) {
    field.classList.remove("error");
    errorElement.classList.remove("show");
    errorElement.textContent = "";
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function submitForm(formValues) {
  console.log("Form submitted with values:", formValues);

  contactForm.style.display = "none";
  formSuccess.style.display = "block";

  setTimeout(() => {
    contactForm.reset();
    contactForm.style.display = "block";
    formSuccess.style.display = "none";

    const errorElements = contactForm.querySelectorAll(".error-message");
    errorElements.forEach((error) => {
      error.classList.remove("show");
      error.textContent = "";
    });

    const formFields = contactForm.querySelectorAll("input, select, textarea");
    formFields.forEach((field) => {
      field.classList.remove("error");
    });

    document.getElementById("form").scrollIntoView({ behavior: "smooth" });
  }, 5000);
}

function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          closeMobileMenu();
        }
      }
    });
  });
}

function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(
    ".info-card, .quiz-container, .contact-form"
  );
  fadeElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener(
  "resize",
  debounce(() => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  }, 250)
);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.target.form) {
    e.preventDefault();
  }
});
