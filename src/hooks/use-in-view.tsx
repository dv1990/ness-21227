/**
 * Optimized Intersection Observer Hook
 * High-performance viewport detection for animations
 */

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

export const useInView = (
  ref: React.RefObject<Element>,
  options: UseInViewOptions = {}
) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const observerRef = useRef<IntersectionObserver>();

  const { threshold = 0, once = false, rootMargin = '0px' } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Return early if once=true and already been in view
    if (once && hasBeenInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && once) {
          setHasBeenInView(true);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, rootMargin, hasBeenInView, ref]);

  return once ? (isInView || hasBeenInView) : isInView;
};