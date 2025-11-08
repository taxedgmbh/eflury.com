// Enhanced Animations and Micro-interactions
// Advanced GSAP animations with ScrollTrigger and custom easing

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initEnhancedAnimations() {
  if (typeof window === 'undefined') return;

  // Parallax effect for hero background
  const hero = document.querySelector('.hero');
  if (hero) {
    gsap.to('.three-container', {
      y: -100,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // Stagger animations for service cards
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length > 0) {
    gsap.fromTo(
      serviceCards,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // Portfolio cards reveal animation
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  if (portfolioCards.length > 0) {
    gsap.fromTo(
      portfolioCards,
      {
        opacity: 0,
        y: 80,
        rotationX: -15,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // Testimonial cards slide in
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length > 0) {
    testimonialCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }

  // FAQ accordion smooth animations
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const answer = item.querySelector('.faq-answer');
    if (answer) {
      gsap.set(answer, { height: 0, opacity: 0 });
    }
  });

  // Smooth scroll to anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: {
              y: target,
              offsetY: 80,
            },
            ease: 'power3.inOut',
          });
        }
      }
    });
  });

  // Floating animation for CTA buttons
  const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
  ctaButtons.forEach((button) => {
    gsap.to(button, {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  });

  // Counter animation enhancement
  const counters = document.querySelectorAll('.stat-value');
  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute('data-target') || '0');
    const suffix = counter.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: counter.closest('.stat-card'),
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ value: 0 }, {
          value: target,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: function() {
            const val = this.targets()[0].value;
            if (target % 1 !== 0) {
              counter.textContent = val.toFixed(1) + suffix;
            } else {
              counter.textContent = Math.round(val) + suffix;
            }
          },
        });
      },
    });
  });

  // Magnetic effect for buttons (subtle)
  const magneticButtons = document.querySelectorAll('.btn-primary, .service-card, .portfolio-card');
  magneticButtons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  });

  // Text reveal animation for headings
  const headings = document.querySelectorAll('h1, h2, .section-title');
  headings.forEach((heading) => {
    const text = heading.textContent || '';
    heading.innerHTML = '';
    const chars = text.split('').map((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      heading.appendChild(span);
      return span;
    });

    gsap.to(chars, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

// Initialize on DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancedAnimations);
  } else {
    initEnhancedAnimations();
  }
}

