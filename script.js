const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Reveal sections as they enter the viewport. Keep content visible if unsupported.
const revealTargets = document.querySelectorAll(
  ".section-heading, .menu-card, .chef-copy, .chef-image-wrap, .order-copy, .order-banner>img, .review-empty, .visit-copy, .map-panel"
);
revealTargets.forEach(el => el.classList.add("reveal"));

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add("is-visible"));
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Keep the floating WhatsApp shortcut accessible to keyboard users.
const whatsapp = document.querySelector(".whatsapp-float");
if (whatsapp) whatsapp.setAttribute("title", "Chat with Sweet Crumbs Bakery on WhatsApp");
