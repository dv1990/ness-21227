import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { performanceMonitor } from '@/lib/performance-monitor';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  quality = 85,
  sizes = "100vw",
  className,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const startTime = useRef<number>(0);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    if (startTime.current) {
      performanceMonitor.trackImageLoad(src, startTime.current);
    }
    setIsLoaded(true);
    onLoad?.(event);
  }, [src, onLoad]);

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    onError?.(event);
  }, [src, onError]);

  const handleLoadStart = useCallback(() => {
    startTime.current = performance.now();
  }, []);

  // Generate WebP srcSet for better compression
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [400, 800, 1200, 1600];
    return sizes.map(size => {
      const webpSrc = baseSrc.replace(/\.(jpg|jpeg|png)$/i, `.webp?w=${size}&q=${quality}`);
      return `${webpSrc} ${size}w`;
    }).join(', ');
  };

  // Fallback placeholder
  if (hasError) {
    return (
      <div 
        ref={imgRef}
        className={cn(
          'bg-muted/20 border border-muted/30 flex items-center justify-center',
          'text-muted-foreground/60 text-sm',
          className
        )}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Loading placeholder */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-muted/10 animate-pulse" />
      )}
      
      {/* Optimized image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};