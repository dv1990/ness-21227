/* ─────────────────────────────────────────────────────────────────────────
   Home page — the Jobs cut.

   Five sections, one customer, one ask. The previous 14-section version
   tried to be a brochure, a feature list, a configurator, and a press
   release on the same page. This one stops competing for poetic
   headline-of-the-year and starts competing on the product.

       1. HERO              one image, one headline, one button
       2. CONFIGURATOR      try the product
       3. HOW IT WORKS      animated solar -> battery -> home diagram
       4. ONE TESTIMONIAL   Rajesh, the only Mom-test-passing copy on site
       5. FINAL CTA         "Stop paying peak tariffs"

   What was removed and where it went:
   - Hero steps 2 & 3 (3-step scroll)  -> kept only step 1
   - Proclamation "One box. Sun in."    -> said in hero already; deleted
   - All 3 interstitials                -> italic floating poems; deleted
   - ScrollProductShowcase              -> 4-feature list; the configurator
                                            is a better demo than features
   - "Your home. Self-powered."         -> belongs on /homeowners
   - "Scale without limits." (Pod)      -> belongs on /commercial
   - The Movement (city marquee +
     LiveTicker + trust badges)         -> footer is the right place
   - Stats section                      -> Rs 47K savings folded into hero
   - Customer Stories (2 quotes)        -> kept the stronger one (Rajesh),
                                            dropped Priya
   - Trust bar (4 items)                -> all four signals belong in the
                                            footer; the product photo and
                                            the testimonial are the trust
                                            signals here

   For the long-form version of any of these (product features, commercial,
   detailed homeowner spec), the user clicks. The homepage is a window, not
   the whole store.
   ───────────────────────────────────────────────────────────────────── */

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, memo, lazy, Suspense } from "react";
import { ArrowRight, Quote } from "lucide-react";
import { GradientOrbField } from "@/components/ui/gradient-orb";
import { SmoothFade } from "@/components/ui/smooth-animations";
import { cn } from "@/lib/utils";
import nessHeroProduct from "@/assets/ness-hero-product.webp";

