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

  return <Layout>
      <div className="min-h-screen bg-background">
        
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
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" style={{
            width: '45%'
          }} />
            {/* Mobile gradient - bottom to top for better text visibility */}
            <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" style={{
            height: '60%',
            bottom: 0
          }} />
          {/* Subtle bottom gradient for scroll indicator */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
          </div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--silver)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--silver)/0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          
          {/* Content */}
          <div style={{
          marginLeft: '1%'
        }} className="relative max-w-7xl px-6 w-full py-20 sm:px-[5px]">
            <div className="max-w-3xl">
              {/* Content card */}
              <div className="rounded-3xl p-8 sm:p-12 lg:p-14 px-0">
                
                {/* Eyebrow text with icon */}
                <div className="inline-flex items-center gap-2 mb-6 sm:mb-8">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm text-pearl/80 font-medium uppercase tracking-wider">
                    Commercial & Industrial Solutions
                  </span>
                </div>

                {/* Premium headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-pearl leading-[1.05] tracking-tighter mb-6 sm:mb-8">
                  <span className="font-light">
                    Empower productivity, sustainably.
                  </span>
                </h1>
                
                {/* Subtext */}
                <p className="text-lg sm:text-xl lg:text-2xl font-light text-pearl/90 max-w-2xl leading-relaxed mb-8 sm:mb-10">
                  Clean, intelligent energy that drives progress     lowering costs, emissions, and complexity.
                </p>

                {/* Key stat badges */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
                  <div className="bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 hover:bg-primary/30 transition-all">
                    <TrendingDown className="w-4 h-4 text-primary" />
                    <span className="text-xs sm:text-sm font-medium text-pearl">↓60% Energy Costs</span>
                  </div>
                  <div className="bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 hover:bg-primary/30 transition-all">
                    <Leaf className="w-4 h-4 text-primary" />
                    <span className="text-xs sm:text-sm font-medium text-pearl">Zero Emissions</span>
                  </div>
                  <div className="bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 hover:bg-primary/30 transition-all">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-xs sm:text-sm font-medium text-pearl">≤50ms Switch</span>
                  </div>
                </div>

                {/* Enhanced CTA button */}
                <div>
                  <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth'
                })} className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 sm:px-12 py-6 sm:py-7 rounded-full text-base sm:text-lg font-medium shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black" aria-label="Start your transition to clean energy">
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
        })} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-pearl/60 hover:text-pearl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal rounded-lg p-2" aria-label="Scroll to next section">
            <span className="text-xs uppercase tracking-wider font-medium">Explore</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </section>

        {/* Small Industries Section */}
        <section className="relative py-24 sm:py-40 overflow-hidden">
          {/* Premium background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-muted/20 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              
              <div className="space-y-8 sm:space-y-10">
                <div className="space-y-6">
                  {/* Premium category label */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Factory className="w-4 h-4 text-primary" />
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                      Small-Scale Industries
                    </span>
                  </div>
                  
                  {/* Premium headline with better typography */}
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight text-foreground leading-[1.05] tracking-tighter">
                    When power fails,
                    <br />
                    <span className="font-light bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                      reputation follows
                    </span>
                  </h2>
                </div>
                
                <p className="text-xl sm:text-2xl font-light text-muted-foreground/90 leading-relaxed">
                  Every minute of downtime stops more than machines — it stops trust. 
                  NESS keeps production running through outages, shifts, and monsoons — 
                  silently, reliably, endlessly.
                </p>

                {/* Premium tech snapshot card */}
                <div className="space-y-5 pt-4">
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
                    <div className="font-medium text-foreground mb-4 text-sm uppercase tracking-wide">Tech Snapshot</div>
                    <ul className="space-y-3 text-base text-muted-foreground">
                      <li className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-light">150–1000 kWh (NESS CUBE)</span>
                      </li>
                      <li className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-light">&lt;50 ms seamless 3-phase transition</span>
                      </li>
                      <li className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-light">Solar-hybrid EMS, IEC 62619 / UL 9540</span>
                      </li>
                      <li className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-light">Scalable racks, serviceable design</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              })} className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 rounded-full font-light group shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]">
                  Keep Production Moving
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

              <div className="order-first lg:order-last">
                <div className="relative aspect-[4/3] group">
                  {/* Glow effect behind image */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative aspect-[4/3] bg-card rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
                    <img src={manufacturingFacility} alt="Clean fabrication shop with NESS providing silent backup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Resorts Section */}
        <section className="py-20 sm:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              <div className="aspect-[4/3] bg-card rounded-3xl overflow-hidden border border-border shadow-xl">
                <img src={greenResort} alt="Luxury resort running on silent NESS power" className="w-full h-full object-cover" loading="lazy" />
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary font-medium uppercase tracking-wide">
                      Resorts
                    </span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
                    Guests come for silence,
                    <br />
                    <span className="text-primary font-medium">not smoke.</span>
                  </h2>
                </div>
                
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  The hum of a diesel generator breaks the peace; the smell breaks the spell. 
                  With NESS, your resort stays alive — but no one hears it breathe. 
                  No fumes. No noise. No compromise.
                </p>

                <div className="space-y-4 pt-6">
                  <div className="bg-card/50 rounded-xl p-4 border border-border/50">
                    <div className="font-medium text-foreground mb-2">Tech Snapshot</div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>50–250 kWh (NESS POD) • 250–1000 kWh (NESS CUBE)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>≤ 30 dB whisper operation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Solar + grid sync; flicker-free changeover</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Outdoor-rated IP54 enclosures</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              })} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-2xl group">
                  Power Your Paradise
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

            </div>
          </div>
        </section>

        {/* DG Replacement Section */}
        <section className="py-20 sm:py-32 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
              <div className="flex items-center justify-center gap-2">
                <Fuel className="w-5 h-5 text-destructive" />
                <span className="text-sm text-destructive font-medium uppercase tracking-wide">
                  Diesel Generator Replacement
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-light text-foreground leading-tight tracking-tight max-w-4xl mx-auto">
                Every litre of diesel burnt
                <br />
                <span className="text-destructive font-medium">leaves a scar.</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                It's time to retire the noise. NESS replaces diesel with pure, silent intelligence — 
                cutting fuel, carbon, and chaos. The payoff isn't just financial. It's moral.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="text-sm text-muted-foreground">Capacity</div>
                  <div className="text-3xl sm:text-4xl font-bold text-primary">Up to 1 MWh</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="text-sm text-muted-foreground">Lifetime OPEX</div>
                  <div className="text-3xl sm:text-4xl font-bold text-primary">↓ 30–50%</div>
                  <div className="text-xs text-muted-foreground">vs diesel</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="text-sm text-muted-foreground">Cycle Life</div>
                  <div className="text-3xl sm:text-4xl font-bold text-primary">10,000+</div>
                  <div className="text-xs text-muted-foreground">LFP chemistry</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="text-sm text-muted-foreground">CO₂ Avoided</div>
                  <div className="text-3xl sm:text-4xl font-bold text-primary">≈270 t</div>
                  <div className="text-xs text-muted-foreground">/MWh/yr</div>
                </CardContent>
              </Card>
            </div>

            <div className="aspect-[21/9] bg-card rounded-3xl overflow-hidden border border-border shadow-xl">
              <img src={dgReplacement} alt="Diesel generator replaced by NESS Cube" className="w-full h-full object-cover" loading="lazy" />
            </div>

            <div className="text-center mt-12">
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-2xl group">
                Switch Off Diesel
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* EV Charging Section */}
        <section className="py-20 sm:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary font-medium uppercase tracking-wide">
                      EV Charging Support
                    </span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
                    Charging should never
                    <br />
                    <span className="text-primary font-medium">wait for the grid.</span>
                  </h2>
                </div>
                
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  NESS powers charging hubs even when supply lags — balancing peaks, 
                  storing off-peak energy, and keeping every connector alive. 
                  Fast, stable, and grid-friendly.
                </p>

                <div className="space-y-4 pt-6">
                  <div className="bg-card/50 rounded-xl p-4 border border-border/50">
                    <div className="font-medium text-foreground mb-2">Tech Snapshot</div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>50–500 kWh scalable systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Peak-shaving + time-of-day optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>DC fast charger integration (60–120 kW)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Smart EMS + API for energy trading</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              })} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-2xl group">
                  Charge Without Limits
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

              <div className="order-first lg:order-last">
                <div className="aspect-[4/3] bg-card rounded-3xl overflow-hidden border border-border shadow-xl">
                  <img src={evCharging} alt="EV plaza operating smoothly with NESS-powered buffering" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Product Comparison */}
        <section id="compare" className="py-20 sm:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
                Two products.
                <br />
                <span className="text-muted-foreground">Infinite possibilities.</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* NESS POD */}
              <Card className="bg-card border-border shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-500/10 to-blue-500/5 overflow-hidden">
                  <img src={nessPodInstallation} alt="NESS POD compact outdoor unit" className="w-full h-full object-contain p-8" loading="lazy" />
                </div>
                <CardHeader>
                  <CardTitle className="text-3xl">NESS POD</CardTitle>
                  <CardDescription className="text-lg">50–250 kWh</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Ideal For</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Resorts</Badge>
                      <Badge variant="secondary">EV hubs</Badge>
                      <Badge variant="secondary">Small factories</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Compact outdoor unit (IP54)</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Plug-and-play integration</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>≤ 30 dB operation</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Rapid install, minimal footprint</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth'
                })}>
                    View POD Configurations
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* NESS CUBE */}
              <Card className="bg-card border-border shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="aspect-[4/3] bg-gradient-to-br from-green-500/10 to-green-500/5 overflow-hidden">
                  <img src={nessCubeResort} alt="NESS CUBE containerized solution" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <CardHeader>
                  <CardTitle className="text-3xl">NESS CUBE</CardTitle>
                  <CardDescription className="text-lg">150 kWh–1 MWh</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Ideal For</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Industrial facilities</Badge>
                      <Badge variant="secondary">Microgrids</Badge>
                      <Badge variant="secondary">DG replacement</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Containerized, stackable</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>High-power inverter + EMS</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Harsh environment ready</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Service aisles, safety labeling</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth'
                })}>
                    View CUBE Configurations
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 sm:py-32 bg-background">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
              <div className="flex items-center justify-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                <span className="text-sm text-primary font-medium uppercase tracking-wide">
                  Impact & Purpose
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight tracking-tight max-w-4xl mx-auto">
                Every silent watt is
                <br />
                <span className="text-primary font-medium">a cleaner sky.</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Each NESS installation replaces diesel smoke with quiet confidence — 
                helping Indian businesses meet ESG goals while breathing easier.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 mb-12">
              <Card className="bg-card/50 border-border/50 text-center">
                <CardContent className="pt-8 space-y-3">
                  <TrendingDown className="w-8 h-8 text-primary mx-auto" />
                  <div className="text-4xl font-bold text-primary">≈ 270 t</div>
                  <div className="text-sm text-muted-foreground">CO₂ avoided / year (per 1 MWh)</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50 text-center">
                <CardContent className="pt-8 space-y-3">
                  <Clock className="w-8 h-8 text-primary mx-auto" />
                  <div className="text-4xl font-bold text-primary">15 years</div>
                  <div className="text-sm text-muted-foreground">Design life</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50 text-center">
                <CardContent className="pt-8 space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
                  <div className="text-4xl font-bold text-primary">&lt; 3 years</div>
                  <div className="text-sm text-muted-foreground">Typical payback vs diesel</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Scale Section */}
        

        {/* FAQ Section */}
        <section className="py-20 sm:py-32 bg-background">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
                Frequently Asked
                <br />
                <span className="text-muted-foreground">(Smart) Questions</span>
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">
                  Can NESS fully replace our diesel generator?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes. Size the CUBE to your critical load and runtime. We integrate with solar and grid, 
                  deliver seamless switchover, and design for peak events.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">
                  What maintenance is required?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Minimal. LFP chemistry, sealed enclosures, cloud diagnostics, and predictive alerts 
                  reduce routine service to simple periodic checks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">
                  Will guests hear it at our resort?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  No. NESS POD operates at ≤ 30 dB with vibration control and remote placement options.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">
                  How do you size for EV charging?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  We model connector count, session profiles, and tariff windows; then right-size storage 
                  for peak-shaving and off-peak arbitrage.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final Statement */}
        <section className="py-20 sm:py-32 bg-muted/30">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8 sm:space-y-12">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-light text-foreground leading-tight tracking-tight">
              The next revolution won't be powered by diesel —
              <br />
              <span className="text-primary font-medium">it'll be powered by people who care.</span>
            </h2>
            <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({
            behavior: 'smooth'
          })} className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 rounded-2xl text-lg group">
              Join the Movement
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-20 sm:py-32 bg-background">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
                Let us help you design a solution
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Tell us your loads, runtime, and site constraints. We'll send a right-sized plan.
              </p>
            </div>

            <Card className="bg-card shadow-xl">
              <CardContent className="pt-8">
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
                    })} className={formErrors.name ? "border-destructive" : ""} />
                      {formErrors.name && <p className="text-sm text-destructive">{formErrors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Input type="email" placeholder="Work Email *" value={formData.email} onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} className={formErrors.email ? "border-destructive" : ""} />
                      {formErrors.email && <p className="text-sm text-destructive">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Input type="tel" placeholder="Phone *" value={formData.phone} onChange={e => setFormData({
                      ...formData,
                      phone: e.target.value
                    })} className={formErrors.phone ? "border-destructive" : ""} />
                      {formErrors.phone && <p className="text-sm text-destructive">{formErrors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Select value={formData.segment} onValueChange={value => setFormData({
                      ...formData,
                      segment: value
                    })}>
                        <SelectTrigger className={formErrors.segment ? "border-destructive" : ""}>
                          <SelectValue placeholder="Use Case *" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Small Industry">Small Industry</SelectItem>
                          <SelectItem value="Resort">Resort</SelectItem>
                          <SelectItem value="DG Replacement">DG Replacement</SelectItem>
                          <SelectItem value="EV Charging">EV Charging</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.segment && <p className="text-sm text-destructive">{formErrors.segment}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input type="number" placeholder="Required Backup Runtime (hours)" value={formData.runtime} onChange={e => setFormData({
                    ...formData,
                    runtime: e.target.value
                  })} />
                    <Input type="number" placeholder="Peak Load (kW)" value={formData.peak_load} onChange={e => setFormData({
                    ...formData,
                    peak_load: e.target.value
                  })} />
                  </div>

                  <Select value={formData.solar} onValueChange={value => setFormData({
                  ...formData,
                  solar: value
                })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Do you have solar?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea placeholder="Notes / Constraints" value={formData.notes} onChange={e => setFormData({
                  ...formData,
                  notes: e.target.value
                })} rows={4} />

                  <div className="text-sm text-muted-foreground text-center">
                    By submitting, you agree to be contacted about NESS products and services.
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-2xl text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Get My Plan"}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </Layout>;
};
export default memo(CommercialEnhanced);