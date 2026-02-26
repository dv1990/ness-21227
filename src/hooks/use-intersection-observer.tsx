/**
 * Unified Intersection Observer Hook
 * High-performance viewport detection - consolidates all intersection logic
 */

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  once?: boolean; // Alias for backwards compatibility
  enabled?: boolean;
}

/**
 * Primary hook for intersection detection
 * Replaces: use-in-view, use-scroll-reveal, use-scroll-animation
 * Generic type parameter allows type-safe ref assignment to specific element types
 */
export const useIntersectionObserver = <T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce: triggerOnceOption,
    once,
    enabled = true,
  } = options;

  // Support both 'triggerOnce' and 'once' for backwards compatibility
  const triggerOnce = triggerOnceOption ?? once ?? true;

  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && triggerOnce) {
      setIsIntersecting(true);
      return;
    }

    // Return early if already triggered and triggerOnce is true
    if (triggerOnce && isIntersecting) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        
        if (isVisible) {
          setIsIntersecting(true);
          if (triggerOnce && observerRef.current) {
            observerRef.current.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce, enabled]);

  return { ref, isIntersecting };
};

/**
 * Staggered animation hook for lists
 */
export const useStaggeredIntersection = (
  itemCount: number,
  staggerDelay: number = 100
) => {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (!isIntersecting) return;

    const timeouts: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setVisibleIndices(prev => new Set([...prev, i]));
      }, i * staggerDelay);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isIntersecting, itemCount, staggerDelay]);

  return { 
    ref, 
    isIntersecting,
    visibleIndices,
    isItemVisible: (index: number) => visibleIndices.has(index)
  };
};

/**
 * Hook with external ref support (for backwards compatibility)
 */
export const useIntersectionWithRef = (
  externalRef: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = externalRef.current;
    if (!element) return;

    if (triggerOnce && isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [externalRef, threshold, rootMargin, triggerOnce, isIntersecting]);

  return isIntersecting;
};

// Alias exports for backwards compatibility
export const useInView = useIntersectionWithRef;
export const useScrollReveal = useIntersectionObserver;
export const useScrollAnimation = useIntersectionObserver;
