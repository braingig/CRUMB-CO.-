import { useEffect } from 'react';

// Observe only meaningful content groups; animation never gates content or input.
export function useMotion(refreshKey) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const selectors = '.section-heading, .category-card, .product, .occasions > h2, .occasions > p, .occasion-options, .occasion-result, .pudding-photo, .split-copy, .story-text, .story-photos, .locations-grid > article, .reviews > h2, .review-grid > blockquote, .newsletter > div, .footer-column';
    const elements = [...document.querySelectorAll(selectors)];
    const showAll = () => {
      observer?.disconnect();
      elements.forEach(element => element.classList.add('is-revealed'));
    };
    if (preference.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('is-revealed');
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    elements.forEach(element => {
      if (element.classList.contains('is-revealed')) return;
      const siblings = [...element.parentElement.children];
      const index = siblings.indexOf(element);
      const isCard = element.matches('.category-card, .product, .locations-grid > article, .review-grid > blockquote, .footer-column');
      element.style.setProperty('--reveal-delay', isCard ? `${(index % 4) * 65}ms` : '0ms');
      element.classList.add('motion-target');
      observer.observe(element);
    });
    preference.addEventListener('change', showAll);
    return () => { observer.disconnect(); preference.removeEventListener('change', showAll); };
  }, [refreshKey]);
}

export function useScrollMotion(refreshKey) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    const hero = document.querySelector('.reference-hero');
    const photos = [...document.querySelectorAll('.pudding-photo, .seasonal, .catering')];
    let frame = 0;
    const paint = () => {
      frame = 0;
      const y = window.scrollY;
      const range = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--page-progress', range > 0 ? y / range : 0);
      if (preference.matches) return;
      const heroRect = hero?.getBoundingClientRect();
      if (heroRect) {
        hero.dataset.motionVisible = String(heroRect.bottom > 0 && heroRect.top < window.innerHeight);
        hero.style.setProperty('--hero-drift', `${Math.min(y * .08, 45)}px`);
      }
      photos.forEach(photo => {
        const rect = photo.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const offset = ((window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight) * 30;
          photo.style.setProperty('--photo-drift', `${Math.max(-16, Math.min(16, offset))}px`);
        }
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const updatePreference = () => {
      hero?.style.removeProperty('--hero-drift');
      photos.forEach(photo => photo.style.removeProperty('--photo-drift'));
      schedule();
    };
    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', updatePreference);
    const observer = new ResizeObserver(schedule);
    if (document.querySelector('main')) observer.observe(document.querySelector('main'));
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', updatePreference);
      root.style.removeProperty('--page-progress');
      hero?.style.removeProperty('--hero-drift');
      photos.forEach(photo => photo.style.removeProperty('--photo-drift'));
    };
  }, [refreshKey]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const cleanups = [...document.querySelectorAll('.category-card')].map(card => {
      let frame = 0;
      const move = event => {
        if (preference.matches) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
          const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
          card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
          card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
          card.style.setProperty('--light-x', `${x * 100}%`);
          card.style.setProperty('--light-y', `${y * 100}%`);
        });
      };
      const reset = () => {
        cancelAnimationFrame(frame);
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', reset);
      preference.addEventListener('change', reset);
      return () => { reset(); card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', reset); preference.removeEventListener('change', reset); };
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }, []);
}
