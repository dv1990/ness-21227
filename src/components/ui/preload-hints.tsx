import { useEffect } from 'react';

/**
 * Preload critical resources for better performance
 * This component should be added to critical pages only
 */
export const PreloadCriticalAssets = () => {
  useEffect(() => {
    // Preconnect to external domains if needed
    const preconnect = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Add preconnect hints if you have external resources
    // preconnect('https://fonts.googleapis.com');
    
  }, []);

  return null;
};
