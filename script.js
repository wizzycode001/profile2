// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
    navItems.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Reveal sections as they scroll into view, then animate skill bars.
const revealItems = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-fill");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.querySelectorAll(".progress-fill").forEach((bar) => {
          bar.style.width = `${bar.dataset.progress}%`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
  progressBars.forEach((bar) => bar.style.width = `${bar.dataset.progress}%`);
}

// Keep the footer year up to date.
document.querySelector("#current-year").textContent = new Date().getFullYear();

// Demo contact form: prepares an email draft. Change this to your real email.
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
const portfolioEmail = "wisdomnachi572@gmail.com"; // Replace with your email address.

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nReply email: ${email}\n\n${message}`);
  if (portfolioEmail === "wisdomnachi572@gmail.com") {
    formNote.textContent = "Before using this form, replace your-email@example.com in script.js with your real email address.";
    return;
  }
  formNote.textContent = "Opening your email app with a draft. You will still need to press Send.";
  window.location.href = `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
});
