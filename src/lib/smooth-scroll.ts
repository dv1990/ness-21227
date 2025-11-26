/**
 * Premium Smooth Scroll with Magnetic Snap
 * Inspired by Apple's momentum-based scrolling
 */

export const initSmoothScroll = () => {
  // Smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = (this as HTMLAnchorElement).getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
};

/**
 * Magnetic scroll snapping between sections
 * Creates a premium feel with momentum-based physics
 */
export const initMagneticScroll = () => {
  let isScrolling = false;
  let scrollTimeout: NodeJS.Timeout;

  const handleScrollEnd = () => {
    if (isScrolling) return;

    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let closestSection: Element | null = null;
    let closestDistance = Infinity;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionMiddle = rect.top + window.scrollY + rect.height / 2;
      const distance = Math.abs(scrollPosition - sectionMiddle);

      if (distance < closestDistance && distance < window.innerHeight * 0.4) {
        closestDistance = distance;
        closestSection = section;
      }
    });

    if (closestSection && closestDistance < window.innerHeight * 0.3) {
      isScrolling = true;
      closestSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  };

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScrollEnd, 150);
  }, { passive: true });
};
