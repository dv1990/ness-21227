import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, 
  Users, 
  Target, 
  Globe,
  Heart,
  Microscope,
  Shield,
  Binary,
  FlaskConical,
  Cpu
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout className="-mt-16">
      {/* Hero Section - Premium Deep Tech */}
      <section className="relative min-h-screen flex items-center bg-pearl overflow-hidden">
        
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/5 to-transparent">
          {/* Placeholder: hero image — warm family moment in sunlit home with NESS battery */}
        </div>
        
        {/* Subtle tech pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10 w-full">
          
          <div className="space-y-12 md:space-y-20 text-center">
            <div className="space-y-8 md:space-y-12">
              <div className="inline-block px-5 py-2 bg-charcoal/5 rounded-full backdrop-blur-sm">
                <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-charcoal/60 font-medium">Made in India • Made with Care</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight text-charcoal leading-[0.95] tracking-tight px-4">
                The Energy
                <br />
                That Cares.
              </h1>
              
              <div className="space-y-6 max-w-4xl mx-auto px-4">
                <p className="text-xl md:text-2xl lg:text-3xl text-charcoal/60 font-light leading-[1.6]">
                  NESS isn't just about electricity — it's about empathy, reliability, and belonging.
                </p>
                <p className="text-lg md:text-xl text-charcoal/40 italic font-light leading-relaxed">
                  Energy that feels human: calm when you need it, strong when you rely on it.
                </p>
              </div>
            </div>

            {/* Engineering stats */}
            <div className="grid grid-cols-2 gap-8 md:gap-16 max-w-2xl mx-auto pt-4 md:pt-8">
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-extralight text-charcoal tabular-nums">
                  <AnimatedCounter value={4} duration={1800} />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-charcoal/50">
                  Years of R&D
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-extralight text-charcoal tabular-nums">
                  <AnimatedCounter value={12} duration={1500} />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-charcoal/50">
                  Quality Checks
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section className="py-20 md:py-32 lg:py-40 bg-whisper">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16 md:mb-24 lg:mb-32 space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-charcoal leading-[1.1] tracking-tight px-4">
              We don't just store energy.
              <br />
              We nurture it.
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-charcoal/60 font-light max-w-3xl mx-auto leading-[1.7] px-4">
              Behind every NESS battery is a team that cares — engineers who see energy as a responsibility, not a commodity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            
            {/* Care for Your Peace of Mind */}
            <AnimatedCard hover="lift" className="bg-pearl border border-platinum/30 rounded-2xl overflow-hidden group">
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-charcoal/5 to-charcoal/10 relative overflow-hidden">
                {/* Placeholder: peaceful Indian home interior with NESS battery integrated */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-16 h-16 text-charcoal/10" />
                </div>
              </div>
              
              <div className="p-8 md:p-10 space-y-5">
                <div className="w-12 h-12 rounded-full bg-whisper flex items-center justify-center">
                  <Heart className="w-6 h-6 text-charcoal" />
                </div>
                <h3 className="text-xl md:text-2xl font-light text-charcoal leading-tight">Care for Homes</h3>
                <p className="text-base md:text-lg text-charcoal/70 leading-[1.7]">
                  From your mother's prayers to your child's online class, NESS quietly keeps life moving. 
                  Every home deserves uninterrupted comfort.
                </p>
                <div className="text-sm text-charcoal/40 pt-3 border-t border-platinum/30 italic">
                  10+ years. Every morning. No worry.
                </div>
              </div>
            </AnimatedCard>

            {/* Care for Partners */}
            <AnimatedCard hover="lift" delay={100} className="bg-pearl border border-platinum/30 rounded-2xl overflow-hidden group">
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-charcoal/5 to-charcoal/10 relative overflow-hidden">
                {/* Placeholder: installer team on rooftop solar installation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-16 h-16 text-charcoal/10" />
                </div>
              </div>
              
              <div className="p-8 md:p-10 space-y-5">
                <div className="w-12 h-12 rounded-full bg-whisper flex items-center justify-center">
                  <Users className="w-6 h-6 text-charcoal" />
                </div>
                <h3 className="text-xl md:text-2xl font-light text-charcoal leading-tight">Care for People Who Power Others</h3>
                <p className="text-base md:text-lg text-charcoal/70 leading-[1.7]">
                  For every EPC partner and installer, NESS means simplicity, reliability, and zero-headache service — 
                  so they can build reputations on trust, not troubleshooting.
                </p>
                <div className="text-sm text-charcoal/40 pt-3 border-t border-platinum/30 italic">
                  Systems that work the first time, every time.
                </div>
              </div>
            </AnimatedCard>

            {/* Care for Planet */}
            <AnimatedCard hover="lift" delay={200} className="bg-pearl border border-platinum/30 rounded-2xl overflow-hidden group">
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-charcoal/5 to-charcoal/10 relative overflow-hidden">
                {/* Placeholder: green landscape with solar panels */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-16 h-16 text-charcoal/10" />
                </div>
              </div>
              
              <div className="p-8 md:p-10 space-y-5">
                <div className="w-12 h-12 rounded-full bg-whisper flex items-center justify-center">
                  <Globe className="w-6 h-6 text-charcoal" />
                </div>
                <h3 className="text-xl md:text-2xl font-light text-charcoal leading-tight">Care for the Planet</h3>
                <p className="text-base md:text-lg text-charcoal/70 leading-[1.7]">
                  Circular by intent, efficient by design — NESS is built for a cleaner, more conscious energy future. 
                  Every installation leaves the world slightly better.
                </p>
                <div className="text-sm text-charcoal/40 pt-3 border-t border-platinum/30 italic">
                  Clean energy. Sustainable choice.
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* R&D & Manufacturing Excellence */}
      <section className="py-20 md:py-32 lg:py-40 bg-charcoal text-pearl relative overflow-hidden">
        
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 opacity-10">
          {/* Placeholder: R&D laboratory background — Bangalore facility */}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            
            <div className="space-y-10 md:space-y-12">
              <div className="space-y-6 md:space-y-8">
                <div className="inline-block px-5 py-2 bg-pearl/10 rounded-full backdrop-blur-sm">
                  <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-pearl/70 font-medium">R&D Center • Bangalore</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-tight">
                  Behind every NESS
                  <br />
                  is a promise.
                </h2>
                
                <p className="text-lg md:text-xl text-pearl/70 font-light leading-[1.7] max-w-xl">
                  Our Bangalore R&D center isn't just about technology — it's where caring meets precision. 
                  Where engineers obsess over reliability so you never have to. 
                  Where we test for 10 years of peace, not just performance specs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 md:gap-8 pt-8">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="w-5 h-5 md:w-6 md:h-6 text-pearl/50" />
                    <div className="text-3xl md:text-4xl font-extralight tabular-nums"><AnimatedCounter value={23} duration={1500} /></div>
                  </div>
                  <div className="text-xs md:text-sm text-pearl/60 uppercase tracking-[0.12em]">
                    PhDs on staff
                  </div>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3">
                    <Binary className="w-5 h-5 md:w-6 md:h-6 text-pearl/50" />
                    <div className="text-3xl md:text-4xl font-extralight tabular-nums"><AnimatedCounter value={847000} duration={2500} />+</div>
                  </div>
                  <div className="text-xs md:text-sm text-pearl/60 uppercase tracking-[0.12em]">
                    Test cycles run
                  </div>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 md:w-6 md:h-6 text-pearl/50" />
                    <div className="text-3xl md:text-4xl font-extralight tabular-nums"><AnimatedCounter value={12} duration={1800} /></div>
                  </div>
                  <div className="text-xs md:text-sm text-pearl/60 uppercase tracking-[0.12em]">
                    AI models deployed
                  </div>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3">
                    <Microscope className="w-5 h-5 md:w-6 md:h-6 text-pearl/50" />
                    <div className="text-3xl md:text-4xl font-extralight tabular-nums">₹<AnimatedCounter value={47} duration={2000} />Cr</div>
                  </div>
                  <div className="text-xs md:text-sm text-pearl/60 uppercase tracking-[0.12em]">
                    Annual R&D spend
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="bg-pearl/5 backdrop-blur-sm border border-pearl/10 rounded-2xl p-6 md:p-8 space-y-5 md:space-y-6">
                <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-pearl/50 font-medium">Manufacturing Quality</div>
                <div className="space-y-5 md:space-y-6">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="text-sm md:text-base text-pearl/70">Cell matching precision</span>
                    <span className="text-xl md:text-2xl font-light tabular-nums text-pearl">±2mV</span>
                  </div>
                  <div className="h-px bg-pearl/10"></div>
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="text-sm md:text-base text-pearl/70">Quality control points</span>
                    <span className="text-xl md:text-2xl font-light tabular-nums text-pearl">2,847</span>
                  </div>
                  <div className="h-px bg-pearl/10"></div>
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="text-sm md:text-base text-pearl/70">Defect rate (6 sigma)</span>
                    <span className="text-xl md:text-2xl font-light tabular-nums text-pearl">{"<"}0.0001%</span>
                  </div>
                  <div className="h-px bg-pearl/10"></div>
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="text-sm md:text-base text-pearl/70">Factory automation</span>
                    <span className="text-xl md:text-2xl font-light tabular-nums text-pearl">94%</span>
                  </div>
                </div>
              </div>

              <div className="bg-pearl/5 backdrop-blur-sm border border-pearl/10 rounded-2xl p-6 md:p-8 space-y-5">
                <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-pearl/50 font-medium">Certifications</div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <span className="px-4 py-2 bg-pearl/10 rounded-full text-xs md:text-sm text-pearl/90">IEC 62619</span>
                  <span className="px-4 py-2 bg-pearl/10 rounded-full text-xs md:text-sm text-pearl/90">CE</span>
                  <span className="px-4 py-2 bg-pearl/10 rounded-full text-xs md:text-sm text-pearl/90">ISO 9001</span>
                  <span className="px-4 py-2 bg-pearl/10 rounded-full text-xs md:text-sm text-pearl/90">UL 1973</span>
                  <span className="px-4 py-2 bg-pearl/10 rounded-full text-xs md:text-sm text-pearl/90">BIS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact - Real World Results */}
      <section className="py-20 md:py-32 lg:py-40 bg-pearl relative overflow-hidden">
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center mb-16 md:mb-24 space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-charcoal leading-[1.1] tracking-tight px-4">
              Real homes. Real comfort.
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-charcoal/60 font-light max-w-3xl mx-auto leading-[1.7] px-4">
              10,000+ families trust NESS to quietly care for their energy. From sunrise to sunset, we're there — invisibly, reliably.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
            <div className="text-center space-y-4 md:space-y-5 p-6 rounded-2xl bg-whisper/50">
              <div className="text-5xl md:text-6xl lg:text-7xl font-extralight text-charcoal tabular-nums">
                <AnimatedCounter value={10} duration={2000} />K+
              </div>
              <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-charcoal/50 font-medium">Systems deployed</div>
              <p className="text-xs md:text-sm text-charcoal/40 leading-relaxed pt-1 italic">
                Every home a testament
              </p>
            </div>
            
            <div className="text-center space-y-4 md:space-y-5 p-6 rounded-2xl bg-whisper/50">
              <div className="text-5xl md:text-6xl lg:text-7xl font-extralight text-charcoal tabular-nums">
                <AnimatedCounter value={100} duration={2000} />+
              </div>
              <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-charcoal/50 font-medium">MWh delivered</div>
              <p className="text-xs md:text-sm text-charcoal/40 leading-relaxed pt-1 italic">
                Clean. Reliable. Continuous.
              </p>
            </div>
            
            <div className="text-center space-y-4 md:space-y-5 p-6 rounded-2xl bg-whisper/50">
              <div className="text-5xl md:text-6xl lg:text-7xl font-extralight text-charcoal tabular-nums">
                <AnimatedCounter value={25000} duration={2500} />+
              </div>
              <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-charcoal/50 font-medium">Cycles proven</div>
              <p className="text-xs md:text-sm text-charcoal/40 leading-relaxed pt-1 italic">
                Each one a promise kept
              </p>
            </div>
            
            <div className="text-center space-y-4 md:space-y-5 p-6 rounded-2xl bg-whisper/50">
              <div className="text-5xl md:text-6xl lg:text-7xl font-extralight text-charcoal tabular-nums">
                99.94%
              </div>
              <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-charcoal/50 font-medium">System uptime</div>
              <p className="text-xs md:text-sm text-charcoal/40 leading-relaxed pt-1 italic">
                Because almost isn't enough
              </p>
            </div>
          </div>

          {/* Image Placeholder for Real Installation */}
          <div className="mt-20 md:mt-28 aspect-[21/9] bg-gradient-to-br from-charcoal/5 to-charcoal/10 rounded-3xl overflow-hidden relative">
            {/* Placeholder: panoramic shot of Indian homes with NESS installations */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <p className="text-2xl md:text-3xl lg:text-4xl text-charcoal/30 font-light italic leading-[1.6] max-w-3xl">
                  "Power cuts don't just disrupt electricity — they interrupt life.
                  <br />
                  NESS gives families their comfort back."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values - The Why */}
      <section className="py-20 md:py-32 lg:py-40 bg-whisper">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16 md:mb-24 lg:mb-32 space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-charcoal leading-[1.1] tracking-tight px-4">
              Why NESS exists.
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-charcoal/60 font-light max-w-3xl mx-auto leading-[1.7] px-4">
              NESS was born from a simple idea — that power should never be cold or complicated. It should care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-24">
            
            {/* Mission */}
            <div className="bg-pearl border border-platinum/30 rounded-3xl p-8 md:p-10 lg:p-12 space-y-6 md:space-y-8">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-whisper flex items-center justify-center">
                <Heart className="w-7 h-7 md:w-8 md:h-8 text-charcoal" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-charcoal">Our Promise</h3>
              <div className="space-y-5 md:space-y-6 text-charcoal/70 leading-[1.7]">
                <p className="text-base md:text-lg">
                  <strong className="text-charcoal font-medium">To Customers:</strong><br />
                  Peace of mind, powered effortlessly.
                </p>
                <div className="h-px bg-platinum/30"></div>
                <p className="text-base md:text-lg">
                  <strong className="text-charcoal font-medium">To Partners:</strong><br />
                  Systems that work the first time, and every time after.
                </p>
                <div className="h-px bg-platinum/30"></div>
                <p className="text-base md:text-lg">
                  <strong className="text-charcoal font-medium">To the Planet:</strong><br />
                  Every installation leaves the world slightly better.
                </p>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-pearl border border-platinum/30 rounded-3xl p-8 md:p-10 lg:p-12 space-y-6 md:space-y-8">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-whisper flex items-center justify-center">
                <Target className="w-7 h-7 md:w-8 md:h-8 text-charcoal" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-charcoal">Our Mission</h3>
              <p className="text-base md:text-lg text-charcoal/70 leading-[1.7]">
                To make clean, uninterrupted power simple and accessible — so you can focus on what matters most: 
                living, creating, connecting.
              </p>
              <p className="text-sm md:text-base text-charcoal/50 italic pt-4 md:pt-6 border-t border-platinum/30">
                We don't just store energy — we nurture it.
              </p>
            </div>
          </div>

          {/* Our Voice & Values */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            
            <div className="text-center space-y-5 md:space-y-6 p-6 md:p-8 rounded-2xl bg-pearl/50">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-pearl border border-platinum/30 flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7 md:w-8 md:h-8 text-charcoal" />
              </div>
              <h3 className="text-lg md:text-xl font-light text-charcoal">Warm, not technical</h3>
              <p className="text-charcoal/60 leading-[1.7] text-sm md:text-base">
                We speak like humans, not manuals. Because energy should feel human: 
                calm when you need it, strong when you rely on it.
              </p>
            </div>

            <div className="text-center space-y-5 md:space-y-6 p-6 md:p-8 rounded-2xl bg-pearl/50">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-pearl border border-platinum/30 flex items-center justify-center mx-auto">
                <Shield className="w-7 h-7 md:w-8 md:h-8 text-charcoal" />
              </div>
              <h3 className="text-lg md:text-xl font-light text-charcoal">Confident, not loud</h3>
              <p className="text-charcoal/60 leading-[1.7] text-sm md:text-base">
                Our silence is our strength. The best power is the one that quietly cares — 
                invisible when life flows as it should.
              </p>
            </div>

            <div className="text-center space-y-5 md:space-y-6 p-6 md:p-8 rounded-2xl bg-pearl/50">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-pearl border border-platinum/30 flex items-center justify-center mx-auto">
                <Users className="w-7 h-7 md:w-8 md:h-8 text-charcoal" />
              </div>
              <h3 className="text-lg md:text-xl font-light text-charcoal">Inclusive, not corporate</h3>
              <p className="text-charcoal/60 leading-[1.7] text-sm md:text-base">
                We celebrate the community of people who care about energy — 
                the Energy Warriors building a cleaner future together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 lg:py-40 bg-charcoal text-pearl relative overflow-hidden">
        
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 opacity-10">
          {/* Placeholder: community background — installers, families, engineers united by clean energy */}
        </div>
        
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
          
          <div className="space-y-12 md:space-y-16 lg:space-y-20">
            <div className="space-y-8 md:space-y-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] tracking-tight px-4">
                Join the community
                <br />
                that cares.
              </h2>
              
              <p className="text-lg md:text-xl lg:text-2xl text-pearl/70 font-light max-w-3xl mx-auto leading-[1.7] px-4">
                We call them Energy Warriors — people who choose sustainable living, who install with care, 
                who power homes and hearts with clean energy. Together, we're creating a movement where caring is the most powerful energy of all.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-4 md:pt-8">
              <Link to="/contact/homeowner">
                <Button size="lg" className="bg-pearl text-charcoal hover:bg-pearl/90 px-8 md:px-10 py-5 md:py-6 text-base md:text-lg rounded-full transition-all hover:scale-105 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <span>Talk to Us</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Button>
              </Link>
              
              <Link to="/installers">
                <Button size="lg" variant="outline" className="border-pearl/20 text-pearl hover:bg-pearl/10 px-8 md:px-10 py-5 md:py-6 text-base md:text-lg rounded-full transition-all hover:scale-105 w-full sm:w-auto">
                  Partner With Us
                </Button>
              </Link>
            </div>

            <div className="pt-8 md:pt-12 text-sm md:text-base text-pearl/40 italic">
              NESS — because the best power is the one that quietly cares.
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;