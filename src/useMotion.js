import { useEffect } from 'react';

// Observe only meaningful content groups; animation never gates content or input.
export function useMotion(refreshKey) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const selectors = '.section-heading, .category-card, .product, .signature-copy, .signature-image, .occasions > h2, .occasions > p, .occasion-options, .occasion-result, .pudding-photo, .split-copy, .story-text, .story-photos, .builder-visual, .builder-controls, .delivery > h2, .delivery-grid > div, .locations-grid > article, .reviews > h2, .review-grid > blockquote, .social-grid > img, .newsletter > div, .brand-moment h2, .footer-column';
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
      const isCard = element.matches('.category-card, .product, .locations-grid > article, .review-grid > blockquote, .social-grid > img, .delivery-grid > div, .footer-column');
      element.style.setProperty('--reveal-delay', isCard ? `${(index % 4) * 65}ms` : '0ms');
      element.classList.add('motion-target');
      observer.observe(element);
    });
    preference.addEventListener('change', showAll);
    return () => { observer.disconnect(); preference.removeEventListener('change', showAll); };
  }, [refreshKey]);
}
