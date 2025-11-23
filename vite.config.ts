import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
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
      registerType: 'prompt',
      injectRegister: 'auto',
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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,woff,woff2}'],
        // Clean up old caches automatically
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // Precache all route chunks for instant navigation
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
          },
          // Same-origin navigation requests - Network first with cache fallback for offline
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              networkTimeoutSeconds: 3
            }
          }
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/, /^\/admin/]
      },
      devOptions: {
        enabled: false, // Disable in dev to avoid conflicts
        type: 'module'
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    dedupe: ['react', 'react-dom']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    // Enable CSS code splitting per component
    assetsInlineLimit: 0, // Don't inline any assets
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps, { hostId, hostType }) => {
        // Preload ALL dependencies immediately to enable parallel loading
        // This breaks the HTML → JS → CSS chain into HTML → (JS + CSS) parallel
        const filteredDeps = deps.filter(dep => {
          // Include both JS and CSS files
          const isJS = dep.endsWith('.js') || dep.endsWith('.jsx') || dep.endsWith('.ts') || dep.endsWith('.tsx');
          const isCSS = dep.endsWith('.css');
          return isJS || isCSS;
        });
        
        // Return all deps to ensure parallel discovery
        return filteredDeps;
      }
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
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
          // Vendor chunk for React ecosystem (core only)
          if (id.includes('node_modules')) {
            // React MUST be in a single chunk to prevent duplication
            if (id.includes('react') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            // React Router - separate chunk
            if (id.includes('react-router')) {
              return 'router';
            }
            // React Query - separate chunk (not always needed immediately)
            if (id.includes('@tanstack/react-query')) {
              return 'query';
            }
            // Framer Motion separate chunk (only loaded when needed)
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Three.js and 3D libs (only for lazy-loaded pages)
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            // Split Radix UI by component groups for better tree-shaking
            if (id.includes('@radix-ui')) {
              // Dialog/Sheet components (often mobile-only)
              if (id.includes('dialog') || id.includes('sheet') || id.includes('alert-dialog')) {
                return 'ui-dialog';
              }
              // Form components
              if (id.includes('select') || id.includes('checkbox') || id.includes('radio') || id.includes('slider')) {
                return 'ui-form';
              }
              // Dropdown/Menu components
              if (id.includes('dropdown') || id.includes('context-menu') || id.includes('menubar')) {
                return 'ui-menu';
              }
              // Commonly used components (tooltip, slot, etc)
              return 'ui-core';
            }
            // Lucide icons - separate chunk
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Recharts (only for specific pages)
            if (id.includes('recharts')) {
              return 'charts';
            }
            // Form libraries (only for form pages)
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
              return 'forms';
            }
            // Other vendors - minimize this
            return 'vendor';
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
      'react-router-dom',
      '@tanstack/react-query',
      '@radix-ui/react-slot',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-toast'
    ],
    // Force dedupe React to prevent hooks errors
    dedupe: ['react', 'react-dom', 'react/jsx-runtime']
  }
}));
