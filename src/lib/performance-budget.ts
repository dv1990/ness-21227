/**
 * Performance Budget Monitoring
 * Tracks Core Web Vitals and enforces performance standards
 */

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

interface PerformanceBudget {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
}

// Performance budgets based on Core Web Vitals
const PERFORMANCE_BUDGET: PerformanceBudget = {
  lcp: 2500,  // Largest Contentful Paint
  fid: 100,   // First Input Delay
  cls: 0.1,   // Cumulative Layout Shift
  fcp: 1800,  // First Contentful Paint
  ttfb: 600   // Time to First Byte
};

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private violations: string[] = [];

  constructor() {
    if (typeof window === 'undefined') return;
    this.observePerformance();
  }

  private observePerformance() {
    // Observe LCP
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
          this.checkBudget('lcp', this.metrics.lcp);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Observe FID
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
            this.checkBudget('fid', this.metrics.fid);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Observe CLS
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              this.metrics.cls = clsValue;
              this.checkBudget('cls', this.metrics.cls);
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

      } catch (e) {
        // PerformanceObserver not supported
        if (import.meta.env.DEV) {
          console.warn('PerformanceObserver not fully supported');
        }
      }
    }

    // Measure FCP and TTFB from Navigation Timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navTiming = performance.getEntriesByType('navigation')[0] as any;
        if (navTiming) {
          this.metrics.ttfb = navTiming.responseStart - navTiming.requestStart;
          this.metrics.fcp = navTiming.responseEnd - navTiming.requestStart;
          
          this.checkBudget('ttfb', this.metrics.ttfb);
          this.checkBudget('fcp', this.metrics.fcp);
        }

        // Report all metrics in development
        if (import.meta.env.DEV) {
          this.reportMetrics();
        }
      }, 0);
    });
  }

  private checkBudget(metric: keyof PerformanceBudget, value: number) {
    const budget = PERFORMANCE_BUDGET[metric];
    if (value > budget) {
      const violation = `⚠️ Performance Budget Violation: ${metric.toUpperCase()} = ${value.toFixed(2)} (budget: ${budget})`;
      this.violations.push(violation);
      
      if (import.meta.env.DEV) {
        console.warn(violation);
      }
    }
  }

  private reportMetrics() {
    if (!import.meta.env.DEV) return;
    
    console.group('📊 Performance Metrics');
    console.log('LCP (Largest Contentful Paint):', this.metrics.lcp?.toFixed(2), 'ms');
    console.log('FID (First Input Delay):', this.metrics.fid?.toFixed(2), 'ms');
    console.log('CLS (Cumulative Layout Shift):', this.metrics.cls?.toFixed(3));
    console.log('FCP (First Contentful Paint):', this.metrics.fcp?.toFixed(2), 'ms');
    console.log('TTFB (Time to First Byte):', this.metrics.ttfb?.toFixed(2), 'ms');
    
    if (this.violations.length > 0) {
      console.group('⚠️ Budget Violations');
      this.violations.forEach(v => console.warn(v));
      console.groupEnd();
    } else {
      console.log('✅ All metrics within budget');
    }
    console.groupEnd();
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getViolations(): string[] {
    return [...this.violations];
  }
}

// Singleton instance
export const performanceBudgetMonitor = new PerformanceMonitor();

// Export for CI/CD integration
export const getPerformanceReport = () => {
  return {
    metrics: performanceBudgetMonitor.getMetrics(),
    violations: performanceBudgetMonitor.getViolations(),
    passed: performanceBudgetMonitor.getViolations().length === 0
  };
};
