/* =========================================================
   LEMUEL LABS — JS específico de proyecto.html
   Parallax sutil sobre la captura de Café Moretti al hacer
   scroll. Respeta prefers-reduced-motion.
   ========================================================= */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const media = document.querySelector('[data-parallax]');
  if (!media || reduceMotion) return;

  let ticking = false;

  function updateParallax() {
    const rect = media.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    // Progreso: -1 (arriba del viewport) a 1 (abajo del viewport)
    const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
    const offset = progress * -24; // desplazamiento máximo ~24px, sutil a propósito
    media.style.transform = `translateY(${offset.toFixed(2)}px) scale(1.06)`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  updateParallax();
})();
