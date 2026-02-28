import { useState, memo } from "react";
import { z } from "zod";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { WebPImage } from "@/components/ui/webp-image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Factory, Hotel, Fuel, Zap, TrendingDown, Clock, Leaf, ChevronDown, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { sendEmail } from "@/lib/email-service";
import { GradientOrbField } from "@/components/ui/gradient-orb";
import { SmoothFade, StaggerReveal } from "@/components/ui/smooth-animations";
import nessCubeResort from "@/assets/ness-cube-resort.webp";
import nessPodInstallation from "@/assets/ness-pod-installation-hero.webp";
import manufacturingFacility from "@/assets/manufacturing-facility.jpg";
import greenResort from "@/assets-webp/green-resort.webp";
import dgReplacement from "@/assets-webp/dg-replacement.webp";
import evCharging from "@/assets-webp/ev-charging.webp";
import ciHeroPremium from "@/assets-webp/ci-hero-premium.webp";

// Form validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name required").max(100, "Name too long"),
  email: z.string().trim().email("Valid email required").max(255, "Email too long"),
  phone: z.string().trim().min(10, "Valid phone required").max(15, "Phone too long"),
  segment: z.string().min(1, "Please select use case"),
  runtime: z.string().optional(),
  peak_load: z.string().optional(),
  solar: z.string().optional(),
  notes: z.string().trim().max(1000, "Notes too long").optional()
});
type FormData = z.infer<typeof contactSchema>;
const CommercialEnhanced = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    segment: "",
    runtime: "",
    peak_load: "",
    solar: "",
    notes: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  return <Layout className="-mt-16">
      <div className="min-h-screen bg-charcoal">

        {/* Hero Section - Full Page Image */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Full page hero image */}
          <div className="absolute inset-0">
            <WebPImage
              src={ciHeroPremium}
              alt="NESS energy storage systems for commercial and industrial applications"
              className="w-full h-full"
              priority={true}
            />
            {/* Desktop gradient blur overlay - 45% from left */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" style={{
            width: '45%'
          }} />
            {/* Mobile gradient - bottom to top for better text visibility */}
            <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-transparent" style={{
            height: '60%',
            bottom: 0
          }} />
          {/* Subtle bottom gradient for scroll indicator */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
          </div>

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--silver)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--silver)/0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

          <GradientOrbField variant="warm" />

          {/* Content */}
          <div style={{
          marginLeft: '1%'
        }} className="relative max-w-7xl px-6 w-full py-20 sm:px-[5px] z-10">
            <div className="max-w-3xl">
              {/* Content card */}
              <div className="rounded-3xl p-8 sm:p-12 lg:p-14 px-0">

                {/* Eyebrow text with icon */}
                <div className="inline-flex items-center gap-2 mb-6 sm:mb-8">
                  <Sparkles className="w-4 h-4 text-energy" />
                  <span className="text-xs sm:text-sm text-pearl/80 font-medium uppercase tracking-wider">
                    Commercial & Industrial Solutions
                  </span>
                </div>

                {/* Premium headline */}
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pearl leading-[1.05] tracking-tighter mb-6 sm:mb-8">
                  Empower productivity, sustainably.
                </h1>

                {/* Subtext */}
                <p className="text-lg sm:text-xl lg:text-2xl font-light text-pearl/90 max-w-2xl leading-relaxed mb-8 sm:mb-10">
                  Clean, intelligent energy that drives progress     lowering costs, emissions, and complexity.
                </p>

                {/* Key stat badges */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
                  <div className="bg-energy/10 backdrop-blur-sm border border-energy/20 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 hover:bg-energy/20 transition-all">
                    <TrendingDown className="w-4 h-4 text-energy" />
                    <span className="text-xs sm:text-sm font-medium text-pearl">↓60% Energy Costs</span>
                  </div>
                  <div className="bg-energy/10 backdrop-blur-sm border border-energy/20 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 hover:bg-energy/20 transition-all">
                    <Leaf className="w-4 h-4 text-energy" />
                    <span className="text-xs sm:text-sm font-medium text-pearl">Zero Emissions</span>
                  </div>
                  <div className="bg-energy/10 backdrop-blur-sm border border-energy/20 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 hover:bg-energy/20 transition-all">
                    <Zap className="w-4 h-4 text-energy" />
                    <span className="text-xs sm:text-sm font-medium text-pearl">≤50ms Switch</span>
                  </div>
                </div>

                {/* Enhanced CTA button */}
                <div>
                  <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth'
                })} className="font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-10 sm:px-12 py-6 sm:py-7 rounded-full text-base sm:text-lg shadow-2xl shadow-energy/30 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95" aria-label="Start your transition to clean energy">
                    <span className="flex items-center">
                      Start Your Transition
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <button onClick={() => window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        })} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-pearl/60 hover:text-pearl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal rounded-lg p-2" aria-label="Scroll to next section">
            <span className="text-xs uppercase tracking-wider font-medium">Explore</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </section>

        {/* Small Industries Section */}
        <section className="relative py-24 sm:py-40 bg-charcoal overflow-hidden">
          <GradientOrbField variant="standard" />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 z-10">
            <SmoothFade>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

              <div className="space-y-8 sm:space-y-10">
                <div className="space-y-6">
                  {/* Premium category label */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-energy/10 border border-energy/20">
                    <Factory className="w-4 h-4 text-energy" />
                    <span className="text-xs text-energy font-medium uppercase tracking-wider">
                      Small-Scale Industries
                    </span>
                  </div>

                  {/* Premium headline with better typography */}
                  <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-pearl leading-[1.05] tracking-tighter">
                    When power fails,
                    <br />
                    <span className="bg-gradient-to-br from-energy to-energy/70 bg-clip-text text-transparent">
                      reputation follows
                    </span>
                  </h2>
                </div>

                <p className="text-xl sm:text-2xl font-light text-pearl/60 leading-relaxed">
                  Every minute of downtime stops more than machines — it stops trust.
                  NESS keeps production running through outages, shifts, and monsoons —
                  silently, reliably, endlessly.
                </p>

                {/* Premium tech snapshot card */}
                <div className="space-y-5 pt-4">
                  <div className="bg-pearl/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-pearl/10">
                    <div className="font-medium text-pearl mb-4 text-sm uppercase tracking-wide">Tech Snapshot</div>
                    <ul className="space-y-3 text-base text-pearl/50">
                      <li className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-energy mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-light">150–1000 kWh (NESS CUBE)</span>
                      </li>
                      <li className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-energy mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-light">&lt;50 ms seamless 3-phase transition</span>
                      </li>
                      <li className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-energy mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-light">Solar-hybrid EMS, IEC 62619 / UL 9540</span>
                      </li>
                      <li className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-energy mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-light">Scalable racks, serviceable design</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              })} className="font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-10 py-6 rounded-full group shadow-2xl shadow-energy/20 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95">
                  Keep Production Moving
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

              <div className="order-first lg:order-last">
                <div className="relative aspect-[4/3] group">
                  {/* Glow effect behind image */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-energy/20 to-energy/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-pearl/10 shadow-2xl">
                    <img src={manufacturingFacility} alt="Clean fabrication shop with NESS providing silent backup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                </div>
              </div>

            </div>
            </SmoothFade>
          </div>
        </section>

        {/* Resorts Section */}
        <section className="py-20 sm:py-32 bg-graphite relative overflow-hidden">
          <GradientOrbField variant="warm" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            <SmoothFade>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-pearl/10 shadow-xl">
                <img src={greenResort} alt="Luxury resort running on silent NESS power" className="w-full h-full object-cover" loading="lazy" />
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-energy" />
                    <span className="text-sm text-energy font-medium uppercase tracking-wide">
                      Resorts
                    </span>
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-pearl leading-tight tracking-tight">
                    Guests come for silence,
                    <br />
                    <span className="text-energy">not smoke.</span>
                  </h2>
                </div>

                <p className="text-lg sm:text-xl text-pearl/50 leading-relaxed">
                  The hum of a diesel generator breaks the peace; the smell breaks the spell.
                  With NESS, your resort stays alive — but no one hears it breathe.
                  No fumes. No noise. No compromise.
                </p>

                <div className="space-y-4 pt-6">
                  <div className="bg-pearl/[0.03] rounded-xl p-4 border border-pearl/10">
                    <div className="font-medium text-pearl mb-2">Tech Snapshot</div>
                    <ul className="space-y-2 text-sm text-pearl/50">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                        <span>50–250 kWh (NESS POD) • 250–1000 kWh (NESS CUBE)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                        <span>≤ 30 dB whisper operation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                        <span>Solar + grid sync; flicker-free changeover</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                        <span>Outdoor-rated IP54 enclosures</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              })} className="font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-8 py-6 rounded-full group shadow-2xl shadow-energy/20 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95">
                  Power Your Paradise
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

            </div>
            </SmoothFade>
          </div>
        </section>

        {/* DG Replacement Section */}
        <section className="py-20 sm:py-32 bg-charcoal relative overflow-hidden">
          <GradientOrbField variant="intense" />
          <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
            <SmoothFade>
            <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
              <div className="flex items-center justify-center gap-2">
                <Fuel className="w-5 h-5 text-red-400" />
                <span className="text-sm text-red-400 font-medium uppercase tracking-wide">
                  Diesel Generator Replacement
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-pearl leading-tight tracking-tight max-w-4xl mx-auto">
                Every litre of diesel burnt
                <br />
                <span className="text-red-400">leaves a scar.</span>
              </h2>
              <p className="text-lg sm:text-xl text-pearl/50 leading-relaxed max-w-3xl mx-auto">
                It's time to retire the noise. NESS replaces diesel with pure, silent intelligence —
                cutting fuel, carbon, and chaos. The payoff isn't just financial. It's moral.
              </p>
            </div>
            </SmoothFade>

            <StaggerReveal stagger={120} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
              <div className="bg-pearl/[0.03] border border-pearl/10 rounded-2xl p-6 text-center space-y-3">
                <div className="text-sm text-pearl/40">Capacity</div>
                <div className="text-3xl sm:text-4xl font-bold text-energy">Up to 1 MWh</div>
              </div>
              <div className="bg-pearl/[0.03] border border-pearl/10 rounded-2xl p-6 text-center space-y-3">
                <div className="text-sm text-pearl/40">Lifetime OPEX</div>
                <div className="text-3xl sm:text-4xl font-bold text-energy">↓ 30–50%</div>
                <div className="text-xs text-pearl/40">vs diesel</div>
              </div>
              <div className="bg-pearl/[0.03] border border-pearl/10 rounded-2xl p-6 text-center space-y-3">
                <div className="text-sm text-pearl/40">Cycle Life</div>
                <div className="text-3xl sm:text-4xl font-bold text-energy">10,000+</div>
                <div className="text-xs text-pearl/40">LFP chemistry</div>
              </div>
              <div className="bg-pearl/[0.03] border border-pearl/10 rounded-2xl p-6 text-center space-y-3">
                <div className="text-sm text-pearl/40">CO₂ Avoided</div>
                <div className="text-3xl sm:text-4xl font-bold text-energy">≈270 t</div>
                <div className="text-xs text-pearl/40">/MWh/yr</div>
              </div>
            </StaggerReveal>

            <SmoothFade>
            <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-pearl/10 shadow-xl">
              <img src={dgReplacement} alt="Diesel generator replaced by NESS Cube" className="w-full h-full object-cover" loading="lazy" />
            </div>

            <div className="text-center mt-12">
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })} className="font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-8 py-6 rounded-full group shadow-2xl shadow-energy/20 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95">
                Switch Off Diesel
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
            </SmoothFade>
          </div>
        </section>

        {/* EV Charging Section */}
        <section className="py-20 sm:py-32 bg-graphite relative overflow-hidden">
          <GradientOrbField variant="standard" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            <SmoothFade>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-energy" />
                    <span className="text-sm text-energy font-medium uppercase tracking-wide">
                      EV Charging Support
                    </span>
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-pearl leading-tight tracking-tight">
                    Charging should never
                    <br />
                    <span className="text-energy">wait for the grid.</span>
                  </h2>
                </div>

                <p className="text-lg sm:text-xl text-pearl/50 leading-relaxed">
                  NESS powers charging hubs even when supply lags — balancing peaks,
                  storing off-peak energy, and keeping every connector alive.
                  Fast, stable, and grid-friendly.
                </p>

                <div className="space-y-4 pt-6">
                  <div className="bg-pearl/[0.03] rounded-xl p-4 border border-pearl/10">
                    <div className="font-medium text-pearl mb-2">Tech Snapshot</div>
                    <ul className="space-y-2 text-sm text-pearl/50">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                        <span>50–500 kWh scalable systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                        <span>Peak-shaving + time-of-day optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                        <span>DC fast charger integration (60–120 kW)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                        <span>Smart EMS + API for energy trading</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              })} className="font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-8 py-6 rounded-full group shadow-2xl shadow-energy/20 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95">
                  Charge Without Limits
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

              <div className="order-first lg:order-last">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-pearl/10 shadow-xl">
                  <img src={evCharging} alt="EV plaza operating smoothly with NESS-powered buffering" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>

            </div>
            </SmoothFade>
          </div>
        </section>

        {/* Product Comparison */}
        <section id="compare" className="py-20 sm:py-32 bg-charcoal relative overflow-hidden">
          <GradientOrbField variant="warm" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            <SmoothFade>
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-pearl leading-tight tracking-tight">
                Two products.
                <br />
                <span className="text-pearl/40">Infinite possibilities.</span>
              </h2>
            </div>
            </SmoothFade>

            <StaggerReveal stagger={200} className="grid lg:grid-cols-2 gap-8 lg:gap-12">

              {/* NESS POD */}
              <div className="bg-pearl/[0.03] border border-pearl/10 rounded-3xl overflow-hidden hover:border-pearl/20 transition-colors">
                <div className="aspect-[4/3] bg-gradient-to-br from-energy/10 to-energy/[0.02] overflow-hidden">
                  <img src={nessPodInstallation} alt="NESS POD compact outdoor unit" className="w-full h-full object-contain p-8" loading="lazy" />
                </div>
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-pearl">NESS POD</h3>
                    <p className="text-lg text-pearl/40 mt-1">50–250 kWh</p>
                  </div>
                  <div>
                    <div className="text-sm text-pearl/40 mb-2">Ideal For</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-pearl/10 text-pearl/60 text-xs px-3 py-1 rounded-full">Resorts</span>
                      <span className="bg-pearl/10 text-pearl/60 text-xs px-3 py-1 rounded-full">EV hubs</span>
                      <span className="bg-pearl/10 text-pearl/60 text-xs px-3 py-1 rounded-full">Small factories</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-pearl/50">
                      <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                      <span>Compact outdoor unit (IP54)</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-pearl/50">
                      <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                      <span>Plug-and-play integration</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-pearl/50">
                      <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                      <span>≤ 30 dB operation</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-pearl/50">
                      <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                      <span>Rapid install, minimal footprint</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-pearl/20 text-pearl hover:bg-pearl/[0.05] hover:text-energy rounded-full" onClick={() => document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth'
                })}>
                    View POD Configurations
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* NESS CUBE */}
              <div className="bg-pearl/[0.03] border border-pearl/10 rounded-3xl overflow-hidden hover:border-pearl/20 transition-colors">
                <div className="aspect-[4/3] bg-gradient-to-br from-energy/10 to-energy/[0.02] overflow-hidden">
                  <img src={nessCubeResort} alt="NESS CUBE containerized solution" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-pearl">NESS CUBE</h3>
                    <p className="text-lg text-pearl/40 mt-1">150 kWh–1 MWh</p>
                  </div>
                  <div>
                    <div className="text-sm text-pearl/40 mb-2">Ideal For</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-pearl/10 text-pearl/60 text-xs px-3 py-1 rounded-full">Industrial facilities</span>
                      <span className="bg-pearl/10 text-pearl/60 text-xs px-3 py-1 rounded-full">Microgrids</span>
                      <span className="bg-pearl/10 text-pearl/60 text-xs px-3 py-1 rounded-full">DG replacement</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-pearl/50">
                      <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                      <span>Containerized, stackable</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-pearl/50">
                      <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                      <span>High-power inverter + EMS</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-pearl/50">
                      <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                      <span>Harsh environment ready</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-pearl/50">
                      <CheckCircle2 className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                      <span>Service aisles, safety labeling</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-pearl/20 text-pearl hover:bg-pearl/[0.05] hover:text-energy rounded-full" onClick={() => document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth'
                })}>
                    View CUBE Configurations
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>

            </StaggerReveal>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 sm:py-32 bg-graphite relative overflow-hidden">
          <GradientOrbField variant="warm" />
          <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
            <SmoothFade>
            <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
              <div className="flex items-center justify-center gap-2">
                <Leaf className="w-5 h-5 text-energy" />
                <span className="text-sm text-energy font-medium uppercase tracking-wide">
                  Impact & Purpose
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-pearl leading-tight tracking-tight max-w-4xl mx-auto">
                Every silent watt is
                <br />
                <span className="text-energy">a cleaner sky.</span>
              </h2>
              <p className="text-lg sm:text-xl text-pearl/50 leading-relaxed max-w-3xl mx-auto">
                Each NESS installation replaces diesel smoke with quiet confidence —
                helping Indian businesses meet ESG goals while breathing easier.
              </p>
            </div>
            </SmoothFade>

            <StaggerReveal stagger={150} className="grid sm:grid-cols-3 gap-8 mb-12">
              <div className="bg-pearl/[0.03] border border-pearl/10 rounded-2xl p-8 text-center space-y-3">
                <TrendingDown className="w-8 h-8 text-energy mx-auto" />
                <div className="text-4xl font-bold text-energy">≈ 270 t</div>
                <div className="text-sm text-pearl/40">CO₂ avoided / year (per 1 MWh)</div>
              </div>
              <div className="bg-pearl/[0.03] border border-pearl/10 rounded-2xl p-8 text-center space-y-3">
                <Clock className="w-8 h-8 text-energy mx-auto" />
                <div className="text-4xl font-bold text-energy">15 years</div>
                <div className="text-sm text-pearl/40">Design life</div>
              </div>
              <div className="bg-pearl/[0.03] border border-pearl/10 rounded-2xl p-8 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-energy mx-auto" />
                <div className="text-4xl font-bold text-energy">&lt; 3 years</div>
                <div className="text-sm text-pearl/40">Typical payback vs diesel</div>
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* Scale Section */}


        {/* FAQ Section */}
        <section className="py-20 sm:py-32 bg-charcoal relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
            <SmoothFade>
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-pearl leading-tight tracking-tight">
                Frequently Asked
                <br />
                <span className="text-pearl/40">(Smart) Questions</span>
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-pearl/[0.03] border border-pearl/10 rounded-xl px-6">
                <AccordionTrigger className="text-left text-lg font-medium text-pearl hover:text-energy">
                  Can NESS fully replace our diesel generator?
                </AccordionTrigger>
                <AccordionContent className="text-pearl/50 leading-relaxed">
                  Yes. Size the CUBE to your critical load and runtime. We integrate with solar and grid,
                  deliver seamless switchover, and design for peak events.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-pearl/[0.03] border border-pearl/10 rounded-xl px-6">
                <AccordionTrigger className="text-left text-lg font-medium text-pearl hover:text-energy">
                  What maintenance is required?
                </AccordionTrigger>
                <AccordionContent className="text-pearl/50 leading-relaxed">
                  Minimal. LFP chemistry, sealed enclosures, cloud diagnostics, and predictive alerts
                  reduce routine service to simple periodic checks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-pearl/[0.03] border border-pearl/10 rounded-xl px-6">
                <AccordionTrigger className="text-left text-lg font-medium text-pearl hover:text-energy">
                  Will guests hear it at our resort?
                </AccordionTrigger>
                <AccordionContent className="text-pearl/50 leading-relaxed">
                  No. NESS POD operates at ≤ 30 dB with vibration control and remote placement options.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-pearl/[0.03] border border-pearl/10 rounded-xl px-6">
                <AccordionTrigger className="text-left text-lg font-medium text-pearl hover:text-energy">
                  How do you size for EV charging?
                </AccordionTrigger>
                <AccordionContent className="text-pearl/50 leading-relaxed">
                  We model connector count, session profiles, and tariff windows; then right-size storage
                  for peak-shaving and off-peak arbitrage.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            </SmoothFade>
          </div>
        </section>

        {/* Final Statement */}
        <section className="py-20 sm:py-32 bg-charcoal relative overflow-hidden">
          <GradientOrbField variant="intense" />
          <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8 sm:space-y-12 relative z-10">
            <SmoothFade>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-pearl leading-tight tracking-tight">
              The next revolution won't be powered by diesel —
              <br />
              <span className="text-energy">it'll be powered by people who care.</span>
            </h2>
            <div>
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })} className="font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-12 py-7 rounded-full text-lg group shadow-2xl shadow-energy/30 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95">
                Join the Movement
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
            </SmoothFade>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-20 sm:py-32 bg-graphite relative overflow-hidden">
          <GradientOrbField variant="warm" />
          <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
            <SmoothFade>
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-pearl leading-tight tracking-tight">
                Let us help you design a solution
              </h2>
              <p className="text-lg sm:text-xl text-pearl/50 leading-relaxed max-w-3xl mx-auto">
                Tell us your loads, runtime, and site constraints. We'll send a right-sized plan.
              </p>
            </div>

            <div className="bg-pearl/[0.03] border border-pearl/10 rounded-3xl shadow-xl p-8">
                <form className="space-y-6" onSubmit={async (e) => {
                  e.preventDefault();
                  setFormErrors({});

                  const validation = contactSchema.safeParse(formData);
                  if (!validation.success) {
                    const errors: Record<string, string> = {};
                    validation.error.errors.forEach(err => {
                      if (err.path[0]) errors[err.path[0].toString()] = err.message;
                    });
                    setFormErrors(errors);
                    return;
                  }

                  setIsSubmitting(true);

                  try {
                    // Construct email message
                    const message = `
C&I System Design Request

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Use Case: ${formData.segment}
Runtime: ${formData.runtime || 'N/A'}
Peak Load: ${formData.peak_load || 'N/A'}
Solar: ${formData.solar || 'N/A'}
Notes: ${formData.notes || 'None'}
                    `.trim();

                    await sendEmail({
                      from_name: formData.name,
                      from_email: formData.email,
                      from_phone: formData.phone,
                      message: message,
                      form_type: "Commercial & Industrial Inquiry",
                      segment: formData.segment,
                      runtime: formData.runtime,
                      peak_load: formData.peak_load,
                      solar: formData.solar,
                      notes: formData.notes
                    });

                    toast.success("Request sent successfully! We'll contact you soon.");

                    // Reset form
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      segment: "",
                      runtime: "",
                      peak_load: "",
                      solar: "",
                      notes: ""
                    });
                  } catch (error) {
                    if (import.meta.env.DEV) {
                      console.error("Form submission error:", error);
                    }
                    toast.error("Failed to send request. Please try again or contact us directly.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Input placeholder="Full Name *" value={formData.name} onChange={e => setFormData({
                      ...formData,
                      name: e.target.value
                    })} className={`bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/30 focus:border-energy/50 ${formErrors.name ? "border-red-400" : ""}`} />
                      {formErrors.name && <p className="text-sm text-red-400">{formErrors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Input type="email" placeholder="Work Email *" value={formData.email} onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} className={`bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/30 focus:border-energy/50 ${formErrors.email ? "border-red-400" : ""}`} />
                      {formErrors.email && <p className="text-sm text-red-400">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Input type="tel" placeholder="Phone *" value={formData.phone} onChange={e => setFormData({
                      ...formData,
                      phone: e.target.value
                    })} className={`bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/30 focus:border-energy/50 ${formErrors.phone ? "border-red-400" : ""}`} />
                      {formErrors.phone && <p className="text-sm text-red-400">{formErrors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Select value={formData.segment} onValueChange={value => setFormData({
                      ...formData,
                      segment: value
                    })}>
                        <SelectTrigger className={`bg-pearl/[0.03] border-pearl/10 text-pearl ${formErrors.segment ? "border-red-400" : ""}`}>
                          <SelectValue placeholder="Use Case *" />
                        </SelectTrigger>
                        <SelectContent className="bg-graphite border-pearl/10">
                          <SelectItem value="Small Industry">Small Industry</SelectItem>
                          <SelectItem value="Resort">Resort</SelectItem>
                          <SelectItem value="DG Replacement">DG Replacement</SelectItem>
                          <SelectItem value="EV Charging">EV Charging</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.segment && <p className="text-sm text-red-400">{formErrors.segment}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input type="number" placeholder="Required Backup Runtime (hours)" value={formData.runtime} onChange={e => setFormData({
                    ...formData,
                    runtime: e.target.value
                  })} className="bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/30 focus:border-energy/50" />
                    <Input type="number" placeholder="Peak Load (kW)" value={formData.peak_load} onChange={e => setFormData({
                    ...formData,
                    peak_load: e.target.value
                  })} className="bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/30 focus:border-energy/50" />
                  </div>

                  <Select value={formData.solar} onValueChange={value => setFormData({
                  ...formData,
                  solar: value
                })}>
                    <SelectTrigger className="bg-pearl/[0.03] border-pearl/10 text-pearl">
                      <SelectValue placeholder="Do you have solar?" />
                    </SelectTrigger>
                    <SelectContent className="bg-graphite border-pearl/10">
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea placeholder="Notes / Constraints" value={formData.notes} onChange={e => setFormData({
                  ...formData,
                  notes: e.target.value
                })} rows={4} className="bg-pearl/[0.03] border-pearl/10 text-pearl placeholder:text-pearl/30 focus:border-energy/50" />

                  <div className="text-sm text-pearl/30 text-center">
                    By submitting, you agree to be contacted about NESS products and services.
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold py-7 rounded-full text-lg group shadow-2xl shadow-energy/30 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Get My Plan"}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </form>
            </div>
            </SmoothFade>
          </div>
        </section>

      </div>
    </Layout>;
};
export default memo(CommercialEnhanced);
