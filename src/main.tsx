import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/hero-optimized.css";
import "./styles/accessibility.css";
import { optimizeFontLoading, preconnectFonts } from "./lib/font-optimizer";
import { deferNonCriticalCSS } from "./lib/critical-css";

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

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
