/**
 * VOLUMES REGISTRY
 * ─────────────────────────────────────────────────────
 * This is the single place to manage all volumes.
 *
 * To publish a new volume:
 *   1. Add an entry to the VOLUMES array below.
 *   2. Set  live: true  when the page is ready.
 *   3. Drop the corresponding HTML file in the root folder.
 *
 * That's it. Every page on the site updates automatically.
 * ─────────────────────────────────────────────────────
 */

const VOLUMES = [
  {
    num:    "I",
    name:   "Isaac Newton",
    sub:    "Natural Philosopher",
    file:   "newton.html",
    live:   true,
  },
  {
    num:    "II",
    name:   "Joseph Fourier",
    sub:    "Mathematician",
    file:   "fourier.html",
    live:   false,
  },
  // ── ADD NEW VOLUMES HERE ──────────────────────────
  // {
  //   num:  "III",
  //   name: "Joseph-Louis Lagrange",
  //   sub:  "Mathematician & Astronomer",
  //   file: "lagrange.html",
  //   live: false,
  // },
  // ─────────────────────────────────────────────────
];


/**
 * buildVolumesNav(currentFile)
 *
 * Call this on every page, passing the current page's filename.
 * It injects the volumes nav bar right after the <header>.
 *
 * Example — put this at the bottom of each page's <body>:
 *
 *   <script src="volumes.js"></script>
 *   <script>buildVolumesNav("newton.html");</script>
 */
function buildVolumesNav(currentFile) {
  const nav = document.createElement("nav");
  nav.className = "volumes-bar";
  nav.setAttribute("aria-label", "All volumes");

  const inner = document.createElement("div");
  inner.className = "volumes-inner";

  VOLUMES.forEach(vol => {
    const isActive = vol.file === currentFile;
    const isLocked = !vol.live;

    const card = document.createElement("a");
    card.href      = isLocked ? "#" : vol.file;
    card.className = "vol-card" + (isActive ? " active" : "") + (isLocked ? " locked" : "");
    if (isActive) card.setAttribute("aria-current", "page");

    card.innerHTML = `
      <span class="vol-num">Vol. ${vol.num}</span>
      <span class="vol-info">
        <span class="vol-name">${vol.name}</span>
        <span class="vol-status">${isActive ? "Now reading" : isLocked ? "Coming soon" : "Published"}</span>
      </span>`;

    inner.appendChild(card);
  });

  nav.appendChild(inner);

  const header = document.querySelector("header");
  header.insertAdjacentElement("afterend", nav);
}
