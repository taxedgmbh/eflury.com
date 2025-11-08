// Loading States and Skeleton Screens
// Provides smooth loading experiences with skeleton screens

export function showSkeleton(element: HTMLElement) {
  element.classList.add('skeleton-loading');
  element.setAttribute('aria-busy', 'true');
}

export function hideSkeleton(element: HTMLElement) {
  element.classList.remove('skeleton-loading');
  element.removeAttribute('aria-busy');
}

export function initImageLazyLoading() {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Show skeleton while loading
          showSkeleton(img);
          
          // Load image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          img.addEventListener('load', () => {
            hideSkeleton(img);
            img.classList.add('loaded');
          });
          
          img.addEventListener('error', () => {
            hideSkeleton(img);
            img.classList.add('error');
            img.alt = 'Failed to load image';
          });
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px',
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

export function initPageTransition() {
  if (typeof window === 'undefined') return;

  // Add page transition class on load
  window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
  });

  // Handle page visibility
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.body.classList.add('page-hidden');
    } else {
      document.body.classList.remove('page-hidden');
    }
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initImageLazyLoading();
      initPageTransition();
    });
  } else {
    initImageLazyLoading();
    initPageTransition();
  }
}

