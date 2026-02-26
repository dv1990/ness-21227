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
      workbox: {
        // Do NOT cache index.html — always fetch from network
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        // Only precache JS/CSS assets, never HTML
        globPatterns: ['**/*.{js,css,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'images', expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 } },
          },
        ],
      },
      manifest: false, // Use existing public/manifest.json
    }),
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
