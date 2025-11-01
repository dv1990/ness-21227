/**
 * @deprecated These hooks have been consolidated into use-intersection-observer
 * Please migrate to: import { useIntersectionObserver, useStaggeredIntersection } from '@/hooks/use-intersection-observer'
 * 
 * This file is kept for backward compatibility only.
 */

import { useIntersectionObserver, useStaggeredIntersection } from './use-intersection-observer';
import { useRef, useEffect, useState } from 'react';

export const useScrollAnimation = (options?: any) => {
  const { ref, isIntersecting } = useIntersectionObserver(options);
  // Map to old property names for backwards compatibility
  return { elementRef: ref, isVisible: isIntersecting };
};

export const useStaggeredAnimation = (itemCount: number, delay: number = 100) => {
  const { ref, isIntersecting, visibleIndices, isItemVisible } = useStaggeredIntersection(itemCount, delay);
  // Convert Set to array for backwards compatibility
  const visibleItems = Array.from(visibleIndices);
  return { elementRef: ref, visibleItems, isVisible: isIntersecting };
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
