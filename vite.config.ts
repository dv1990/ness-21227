import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',  // Use root path for proper React Fast Refresh
  server: {
    host: "localhost", // Use localhost for security. Change to "::" if network access needed
    port: 8080,
    // CORS headers removed - not needed for local development
    // If CORS is needed for specific use cases, configure with specific origins only
  },
  esbuild: {
    target: 'esnext',
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      selfDestroying: true,
      includeAssets: ['favicon.ico', 'robots.txt', 'placeholder.svg'],
      manifest: {
        name: 'NESS Energy Systems',
        short_name: 'NESS',
        description: 'Advanced battery energy storage systems for residential and commercial applications',
        theme_color: '#22c55e',
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/placeholder.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/placeholder.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,ico,png,svg,webp,jpg,woff,woff2}'],
        // Increase limit for large images (default is 2MB)
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        // Clean up old caches automatically
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // Precache non-HTML assets only to avoid stale app shell issues
        runtimeCaching: [
          // API calls - Network first with fallback
          {
            urlPattern: /^https:\/\/.*\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 5 // 5 minutes
              },
              networkTimeoutSeconds: 10
            }
          },
          // Google Fonts stylesheets
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          // Google Fonts webfonts
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Images - Cache first for performance
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 60 // 60 days
              }
            }
          },
          // JS/CSS - Stale while revalidate for instant load + updates
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: false, // Disable in dev to avoid conflicts
        type: 'module'
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Critical: Dedupe React ecosystem to prevent hooks errors
    dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react-router-dom', 'scheduler']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      treeshake: {
        manualPureFunctions: ['console.log', 'console.info', 'console.debug'],
      },
      output: {
        // Enhanced CSS minification
        assetFileNames: (assetInfo) => {
          // Separate CSS files by component/route for better caching
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          // Force .js extension for any JS/TS files that end up here
          if (assetInfo.name?.match(/\.(js|jsx|ts|tsx)$/)) {
            return 'assets/[name]-[hash].js';
          }
          return 'assets/[name]-[hash][extname]';
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // CRITICAL: React, React-DOM, and scheduler MUST be in same chunk
            // This prevents the "dispatcher.useRef" error from multiple React instances
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
              return 'react-vendor';
            }
            
            // Router - separate chunk but depends on react-vendor
            if (id.includes('react-router')) {
              return 'router';
            }
            
            // Heavy dependencies - separate chunks
            if (id.includes('framer-motion')) return 'framer';
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('recharts')) return 'charts';
            if (id.includes('@tanstack/react-query')) return 'query';
            
            // UI library groups
            if (id.includes('@radix-ui')) {
              if (id.includes('dialog') || id.includes('sheet') || id.includes('alert-dialog')) {
                return 'ui-overlay';
              }
              if (id.includes('select') || id.includes('checkbox') || id.includes('radio') || id.includes('slider') || id.includes('switch')) {
                return 'ui-form';
              }
              if (id.includes('dropdown') || id.includes('context-menu') || id.includes('menubar') || id.includes('navigation-menu')) {
                return 'ui-menu';
              }
              return 'ui-base';
            }
            
            // Icons - frequently used
            if (id.includes('lucide-react')) return 'icons';
            
            // Form validation
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
              return 'forms';
            }
            
            // Small utilities in main vendor
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
              return 'vendor';
            }
            
            // Everything else
            return 'vendor';
          }
          
          // Split page routes into separate chunks for optimal lazy loading
          if (id.includes('src/pages/')) {
            // Group related pages together
            if (id.includes('contact/')) return 'pages-contact';
            if (id.includes('company/')) return 'pages-company';
            if (id.includes('products/')) return 'pages-products';
            // Each major page gets its own chunk for granular loading
            if (id.includes('CommercialEnhanced')) return 'page-commercial';
            if (id.includes('InstallersEnhanced')) return 'page-installers';
            if (id.includes('ContactHomeowner')) return 'page-homeowner';
            if (id.includes('Index.tsx')) return 'page-home';
          }
        },
        // Optimize chunk loading
        experimentalMinChunkSize: 20000,
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      '@tanstack/react-query',
      '@radix-ui/react-slot',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-toast'
    ]
  }
}));
