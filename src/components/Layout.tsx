import { ReactNode, lazy, Suspense } from "react";
import NavigationEnhanced from "./NavigationEnhanced";
import SkipLink from "./SkipLink";
import { MobileStickyCTA } from "./MobileStickyCTA";
import { PWAInstallPrompt } from "./PWAInstallPrompt";
import { LoadingSpinner } from "./ui/loading-spinner";
import { PageTransition } from "./ui/page-transition";

// Lazy load below-the-fold components to reduce initial CSS bundle
const Footer = lazy(() => import("./Footer"));
const CookieConsent = lazy(() => import("./CookieConsent"));

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
      <MobileStickyCTA phoneNumber="+918012345678" label="Call Us Now" />
      <PWAInstallPrompt />
    </div>
  );
};

export default Layout;