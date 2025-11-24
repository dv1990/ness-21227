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

  // Generate responsive srcset if not provided
  const shouldGenerateSrcSet = !src.startsWith('http') && !src.endsWith('.svg');
  const webpSrcSet = srcSet || (shouldGenerateSrcSet ? generateResponsiveSrcSet(src, 'webp') : '');
  const jpegSrcSet = srcSet || (shouldGenerateSrcSet ? generateResponsiveSrcSet(src, 'jpeg') : '');
  
  // Default sizes for responsive images
  const responsiveSizes = sizes || '(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1920px';

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
            srcSet={webpSrcSet || webpSrc}
            sizes={responsiveSizes}
          />
        )}
        
        {/* Fallback to original format */}
        <img
          ref={imgRef}
          src={jpegSrc}
          srcSet={jpegSrcSet}
          sizes={responsiveSizes}
          alt={alt}
          loading={priority ? 'eager' : loading}
          fetchPriority={priority ? 'high' : undefined}
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

/**
 * Generate responsive srcset with multiple widths
 */
function generateResponsiveSrcSet(src: string, format: 'webp' | 'jpeg'): string {
  if (src.startsWith('http') || src.endsWith('.svg')) return '';
  
  const widths = [640, 768, 1024, 1280, 1920];
  const lastDotIndex = src.lastIndexOf('.');
  if (lastDotIndex === -1) return '';
  
  const basePath = src.substring(0, lastDotIndex);
  const originalExt = src.substring(lastDotIndex);
  
  let folderPath = basePath;
  let ext = '';
  
  if (format === 'webp') {
    folderPath = basePath.includes('/assets-webp/') 
      ? basePath 
      : basePath.replace('/assets/', '/assets-webp/');
    ext = '.webp';
  } else {
    folderPath = basePath.replace('/assets-webp/', '/assets/');
    ext = originalExt;
  }
  
  const lastSlashIndex = folderPath.lastIndexOf('/');
  const filename = lastSlashIndex !== -1 ? folderPath.substring(lastSlashIndex + 1) : folderPath;
  const folder = lastSlashIndex !== -1 ? folderPath.substring(0, lastSlashIndex + 1) : '';
  
  const srcsetEntries = widths.map(width => `${folder}${filename}-${width}w${ext} ${width}w`);
  srcsetEntries.push(`${folderPath}${ext} 2048w`);
  
  return srcsetEntries.join(', ');
}