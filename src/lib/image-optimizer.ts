/**
 * Image Optimization System
 * Handles AVIF, WebP conversion and lazy loading
 */

// Image format detection and optimization with AVIF, WebP, and JPEG fallback
export const getOptimizedImageSrc = (originalSrc: string, format: 'avif' | 'webp' | 'jpeg' = 'webp'): string => {
  // If it's an external URL, return as-is
  if (originalSrc.startsWith('http')) {
    return originalSrc;
  }

  // Return original if it's already optimized or unsupported format
  if (originalSrc.includes('.svg')) {
    return originalSrc;
  }

  // Convert to requested format path
  const lastDotIndex = originalSrc.lastIndexOf('.');
  if (lastDotIndex === -1) return originalSrc;
  
  const basePath = originalSrc.substring(0, lastDotIndex);
  
  if (format === 'avif') {
    return `${basePath.replace('/assets/', '/assets-avif/')}.avif`;
  } else if (format === 'webp') {
    return `${basePath.replace('/assets/', '/assets-webp/')}.webp`;
  }
  
  return originalSrc;
};

// Get image with progressive format fallback support (AVIF > WebP > JPEG)
export const getImageWithFallback = (src: string): { avif: string; webp: string; fallback: string } => {
  return {
    avif: getOptimizedImageSrc(src, 'avif'),
    webp: getOptimizedImageSrc(src, 'webp'),
    fallback: src
  };
};

// Track image load (development only)
export const trackImageLoad = (src: string, loadTime: number) => {
  if (import.meta.env.DEV && loadTime > 2000) {
    console.warn(`⚠️ Slow image load: ${src} took ${loadTime}ms`);
  }
};

// Preload critical images with optimal format detection
export const preloadCriticalImages = async (imageSrcs: string[]) => {
  if (typeof window === 'undefined') return;

  // Detect format support once
  const supportsAVIF = await isAVIFSupported();
  const supportsWebP = await isWebPSupported();

  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.fetchPriority = 'high';
    
    if (supportsAVIF) {
      link.href = getOptimizedImageSrc(src, 'avif');
      link.type = 'image/avif';
    } else if (supportsWebP) {
      link.href = getOptimizedImageSrc(src, 'webp');
      link.type = 'image/webp';
    } else {
      link.href = src;
    }
    
    document.head.appendChild(link);
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

  // Network Information API (not in all browsers, hence the type narrowing)
  const nav = navigator as Navigator & { connection?: { effectiveType?: string } };
  if (nav.connection) {
    if (nav.connection.effectiveType === 'slow-2g' || nav.connection.effectiveType === '2g') {
      return 60;
    }
    if (nav.connection.effectiveType === '3g') {
      return 70;
    }
  }

  const dpr = window.devicePixelRatio || 1;
  if (dpr > 2) {
    return 85;
  }

  return 80;
};

/**
 * Check if AVIF is supported
 */
export function isAVIFSupported(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABEAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAABAA0ABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=';
  });
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
