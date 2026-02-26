import { ReactNode, lazy, Suspense } from "react";
import NavigationEnhanced from "./NavigationEnhanced";
import SkipLink from "./SkipLink";
import { LoadingSpinner } from "./ui/loading-spinner";
import { PageTransition } from "./ui/page-transition";

// Lazy load below-the-fold and deferred components to reduce initial bundle
const Footer = lazy(() => import("./Footer"));
const CookieConsent = lazy(() => import("./CookieConsent"));
const MobileStickyCTA = lazy(() =>
  import("./MobileStickyCTA").then(m => ({ default: m.MobileStickyCTA }))
);
const PWAInstallPrompt = lazy(() =>
  import("./PWAInstallPrompt").then(m => ({ default: m.PWAInstallPrompt }))
);

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col texture-overlay">
      <SkipLink />
      <header role="banner">
        <NavigationEnhanced />
      </header>
      <main
        id="main-content"
        className={`flex-1 pt-16 ${className}`}
      >
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Suspense fallback={
        <div className="h-20 flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      }>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
      <Suspense fallback={null}>
        <MobileStickyCTA phoneNumber="+918012345678" label="Call Us Now" />
      </Suspense>
      <Suspense fallback={null}>
        <PWAInstallPrompt />
      </Suspense>
    </div>
  );
};

export default Layout;
