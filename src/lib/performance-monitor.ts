/**
 * Lightweight Performance Monitoring
 * Essential metrics only for production
 */

// Only run in development
const isDev = import.meta.env.DEV;

export const performanceMonitor = {
  // Track component render (no-op in production)
  trackComponentRender: (componentName: string) => {
    if (!isDev) return () => {};
    
    const startTime = performance.now();
    return () => {
      const renderTime = performance.now() - startTime;
      if (renderTime > 16) {
        console.warn(`Slow render (${renderTime.toFixed(2)}ms):`, componentName);
      }
    };
  },

  // Track image loading (no-op in production)
  trackImageLoad: (src: string, startTime: number) => {
    if (!isDev) return;
    
    const loadTime = performance.now() - startTime;
    if (loadTime > 1000) {
      console.warn(`Slow image (${loadTime.toFixed(2)}ms):`, src);
    }
  },

  // Mark feature performance (no-op in production)
  markFeature: (name: string) => {
    if (!isDev) return { end: () => {} };
    
    performance.mark(`feature-${name}-start`);
    return {
      end: () => {
        performance.mark(`feature-${name}-end`);
        performance.measure(`feature-${name}`, `feature-${name}-start`, `feature-${name}-end`);
      }
    };
  }
};

