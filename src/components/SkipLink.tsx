import { memo } from "react";

/**
 * WCAG 2.4.1 - Bypass Blocks (Level A)
 * Skip link allows keyboard users to bypass navigation and jump to main content
 */
const SkipLink = memo(() => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
});

SkipLink.displayName = "SkipLink";

export default SkipLink;
