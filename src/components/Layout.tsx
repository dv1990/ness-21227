import { ReactNode, lazy, Suspense } from "react";
import NavigationEnhanced from "./NavigationEnhanced";

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
      <NavigationEnhanced />
      <main className={`flex-1 pt-20 ${className}`}>
        {children}
      </main>
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </div>
  );
};

export default Layout;