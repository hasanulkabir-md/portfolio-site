// script.js
document.addEventListener('DOMContentLoaded', () => {
  /* THEME TOGGLE */
  window.toggleTheme = function () {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    html.setAttribute("data-theme", current === "light" ? "dark" : "light");
  };

  /* ROLE ROTATION (hero) */
  (function roleRotation() {
    const roles = [
      "Test Software Engineer",
      "Software Quality Engineer",
      "Research & Development"
    ];
    let idx = 0;
    const roleText = document.getElementById("role-text");
    if (!roleText) return;
    function changeRole() {
      roleText.style.opacity = 0;
      setTimeout(() => {
        idx = (idx + 1) % roles.length;
        roleText.textContent = roles[idx];
        roleText.style.opacity = 1;
      }, 500);
    }
    setInterval(changeRole, 3000);
  })();

  /* ===== Projects Auto Slider ===== */
  (function projectsSlider() {
    const slider = document.querySelector('.projects-slider');
    const track = document.querySelector('.projects-track');
    let cards = document.querySelectorAll('.project-card');
    if (!slider || !track || !cards.length) return;

    let index = 0;
    let autoTimer = null;
    const AUTO_DELAY = 3000;

    // get gap and convert to number (px). Fallback to 32 if parsing fails.
    function getGapPx() {
      try {
        const styles = window.getComputedStyle(track);
        const gap = styles.gap || styles.getPropertyValue('gap') || '32px';
        return parseFloat(gap) || 32;
      } catch (e) {
        return 32;
      }
    }

    function calcCardStep() {
      cards = document.querySelectorAll('.project-card'); // refresh
      const cw = cards[0] ? cards[0].offsetWidth : 0;
      return cw + getGapPx();
    }

    function moveTo(i) {
      if (!cards.length) return;
      if (i < 0) i = cards.length - 1;
      if (i >= cards.length) i = 0;
      index = i;
      const shift = -calcCardStep() * index;
      track.style.transform = `translateX(${shift}px)`;
    }

    function next() { moveTo(index + 1); }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, AUTO_DELAY);
    }
    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    // pause on hover
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    // responsive recalculation (debounced)
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        moveTo(index);
      }, 120);
    });

    // initialize
    moveTo(0);
    startAuto();
  })();
});
