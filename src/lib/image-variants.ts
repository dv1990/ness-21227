/**
 * Image variant generation utilities for responsive images
 * Provides helpers for creating srcset attributes with proper device targeting
 */

export interface ImageVariant {
  width: number;
  path: string;
}

export interface ResponsiveImageConfig {
  src: string;
  variants?: ImageVariant[];
  sizes?: string;
}

/**
 * Standard responsive breakpoints matching common device sizes
 */
export const RESPONSIVE_BREAKPOINTS = {
  mobile: 640,
  mobileLarge: 750,
  tablet: 828,
  tabletLarge: 1080,
  laptop: 1200,
  desktop: 1920,
  desktopLarge: 2048,
} as const;

/**
 * Generate srcset string for hero images
 * Optimized for full-width viewport images
 */
export function generateHeroSrcSet(basePath: string, extension: string = '.webp'): string {
  const widths = [640, 750, 828, 1080, 1200, 1920];
  return widths
    .map(width => `${basePath}-${width}w${extension} ${width}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for hero images
 * Optimized for full viewport width
 */
export function getHeroSizes(): string {
  return '100vw';
}

/**
 * Generate srcset string for product images
 * Optimized for contained content images
 */
export function generateProductSrcSet(basePath: string, extension: string = '.webp'): string {
  const widths = [400, 640, 828, 1080, 1200];
  return widths
    .map(width => `${basePath}-${width}w${extension} ${width}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for product images
 * Optimized for content width constraints
 */
export function getProductSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';
}

/**
 * Get optimal image variant based on viewport width
 */
export function getOptimalVariant(viewportWidth: number): number {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const targetWidth = viewportWidth * dpr;
  
  const breakpoints = Object.values(RESPONSIVE_BREAKPOINTS).sort((a, b) => a - b);
  
  // Find the smallest breakpoint that's larger than target
  for (const breakpoint of breakpoints) {
    if (breakpoint >= targetWidth) {
      return breakpoint;
    }
  }
  
  // Return largest if target exceeds all breakpoints
  return breakpoints[breakpoints.length - 1];
}

/**
 * Preload critical hero image with responsive srcset
 */
export function preloadHeroImage(src: string, srcSet: string) {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  if (srcSet) {
    link.setAttribute('imagesrcset', srcSet);
    link.setAttribute('imagesizes', getHeroSizes());
  }
  link.fetchPriority = 'high';
  
  document.head.appendChild(link);
}

/**
 * Check if WebP is supported
 */
export function isWebPSupported(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}
