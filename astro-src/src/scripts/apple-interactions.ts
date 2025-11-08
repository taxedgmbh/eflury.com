// Apple HIG Interactions
// Implements native iOS interaction patterns

export function initAppleInteractions() {
  if (typeof window === 'undefined') return;

  // iOS-style haptic feedback simulation
  const triggerHaptic = (style: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 30,
      };
      navigator.vibrate(patterns[style]);
    }
  };

  // Add haptic feedback to all interactive elements
  const interactiveElements = document.querySelectorAll(
    'button, a, [role="button"], .service-card, .portfolio-card, .faq-item, .nav-item'
  );

  interactiveElements.forEach((element) => {
    element.addEventListener('touchstart', () => {
      triggerHaptic('light');
      element.classList.add('haptic-light');
    });

    element.addEventListener('touchend', () => {
      setTimeout(() => {
        element.classList.remove('haptic-light');
      }, 100);
    });
  });

  // iOS-style long press detection
  let longPressTimer: NodeJS.Timeout | null = null;
  interactiveElements.forEach((element) => {
    element.addEventListener('touchstart', () => {
      longPressTimer = setTimeout(() => {
        triggerHaptic('medium');
        element.classList.add('long-press');
        // Trigger context menu or preview
      }, 500);
    });

    element.addEventListener('touchend', () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      element.classList.remove('long-press');
    });

    element.addEventListener('touchmove', () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    });
  });

  // iOS-style swipe gestures
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', (e) => {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Swipe right (back gesture)
    if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
      if (window.history.length > 1) {
        triggerHaptic('light');
        window.history.back();
      }
    }

    touchStartX = 0;
    touchStartY = 0;
  });

  // iOS-style pull-to-refresh (subtle)
  let pullStartY = 0;
  let isPulling = false;

  window.addEventListener('touchstart', (e) => {
    if (window.scrollY === 0) {
      pullStartY = e.touches[0].clientY;
      isPulling = true;
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (isPulling && window.scrollY === 0) {
      const pullDistance = e.touches[0].clientY - pullStartY;
      if (pullDistance > 80) {
        triggerHaptic('medium');
        // Could trigger refresh here
        isPulling = false;
      }
    }
  });

  window.addEventListener('touchend', () => {
    isPulling = false;
    pullStartY = 0;
  });

  // iOS-style bounce prevention on overscroll
  let lastTouchY = 0;
  document.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Prevent overscroll at top
    if (scrollTop === 0 && touchY > lastTouchY) {
      e.preventDefault();
    }

    // Prevent overscroll at bottom
    if (scrollTop + clientHeight >= scrollHeight && touchY < lastTouchY) {
      e.preventDefault();
    }

    lastTouchY = touchY;
  }, { passive: false });

  // iOS-style focus management
  document.addEventListener('focusin', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      // Scroll input into view on iOS
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAppleInteractions);
  } else {
    initAppleInteractions();
  }
}

