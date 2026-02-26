import { useState, useEffect, lazy, Suspense, memo, useMemo, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, ArrowRight } from "lucide-react";
import nunamLogo from "@/assets/nunam-logo.png";
import { prefetchRoute } from "@/lib/route-prefetch";

// Lazy load mobile menu to reduce initial bundle (only loaded on mobile)
const MobileMenu = lazy(() => import("./MobileMenu"));

/**
 * Accessible dropdown hook — handles keyboard navigation,
 * focus management, and click-outside dismissal.
 */
function useAccessibleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, close]);

  const triggerProps = {
    ref: triggerRef,
    "aria-haspopup": "true" as const,
    "aria-expanded": isOpen,
    onClick: toggle,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "ArrowDown" && !isOpen) {
        e.preventDefault();
        open();
      }
    },
  };

  return { isOpen, open, close, triggerProps, menuRef };
}

const NavigationEnhanced = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const products = useAccessibleDropdown();
  const whyNess = useAccessibleDropdown();
  const support = useAccessibleDropdown();

  // Scroll detection for nav bar styling
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );
  const isActiveSection = useCallback(
    (paths: string[]) => paths.some((path) => location.pathname.startsWith(path)),
    [location.pathname],
  );

  // Consolidated nav: Products (dropdown), Why NESS, Support (dropdown)
  const productItems = useMemo(
    () => [
      { label: "For Homeowners", href: "/homeowners", description: "Premium home battery backup" },
      { label: "For Business", href: "/ci", description: "Commercial & industrial solutions" },
    ],
    [],
  );

  const whyNessItems = useMemo(
    () => [
      { label: "Our Technology", href: "/homeowners", description: "How NESS systems work" },
      { label: "10-Year Warranty", href: "/warranty", description: "Industry-leading coverage" },
      { label: "About NESS", href: "/company/about", description: "Our mission and team" },
    ],
    [],
  );

  const supportItems = useMemo(
    () => [
      { label: "Knowledge Hub", href: "/knowledge", description: "Learn about energy storage" },
      { label: "Downloads", href: "/downloads", description: "Specs, manuals, and resources" },
      { label: "Troubleshooting", href: "/support/troubleshooting", description: "Get help with your system" },
      { label: "For Installers", href: "/installers", description: "Partner with NESS" },
    ],
    [],
  );

  // Items passed to mobile menu
  const mobileNavItems = useMemo(
    () => [
      { label: "Homeowners", href: "/homeowners", description: "Premium home battery backup" },
      { label: "Commercial", href: "/ci", description: "Commercial & industrial solutions" },
      { label: "10-Year Warranty", href: "/warranty", description: "Industry-leading coverage" },
      { label: "About NESS", href: "/company/about", description: "Our mission and team" },
      { label: "Knowledge Hub", href: "/knowledge", description: "Learn about energy storage" },
      { label: "For Installers", href: "/installers", description: "Partner with NESS" },
      { label: "Support", href: "/support/troubleshooting", description: "Get help with your system" },
    ],
    [],
  );

  const renderDropdown = (
    dropdown: ReturnType<typeof useAccessibleDropdown>,
    items: typeof productItems,
    align: "left" | "right" = "left",
  ) => (
    <div
      ref={dropdown.menuRef}
      className={`
        absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-3 w-72
        bg-card backdrop-blur-3xl border border-border rounded-2xl p-2
        shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)]
        transition-all duration-200 transform
        ${
          dropdown.isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-2 pointer-events-none"
        }
        z-[100]
      `}
      role="menu"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          onMouseEnter={() => prefetchRoute(item.href)}
          onClick={() => dropdown.close()}
          className={`
            block p-4 rounded-xl transition-all duration-200 group/item
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            ${
              isActive(item.href)
                ? "text-primary bg-primary/15"
                : "text-card-foreground hover:text-foreground hover:bg-muted"
            }
          `}
          role="menuitem"
          aria-label={`${item.label} — ${item.description}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-base mb-0.5 text-card-foreground">{item.label}</div>
              <div className="text-sm text-muted-foreground">{item.description}</div>
            </div>
            <ArrowRight
              className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300"
              aria-hidden="true"
            />
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border/20 shadow-lg" : "bg-background/80 backdrop-blur-sm"}
      `}
      aria-label="Main navigation"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
            aria-label="NESS Energy — Home"
          >
            <img
              src={nunamLogo}
              alt="NESS Energy Systems logo"
              className="h-12 w-auto hover:scale-105 transition-transform duration-300 ease-out"
            />
          </Link>

          {/* Desktop Navigation — 4 items: Products, Why NESS, Support, CTA */}
          <div className="hidden lg:flex items-center space-x-1" role="menubar">
            {/* Products dropdown */}
            <div className="relative">
              <button
                {...products.triggerProps}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all duration-300 ease-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  ${
                    isActiveSection(["/homeowners", "/residential", "/ci", "/commercial"])
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }
                `}
                aria-label="Products menu"
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${products.isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {renderDropdown(products, productItems)}
            </div>

            {/* Why NESS dropdown */}
            <div className="relative">
              <button
                {...whyNess.triggerProps}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all duration-300 ease-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  ${
                    isActiveSection(["/warranty", "/company"])
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }
                `}
                aria-label="Why NESS menu"
              >
                <span>Why NESS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${whyNess.isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {renderDropdown(whyNess, whyNessItems)}
            </div>

            {/* Support dropdown */}
            <div className="relative">
              <button
                {...support.triggerProps}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all duration-300 ease-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  ${
                    isActiveSection(["/knowledge", "/downloads", "/support", "/installers"])
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }
                `}
                aria-label="Support menu"
              >
                <span>Support</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${support.isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {renderDropdown(support, supportItems, "right")}
            </div>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex ml-4">
            <Link to="/contact/homeowner" onMouseEnter={() => prefetchRoute("/contact/homeowner")}>
              <Button
                className="rounded-full px-8 py-2.5 bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                size="sm"
                aria-label="Get a quote from NESS Energy Systems"
              >
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Suspense
              fallback={
                <Button variant="ghost" size="icon" className="hover:bg-muted/50" aria-label="Open navigation menu">
                  <Menu className="w-5 h-5" />
                </Button>
              }
            >
              <MobileMenu isOpen={mobileOpen} setIsOpen={setMobileOpen} mainNavItems={mobileNavItems} />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(NavigationEnhanced);
