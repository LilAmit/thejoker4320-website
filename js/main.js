/* =====================================================
   THE JOKER #4320, Interactions & Effects
   ===================================================== */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ---------- LOADER (home page only) ---------- */
  window.addEventListener("load", () => {
    const loader = $("#loader");
    const revealHero = () => {
      $$(".hero .reveal").forEach(el => el.classList.add("in"));
    };
    if (loader) {
      setTimeout(() => {
        loader.classList.add("hidden");
        revealHero();
      }, prefersReduced ? 200 : 1400);
    } else {
      // Sub-pages have no loader, reveal straight away
      revealHero();
    }
  });

  /* ---------- FLOATING SUITS BACKGROUND ---------- */
  (function suits() {
    if (prefersReduced) return;
    const bg = $("#suitsBg");
    if (!bg) return;
    const glyphs = ["♠", "♥", "♦", "♣"]; // ♠ ♥ ♦ ♣
    const count = window.innerWidth < 700 ? 10 : 20;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      const g = glyphs[Math.floor(Math.random() * glyphs.length)];
      s.className = "suit-float" + (g === "♥" || g === "♦" ? " red" : "");
      s.textContent = g;
      s.style.left = Math.random() * 100 + "vw";
      s.style.fontSize = (Math.random() * 2.4 + 1.2) + "rem";
      s.style.animationDuration = (Math.random() * 18 + 14) + "s";
      s.style.animationDelay = (-Math.random() * 20) + "s";
      bg.appendChild(s);
    }
  })();

  /* ---------- NAVBAR: scroll state + mobile menu ----------
     (the active-page highlight is set in js/layout.js) */
  const navbar = $("#navbar");
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");

  const onScrollNav = () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    $$(".nav-links a").forEach(a => a.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    }));
  }

  /* ---------- HERO GLOW PARALLAX ---------- */
  const heroGlow = $("#heroGlow");
  const hero = $("#home");
  if (heroGlow && !isTouch) {
    hero.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      heroGlow.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  $$(".reveal").forEach(el => { if (!el.closest(".hero")) revealObserver.observe(el); });

  /* ---------- COUNT-UP STATS ---------- */
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const dur = 1600;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$(".stat-num").forEach(el => countObserver.observe(el));

  /* ---------- TIMELINE PROGRESS FILL ---------- */
  const timeline = $("#timeline");
  const tlFill = $("#tlFill");
  const onScrollTimeline = () => {
    if (!timeline) return;
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const seen = Math.min(Math.max(vh * 0.6 - rect.top, 0), total);
    tlFill.style.height = (seen / total * 100) + "%";
  };

  /* ---------- 3D TILT ON FEATURE / TIMELINE CARDS ---------- */
  if (!isTouch && !prefersReduced) {
    $$(".robot-feature, .tl-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  if (!isTouch && !prefersReduced) {
    $$(".magnetic").forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------- FLIP CARDS: tap to flip on touch devices ----------
     (CSS handles hover-flip on devices with a mouse) */
  if (isTouch) {
    $$(".flip-card").forEach(card => {
      card.addEventListener("click", () => card.classList.toggle("flipped"));
    });
  }

  /* ---------- BUTTON RIPPLE ---------- */
  $$(".btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const circle = document.createElement("span");
      const d = Math.max(btn.clientWidth, btn.clientHeight);
      const r = btn.getBoundingClientRect();
      circle.className = "ripple";
      circle.style.width = circle.style.height = d + "px";
      circle.style.left = (e.clientX - r.left - d / 2) + "px";
      circle.style.top = (e.clientY - r.top - d / 2) + "px";
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  /* ---------- BACK TO TOP ---------- */
  const toTop = $("#toTop");
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  const onScrollTop = () => { if (toTop) toTop.classList.toggle("show", window.scrollY > window.innerHeight * 0.8); };

  /* ---------- YEAR ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- MASTER SCROLL HANDLER (throttled) ---------- */
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScrollNav();
        onScrollTimeline();
        onScrollTop();
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScrollTimeline, { passive: true });
  onScroll();
})();
