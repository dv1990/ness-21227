/**
 * Font loading optimization
 * Implements progressive font loading strategy
 */

export const optimizeFontLoading = () => {
  if (typeof window === 'undefined' || !('fonts' in document)) return;

  // Check if custom fonts are needed
  const hasCustomFonts = document.fonts.size > 0;

  if (hasCustomFonts) {
    // Use font-display: swap for custom fonts
    document.fonts.ready.then(() => {
      // Fonts loaded, remove FOUT class if present
      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-loaded');
    });
  }
};

/**
 * Preconnect to font CDNs
 */
export const preconnectFonts = () => {
  if (typeof window === 'undefined') return;

  const fontCDNs = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  fontCDNs.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

/**
 * Subset fonts for better performance
 */
export const loadOptimalFontSubset = () => {
  // Only load Latin characters for English content
  const fontUrl = new URL('https://fonts.googleapis.com/css2');
  fontUrl.searchParams.set('family', 'Inter:wght@400;500;600');
  fontUrl.searchParams.set('display', 'swap');
  fontUrl.searchParams.set('subset', 'latin');

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontUrl.toString();
  link.media = 'print';
  link.onload = function() {
    (this as HTMLLinkElement).media = 'all';
  };
  
  document.head.appendChild(link);
};
