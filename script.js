const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const signupForm = document.querySelector("[data-signup-form]");
const success = document.querySelector("[data-form-success]");
const betaInbox = "benjamin.pommeraud@gmail.com";

function updateHeader() {
  if (window.scrollY > 12) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");
  header.classList.toggle("menu-active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    header.classList.remove("menu-active");
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-label", "Open navigation");
  });
});

signupForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(signupForm);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const device = String(data.get("device") || "").trim();
  const note = String(data.get("note") || "").trim();
  if (!email) return;

  const subject = "Angel Friends beta interest";
  const body = [
    "Hi Angel team,",
    "",
    "I would like to register interest for the Friends beta.",
    "",
    `Parent name: ${name || "-"}`,
    `Email: ${email}`,
    `Child device environment: ${device || "-"}`,
    "",
    "What would make Angel useful for our family:",
    note || "-",
    "",
    "Sent from the Angel Friends beta page."
  ].join("\n");

  success.hidden = false;
  signupForm.querySelector(".form-button").textContent = "Open email draft again";
  window.location.href = `mailto:${betaInbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
