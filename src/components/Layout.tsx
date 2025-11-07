import { ReactNode, lazy, Suspense } from "react";
import NavigationEnhanced from "./NavigationEnhanced";
import SkipLink from "./SkipLink";
import { MobileStickyCTA } from "./MobileStickyCTA";
import { PWAInstallPrompt } from "./PWAInstallPrompt";

// Lazy load below-the-fold components to reduce initial CSS bundle
const Footer = lazy(() => import("./Footer"));
const CookieConsent = lazy(() => import("./CookieConsent"));

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SkipLink />
      <NavigationEnhanced />
      <main 
        id="main-content" 
        className={`flex-1 pt-20 ${className}`}
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>
      <Suspense fallback={<div className="h-20" />}>
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