import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface WebPImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  className?: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  srcSet?: string;
  sizes?: string;
}

export const WebPImage: React.FC<WebPImageProps> = ({
  src,
  fallbackSrc,
  className,
  alt,
  priority = false,
  quality = 80,
  loading = 'lazy',
  srcSet,
  sizes,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Generate WebP and fallback sources
  const getWebPSource = (originalSrc: string): string => {
    if (originalSrc.startsWith('http') || originalSrc.endsWith('.svg')) {
      return originalSrc;
    }
    
    // If already a webp, return as is
    if (originalSrc.includes('.webp')) {
      return originalSrc;
    }
    
    // Convert to WebP path
    const lastDotIndex = originalSrc.lastIndexOf('.');
    if (lastDotIndex === -1) return originalSrc;
    
    const basePath = originalSrc.substring(0, lastDotIndex);
    const webpPath = basePath.replace('/assets/', '/assets-webp/') + '.webp';
    
    return webpPath;
  };

  const webpSrc = getWebPSource(src);
  const jpegSrc = fallbackSrc || src;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Progressive image with WebP support */}
      <picture>
        {/* WebP format - modern browsers */}
        {webpSrc !== jpegSrc && (
          <source 
            type="image/webp" 
            srcSet={srcSet || webpSrc}
            sizes={sizes}
          />
        )}
        
        {/* Fallback to original format */}
        <img
          ref={imgRef}
          src={jpegSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : loading}
          fetchPriority={priority ? 'high' : 'low'}
          decoding="async"
          onLoad={handleLoad}
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
