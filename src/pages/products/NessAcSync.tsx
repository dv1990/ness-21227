import React, { useState } from 'react';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Circle, Square } from "lucide-react";
import { GradientOrbField } from "@/components/ui/gradient-orb";
import { SmoothFade, StaggerReveal } from "@/components/ui/smooth-animations";

const NessAcSync = () => {
  const [packs, setPacks] = useState(1);

  const packData = {
    1: { runtime: "3h", use: "Lights, Wi-Fi, fridge", capacity: "5 kWh", power: "3.3 kW" },
    2: { runtime: "6h", use: "Full home essentials", capacity: "10 kWh", power: "6.6 kW" },
    3: { runtime: "9h+", use: "Large homes + EV charging", capacity: "15 kWh", power: "9.9 kW" }
  };

  return (
    <Layout className="-mt-16">
      {/* 1. HERO - The Promise */}
      <section className="min-h-[80vh] sm:min-h-screen bg-charcoal text-pearl px-6 sm:px-8 relative overflow-hidden flex items-center justify-center py-12 sm:py-0">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal"></div>
        <GradientOrbField variant="warm" />

        <div className="max-w-6xl mx-auto relative z-10 py-12 sm:py-20 text-center">
          <div className="space-y-8 sm:space-y-12">
            <SmoothFade>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[1.05] tracking-tight font-bold">
                Power That Scales<br />With You.
              </h1>
            </SmoothFade>

            <SmoothFade delay={150}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-pearl/50 font-light leading-relaxed max-w-4xl mx-auto">
                A modular battery with a built-in inverter.<br />
                Add one. Or two. Or more.<br />
                Plug in and grow your power, your way.
              </p>
            </SmoothFade>

            {/* Product Visual - Abstract */}
            <SmoothFade delay={300}>
              <div className="pt-12 pb-8">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-energy/20 to-transparent rounded-full blur-3xl"></div>
                  <div className="relative aspect-square flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-3 p-8">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={`battery-cell-visual-${i}`}
                          className="w-16 h-20 rounded-lg bg-gradient-to-br from-energy/20 to-energy/5 border border-energy/20"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SmoothFade>

            <SmoothFade delay={400}>
              <p className="text-xl text-pearl/40 font-light">
                5 kWh per pack. 3.3 kW built in. Infinite calm.
              </p>
            </SmoothFade>

            <SmoothFade delay={500}>
              <div className="pt-6 sm:pt-8">
                <Button
                  size="lg"
                  className="font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-7 rounded-full text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95"
                  onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Configure Your System
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </SmoothFade>
          </div>
        </div>
      </section>

      {/* 2. THE OPPORTUNITY - Your Solar Could Do More */}
      <section className="py-16 sm:py-24 md:py-32 bg-charcoal relative overflow-hidden">
        <GradientOrbField variant="standard" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
            <SmoothFade>
              <div className="aspect-[4/3] bg-gradient-to-br from-energy/5 to-energy/10 rounded-3xl overflow-hidden border border-energy/10">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="text-center space-y-6">
                    <div className="relative w-32 h-32 mx-auto">
                      <Circle className="w-32 h-32 text-energy/30 absolute" />
                      <Circle className="w-20 h-20 text-energy/50 absolute top-6 left-6" />
                      <Circle className="w-8 h-8 text-energy absolute top-12 left-12" />
                    </div>
                  </div>
                </div>
              </div>
            </SmoothFade>

            <SmoothFade delay={200}>
              <div className="space-y-8">
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight font-bold text-pearl">
                  Your solar creates<br />power all day.
                </h2>

                <p className="text-xl text-pearl/60 leading-relaxed">
                  NESS AC SYNC lets you <span className="text-energy font-medium">keep it</span> for the evening.
                </p>

                <p className="text-xl text-pearl/40 leading-relaxed font-light">
                  Plug-and-play battery that captures your extra energy. No rewiring. No upgrades. Just more independence.
                </p>
              </div>
            </SmoothFade>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS - The Rhythm */}
      <section className="py-32 bg-charcoal relative overflow-hidden">
        <GradientOrbField variant="warm" />
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <div className="space-y-16">
            <SmoothFade>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight font-bold text-pearl">
                Solar by day. NESS by night.<br />
                <span className="text-gradient-energy">The rhythm of independence.</span>
              </h2>
            </SmoothFade>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-pearl/10 to-transparent"></div>

              <StaggerReveal stagger={120}>
                {[
                  { label: "Solar creates", sublabel: "power" },
                  { label: "NESS detects", sublabel: "surplus" },
                  { label: "NESS stores", sublabel: "energy" },
                  { label: "Powers your", sublabel: "home" }
                ].map((step, idx) => (
                  <div key={idx} className="space-y-6 relative z-10">
                    <div className="w-20 h-20 mx-auto rounded-full border border-energy/20 bg-energy/5 flex items-center justify-center">
                      <div className="text-2xl font-light text-energy">{idx + 1}</div>
                    </div>
                    <div className="text-center">
                      <p className="text-base text-pearl font-light">{step.label}</p>
                      <p className="text-base text-pearl/40 font-light">{step.sublabel}</p>
                    </div>
                  </div>
                ))}
              </StaggerReveal>
            </div>

            <SmoothFade delay={200}>
              <p className="text-xl text-pearl/40 font-light max-w-2xl mx-auto pt-8">
                No manual switching. No thinking. Just continuous, quiet power.
              </p>
            </SmoothFade>
          </div>
        </div>
      </section>

      {/* 4. THE PRODUCT - Modularity + Simplicity */}
      <section className="py-32 bg-graphite relative overflow-hidden">
        <GradientOrbField variant="standard" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

          {/* Modularity */}
          <SmoothFade>
            <div className="text-center mb-20">
              <h2 className="font-display text-5xl sm:text-6xl font-bold text-pearl mb-8">Every pack has its own inverter.</h2>
              <p className="text-2xl text-pearl/40 font-light">Works alone. Works together. Syncs automatically.</p>
            </div>
          </SmoothFade>

          {/* Pack Visualization - Abstract & Elegant */}
          <StaggerReveal stagger={150} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[1, 2, 3].map((num) => (
              <div key={num} className="space-y-6">
                <div className="bg-pearl/[0.03] backdrop-blur-sm rounded-2xl p-12 border border-pearl/10 hover:border-energy/20 hover:bg-pearl/[0.06] transition-all duration-500 group">
                  <div className="flex gap-2 justify-center">
                    {[...Array(num)].map((_, i) => (
                      <div
                        key={`module-unit-${num}-${i}`}
                        className="w-12 h-16 rounded-lg bg-gradient-to-br from-energy/10 to-energy/5 border border-energy/20 group-hover:border-energy/40 transition-all"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-3xl font-light text-center text-pearl">{num * 5} kWh</p>
              </div>
            ))}
          </StaggerReveal>

          {/* Simplicity - Minimal Abstract Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            <SmoothFade>
              <div className="aspect-square bg-gradient-to-br from-pearl/[0.03] to-pearl/[0.01] rounded-3xl border border-pearl/10 overflow-hidden flex items-center justify-center p-12">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative">
                    <Square className="w-32 h-32 text-energy/30" />
                    <Square className="w-32 h-32 text-energy/20 absolute top-4 left-4" />
                    <Square className="w-32 h-32 text-energy/40 absolute -top-4 -left-4" />
                  </div>
                </div>
              </div>
            </SmoothFade>

            <SmoothFade delay={200}>
              <div className="space-y-8">
                <h2 className="font-display text-4xl sm:text-5xl leading-tight tracking-tight font-bold text-pearl">
                  No rewiring.<br />
                  No upgrades.<br />
                  No hassle.
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-energy mt-2 flex-shrink-0" />
                    <p className="text-lg text-pearl/50">Mount it. Plug it in. Watch it sync.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-energy mt-2 flex-shrink-0" />
                    <p className="text-lg text-pearl/50">Each pack brings its own inverter.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-energy mt-2 flex-shrink-0" />
                    <p className="text-lg text-pearl/50">Instant backup. &lt;10 ms transfer time.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-energy mt-2 flex-shrink-0" />
                    <p className="text-lg text-pearl/50">LiFePO₄ chemistry. 15-year warranty.</p>
                  </div>
                </div>

                <p className="text-lg text-pearl/30 italic pt-6">
                  "Freedom shouldn't need a manual."
                </p>
              </div>
            </SmoothFade>
          </div>
        </div>
      </section>

      {/* 5. CONFIGURATOR - Your Perfect Size */}
      <section id="configurator" className="py-32 bg-charcoal relative overflow-hidden">
        <GradientOrbField variant="intense" />
        <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
          <SmoothFade>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight font-bold text-pearl text-center mb-16">
              How much power<br />fits your life?
            </h2>
          </SmoothFade>

          <SmoothFade delay={100}>
            <div className="bg-pearl/[0.03] rounded-3xl p-12 border border-pearl/10">
              <div className="space-y-12">
                {/* Slider */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-pearl/50">Number of Packs</span>
                    <span className="text-4xl font-light text-energy">{packs}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={packs}
                    onChange={(e) => setPacks(Number(e.target.value))}
                    className="w-full h-2 bg-pearl/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-energy"
                  />
                </div>

                {/* Results */}
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <p className="text-sm text-pearl/40 uppercase tracking-wider">Total Capacity</p>
                    <p className="text-3xl font-light text-pearl">{packData[packs as keyof typeof packData].capacity}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-pearl/40 uppercase tracking-wider">Runtime</p>
                    <p className="text-3xl font-light text-pearl">{packData[packs as keyof typeof packData].runtime}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-pearl/40 uppercase tracking-wider">Total Power</p>
                    <p className="text-3xl font-light text-pearl">{packData[packs as keyof typeof packData].power}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-pearl/10">
                  <p className="text-center text-pearl/40 mb-6">
                    Ideal for: {packData[packs as keyof typeof packData].use}
                  </p>
                  <Button
                    size="lg"
                    className="w-full font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold py-7 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.location.href = '/contact/homeowner'}
                  >
                    Build My System
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </SmoothFade>

          {/* Specs Footer - Subtle */}
          <SmoothFade delay={200}>
            <div className="mt-16 text-center">
              <details className="text-sm text-pearl/40">
                <summary className="cursor-pointer hover:text-pearl transition-colors">Technical Specifications</summary>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-3 text-left mt-8 max-w-3xl mx-auto">
                  <div className="flex justify-between border-b border-pearl/10 pb-2">
                    <span>Capacity</span>
                    <span className="font-medium text-pearl">5 kWh per pack</span>
                  </div>
                  <div className="flex justify-between border-b border-pearl/10 pb-2">
                    <span>Inverter</span>
                    <span className="font-medium text-pearl">3.3 kW per pack</span>
                  </div>
                  <div className="flex justify-between border-b border-pearl/10 pb-2">
                    <span>Expandability</span>
                    <span className="font-medium text-pearl">Up to 3 packs</span>
                  </div>
                  <div className="flex justify-between border-b border-pearl/10 pb-2">
                    <span>Chemistry</span>
                    <span className="font-medium text-pearl">LiFePO₄</span>
                  </div>
                  <div className="flex justify-between border-b border-pearl/10 pb-2">
                    <span>Efficiency</span>
                    <span className="font-medium text-pearl">&gt; 90%</span>
                  </div>
                  <div className="flex justify-between border-b border-pearl/10 pb-2">
                    <span>Backup Transfer</span>
                    <span className="font-medium text-pearl">&lt; 10 ms</span>
                  </div>
                  <div className="flex justify-between border-b border-pearl/10 pb-2">
                    <span>Mounting</span>
                    <span className="font-medium text-pearl">Indoor / Outdoor (IP65)</span>
                  </div>
                  <div className="flex justify-between border-b border-pearl/10 pb-2">
                    <span>Warranty</span>
                    <span className="font-medium text-pearl">15 Years / 10,000 Cycles</span>
                  </div>
                </div>
              </details>
            </div>
          </SmoothFade>
        </div>
      </section>

      {/* 6. FINAL CTA - One Clear Path */}
      <section className="py-32 bg-charcoal text-pearl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-energy/10 to-transparent"></div>
        <GradientOrbField variant="intense" />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <SmoothFade>
            <div className="space-y-8">
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight font-bold">
                Start with one.<br />
                <span className="text-gradient-energy">Grow forever.</span>
              </h2>

              <p className="text-xl sm:text-2xl text-pearl/40 font-light leading-relaxed max-w-2xl mx-auto">
                NESS AC SYNC — Power that evolves with you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button
                  size="lg"
                  className="font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-12 py-7 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95"
                  onClick={() => window.location.href = '/contact/homeowner'}
                >
                  Configure My System
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="font-display border-pearl/20 text-pearl hover:bg-pearl/10 hover:border-pearl/40 px-12 py-7 rounded-full text-lg transition-all duration-300"
                  onClick={() => window.location.href = '/find-installer'}
                >
                  Talk to an Expert
                </Button>
              </div>
            </div>
          </SmoothFade>
        </div>
      </section>
    </Layout>
  );
};

export default React.memo(NessAcSync);
