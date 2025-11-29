import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/hero-optimized.css";
import "./styles/accessibility.css";
import { optimizeFontLoading, preconnectFonts } from "./lib/font-optimizer";
import { deferNonCriticalCSS } from "./lib/critical-css";
import { prefetchCriticalRoutes } from "./lib/route-prefetch";

// Development-only error logging
if (import.meta.env.DEV) {
  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error || e.message);
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
  });
}

// Optimize font loading
preconnectFonts();
optimizeFontLoading();

// Defer non-critical CSS
if (document.readyState === 'complete') {
  deferNonCriticalCSS();
} else {
  window.addEventListener('load', deferNonCriticalCSS);
}

// Prefetch critical routes after initial load
window.addEventListener('load', () => {
  // Use requestIdleCallback to avoid blocking main thread
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => prefetchCriticalRoutes(), { timeout: 2000 });
  } else {
    setTimeout(() => prefetchCriticalRoutes(), 2000);
  }
});

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