// Heavy below-the-fold content stays lazy so the hero paints fast.
const HomeownerConfigurator = lazy(() =>
  import("@/components/homeowner/HomeownerConfigurator").then((m) => ({
    default: m.HomeownerConfigurator,
  })),
);
const EnergyFlowDiagram = lazy(() => import("@/components/EnergyFlowDiagram"));

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <Layout className="-mt-16">
      {/* ════════════════════════════════════════════
          1 — HERO
          One image, one headline, one button.
          ════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[100svh] bg-charcoal overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Full-bleed product photo */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={nessHeroProduct}
            alt="NESS home battery in a modern Indian home"
            className="w-full h-full object-cover object-center"
            loading="eager"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          {/* Two gradients — left wash for legibility, bottom for footer breathing */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 via-45% to-charcoal/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        </div>

        {/* Hero content — single step, no scroll-link */}
        <div className="relative z-10 min-h-[100svh] flex items-center max-w-[1600px] mx-auto px-6 sm:px-12 md:px-20 py-24 sm:py-0">
          <div className="max-w-3xl space-y-8 sm:space-y-10">
            <h1
              id="hero-heading"
              className={cn(
                "font-display text-5xl sm:text-7xl md:text-8xl xl:text-[7rem] font-bold leading-[0.95] tracking-[-0.03em] text-pearl",
                isVisible
                  ? "transition-all duration-1000 ease-out opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
            >
              Your home,
              <br />
              <span className="text-gradient-energy">on sunlight.</span>
            </h1>

            <p
              className={cn(
                "font-display text-xl sm:text-2xl md:text-3xl font-light leading-[1.35] tracking-[-0.015em] text-pearl/65 max-w-2xl",
                isVisible
                  ? "transition-all duration-1000 ease-out delay-200 opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
            >
              ₹47,000 saved a year.
              <br />
              10-year warranty. Installed in 4 hours.
            </p>

            <div
              className={cn(
                "pt-2 sm:pt-4",
                isVisible
                  ? "transition-all duration-1000 ease-out delay-400 opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
            >
              <Link to="/homeowners" className="inline-block group">
                <Button
                  size="lg"
                  className="interactive font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-10 sm:px-12 py-5 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,230,118,0.35)] hover:scale-105 active:scale-95"
                >
                  <span className="flex items-center">
                    Configure yours
                    <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2 — CONFIGURATOR
          The demo. The strongest conversion tool on the
          site, finally in second place where it belongs.
          ════════════════════════════════════════════ */}
      <Suspense
        fallback={
          <div className="py-24 bg-charcoal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 animate-pulse space-y-4">
              <div className="h-10 bg-pearl/10 rounded w-1/2 mx-auto" />
              <div className="h-6 bg-pearl/10 rounded w-3/4 mx-auto" />
            </div>
          </div>
        }
      >
        <HomeownerConfigurator />
      </Suspense>

      {/* ════════════════════════════════════════════
          3 — HOW IT WORKS
          Solar → battery → home. One animated diagram.
          The entire technical pitch.
          ════════════════════════════════════════════ */}
      <Suspense fallback={<div className="h-64 bg-charcoal" />}>
        <EnergyFlowDiagram />
      </Suspense>

      {/* ════════════════════════════════════════════
          4 — ONE TESTIMONIAL
          Full-bleed. Quiet. The customer's own words.
          ════════════════════════════════════════════ */}
      <section
        className="bg-charcoal py-24 sm:py-32 md:py-40 overflow-hidden"
        aria-label="Customer testimonial"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <SmoothFade>
            <Quote
              className="w-12 h-12 text-energy/30 mx-auto mb-10 sm:mb-12"
              aria-hidden="true"
            />
            <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-light text-pearl leading-[1.35] tracking-[-0.015em]">
              “What made me choose NESS was the silence. My generator used to
              wake the neighbourhood. Now nobody even knows when the power goes
              out.”
            </blockquote>
            <div className="mt-10 sm:mt-12">
              <p className="text-pearl text-lg sm:text-xl font-medium">
                Rajesh Malhotra
              </p>
              <p className="text-pearl/40 text-sm sm:text-base font-light mt-1">
                Villa owner · Bangalore · 18 months on NESS
              </p>
            </div>
          </SmoothFade>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5 — FINAL CTA
          One ask. One verb. One destination.
          ════════════════════════════════════════════ */}
      <section
        className="relative py-28 sm:py-36 md:py-44 bg-charcoal overflow-hidden"
        aria-label="Call to action"
      >
        <GradientOrbField variant="intense" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10 sm:space-y-12">
          <SmoothFade>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pearl tracking-[-0.03em] leading-[1.05]">
              Stop paying
              <br />
              <span className="text-gradient-energy">peak tariffs.</span>
            </h2>
          </SmoothFade>
          <SmoothFade delay={150}>
            <p className="text-lg sm:text-xl md:text-2xl text-pearl/40 font-light max-w-2xl mx-auto leading-relaxed">
              500 Indian families already did.
              <span className="block mt-2 text-pearl/55">
                You're one quote away.
              </span>
            </p>
          </SmoothFade>
          <SmoothFade delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/contact/homeowner">
                <Button
                  size="lg"
                  className="interactive font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-12 sm:px-14 py-6 sm:py-7 text-lg sm:text-xl rounded-full transition-all duration-300 shadow-[0_20px_60px_rgba(0,230,118,0.25)] hover:shadow-[0_25px_80px_rgba(0,230,118,0.4)] hover:scale-105 active:scale-95"
                >
                  Get a Quote
                  <ArrowRight
                    className="ml-3 w-5 h-5 sm:w-6 sm:h-6"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </div>
          </SmoothFade>
        </div>
      </section>
    </Layout>
  );
};

export default memo(Index);
