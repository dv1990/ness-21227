import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { WebPImage } from "@/components/ui/webp-image";
import { ArrowRight, Sun, Battery, TrendingDown, Zap, Wrench } from "lucide-react";
import nessHeroProduct from "@/assets/ness-hero-product.webp";
import nessProProduct from "@/assets-webp/ness-pro-product.webp";

// Lazy load SystemConfigurator only when needed
const SystemConfigurator = lazy(() => import("@/components/SystemConfigurator"));

type ProductSelection = 'aio-series' | 'standalone-battery' | null;

export const HomeownerConfigurator = () => {
  const [step, setStep] = useState<'intro' | 'selector' | 'product' | 'summary'>('intro');
  const [selectedProduct, setSelectedProduct] = useState<ProductSelection>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleProductSelect = (product: ProductSelection) => {
    setIsTransitioning(true);
    setSelectedProduct(product);
    setTimeout(() => {
      setStep('product');
      setIsTransitioning(false);
    }, 600);
  };

  const handleBackToSelector = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep('selector');
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackToProduct = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep('product');
      setIsTransitioning(false);
    }, 300);
  };

  const getProductForSelection = () => {
    switch (selectedProduct) {
      case 'aio-series':
        return {
          name: 'NESS AIO Series',
          tagline: 'Your energy buddy for life.',
          description: 'One system. Solar inverter, battery, and intelligent energy management \u2014 all working in harmony. No extra boxes, no complexity. Just silent, reliable power that grows with your family.',
          image: nessHeroProduct,
          badge: 'Everything you need. Nothing you don\u2019t.',
          highlights: [
            { icon: <TrendingDown className="w-5 h-5" />, label: 'Bill Reduction', value: 'Up to 80%' },
            { icon: <Zap className="w-5 h-5" />, label: 'Backup', value: '24\u201348 hours' },
            { icon: <Wrench className="w-5 h-5" />, label: 'Installation', value: 'Same day' },
          ],
        };
      case 'standalone-battery':
        return {
          name: 'NESS Standalone Battery',
          tagline: "Your inverter's missing piece.",
          description: 'You already invested in solar. Now make it work when it matters most. Pure LFP modules \u2014 modular, stackable, built to last 6000+ cycles. Start with one unit, scale to whole-home coverage.',
          image: nessProProduct,
          badge: 'Pairs with any inverter. Scales to any need.',
          highlights: [
            { icon: <Battery className="w-5 h-5" />, label: 'Capacity', value: '5\u201380 kWh' },
            { icon: <Zap className="w-5 h-5" />, label: 'Compatibility', value: 'Universal' },
            { icon: <Wrench className="w-5 h-5" />, label: 'Installation', value: 'Under 3 hours' },
          ],
        };
      default:
        return null;
    }
  };

  return (
    <section
      id="configurator"
      className="py-20 md:py-32 relative overflow-hidden"
      aria-labelledby="configurator-heading"
    >
      {/* Premium Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>

      <div className="relative min-h-screen bg-gradient-to-b from-background/50 via-background/80 to-background">
        <AnimatePresence mode="wait">
          {/* STEP 0: Opening Scene */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="min-h-screen flex items-center justify-center px-6"
            >
              <div className="text-center space-y-12 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="relative w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full animate-pulse blur-sm"></div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg sm:text-xl text-muted-foreground/60 font-light">
                      Not sure which system is right for you?
                    </p>
                    <h2
                      id="configurator-heading"
                      className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-[-0.03em] text-foreground leading-[0.95]"
                    >
                      Which NESS is right for you?
                    </h2>
                  </div>
                  <p className="text-xl sm:text-2xl text-muted-foreground/70 font-light max-w-3xl mx-auto leading-relaxed">
                    Choose your system, tell us about your home, and we'll design the perfect configuration in under a minute.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Button
                    size="lg"
                    onClick={() => setStep('selector')}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-7 rounded-full text-lg font-medium shadow-[0_0_40px_rgba(0,200,83,0.3)] hover:shadow-[0_0_60px_rgba(0,200,83,0.5)] transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Begin the product selection process"
                  >
                    Show Me
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Product Selector — 2 Cards */}
          {step === 'selector' && (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen py-20 px-6"
            >
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-20 space-y-6"
                >
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,200,83,0.6)]"></div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Step 1 of 3</p>
                  </div>
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight text-foreground tracking-[-0.02em] leading-[1.1]">
                    Choose Your System
                  </h2>
                  <p className="text-xl sm:text-2xl text-muted-foreground/70 font-light max-w-2xl mx-auto leading-relaxed">
                    Two paths to energy independence
                  </p>
                </motion.div>

                {isTransitioning && (
                  <div className="flex justify-center mb-12">
                    <div className="relative">
                      <div className="w-12 h-12 border-2 border-primary/20 rounded-full"></div>
                      <div className="absolute inset-0 w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
                  {/* Card 1: AIO Series */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.03, y: -12 }}
                    onClick={() => handleProductSelect('aio-series')}
                    onKeyDown={(e) => e.key === 'Enter' && handleProductSelect('aio-series')}
                    tabIndex={0}
                    role="button"
                    aria-label="Select NESS AIO Series — the complete integrated energy system"
                    className="group cursor-pointer relative bg-gradient-to-br from-card/90 via-card/95 to-card/90 backdrop-blur-xl rounded-[2rem] p-10 border border-border/40 hover:border-amber-500/40 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:ring-offset-2 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(251,146,60,0.15)]"
                  >
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative space-y-8">
                      <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_24px_rgba(251,146,60,0.12)] group-hover:shadow-[0_12px_32px_rgba(251,146,60,0.25)]">
                        <Sun className="w-9 h-9 text-amber-500 drop-shadow-[0_2px_8px_rgba(251,146,60,0.3)]" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-light text-foreground tracking-tight">AIO Series</h3>
                        <p className="text-base font-medium text-amber-500/80">The complete system</p>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed font-light">
                          Going solar? Want everything in one elegant unit? Inverter, battery, and intelligence — designed to work together from day one. Your energy buddy for life.
                        </p>
                      </div>
                      <div className="inline-block px-3 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Perfect for new solar + complete independence</p>
                      </div>
                      <div className="pt-2 flex items-center gap-2 text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2: Standalone Battery */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    whileHover={{ scale: 1.03, y: -12 }}
                    onClick={() => handleProductSelect('standalone-battery')}
                    onKeyDown={(e) => e.key === 'Enter' && handleProductSelect('standalone-battery')}
                    tabIndex={0}
                    role="button"
                    aria-label="Select NESS Standalone Battery — modular battery modules for existing inverters"
                    className="group cursor-pointer relative bg-gradient-to-br from-card/90 via-card/95 to-card/90 backdrop-blur-xl rounded-[2rem] p-10 border border-border/40 hover:border-blue-500/40 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]"
                  >
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative space-y-8">
                      <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_24px_rgba(59,130,246,0.12)] group-hover:shadow-[0_12px_32px_rgba(59,130,246,0.25)]">
                        <Battery className="w-9 h-9 text-blue-500 drop-shadow-[0_2px_8px_rgba(59,130,246,0.3)]" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-light text-foreground tracking-tight">Standalone Battery</h3>
                        <p className="text-base font-medium text-blue-500/80">The modular powerhouse</p>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed font-light">
                          Already have an inverter? Our pure LFP battery modules pair with Victron, Solis, Studer, Deye, and more. Start with one. Stack to 80 kWh. Your inverter's missing piece.
                        </p>
                      </div>
                      <div className="inline-block px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Perfect for existing inverter + retrofit + expansion</p>
                      </div>
                      <div className="pt-2 flex items-center gap-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Product Revelation */}
          {step === 'product' && selectedProduct && (
            <motion.div
              key="product"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen py-20 px-6 flex items-center"
            >
              <div className="max-w-6xl mx-auto w-full">
                {(() => {
                  const product = getProductForSelection();
                  if (!product) return null;
                  return (
                    <div className="space-y-16">
                      {/* Back Button */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-start"
                      >
                        <button
                          onClick={handleBackToSelector}
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                          aria-label="Go back to product selection"
                        >
                          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                          <span className="text-sm">Back to options</span>
                        </button>
                      </motion.div>

                      {/* Product Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="max-w-2xl mx-auto"
                      >
                        <WebPImage
                          src={product.image}
                          alt={product.name}
                          className="w-full drop-shadow-2xl"
                          priority={false}
                        />
                      </motion.div>

                      {/* Product Details */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-center space-y-8"
                      >
                        <div className="space-y-4">
                          <h2 className="text-5xl sm:text-6xl md:text-7xl font-light text-foreground tracking-tight">
                            {product.name}
                          </h2>
                          <p className="text-2xl sm:text-3xl text-primary font-light">
                            {product.tagline}
                          </p>
                          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="inline-block bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20">
                          <p className="text-sm text-primary font-medium">{product.badge}</p>
                        </div>

                        {/* Highlights Row */}
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center items-center pt-4">
                          {product.highlights.map((h) => (
                            <div key={h.label} className="text-center space-y-2">
                              <div className="flex items-center justify-center gap-2 text-primary">
                                {h.icon}
                                <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{h.label}</span>
                              </div>
                              <p className="text-2xl font-light text-foreground">{h.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                          <Button
                            size="lg"
                            onClick={() => setStep('summary')}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 rounded-full text-lg font-medium shadow-[0_0_40px_rgba(0,200,83,0.3)] hover:shadow-[0_0_60px_rgba(0,200,83,0.5)] transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            Size My System
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={handleBackToSelector}
                            className="border-2 border-border/50 hover:border-primary/50 px-10 py-6 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            View Other Option
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}

          {/* STEP 3: System Configurator */}
          {step === 'summary' && selectedProduct && (
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="py-12 px-6"
            >
              <div className="max-w-7xl mx-auto w-full">
                <div className="space-y-8">
                  {/* Back Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-start"
                  >
                    <button
                      onClick={handleBackToProduct}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                      aria-label="Go back to product details"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                      <span className="text-sm">Back to Product</span>
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4 mb-8"
                  >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-md">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,200,83,0.6)]"></div>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Step 3 of 3 &bull; Size Your System</p>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground tracking-[-0.02em]">
                      Let's size it for your life
                    </h2>
                    <p className="text-xl text-muted-foreground/70 font-light max-w-3xl mx-auto">
                      A few details about your home. In under a minute, we'll recommend the perfect configuration.
                    </p>
                  </motion.div>

                  {/* System Configurator - Lazy loaded with Suspense */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-background rounded-3xl overflow-hidden"
                  >
                    <div className="[&>div]:min-h-0 [&>div]:bg-transparent">
                      <Suspense fallback={
                        <div className="min-h-[500px] flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-sm text-muted-foreground">Loading configurator...</p>
                          </div>
                        </div>
                      }>
                        <SystemConfigurator />
                      </Suspense>
                    </div>
                  </motion.div>

                  {/* Bottom Actions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center pt-8"
                  >
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setStep('intro');
                      }}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                    >
                      Start over with different product
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
