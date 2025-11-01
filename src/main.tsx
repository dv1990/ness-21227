// Vite modulepreload polyfill for optimal module loading
import 'vite/modulepreload-polyfill';

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Load CSS asynchronously to not block rendering
// Critical CSS is already inlined in index.html
const loadStyles = async () => {
  await import("./index.css");
  await import("./styles/hero-optimized.css");
};

// Start loading styles immediately but don't wait for them
loadStyles();

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
