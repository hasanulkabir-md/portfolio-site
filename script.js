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

    /* ===== Projects Auto Slider (with Prev/Next + keyboard support) ===== */
(function projectsSlider() {
  const slider = document.querySelector('.projects-slider');
  const track = document.querySelector('.projects-track');
  let cards = document.querySelectorAll('.project-card');
  if (!slider || !track || !cards.length) return;

  // find or create buttons (we added them in HTML)
  const prevBtn = slider.querySelector('.slide-btn.prev');
  const nextBtn = slider.querySelector('.slide-btn.next');

  let index = 0;
  let autoTimer = null;
  const AUTO_DELAY = 3000;

  // get gap in px (fallback 32)
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
  // On mobile we want one full viewport-width step
  const sliderWidth = slider.clientWidth;
  const card = cards[0];
  if (!card) return sliderWidth;

  // If cards are narrower than slider (desktop), use card width + gap
  const gap = getGapPx();
  const cardWidth = card.offsetWidth + gap;

  // Choose the larger of the two so mobile = full width, desktop = card width
  return Math.max(sliderWidth, cardWidth);
}

  function moveTo(i) {
    if (!cards.length) return;
    if (i < 0) i = cards.length - 1;
    if (i >= cards.length) i = 0;
    index = i;
    const shift = -calcCardStep() * index;
    track.style.transform = `translateX(${shift}px)`;
    // update aria-live for screenreaders (optional)
    slider.setAttribute('data-current', String(index + 1));
  }

  function next() { moveTo(index + 1); }
  function prev() { moveTo(index - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, AUTO_DELAY);
  }
  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }
  function restartAuto() { stopAuto(); startAuto(); }

  // button events
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAuto(); });

  // pause on hover/focus within the slider
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  slider.addEventListener('focusin', stopAuto);
  slider.addEventListener('focusout', startAuto);

  // keyboard navigation when slider is focused
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); restartAuto(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); restartAuto(); }
  });

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
