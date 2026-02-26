/**
 * Unified Performance Utilities
 * Consolidates all performance monitoring, optimization, and budget checking
 */

// ============================================================================
// CONSTANTS & TYPES
// ============================================================================

const isDev = import.meta.env.DEV;

export interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export interface PerformanceBudget {
  LCP_THRESHOLD: number;
  FID_THRESHOLD: number;
  CLS_THRESHOLD: number;
  FCP_THRESHOLD: number;
  TTFB_THRESHOLD: number;
}

export const PERFORMANCE_BUDGET: PerformanceBudget = {
  LCP_THRESHOLD: 2500,
  FID_THRESHOLD: 100,
  CLS_THRESHOLD: 0.1,
  FCP_THRESHOLD: 1800,
  TTFB_THRESHOLD: 600,
};

// ============================================================================
// RESOURCE OPTIMIZATION
// ============================================================================

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const addResourceHint = (
  href: string,
  rel: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch',
  as?: string
) => {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  if (as) link.setAttribute('as', as);
  document.head.appendChild(link);
};

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private violations: string[] = [];
  private observer: PerformanceObserver | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.observePerformance();
    }
  }

  private observePerformance() {
    // Observe LCP
    try {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
        const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
        this.metrics.lcp = lcp;
        this.checkBudget('LCP_THRESHOLD', lcp);
      });
      this.observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Observer not supported
    }

    // Observe FID
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { processingStart?: number }) => {
          if (entry.processingStart != null && entry.startTime != null) {
            const fid = entry.processingStart - entry.startTime;
            this.metrics.fid = fid;
            this.checkBudget('FID_THRESHOLD', fid);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Observer not supported
    }

    // Observe CLS
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value || 0;
            this.metrics.cls = clsValue;
            this.checkBudget('CLS_THRESHOLD', clsValue);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Observer not supported
    }

    // Observe FCP
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.metrics.fcp = fcpEntry.startTime;
          this.checkBudget('FCP_THRESHOLD', fcpEntry.startTime);
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Observer not supported
    }

    // Get TTFB on load
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          const ttfb = perfData.responseStart - perfData.requestStart;
          
          this.metrics.ttfb = ttfb;
          this.checkBudget('TTFB_THRESHOLD', ttfb);
        }
      });
    }
  }

  private checkBudget(metric: keyof PerformanceBudget, value: number) {
    const threshold = PERFORMANCE_BUDGET[metric];
    if (value > threshold) {
      const violation = `${metric}: ${value.toFixed(2)}ms exceeds budget of ${threshold}ms`;
      if (!this.violations.includes(violation)) {
        this.violations.push(violation);
        if (isDev) {
          console.warn(`⚠️ Performance Budget Violation: ${violation}`);
        }
      }
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  getViolations(): string[] {
    return [...this.violations];
  }

  reportMetrics() {
    if (isDev) {
      console.group('📊 Performance Metrics');
      console.table(this.metrics);
      if (this.violations.length > 0) {
        console.group('⚠️ Budget Violations');
        this.violations.forEach(v => console.warn(v));
        console.groupEnd();
      }
      console.groupEnd();
    }
  }

  // Track component render (development only)
  trackComponentRender(componentName: string) {
    if (!isDev) return () => {};
    
    const startTime = performance.now();
    return () => {
      const renderTime = performance.now() - startTime;
      if (renderTime > 16) {
        console.warn(`🐢 Slow render (${renderTime.toFixed(2)}ms): ${componentName}`);
      }
    };
  }

  // Track image loading (development only)
  trackImageLoad(src: string, startTime: number) {
    if (!isDev) return;
    
    const loadTime = performance.now() - startTime;
    if (loadTime > 1000) {
      console.warn(`🖼️ Slow image (${loadTime.toFixed(2)}ms): ${src}`);
    }
  }

  // Mark feature performance (development only)
  markFeature(name: string) {
    if (!isDev) return { end: () => {} };
    
    performance.mark(`feature-${name}-start`);
    return {
      end: () => {
        performance.mark(`feature-${name}-end`);
        performance.measure(`feature-${name}`, `feature-${name}-start`, `feature-${name}-end`);
      }
    };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const performanceMonitor = new PerformanceMonitor();

export const getPerformanceReport = () => ({
  metrics: performanceMonitor.getMetrics(),
  violations: performanceMonitor.getViolations(),
  passed: performanceMonitor.getViolations().length === 0,
});

// Report metrics on load in development
if (isDev && typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => performanceMonitor.reportMetrics(), 3000);
  });
}

export default {
  preloadImage,
  addResourceHint,
  PERFORMANCE_BUDGET,
  performanceMonitor,
  getPerformanceReport,
};
