import React, { useState } from 'react';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Circle, Square } from "lucide-react";

const NessAcSync = () => {
  const [packs, setPacks] = useState(1);

  const packData = {
    1: { runtime: "3h", use: "Lights, Wi-Fi, fridge", capacity: "5 kWh", power: "3.3 kW" },
    2: { runtime: "6h", use: "Full home essentials", capacity: "10 kWh", power: "6.6 kW" },
    3: { runtime: "9h+", use: "Large homes + EV charging", capacity: "15 kWh", power: "9.9 kW" }
  };

  return (
    <Layout>
      {/* 1. HERO - The Promise */}
      <section className="min-h-[80vh] sm:min-h-screen bg-[#0B1220] text-white px-6 sm:px-8 relative overflow-hidden flex items-center justify-center py-12 sm:py-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220] via-[#0B1220]/95 to-[#0B1220]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 py-12 sm:py-20 text-center">
          <div className="space-y-8 sm:space-y-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[1.05] tracking-tight font-light">
              Power That Scales<br />With You.
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/70 font-light leading-relaxed max-w-4xl mx-auto">
              A modular battery with a built-in inverter.<br />
              Add one. Or two. Or more.<br />
              Plug in and grow your power, your way.
            </p>

            {/* Product Visual - Abstract */}
            <div className="pt-12 pb-8">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C853]/20 to-transparent rounded-full blur-3xl"></div>
                <div className="relative aspect-square flex items-center justify-center">
                  {/* Abstract modular representation */}
                  <div className="grid grid-cols-3 gap-3 p-8">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={`battery-cell-visual-${i}`} 
                        className="w-16 h-20 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/20"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xl text-white/60 font-light">
              5 kWh per pack. 3.3 kW built in. Infinite calm.
            </p>

            <div className="pt-6 sm:pt-8">
              <Button 
                size="lg"
                className="bg-[#00C853] hover:bg-[#00C853]/90 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-7 rounded-full text-base sm:text-lg font-medium shadow-lg shadow-[#00C853]/20"
                onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Configure Your System
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE OPPORTUNITY - Your Solar Could Do More */}
      <section className="py-16 sm:py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-500/5 to-amber-600/5 rounded-3xl overflow-hidden border border-amber-500/10">
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="text-center space-y-6">
                  {/* Abstract solar representation */}
                  <div className="relative w-32 h-32 mx-auto">
                    <Circle className="w-32 h-32 text-amber-500/30 absolute" />
                    <Circle className="w-20 h-20 text-amber-500/50 absolute top-6 left-6" />
                    <Circle className="w-8 h-8 text-amber-500 absolute top-12 left-12" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight font-light text-foreground">
                Your solar creates<br />power all day.
              </h2>
              
              <p className="text-xl text-foreground leading-relaxed">
                NESS AC SYNC lets you <span className="text-primary font-medium">keep it</span> for the evening.
              </p>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Plug-and-play battery that captures your extra energy. No rewiring. No upgrades. Just more independence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS - The Rhythm */}
      <section className="py-32 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <div className="space-y-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight font-light text-foreground">
              Solar by day. NESS by night.<br />
              <span className="text-primary">The rhythm of independence.</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative">
              {/* Elegant connecting line */}
              <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              
              {[
                { label: "Solar creates", sublabel: "power" },
                { label: "NESS detects", sublabel: "surplus" },
                { label: "NESS stores", sublabel: "energy" },
                { label: "Powers your", sublabel: "home" }
              ].map((step, idx) => (
                <div key={idx} className="space-y-6 relative z-10">
                  {/* Abstract minimal representation */}
                  <div className="w-20 h-20 mx-auto rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center">
                    <div className="text-2xl font-light text-primary">{idx + 1}</div>
                  </div>
                  <div className="text-center">
                    <p className="text-base text-foreground font-light">{step.label}</p>
                    <p className="text-base text-muted-foreground font-light">{step.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto pt-8">
              No manual switching. No thinking. Just continuous, quiet power.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE PRODUCT - Modularity + Simplicity */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Modularity */}
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-light mb-8">Every pack has its own inverter.</h2>
            <p className="text-2xl text-muted-foreground font-light">Works alone. Works together. Syncs automatically.</p>
          </div>

          {/* Pack Visualization - Abstract & Elegant */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[1, 2, 3].map((num) => (
              <div key={num} className="space-y-6 animate-fade-in" style={{ animationDelay: `${num * 0.15}s` }}>
                <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-12 border border-border/30 hover:border-primary/20 hover:shadow-lg transition-all duration-500 group">
                  {/* Abstract modular units */}
                  <div className="flex gap-2 justify-center">
                    {[...Array(num)].map((_, i) => (
                      <div 
                        key={`module-unit-${num}-${i}`}
                        className="w-12 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 group-hover:border-primary/40 transition-all"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-3xl font-light text-center text-foreground">{num * 5} kWh</p>
              </div>
            ))}
          </div>

          {/* Simplicity - Minimal Abstract Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            <div className="aspect-square bg-gradient-to-br from-muted/10 to-muted/5 rounded-3xl border border-border/20 overflow-hidden flex items-center justify-center p-12">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Abstract connection visualization */}
                <div className="relative">
                  <Square className="w-32 h-32 text-primary/30" />
                  <Square className="w-32 h-32 text-primary/20 absolute top-4 left-4" />
                  <Square className="w-32 h-32 text-primary/40 absolute -top-4 -left-4" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl leading-tight tracking-tight font-light text-foreground">
                No rewiring.<br />
                No upgrades.<br />
                No hassle.
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">Mount it. Plug it in. Watch it sync.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">Each pack brings its own inverter.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">Instant backup. &lt;10 ms transfer time.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">LiFePO₄ chemistry. 15-year warranty.</p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground italic pt-6">
                "Freedom shouldn't need a manual."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONFIGURATOR - Your Perfect Size */}
      <section id="configurator" className="py-32 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight font-light text-center mb-16">
            How much power<br />fits your life?
          </h2>

          <div className="bg-card rounded-3xl p-12 border border-border/50 shadow-xl">
            <div className="space-y-12">
              {/* Slider */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-muted-foreground">Number of Packs</span>
                  <span className="text-4xl font-light text-primary">{packs}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={packs}
                  onChange={(e) => setPacks(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
              </div>

              {/* Results */}
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Capacity</p>
                  <p className="text-3xl font-light">{packData[packs as keyof typeof packData].capacity}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Runtime</p>
                  <p className="text-3xl font-light">{packData[packs as keyof typeof packData].runtime}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Power</p>
                  <p className="text-3xl font-light">{packData[packs as keyof typeof packData].power}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <p className="text-center text-muted-foreground mb-6">
                  Ideal for: {packData[packs as keyof typeof packData].use}
                </p>
                <Button 
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-7 rounded-full text-lg font-medium"
                  onClick={() => window.location.href = '/contact/homeowner'}
                >
                  Build My System
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Specs Footer - Subtle */}
          <div className="mt-16 text-center">
            <details className="text-sm text-muted-foreground">
              <summary className="cursor-pointer hover:text-foreground transition-colors">Technical Specifications</summary>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-3 text-left mt-8 max-w-3xl mx-auto">
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span>Capacity</span>
                  <span className="font-medium">5 kWh per pack</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span>Inverter</span>
                  <span className="font-medium">3.3 kW per pack</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span>Expandability</span>
                  <span className="font-medium">Up to 3 packs</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span>Chemistry</span>
                  <span className="font-medium">LiFePO₄</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span>Efficiency</span>
                  <span className="font-medium">&gt; 90%</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span>Backup Transfer</span>
                  <span className="font-medium">&lt; 10 ms</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span>Mounting</span>
                  <span className="font-medium">Indoor / Outdoor (IP65)</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span>Warranty</span>
                  <span className="font-medium">15 Years / 10,000 Cycles</span>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA - One Clear Path */}
      <section className="py-32 bg-[#0B1220] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00C853]/10 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-5xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight font-light">
              Start with one.<br />
              <span className="text-[#00C853]">Grow forever.</span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
              NESS AC SYNC — Power that evolves with you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                size="lg"
                className="bg-[#00C853] hover:bg-[#00C853]/90 text-white px-12 py-7 rounded-full text-lg font-medium shadow-lg shadow-[#00C853]/20"
                onClick={() => window.location.href = '/contact/homeowner'}
              >
                Configure My System
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-12 py-7 rounded-full text-lg font-medium"
                onClick={() => window.location.href = '/find-installer'}
              >
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default React.memo(NessAcSync);
