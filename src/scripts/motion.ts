// Animații de pagină: apariție la scroll, numărătoare, header compact, linia de progres.
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function reveal() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  if (!('IntersectionObserver' in window) || reduced()) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
}

function countUp() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-count]')];
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    if (reduced()) return void (el.textContent = target + suffix);
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        run(e.target as HTMLElement);
        io.unobserve(e.target);
      }
    }
  });
  els.forEach((el) => io.observe(el));
}

function header() {
  const h = document.querySelector('header');
  if (!h) return;
  const on = () => h.classList.toggle('is-scrolled', scrollY > 20);
  on();
  addEventListener('scroll', on, { passive: true });
}

// linia de progres de la „Cum închiriezi”
function progress() {
  const el = document.querySelector<HTMLElement>('[data-progress]');
  if (!el) return;
  const bar = el.querySelector<HTMLElement>('[data-progress-bar]');
  const steps = [...el.querySelectorAll<HTMLElement>('[data-step]')];
  const update = () => {
    const r = el.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / r.height));
    bar?.style.setProperty('--p', String(p));
    steps.forEach((s, i) => s.classList.toggle('is-active', p >= i / Math.max(1, steps.length - 1) - 0.02));
  };
  update();
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
}

export function initMotion() {
  reveal();
  countUp();
  header();
  progress();
}
