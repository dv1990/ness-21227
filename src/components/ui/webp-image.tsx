import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface WebPImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  className?: string;
  alt: string;
  priority?: boolean;
  quality?: number;
}

export const WebPImage: React.FC<WebPImageProps> = ({
  src,
  fallbackSrc,
  className,
  alt,
  priority = false,
  quality = 80,
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Use original source directly (WebP files are placeholders)
  const imageSrc = fallbackSrc || src;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Optimized image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
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