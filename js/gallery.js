/* =====================================================
   THE JOKER #4320, Media gallery lightbox
   Click a photo to enlarge, arrows to browse, X / outside
   click / Escape to close. Open + close are animated in CSS.
   ===================================================== */
(function () {
  "use strict";

  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  if (!shots.length) return;

  var lb      = document.getElementById("lightbox");
  var img     = document.getElementById("lbImg");
  var counter = document.getElementById("lbCounter");
  if (!lb || !img) return;

  // Collect the photo sources straight from the grid
  var photos = shots.map(function (btn) {
    var thumb = btn.querySelector("img");
    return { src: thumb.getAttribute("src"), alt: thumb.getAttribute("alt") || "" };
  });

  var index = 0;
  var swapTimer = null;

  function render() {
    img.src = photos[index].src;
    img.alt = photos[index].alt;
    if (counter) counter.textContent = (index + 1) + " / " + photos.length;
  }

  function open(i) {
    index = i;
    render();
    lb.classList.add("open");
    document.body.classList.add("lb-open");
  }

  function close() {
    lb.classList.remove("open");
    document.body.classList.remove("lb-open");
  }

  // step = -1 (previous) or +1 (next); wraps around both ends
  function go(step) {
    index = (index + step + photos.length) % photos.length;
    img.classList.add("swapping");
    clearTimeout(swapTimer);
    swapTimer = setTimeout(function () {
      render();
      img.classList.remove("swapping");
    }, 150);
  }

  shots.forEach(function (btn, i) {
    btn.addEventListener("click", function () { open(i); });
  });

  document.getElementById("lbClose").addEventListener("click", close);
  document.getElementById("lbPrev").addEventListener("click", function () { go(-1); });
  document.getElementById("lbNext").addEventListener("click", function () { go(1); });

  // Clicking the backdrop (anywhere that isn't the photo or a button) closes it.
  // `swiped` keeps a finger-swipe from also counting as a backdrop tap.
  var swiped = false;
  lb.addEventListener("click", function (e) {
    if (swiped) return;
    if (e.target === lb) close();
  });

  // Swipe left / right on a touch screen to move between photos
  var startX = 0, startY = 0, startT = 0;

  lb.addEventListener("touchstart", function (e) {
    var t = e.changedTouches[0];
    startX = t.clientX;
    startY = t.clientY;
    startT = Date.now();
    swiped = false;
  }, { passive: true });

  lb.addEventListener("touchend", function (e) {
    var t = e.changedTouches[0];
    var dx = t.clientX - startX;
    var dy = t.clientY - startY;
    // must be far enough, mostly horizontal (not a vertical scroll), and quick
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5 && Date.now() - startT < 800) {
      swiped = true;
      go(dx < 0 ? 1 : -1);          // swipe left = next, swipe right = previous
      setTimeout(function () { swiped = false; }, 350);
    }
  }, { passive: true });

  // Keyboard: Esc closes, arrows browse
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
  });
})();
