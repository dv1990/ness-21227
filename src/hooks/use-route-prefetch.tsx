import { useEffect, useRef } from 'react';
import { prefetchRoute } from '@/lib/route-prefetch';

/**
 * Hook to automatically prefetch routes when links become visible
 * Uses IntersectionObserver for efficient detection
 */
export const useRoutePrefetch = (route: string, enabled: boolean = true) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prefetchRoute(route);
            // Stop observing after prefetch
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start prefetching 50px before element is visible
        threshold: 0.1,
      }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [route, enabled]);

  return elementRef;
};

/**
 * Hook for link hover prefetching with debounce
 */
export const useLinkPrefetch = (route: string) => {
  const timeoutRef = useRef<number>();

  const handleMouseEnter = () => {
    // Small delay to avoid prefetching on quick hovers
    timeoutRef.current = window.setTimeout(() => {
      prefetchRoute(route);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { handleMouseEnter, handleMouseLeave };
};
