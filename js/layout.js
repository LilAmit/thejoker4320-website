/* =====================================================
   THE JOKER #4320, Shared Layout
   Injects the SAME header + footer + background effects
   into every page, so you only edit them in one place.
   Runs before main.js. No server needed (markup is inline).
   ===================================================== */
(function () {
  "use strict";

  // Which page are we on? Used for the active nav link and page-specific card spots.
  var page = document.body.getAttribute("data-page");

  /* ---------- SHARED HEADER (navbar) ---------- */
  var headerHTML = `
  <header class="navbar" id="navbar">
    <a href="index.html" class="brand">
      <img src="TheJokerLogo.jpg" class="brand-logo" alt="The Joker #4320 logo" />
      <span class="brand-text">THE JOKER <em>#4320</em></span>
    </a>

    <nav class="nav-links" id="navLinks">
      <a href="index.html" data-page="home">Home</a>
      <a href="about.html" data-page="about">About</a>
      <a href="media.html" data-page="media">Media</a>
    </nav>

    <button class="nav-toggle" id="navToggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </header>`;

  /* ---------- SHARED FOOTER ---------- */
  var footerHTML = `
  <footer class="footer" id="contact">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="TheJokerLogo.jpg" class="brand-logo big" alt="The Joker #4320 logo" />
        <div>
          <p class="footer-name">THE JOKER <span class="red">#4320</span></p>
          <p class="footer-tag">Your winning card.</p>
          <a class="first-badge" href="https://www.firstinspires.org" target="_blank" rel="noopener">
            <img src="FIRSTLogo.png" alt="FIRST Robotics Competition" />
            <span>Proud member of the<br><strong>FIRST&reg; community</strong></span>
          </a>
          <a class="school-badge" href="https://pb.amalnet.k12.il" target="_blank" rel="noopener">
            <img src="AmalLogo.jpg" alt="AMAL multidisciplinary high school logo" />
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Explore</h4>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="media.html">Media</a>
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <a href="mailto:tj4320manage@gmail.com">tj4320manage@gmail.com</a>
        <span>Amsterdam 16, Petah Tikva</span>
        <span>Israel</span>
      </div>

      <div class="footer-col">
        <h4>Follow</h4>
        <div class="socials">
          <a href="https://www.instagram.com/thejoker4320" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s-.01 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.63-.01-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2zm0 1.98c-3.15 0-3.52.01-4.76.07-.9.04-1.39.19-1.72.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.82-.32 1.72-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.19 1.39.32 1.72.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.82.28 1.72.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.39-.19 1.72-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.82.32-1.72.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.39-.32-1.72a2.85 2.85 0 00-.69-1.06 2.85 2.85 0 00-1.06-.69c-.33-.13-.82-.28-1.72-.32-1.24-.06-1.61-.07-4.76-.07zm0 3.37a4.45 4.45 0 110 8.9 4.45 4.45 0 010-8.9zm0 7.34a2.89 2.89 0 100-5.78 2.89 2.89 0 000 5.78zm5.66-7.56a1.04 1.04 0 11-2.08 0 1.04 1.04 0 012.08 0z"/></svg>
          </a>
          <a href="https://www.facebook.com/thejoker4320" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z"/></svg>
          </a>
          <a href="https://www.youtube.com/@thejoker4320" target="_blank" rel="noopener" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.11-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.39.52A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.11 2.13c1.89.52 9.39.52 9.39.52s7.5 0 9.39-.52a3 3 0 002.11-2.13A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.6 15.57V8.43L15.8 12l-6.2 3.57z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@thejoker4320" target="_blank" rel="noopener" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.6 5.82a4.28 4.28 0 01-1.06-2.82h-3.2v13.02a2.6 2.6 0 01-2.6 2.5 2.6 2.6 0 01-2.6-2.6 2.6 2.6 0 013.36-2.49V9.5a5.8 5.8 0 00-.76-.05 5.8 5.8 0 105.8 5.8V8.9a7.45 7.45 0 004.36 1.4V7.1a4.28 4.28 0 01-3.3-1.28z"/></svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; <span id="year">2025</span> The Joker #4320 &bull; FIRST&reg; Robotics Competition &bull; Petah Tikva, Israel</p>
      <p class="footer-credit">Dealt with &hearts; by the team.</p>
    </div>
  </footer>`;

  /* ---------- INJECT into placeholders ---------- */
  var headerMount = document.getElementById("site-header");
  var footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.outerHTML = headerHTML;
  if (footerMount) footerMount.outerHTML = footerHTML;

  /* ---------- Shared background + back-to-top (added once) ---------- */
  if (!document.getElementById("suitsBg")) {
    var bg = document.createElement("div");
    bg.className = "suits-bg";
    bg.id = "suitsBg";
    bg.setAttribute("aria-hidden", "true");
    document.body.appendChild(bg);
  }
  if (!document.getElementById("toTop")) {
    var top = document.createElement("button");
    top.className = "to-top";
    top.id = "toTop";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = "&#9650;";
    document.body.appendChild(top);
  }

  /* ---------- Scattered decorative cards (permanent spots per page) ----------
     Only the values 4, 3, 2, 0 and a JOKER card are used. Each card has a fixed
     top/left (% of the page) + rotation, so it keeps its place and scrolls
     with the page. Tweak the `spots` list to move / add / remove cards. */
  if (!document.querySelector(".card-scatter")) {
    var cardFace = function (v, s, cls) {
      if (cls === "joker") {
        return '<span class="sc-corner tl">J</span>' +
               '<span class="sc-center">&#9819;</span>' +
               '<span class="sc-corner br">J</span>';
      }
      return '<span class="sc-corner tl">' + v + '<em>' + s + '</em></span>' +
             '<span class="sc-center">' + s + '</span>' +
             '<span class="sc-corner br">' + v + '<em>' + s + '</em></span>';
    };
    // Card shorthands (only these values are ever used)
    var C4 = { v: "4", s: "&spades;", c: "" };
    var C3 = { v: "3", s: "&hearts;", c: "red" };
    var C2 = { v: "2", s: "&clubs;",  c: "" };
    var C0 = { v: "0", s: "&diams;",  c: "red" };
    var CJ = { v: "",  s: "",         c: "joker" };
    // The About page is much shorter, so the same % lands on the body text there.
    // Sit the 4-3-2-0 group higher (beside the page heading) to keep it clear.
    var g4 = (page === "about") ? { top: 20, left: 7 } : { top: 30, left: 11 };
    // Each spot = permanent position (% of page) + tilt + the card(s) there.
    // 1 card = a lone card; 2-4 cards = a fanned group.
    // RULE: any group of 4 always reads 4-3-2-0 (the team number).
    var spots = [
      { top: 6,  left: 6,  rot: -12, cards: [C4] },                 // single
      { top: 22, left: 90, rot: 9,   cards: [C2] },                 // single
      { top: 41, left: 3,  rot: 7,   cards: [C0] },                 // single
      { top: 63, left: 91, rot: -8,  cards: [C4] },                 // single
      { top: 82, left: 7,  rot: 11,  cards: [CJ] },                 // single
      { top: 12, left: 80, rot: 7,   cards: [C3, CJ] },             // group of 2
      { top: 50, left: 82, rot: -6,  cards: [C4, C3, C2] },         // group of 3
      { top: g4.top, left: g4.left, rot: 4, cards: [C4, C3, C2, C0] }, // group of 4 = 4-3-2-0
      { top: 73, left: 76, rot: 6,   cards: [C0, C4] },             // group of 2
      { top: 55, left: 6,  rot: -9,  cards: [C3] }                  // single
    ];
    // Extra cards flanking the hero text (JOKER / #4320 / tagline), home only
    if (page === "home") {
      spots = spots.concat([
        { top: 13, left: 15, rot: -9, cards: [C3, C0] },           // group of 2, left of hero
        { top: 20, left: 8,  rot: 7,  cards: [C2] },               // single, left of hero
        { top: 6,  left: 88, rot: 10, cards: [C4] },               // single, right of hero
        { top: 19, left: 78, rot: -6, cards: [CJ, C2, C3] }        // group of 3, right of hero
      ]);
    }
    var scatter = document.createElement("div");
    scatter.className = "card-scatter";
    scatter.setAttribute("aria-hidden", "true");
    spots.forEach(function (spot) {
      var group = document.createElement("div");
      group.className = "card-group";
      group.style.top = spot.top + "%";
      group.style.left = spot.left + "%";
      var n = spot.cards.length;
      spot.cards.forEach(function (cd, i) {
        var card = document.createElement("div");
        card.className = "side-card" + (cd.c ? " " + cd.c : "");
        var mid = (n - 1) / 2;
        var dx = (i - mid) * 20;              // horizontal spread
        var ang = spot.rot + (i - mid) * 11;  // fan angle
        card.style.transform = "translateX(" + dx + "px) rotate(" + ang + "deg)";
        card.style.zIndex = i;
        card.innerHTML = cardFace(cd.v, cd.s, cd.c);
        group.appendChild(card);
      });
      scatter.appendChild(group);
    });
    document.body.appendChild(scatter);
  }

  /* ---------- Highlight the current page in the nav ---------- */
  if (page) {
    var active = document.querySelector('.nav-links a[data-page="' + page + '"]');
    if (active) active.classList.add("active");
  }
})();
