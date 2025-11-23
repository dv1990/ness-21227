import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  src: string;
  srcSet?: string;
  sizes?: string;
  fallbackSrc?: string;
  className?: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  width?: number;
  height?: number;
  aspectRatio?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * ResponsiveImage component with AVIF, WebP, and JPEG fallback support
 * Automatically generates responsive image variants for optimal compression
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  srcSet,
  sizes,
  fallbackSrc,
  className,
  alt,
  priority = false,
  quality = 80,
  loading = 'lazy',
  width,
  height,
  aspectRatio,
  fetchPriority,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Use original source directly
  const imageSrc = fallbackSrc || src;

  // Generate srcsets for all formats
  const avifSrcSet = srcSet || generateSrcSet(imageSrc, 'avif');
  const webpSrcSet = srcSet || generateSrcSet(imageSrc, 'webp');
  const jpegSrcSet = srcSet || generateSrcSet(imageSrc, 'jpeg');
  
  // Default sizes attribute optimized for hero images
  const responsiveSizes = sizes || 
    '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px';

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Progressive image format support with AVIF > WebP > JPEG */}
      <picture>
        {/* AVIF format - best compression (30-50% smaller than WebP) */}
        {avifSrcSet && (
          <source
            type="image/avif"
            srcSet={avifSrcSet}
            sizes={responsiveSizes}
          />
        )}
        
        {/* WebP format - wide browser support, good compression */}
        {webpSrcSet && (
          <source
            type="image/webp"
            srcSet={webpSrcSet}
            sizes={responsiveSizes}
          />
        )}
        
        {/* JPEG fallback - universal browser support */}
        <img
          ref={imgRef}
          src={imageSrc}
          srcSet={jpegSrcSet}
          sizes={responsiveSizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          fetchPriority={priority ? 'high' : fetchPriority}
          onLoad={handleLoad}
          decoding={priority ? 'sync' : 'async'}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            "w-full h-full object-cover"
          )}
          {...props}
        />
      </picture>
    </div>
  );
};

/**
 * Generate srcset variants from a base image URL
 * Supports AVIF, WebP, and JPEG formats with multiple responsive breakpoints
 */
function generateSrcSet(src: string, format: 'avif' | 'webp' | 'jpeg' = 'jpeg'): string {
  // Standard responsive breakpoints optimized for modern devices
  const widths = [640, 750, 828, 1080, 1200, 1920, 2048];
  
  // For external URLs, return as-is
  if (src.startsWith('http')) {
    return '';
  }
  
  // Extract base path and extension
  const lastDotIndex = src.lastIndexOf('.');
  if (lastDotIndex === -1) return '';
  
  const basePath = src.substring(0, lastDotIndex);
  
  // Generate srcset based on format
  const variants = widths.map(width => {
    let path = basePath;
    let ext = '';
    
    if (format === 'avif') {
      path = basePath.replace('/assets/', '/assets-avif/');
      ext = '.avif';
    } else if (format === 'webp') {
      path = basePath.replace('/assets/', '/assets-webp/');
      ext = '.webp';
    } else {
      // JPEG - keep original path
      ext = src.substring(lastDotIndex);
    }
    
    return `${path}-${width}w${ext} ${width}w`;
  });
  
  return variants.join(', ');
}
