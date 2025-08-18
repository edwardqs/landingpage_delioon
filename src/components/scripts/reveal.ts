export function bootReveal() {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => obs.observe(el));
  }
  
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => bootReveal());
  }
  