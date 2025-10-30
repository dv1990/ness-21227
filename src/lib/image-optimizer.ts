/**
 * Image Optimization System
 * Handles WebP conversion and lazy loading
 */

// Image format detection and optimization with fallback
export const getOptimizedImageSrc = (originalSrc: string, quality = 80): string => {
  // If it's an external URL, return as-is
  if (originalSrc.startsWith('http')) {
    return originalSrc;
  }

  // Return original if it's already optimized or unsupported format
  if (originalSrc.includes('.webp') || originalSrc.includes('.svg')) {
    return originalSrc;
  }

  // Convert to WebP path
  const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    .replace('/assets/', '/assets-webp/');
  
  return webpSrc;
};

// Get image with fallback support
export const getImageWithFallback = (src: string): { webp: string; fallback: string } => {
  const optimized = getOptimizedImageSrc(src);
  return {
    webp: optimized,
    fallback: src
  };
};

// Track image load (development only)
export const trackImageLoad = (src: string, loadTime: number) => {
  if (import.meta.env.DEV && loadTime > 2000) {
    console.warn(`⚠️ Slow image load: ${src} took ${loadTime}ms`);
  }
};

// Preload critical images
export const preloadCriticalImages = (imageSrcs: string[]) => {
  if (typeof window === 'undefined') return;

  imageSrcs.forEach(src => {
    const optimizedSrc = getOptimizedImageSrc(src);
    
    const webpLink = document.createElement('link');
    webpLink.rel = 'preload';
    webpLink.as = 'image';
    webpLink.href = optimizedSrc;
    webpLink.type = 'image/webp';
    
    const fallbackLink = document.createElement('link');
    fallbackLink.rel = 'preload';
    fallbackLink.as = 'image';
    fallbackLink.href = src;
    
    document.head.appendChild(webpLink);
    document.head.appendChild(fallbackLink);
  });
};

// Intersection Observer for lazy loading
export const createLazyLoadObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
};

// Image compression quality based on device capabilities
export const getOptimalQuality = (): number => {
  if (typeof window === 'undefined') return 80;

  const connection = (navigator as any).connection;
  if (connection) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 60;
    }
    if (connection.effectiveType === '3g') {
      return 70;
    }
  }

  const dpr = window.devicePixelRatio || 1;
  if (dpr > 2) {
    return 85;
  }

  return 80;
};
