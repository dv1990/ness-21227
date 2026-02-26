/**
 * Critical CSS optimization utilities
 * Extracts and inlines critical CSS for faster initial paint
 */

export const extractCriticalCSS = () => {
  if (typeof window === 'undefined') return;

  // Get all stylesheets
  const sheets = Array.from(document.styleSheets);
  const criticalRules: string[] = [];

  sheets.forEach((sheet) => {
    try {
      if (!sheet.href || sheet.href.includes(window.location.origin)) {
        const rules = Array.from(sheet.cssRules || []);
        
        rules.forEach((rule) => {
          const cssText = rule.cssText;
          
          // Include rules for above-the-fold elements
          if (
            cssText.includes('header') ||
            cssText.includes('nav') ||
            cssText.includes('hero') ||
            cssText.includes('.btn') ||
            cssText.includes('button') ||
            cssText.includes(':root') ||
            cssText.includes('*,') ||
            cssText.includes('body') ||
            cssText.includes('html')
          ) {
            criticalRules.push(cssText);
          }
        });
      }
    } catch (e) {
      // CORS or other errors - skip
    }
  });

  return criticalRules.join('\n');
};

/**
 * Defer non-critical CSS loading
 */
export const deferNonCriticalCSS = () => {
  // No-op: CSS deferral was breaking production builds by converting
  // Vite-injected stylesheet links to preload, causing blank pages.
};
