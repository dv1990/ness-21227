import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ServiceWorkerPrompt } from "@/components/ServiceWorkerPrompt";

// Router future flags for v7 compatibility
const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

// All pages lazy loaded for optimal route-based code splitting
const Index = lazy(() => import("./pages/Index"));

// Main pages - Lazy loaded for better performance
const CommercialEnhanced = lazy(() => import("./pages/CommercialEnhanced"));
const ContactEnhanced = lazy(() => import("./pages/ContactEnhanced"));

// Product pages - Lazy loaded
const NessAcSync = lazy(() => import("./pages/products/NessAcSync"));
const EVChargingMicrogrid = lazy(() => import("./pages/EVChargingMicrogrid"));

// Contact pages - Lazy loaded (includes framer-motion)
const ContactHomeowner = lazy(() => import("./pages/contact/ContactHomeowner"));
const PWAInstall = lazy(() => import("./pages/PWAInstall"));

// Secondary pages - Lazy loaded
const TrueWarranty = lazy(() => import("./pages/TrueWarranty"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

// Legacy components - lazy loaded
const Hiring = lazy(() => import("./pages/Hiring"));
const FindInstaller = lazy(() => import("./pages/FindInstaller"));
const About = lazy(() => import("./pages/company/About"));
const News = lazy(() => import("./pages/company/News"));
const NewsArticle = lazy(() => import("./pages/company/NewsArticle"));
const KnowledgeHub = lazy(() => import("./pages/KnowledgeHub"));
const KnowledgeArticle = lazy(() => import("./pages/KnowledgeArticle"));
const ContactDistributor = lazy(() => import("./pages/contact/ContactDistributor"));
const ContactInstaller = lazy(() => import("./pages/contact/ContactInstaller"));
const InstallersEnhanced = lazy(() => import("./pages/InstallersEnhanced"));
const Troubleshooting = lazy(() => import("./pages/Troubleshooting"));
const TroubleshootingGuide = lazy(() => import("./pages/TroubleshootingGuide"));
const Downloads = lazy(() => import("./pages/Downloads"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component with skeleton
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <main role="main" aria-label="Loading content">
      <div className="space-y-4 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </main>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router future={routerFutureConfig}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollProgressBar />
          <ServiceWorkerPrompt />
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
          {/* Overview (Landing) */}
          <Route path="/" element={<Index />} />
          
          {/* Enhanced Product Routes */}
          <Route path="/commercial-enhanced" element={<CommercialEnhanced />} />
          <Route path="/installers-enhanced" element={<InstallersEnhanced />} />
          
          {/* Product Routes */}
          <Route path="/homeowners" element={<ContactHomeowner />} />
          <Route path="/ci" element={<CommercialEnhanced />} />
          <Route path="/installers" element={<ContactInstaller />} />
          <Route path="/warranty" element={<TrueWarranty />} />
          <Route path="/find-installer" element={<FindInstaller />} />
          <Route path="/products/ness-ac-sync" element={<NessAcSync />} />
          <Route path="/ev-charging-microgrid" element={<EVChargingMicrogrid />} />
          
          {/* Company Routes */}
          <Route path="/company/about" element={<About />} />
          <Route path="/company/news" element={<News />} />
          <Route path="/company/news/:slug" element={<NewsArticle />} />
          
          {/* Knowledge & Support */}
          <Route path="/knowledge" element={<KnowledgeHub />} />
          <Route path="/knowledge/:slug" element={<KnowledgeArticle />} />
          
          {/* Contact Routes */}
          <Route path="/contact" element={<ContactEnhanced />} />
          <Route path="/contact-enhanced" element={<ContactEnhanced />} />
          
          {/* PWA Install */}
          <Route path="/install" element={<PWAInstall />} />
          
          {/* Support Routes */}
          <Route path="/support/troubleshooting" element={<Troubleshooting />} />
          <Route path="/support/troubleshooting/:product/:issue" element={<TroubleshootingGuide />} />
          
          {/* Downloads */}
          <Route path="/downloads" element={<Downloads />} />
          
          {/* Legal Pages */}
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          
          {/* Legacy redirects for existing routes */}
          <Route path="/residential" element={<ContactHomeowner />} />
          <Route path="/commercial" element={<CommercialEnhanced />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          <Route path="/contact/homeowner" element={<ContactHomeowner />} />
          <Route path="/contact/distributor" element={<ContactDistributor />} />
          <Route path="/contact/installer" element={<ContactInstaller />} />
          <Route path="/troubleshooting" element={<Troubleshooting />} />
          
          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </TooltipProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
