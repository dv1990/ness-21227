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
 * Generate srcset string for hero images with format support
 * Optimized for full-width viewport images
 */
export function generateHeroSrcSet(
  basePath: string, 
  format: 'avif' | 'webp' | 'jpeg' = 'webp'
): string {
  const widths = [640, 768, 1024, 1280, 1920];
  const extension = format === 'avif' ? '.avif' : format === 'webp' ? '.webp' : '.jpg';
  const folder = format === 'avif' ? 'assets-avif' : format === 'webp' ? 'assets-webp' : 'assets';
  
  // Extract base path without extension
  const lastDotIndex = basePath.lastIndexOf('.');
  const basePathNoExt = lastDotIndex !== -1 ? basePath.substring(0, lastDotIndex) : basePath;
  
  // Replace assets folder if needed
  const adjustedPath = basePathNoExt.replace(/assets(-webp|-avif)?/, folder);
  
  return widths
    .map(width => `${adjustedPath}-${width}w${extension} ${width}w`)
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
 * Generate srcset string for product images with format support
 * Optimized for contained content images
 */
export function generateProductSrcSet(
  basePath: string, 
  format: 'avif' | 'webp' | 'jpeg' = 'webp'
): string {
  const widths = [640, 768, 1024, 1280];
  const extension = format === 'avif' ? '.avif' : format === 'webp' ? '.webp' : '.jpg';
  const folder = format === 'avif' ? 'assets-avif' : format === 'webp' ? 'assets-webp' : 'assets';
  
  // Extract base path without extension
  const lastDotIndex = basePath.lastIndexOf('.');
  const basePathNoExt = lastDotIndex !== -1 ? basePath.substring(0, lastDotIndex) : basePath;
  
  // Replace assets folder if needed
  const adjustedPath = basePathNoExt.replace(/assets(-webp|-avif)?/, folder);
  
  return widths
    .map(width => `${adjustedPath}-${width}w${extension} ${width}w`)
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
 * Preload critical hero image with AVIF, WebP, and JPEG support
 */
export function preloadHeroImage(basePath: string) {
  if (typeof window === 'undefined') return;
  
  // Preload AVIF (best compression)
  const avifLink = document.createElement('link');
  avifLink.rel = 'preload';
  avifLink.as = 'image';
  avifLink.type = 'image/avif';
  avifLink.setAttribute('imagesrcset', generateHeroSrcSet(basePath, 'avif'));
  avifLink.setAttribute('imagesizes', getHeroSizes());
  avifLink.fetchPriority = 'high';
  document.head.appendChild(avifLink);
  
  // Preload WebP (fallback)
  const webpLink = document.createElement('link');
  webpLink.rel = 'preload';
  webpLink.as = 'image';
  webpLink.type = 'image/webp';
  webpLink.setAttribute('imagesrcset', generateHeroSrcSet(basePath, 'webp'));
  webpLink.setAttribute('imagesizes', getHeroSizes());
  webpLink.fetchPriority = 'high';
  document.head.appendChild(webpLink);
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
