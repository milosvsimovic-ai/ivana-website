const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector(".form-note");
const focusMessageLinks = document.querySelectorAll(".focus-message");
const contactEmail = "ivanakostic55@gmail.com";

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open menu");
  });
});

focusMessageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    contactForm?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      contactForm?.querySelector("input[name='name']")?.focus();
    }, 420);
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = data.get("name")?.toString().trim() || "Website visitor";
  const email = data.get("email")?.toString().trim() || "";
  const organization = data.get("organization")?.toString().trim() || "";
  const country = data.get("country")?.toString().trim() || "";
  const topic = data.get("topic")?.toString().trim() || "";
  const message = data.get("message")?.toString().trim() || "";

  const subject = encodeURIComponent(`Website message from ${name}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization / Institution: ${organization}`,
      `Country: ${country}`,
      `Topic: ${topic}`,
      "",
      message,
    ].join("\n")
  );

  formNote.textContent = "Opening your email app with the message ready to send.";
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});
