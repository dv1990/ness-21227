/**
 * Essential Performance Utilities
 * Pure utility functions only - no React imports
 */

// Resource preloading
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

// Performance budget for development
export const performanceBudget = {
  LCP_THRESHOLD: 2500,
  FID_THRESHOLD: 100,
  CLS_THRESHOLD: 0.1,
  
  checkBudget: (metrics: { lcp?: number; fid?: number; cls?: number }) => {
    const violations = [];
    
    if (metrics.lcp && metrics.lcp > performanceBudget.LCP_THRESHOLD) {
      violations.push(`LCP: ${metrics.lcp}ms (budget: ${performanceBudget.LCP_THRESHOLD}ms)`);
    }
    
    if (metrics.fid && metrics.fid > performanceBudget.FID_THRESHOLD) {
      violations.push(`FID: ${metrics.fid}ms (budget: ${performanceBudget.FID_THRESHOLD}ms)`);
    }
    
    if (metrics.cls && metrics.cls > performanceBudget.CLS_THRESHOLD) {
      violations.push(`CLS: ${metrics.cls} (budget: ${performanceBudget.CLS_THRESHOLD})`);
    }
    
    return violations;
  }
};

export default {
  preloadImage,
  addResourceHint,
  performanceBudget
};
