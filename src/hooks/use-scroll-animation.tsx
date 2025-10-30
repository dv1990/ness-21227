import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true);
          setHasTriggered(true);
        } else if (!triggerOnce && !isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { elementRef, isVisible };
};

export const useStaggeredAnimation = (itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const { elementRef, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (isVisible) {
      const timeouts: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * delay);
        timeouts.push(timeout);
      }

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [isVisible, itemCount, delay]);

  return { elementRef, visibleItems, isVisible };
};

export const useParallaxScroll = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);
  const rafId = useRef<number>();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = requestAnimationFrame(() => {
          if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * -speed;
            setOffset(rate);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed]);

  return { elementRef, offset };
};