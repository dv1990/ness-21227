// Route prefetching utilities for instant navigation
const prefetchedRoutes = new Set<string>();

/**
 * Prefetch a route chunk for instant navigation
 * @param route - Route path to prefetch
 */
export const prefetchRoute = (route: string) => {
  if (prefetchedRoutes.has(route)) return;
  
  // Mark as prefetched to avoid duplicates
  prefetchedRoutes.add(route);
  
  // Import the route component in the background
  switch (route) {
    case '/commercial':
    case '/commercial-enhanced':
    case '/ci':
      import('../pages/CommercialEnhanced');
      break;
    case '/contact':
    case '/contact-enhanced':
      import('../pages/ContactEnhanced');
      break;
    case '/homeowners':
    case '/residential':
    case '/contact/homeowner':
      import('../pages/contact/ContactHomeowner');
      break;
    case '/installers':
    case '/installers-enhanced':
      import('../pages/InstallersEnhanced');
      break;
    case '/warranty':
      import('../pages/TrueWarranty');
      break;
    case '/products/ness-ac-sync':
      import('../pages/products/NessAcSync');
      break;
    case '/ev-charging-microgrid':
      import('../pages/EVChargingMicrogrid');
      break;
    case '/company/about':
      import('../pages/company/About');
      break;
    case '/company/news':
      import('../pages/company/News');
      break;
    case '/knowledge':
    case '/knowledge-hub':
      import('../pages/KnowledgeHub');
      break;
    case '/downloads':
      import('../pages/Downloads');
      break;
    case '/cookie-policy':
      import('../pages/CookiePolicy');
      break;
    case '/find-installer':
      import('../pages/FindInstaller');
      break;
    default:
      // Don't prefetch unknown routes
      break;
  }
};

/**
 * Prefetch routes on hover/focus for instant navigation
 * Use in Link components: onMouseEnter={() => prefetchRoute('/path')}
 */
export const usePrefetchOnHover = () => {
  const handleMouseEnter = (route: string) => {
    prefetchRoute(route);
  };
  
  return handleMouseEnter;
};

/**
 * Prefetch critical routes after initial page load
 */
export const prefetchCriticalRoutes = () => {
  // Wait for initial load to complete
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Prefetch most visited routes
      prefetchRoute('/commercial');
      prefetchRoute('/homeowners');
      prefetchRoute('/contact');
    }, { timeout: 2000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      prefetchRoute('/commercial');
      prefetchRoute('/homeowners');
      prefetchRoute('/contact');
    }, 2000);
  }
};
