import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
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
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
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
        // Add preload directives
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    },
    // Optimize module preload to load only JS, defer CSS
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps) => {
        // Only preload JS dependencies, let CSS load async
        return deps.filter(dep => !dep.endsWith('.css'));
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
