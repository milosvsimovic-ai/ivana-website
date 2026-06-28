const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector(".form-note");
const focusMessageLinks = document.querySelectorAll(".focus-message");
const topicLinks = document.querySelectorAll(".looking-card[data-topic]");
const internalSectionLinks = document.querySelectorAll(
  "a[href^='#']:not(.focus-message):not(.looking-card)"
);
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

const getHeaderOffset = () => {
  return (document.querySelector(".site-header")?.offsetHeight || 0) + 18;
};

const scrollToElement = (target, focusTarget = null) => {
  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  if (focusTarget) {
    window.setTimeout(() => {
      focusTarget.focus({ preventScroll: true });
    }, 420);
  }
};

internalSectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    const target = hash && document.querySelector(hash);

    if (!target) return;

    event.preventDefault();
    document.body.classList.remove("nav-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open menu");
    scrollToElement(target);
    window.history.pushState(null, "", hash);
  });
});

const focusContactForm = (topic = "") => {
  if (!contactForm) return;

  const topicSelect = contactForm.querySelector("select[name='topic']");
  const nameInput = contactForm.querySelector("input[name='name']");
  if (topic && topicSelect) {
    topicSelect.value = topic;
    topicSelect.dispatchEvent(new Event("change", { bubbles: true }));
  }

  scrollToElement(nameInput || contactForm, nameInput);
};

focusMessageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    focusContactForm();
  });
});

topicLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    focusContactForm(link.dataset.topic || "");
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
