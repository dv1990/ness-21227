import React, { useState, useRef, useCallback, useMemo } from 'react';
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

  // Generate srcsets for all formats - only if not external URL (memoized to avoid recalculation on re-render)
  const shouldGenerateSrcSet = !imageSrc.startsWith('http') && !imageSrc.endsWith('.svg');
  const avifSrcSet = useMemo(
    () => srcSet || (shouldGenerateSrcSet ? generateSrcSet(imageSrc, 'avif') : ''),
    [srcSet, shouldGenerateSrcSet, imageSrc]
  );
  const webpSrcSet = useMemo(
    () => srcSet || (shouldGenerateSrcSet ? generateSrcSet(imageSrc, 'webp') : ''),
    [srcSet, shouldGenerateSrcSet, imageSrc]
  );
  const jpegSrcSet = useMemo(
    () => srcSet || (shouldGenerateSrcSet ? generateSrcSet(imageSrc, 'jpeg') : ''),
    [srcSet, shouldGenerateSrcSet, imageSrc]
  );
  
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
  // For external URLs or SVGs, return empty
  if (src.startsWith('http') || src.endsWith('.svg')) {
    return '';
  }
  
  // Extract base path and extension
  const lastDotIndex = src.lastIndexOf('.');
  if (lastDotIndex === -1) return '';
  
  const basePath = src.substring(0, lastDotIndex);
  const originalExt = src.substring(lastDotIndex);
  
  // Define responsive breakpoints
  const widths = [640, 768, 1024, 1280, 1920];
  
  // Determine folder and extension based on format
  let folderPath = basePath;
  let ext = '';
  
  if (format === 'avif') {
    folderPath = basePath.replace('/assets-webp/', '/assets-avif/').replace('/assets/', '/assets-avif/');
    ext = '.avif';
  } else if (format === 'webp') {
    folderPath = basePath.includes('/assets-webp/') 
      ? basePath 
      : basePath.replace('/assets/', '/assets-webp/');
    ext = '.webp';
  } else {
    // JPEG - keep original path and extension
    folderPath = basePath.replace('/assets-webp/', '/assets/').replace('/assets-avif/', '/assets/');
    ext = originalExt;
  }
  
  // Extract just the filename without path
  const lastSlashIndex = folderPath.lastIndexOf('/');
  const filename = lastSlashIndex !== -1 ? folderPath.substring(lastSlashIndex + 1) : folderPath;
  const folder = lastSlashIndex !== -1 ? folderPath.substring(0, lastSlashIndex + 1) : '';
  
  // Generate srcset string with multiple widths
  const srcsetEntries = widths.map(width => {
    return `${folder}${filename}-${width}w${ext} ${width}w`;
  });
  
  // Add original size as fallback
  srcsetEntries.push(`${folderPath}${ext} 2048w`);
  
  return srcsetEntries.join(', ');
}
