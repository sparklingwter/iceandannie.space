async function loadSections() {
  const includes = document.querySelectorAll("[data-include]");

  await Promise.all(
    Array.from(includes, async function (include) {
      const response = await fetch(include.dataset.include);

      if (!response.ok) {
        throw new Error(`Unable to load ${include.dataset.include}`);
      }

      include.outerHTML = await response.text();
    }),
  );
}

window.addEventListener("DOMContentLoaded", async function () {
  await loadSections();

  const tripCount = document.querySelector("[data-trip-count]");
  const tripCards = document.querySelectorAll("#trips .trip-card");
  if (tripCount) tripCount.textContent = tripCards.length;

  // Only show Return Home button if not on index.html or /
  const isHome =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === "/iceanniefam.github.io/";

  if (!isHome) {
    const btn = document.createElement("a");
    btn.href = "index.html";
    btn.className = "return-home";
    btn.textContent = "← Return Home";
    document.body.insertAdjacentElement("afterbegin", btn);
  }

  // Theme toggle button
  const themeBtn = document.createElement("button");
  themeBtn.className = "theme-toggle";
  themeBtn.textContent = "🌙";

  // Insert theme toggle into header
  const header = document.querySelector("header");
  if (header) {
    header.appendChild(themeBtn);
  } else {
    // fallback: insert at top if no header
    document.body.insertAdjacentElement("afterbegin", themeBtn);
  }

  // Theme toggle logic
  function setTheme(theme) {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
  }

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  themeBtn.addEventListener("click", function () {
    const newTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";
    setTheme(newTheme);
  });

  // Lightbox: click a gallery photo (not one that's a link to another page) to view it full-size
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML =
    '<img alt="" /><button class="lightbox-close" aria-label="Close">&times;</button>';
  document.body.appendChild(overlay);
  const overlayImg = overlay.querySelector("img");

  function openLightbox(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || "";
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  document
    .querySelectorAll(".gallery-grid img, .card img")
    .forEach(function (img) {
      if (img.closest("a")) return; // leave nav thumbnails alone
      img.addEventListener("click", function () {
        openLightbox(img.currentSrc || img.src, img.alt);
      });
    });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlayImg) return;
    closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
});
