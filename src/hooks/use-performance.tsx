/**
 * Performance-related React hooks
 * Keep React-specific code here to avoid bundle duplication
 */

import { useCallback, useMemo, useRef } from 'react';

// Debounce hook
export const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback((...args: T) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
};

// Throttle hook
export const useThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  limit: number
) => {
  const inThrottle = useRef(false);
  
  return useCallback((...args: T) => {
    if (!inThrottle.current) {
      callback(...args);
      inThrottle.current = true;
      setTimeout(() => inThrottle.current = false, limit);
    }
  }, [callback, limit]);
};

// List virtualization helper
export const useVirtualization = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number
) => {
  return useMemo(() => {
    const visibleItems = Math.ceil(containerHeight / itemHeight) + 2;
    return {
      itemHeight,
      visibleItems,
      totalHeight: itemCount * itemHeight
    };
  }, [itemCount, itemHeight, containerHeight]);
};

// Performance tracking hook (development only)
export const usePerformanceTracking = (componentName: string) => {
  if (import.meta.env.DEV) {
    const startTime = performance.now();
    const endTracking = () => {
      const renderTime = performance.now() - startTime;
      if (renderTime > 16) {
        console.warn(`Slow render (${renderTime.toFixed(2)}ms):`, componentName);
      }
    };
    return { endTracking };
  }
  return { endTracking: () => {} };
};
