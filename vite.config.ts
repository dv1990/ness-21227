import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',  // Use root path for proper React Fast Refresh
  server: {
    host: "::",
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  esbuild: {
    target: 'esnext',
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          }
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/]
      },
      devOptions: {
        enabled: false // Disable in development to avoid conflicts
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom', 'react-router-dom']
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
          return 'assets/[name]-[hash][extname]';
        },
        manualChunks: (id) => {
          // Vendor chunk for React ecosystem (core only)
          if (id.includes('node_modules')) {
            // React core - minimal chunk
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('scheduler')) {
              return 'react-core';
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
      'react-router-dom',
      '@tanstack/react-query',
      '@radix-ui/react-slot',
    ],
    exclude: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'recharts'
    ]
  }
}));
