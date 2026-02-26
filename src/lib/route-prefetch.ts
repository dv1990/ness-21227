// Route prefetching utilities for instant navigation
const prefetchedRoutes = new Set<string>();

// Network-aware guard: skip prefetching on slow or data-saver connections
interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

const shouldPrefetch = (): boolean => {
  const conn = (navigator as any).connection as NetworkInformation | undefined;
  if (!conn) return true; // No Network Information API — assume broadband
  if (conn.saveData) return false; // User explicitly opted into data saving
  if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return false;
  return true;
};

// Route map for cleaner prefetching
const routeMap: Record<string, () => Promise<any>> = {
  '/commercial': () => import('../pages/CommercialEnhanced'),
  '/commercial-enhanced': () => import('../pages/CommercialEnhanced'),
  '/ci': () => import('../pages/CommercialEnhanced'),
  '/contact': () => import('../pages/ContactEnhanced'),
  '/contact-enhanced': () => import('../pages/ContactEnhanced'),
  '/homeowners': () => import('../pages/contact/ContactHomeowner'),
  '/residential': () => import('../pages/contact/ContactHomeowner'),
  '/contact/homeowner': () => import('../pages/contact/ContactHomeowner'),
  '/installers': () => import('../pages/InstallersEnhanced'),
  '/installers-enhanced': () => import('../pages/InstallersEnhanced'),
  '/warranty': () => import('../pages/TrueWarranty'),
  '/products/ness-ac-sync': () => import('../pages/products/NessAcSync'),
  '/ev-charging-microgrid': () => import('../pages/EVChargingMicrogrid'),
  '/company/about': () => import('../pages/company/About'),
  '/company/news': () => import('../pages/company/News'),
  '/knowledge': () => import('../pages/KnowledgeHub'),
  '/knowledge-hub': () => import('../pages/KnowledgeHub'),
  '/downloads': () => import('../pages/Downloads'),
  '/cookie-policy': () => import('../pages/CookiePolicy'),
  '/find-installer': () => import('../pages/FindInstaller'),
};

/**
 * Prefetch a route chunk for instant navigation
 * @param route - Route path to prefetch
 */
export const prefetchRoute = (route: string) => {
  if (prefetchedRoutes.has(route)) return;
  if (!shouldPrefetch()) return; // Skip on slow/data-saver connections

  const loader = routeMap[route];
  if (loader) {
    prefetchedRoutes.add(route);
    loader();
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
 * Called from main.tsx after window load event
 */
export const prefetchCriticalRoutes = () => {
  // Skip bulk prefetching entirely on slow connections
  if (!shouldPrefetch()) return;

  // Prefetch most visited routes in priority order
  const criticalRoutes = [
    '/commercial',
    '/homeowners', 
    '/contact',
    '/installers',
    '/warranty'
  ];

  // Stagger prefetching to avoid network congestion
  criticalRoutes.forEach((route, index) => {
    setTimeout(() => {
      prefetchRoute(route);
    }, index * 300); // 300ms between each prefetch
  });
};
