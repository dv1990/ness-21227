import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Defer non-critical CSS loading to improve FCP/LCP
// Critical CSS is already inlined in index.html
const loadDeferredStyles = () => {
  const stylesheets = [
    './index.css',
    './styles/hero-optimized.css',
    './styles/accessibility.css'
  ];
  
  stylesheets.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function(this: HTMLLinkElement) {
      this.media = 'all';
    };
    document.head.appendChild(link);
  });
};

// Load deferred styles after initial render
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadDeferredStyles);
} else {
  loadDeferredStyles();
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
