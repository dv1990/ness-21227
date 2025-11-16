import { useState, useEffect, lazy, Suspense, memo, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, Home, Building2, Wrench, LayoutGrid, ArrowRight, Shield } from "lucide-react";
import nunamLogo from "@/assets/nunam-logo.png";
import { prefetchRoute } from "@/lib/route-prefetch";

// Lazy load mobile menu to reduce initial bundle (only loaded on mobile)
const MobileMenu = lazy(() => import("./MobileMenu"));
const NavigationEnhanced = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Apple-style scroll detection for navigation bar - memoized handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Memoized helper functions
  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);
  const isActiveSection = useCallback((paths: string[]) => 
    paths.some(path => location.pathname.startsWith(path)), 
    [location.pathname]
  );

  // Memoized navigation items to prevent recreation
  const mainNavItems = useMemo(() => [{
    label: "Overview",
    href: "/",
    icon: LayoutGrid,
    description: "Complete NESS ecosystem"
  }, {
    label: "Homeowners",
    href: "/homeowners",
    icon: Home,
    description: "NESS products for homes"
  }, {
    label: "C&I",
    href: "/ci",
    icon: Building2,
    description: "POD & CUBE systems"
  }, {
    label: "Installers",
    href: "/installers",
    icon: Wrench,
    description: "Partner with NESS"
  }, {
    label: "Warranty",
    href: "/warranty",
    icon: Shield,
    description: "Trust that matters"
  }], []);

  const companyItems = useMemo(() => [{
    label: "About Us",
    href: "/company/about",
    description: "Our mission and vision"
  }, {
    label: "News",
    href: "/company/news",
    description: "Latest updates and insights"
  }], []);

  const supportItems = useMemo(() => [{
    label: "Knowledge Hub",
    href: "/knowledge",
    description: "Learn about energy storage"
  }, {
    label: "Downloads",
    href: "/downloads",
    description: "Specs, manuals, and resources"
  }, {
    label: "Support",
    href: "/support/troubleshooting",
    description: "Get help with your system"
  }], []);

  return <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border/20 shadow-lg' : 'bg-background/80 backdrop-blur-sm'}
      `}
      aria-label="Main navigation"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
            aria-label="NESS Energy - Home"
          >
            <img 
              src={nunamLogo} 
              alt="NESS Energy Systems logo" 
              className="h-12 w-auto group-hover:scale-105 transition-all duration-300 ease-out"
            />
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2" role="menubar">
            {mainNavItems.map(item => <div key={item.href} className="relative group">
                <Link 
                  to={item.href}
                  onMouseEnter={() => prefetchRoute(item.href)}
                  className={`
                    px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out
                    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${isActive(item.href) 
                      ? "text-primary bg-primary/10 shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60 hover:scale-105"}
                  `}
                  role="menuitem"
                  aria-label={`${item.label} - ${item.description}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </div>)}

            {/* Enhanced Company Dropdown */}
            <div className="relative group">
              <button 
                className={`
                  px-5 py-2 rounded-full text-sm font-medium flex items-center space-x-1.5 transition-all duration-300 ease-out
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2
                  ${isActiveSection(["/company"]) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground group-hover:text-foreground group-hover:bg-muted/60 group-hover:scale-105"}
                `}
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Company menu"
              >
                <span>Company</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" aria-hidden="true" />
              </button>
              
              <div 
                className="absolute top-full left-0 mt-3 w-72 bg-background/98 backdrop-blur-2xl border border-border/30 rounded-3xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                role="menu"
                aria-label="Company submenu"
              >
                {companyItems.map(item => <Link 
                    key={item.href} 
                    to={item.href}
                    onMouseEnter={() => prefetchRoute(item.href)}
                    className={`
                      block p-4 rounded-2xl transition-all duration-200 group/item
                      focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2
                      ${isActive(item.href) ? "text-primary bg-primary/10" : "hover:text-foreground hover:bg-muted/70"}
                    `}
                    role="menuitem"
                    aria-label={`${item.label} - ${item.description}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm mb-0.5">{item.label}</div>
                        <div className="text-xs text-muted-foreground/80">{item.description}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" aria-hidden="true" />
                    </div>
                  </Link>)}
              </div>
            </div>

            {/* Enhanced Support Dropdown */}
            <div className="relative group">
              <button 
                className={`
                  px-5 py-2 rounded-full text-sm font-medium flex items-center space-x-1.5 transition-all duration-300 ease-out
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2
                  ${isActiveSection(["/knowledge", "/downloads", "/support"]) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground group-hover:text-foreground group-hover:bg-muted/60 group-hover:scale-105"}
                `}
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Support menu"
              >
                <span>Support</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" aria-hidden="true" />
              </button>
              
              <div 
                className="absolute top-full right-0 mt-3 w-72 bg-background/98 backdrop-blur-2xl border border-border/30 rounded-3xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                role="menu"
                aria-label="Support submenu"
              >
                {supportItems.map(item => <Link 
                    key={item.href} 
                    to={item.href}
                    onMouseEnter={() => prefetchRoute(item.href)}
                    className={`
                      block p-4 rounded-2xl transition-all duration-200 group/item
                      focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2
                      ${isActive(item.href) ? "text-primary bg-primary/10" : "hover:text-foreground hover:bg-muted/70"}
                    `}
                    role="menuitem"
                    aria-label={`${item.label} - ${item.description}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm mb-0.5">{item.label}</div>
                        <div className="text-xs text-muted-foreground/80">{item.description}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" aria-hidden="true" />
                    </div>
                  </Link>)}
              </div>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden lg:flex ml-4">
            <Link to="/contact/homeowner" onMouseEnter={() => prefetchRoute('/contact/homeowner')}>
              <Button 
                className="rounded-full px-6 py-2 bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2"
                size="sm"
                aria-label="Get started with NESS Energy Systems"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className="lg:hidden">
            <Suspense fallback={<Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-muted/50"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </Button>}>
              <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} mainNavItems={mainNavItems} />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>;
};
export default memo(NavigationEnhanced);