const phrases = ["Frontend Developer", "UI Designer", "Full Stack Developer"];
const typewriterElement = document.getElementById("typewriter");
const cursorElement = document.getElementById("cursor");

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[currentPhraseIndex];

  if (isDeleting) {
    currentCharIndex--;
  } else {
    currentCharIndex++;
  }

  typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex);

  let typingSpeed = isDeleting ? 60 : 110;

  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    typingSpeed = 1200;
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    typingSpeed = 220;
  }

  setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  if (cursorElement) {
    cursorElement.style.display = "inline-block";
  }
  type();
});

const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches(".nav-link")) {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

const skillCards = document.querySelectorAll(".skill-card");

if ("IntersectionObserver" in window) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const fill = card.querySelector(".skill-bar-fill");
          const level = card.getAttribute("data-skill-level") || "0";
          if (fill) {
            requestAnimationFrame(() => {
              fill.style.width = `${level}%`;
            });
          }
          skillsObserver.unobserve(card);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  skillCards.forEach((card) => skillsObserver.observe(card));
} else {
  skillCards.forEach((card) => {
    const fill = card.querySelector(".skill-bar-fill");
    const level = card.getAttribute("data-skill-level") || "0";
    if (fill) {
      fill.style.width = `${level}%`;
    }
  });
}

const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

if (form && formStatus && submitBtn) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all the fields.";
      formStatus.className = "form-status error";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        formStatus.textContent = data.message || "Your message has been sent.";
        formStatus.className = "form-status success";
        form.reset();
      } else {
        const errorMessage =
          data.error ||
          "Something went wrong while sending your message. Please try again in a moment.";
        formStatus.textContent = errorMessage;
        formStatus.className = "form-status error";
      }
    } catch (error) {
      formStatus.textContent =
        "Unable to reach the server right now. Please check your connection and try again.";
      formStatus.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
    }
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

