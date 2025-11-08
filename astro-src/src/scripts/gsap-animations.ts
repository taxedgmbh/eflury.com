// GSAP Animations for Modern Scroll Effects
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  // Animate elements on scroll
  gsap.utils.toArray<HTMLElement>('[data-scroll-animate]').forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    gsap.to('.hero-content', {
      y: -50,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Counter animation for statistics
  const statValues = document.querySelectorAll('.stat-value');
  statValues.forEach((stat) => {
    const target = parseInt(stat.getAttribute('data-target') || '0');
    const suffix = stat.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ value: 0 }, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            stat.textContent = Math.round(this.targets()[0].value) + suffix;
          },
        });
      },
    });
  });
}

// Initialize on DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
}

