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
 * ResponsiveImage component with srcset support for LCP optimization
 * Automatically generates responsive image variants for different viewport sizes
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

  // Auto-generate srcset if src is provided but srcSet is not
  // This assumes the build tool generates responsive variants
  const responsiveSrcSet = srcSet || generateSrcSet(imageSrc);
  
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
      
      {/* Optimized responsive image */}
      <img
        ref={imgRef}
        src={imageSrc}
        srcSet={responsiveSrcSet}
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
    </div>
  );
};

/**
 * Generate srcset variants from a base image URL
 * This is a placeholder - in production, responsive images should be
 * pre-generated during build or served via image CDN
 */
function generateSrcSet(src: string): string {
  // For WebP images, return variants at different widths
  // In production, use an image CDN or build-time optimization
  const widths = [640, 750, 828, 1080, 1200, 1920];
  
  // Extract base path and extension
  const lastDotIndex = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDotIndex);
  const extension = src.substring(lastDotIndex);
  
  // Generate srcset string
  // Note: This assumes images are available at these paths
  // In real production, you'd use an image CDN with automatic resizing
  return widths
    .map(width => `${basePath}${extension} ${width}w`)
    .join(', ');
}
