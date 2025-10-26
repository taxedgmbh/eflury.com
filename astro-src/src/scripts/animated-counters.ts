export function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-value');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const animateCounter = (element: Element) => {
    const target = parseFloat(element.getAttribute('data-target') || '0');
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let hasDecimal = target % 1 !== 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // Format the number
      const displayValue = hasDecimal
        ? current.toFixed(1)
        : Math.floor(current).toString();

      element.textContent = displayValue + suffix;
    }, duration / steps);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}
