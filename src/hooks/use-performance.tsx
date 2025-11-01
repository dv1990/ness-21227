/**
 * Performance-related React hooks
 * Optimized utilities for React components
 */

import { useCallback, useMemo, useRef } from 'react';
import { performanceMonitor } from '@/lib/performance';

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

// Performance tracking hook (uses unified monitor)
export const usePerformanceTracking = (componentName: string) => {
  const endTracking = performanceMonitor.trackComponentRender(componentName);
  return { endTracking };
};
