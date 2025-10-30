import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PerformanceImage } from "@/components/ui/performance-image";
import { Check, Shield, TrendingUp, BarChart3, Battery, Fuel } from "lucide-react";
import { Link } from "react-router-dom";

// Import images
import warrantyHero from "@/assets/warranty-hero-trust.jpg";
import nessPodProduct from "@/assets-webp/ness-pod-product.webp";

const TrueWarranty = () => {
  useEffect(() => {
    // Set page title
    document.title = "True Warranty | NESS Energy";
    
    // Smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <Layout>
      {/* 1) Hero - The Warranty. All of It. */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-whisper via-background to-whisper"></div>
        
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 py-20 md:py-32">
          <div className="space-y-16 md:space-y-20 animate-fade-in">
            {/* The Actual Warranty */}
            <div className="space-y-8 text-center">
              <h1 className="font-light text-5xl sm:text-6xl md:text-7xl text-foreground leading-tight tracking-tight">
                10 Years.<br />
                Full Replacement.<br />
                <span className="font-extralight">No Asterisks.</span>
              </h1>
              
              <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto">
                That's the whole story.
              </p>
            </div>

            {/* The Warranty Text - Upfront */}
            <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-8 md:p-12 text-left space-y-6">
              <div className="flex items-start gap-4 pb-6 border-b border-foreground/10">
                <Shield className="w-6 h-6 text-foreground/60 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-normal text-foreground mb-2">Our Warranty Promise</h2>
                  <p className="text-sm text-muted-foreground">347 words. Plain English.</p>
                </div>
              </div>
              
              <div className="space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                <p className="font-normal text-foreground">
                  If your NESS battery fails within 10 years, we replace it. Completely. Free.
                </p>
                
                <p>
                  Or, if you prefer, we give you a pro-rata refund based on remaining warranty period. Your choice.
                </p>
                
                <p>
                  We monitor every battery 24/7. If we see a problem developing, we call you before you call us. Most issues are caught before they affect your power.
                </p>
                
                <p>
                  No waiting 5 years for repairs. No lab-condition clauses. No blame-shifting. Your battery works in 45°C Indian summers with real loads, or we replace it.
                </p>
                
                <p className="font-normal text-foreground pt-4">
                  That's it. That's our warranty.
                </p>
              </div>
            </div>

            {/* Proof */}
            <div className="grid sm:grid-cols-3 gap-8 pt-8">
              <div className="text-center space-y-2">
                <div className="text-5xl font-light text-foreground">2</div>
                <div className="text-sm text-muted-foreground">Batteries replaced.<br />No questions asked.</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-5xl font-light text-foreground">48hrs</div>
                <div className="text-sm text-muted-foreground">Average claim<br />processing time</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-5xl font-light text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Valid claims<br />honored</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) How We Keep This Promise */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight text-foreground leading-[1.05] tracking-tight">
                We see problems<br />
                <span className="font-light">before you do.</span>
              </h2>
              <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
                Every battery connects to us. If something's wrong at 2 AM, we call you at 9 AM. Before your power goes out.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                That's not marketing. That's how we keep our warranty costs down and your lights on.
              </p>
            </div>
            <div className="animate-fade-in">
              <PerformanceImage
                src={nessPodProduct}
                alt="NESS Pod Battery"
                className="w-full"
                aspectRatio="4/3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3) What Makes It Different */}
      <section className="py-32 md:py-48 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section header */}
          <div className="text-center mb-24 md:mb-32">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight text-foreground mb-8 leading-tight tracking-tight">
              What makes it<br />
              <span className="font-light">different?</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto">
              Three things that actually matter.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Market Card */}
            <div className="space-y-12 animate-fade-in">
              <div className="pb-6 border-b border-border/30">
                <h3 className="text-3xl font-extralight text-foreground/60">Others</h3>
              </div>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/40"></div>
                  </div>
                  <div className="pt-2">
                    <p className="text-2xl font-light text-foreground/70 mb-2">Repair only after 5 years</p>
                    <p className="text-base text-muted-foreground">If it fails, you wait. And hope.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/40"></div>
                  </div>
                  <div className="pt-2">
                    <p className="text-2xl font-light text-foreground/70 mb-2">Lab conditions</p>
                    <p className="text-base text-muted-foreground">25°C tests. Not your reality.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/40"></div>
                  </div>
                  <div className="pt-2">
                    <p className="text-2xl font-light text-foreground/70 mb-2">Blame shifting</p>
                    <p className="text-base text-muted-foreground">Pages of exclusions and asterisks.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NESS Card */}
            <div className="space-y-12 animate-fade-in">
              <div className="pb-6 border-b border-foreground/20">
                <h3 className="text-3xl font-light text-foreground">NESS</h3>
              </div>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-8 h-8 text-foreground" strokeWidth={2} />
                  </div>
                  <div className="pt-2">
                    <p className="text-2xl font-normal text-foreground mb-2">Full replacement. All 10 years.</p>
                    <p className="text-base text-muted-foreground">Or pro rata refund. Your choice.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-8 h-8 text-foreground" strokeWidth={2} />
                  </div>
                  <div className="pt-2">
                    <p className="text-2xl font-normal text-foreground mb-2">Real-world tested</p>
                    <p className="text-base text-muted-foreground">45°C Indian summers. Actual loads.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-8 h-8 text-foreground" strokeWidth={2} />
                  </div>
                  <div className="pt-2">
                    <p className="text-2xl font-normal text-foreground mb-2">We stand with you</p>
                    <p className="text-base text-muted-foreground">Plain language. Zero fine print.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) A Principle That Costs Us */}
      <section className="py-32 md:py-48 bg-whisper/30">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-16 animate-fade-in">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight text-foreground leading-tight tracking-tight">
              Why we can afford<br />
              <span className="font-light">this warranty.</span>
            </h2>
            
            <div className="text-left space-y-8 text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              <p className="font-normal text-foreground text-2xl">
                Other companies spend millions on marketing.
              </p>
              
              <p>
                We spend it on better batteries. Better testing. Better monitoring.
              </p>
              
              <p>
                Our warranty costs us money when competitors walk away. But it costs us less than their marketing budgets.
              </p>
              
              <p className="font-normal text-foreground text-2xl pt-8">
                And you get a battery that actually works.
              </p>
            </div>

            {/* Simple Stats */}
            <div className="grid sm:grid-cols-3 gap-12 pt-12 max-w-3xl mx-auto">
              <div className="text-center space-y-3">
                <div className="text-4xl font-light text-foreground">4 Years</div>
                <div className="text-sm text-muted-foreground">Testing before<br />market launch</div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-4xl font-light text-foreground">25,000+</div>
                <div className="text-sm text-muted-foreground">Charge cycles<br />proven</div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-4xl font-light text-foreground">45°C</div>
                <div className="text-sm text-muted-foreground">Real Indian<br />summer testing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5) Closing - The Full Document */}
      <section id="warranty-terms" className="py-32 md:py-48 bg-charcoal text-pearl relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="space-y-16 md:space-y-20">
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight leading-tight tracking-tight">
                Download the full warranty.<br />
                <span className="font-light">All 347 words.</span>
              </h2>
              <p className="text-xl md:text-2xl font-light opacity-70 max-w-2xl mx-auto">
                Written in plain English. No legal degree needed.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in">
              <Button asChild className="bg-pearl text-charcoal hover:bg-pearl/90 px-12 py-6 text-base rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto font-normal shadow-lg">
                <Link to="/downloads">Download Warranty PDF</Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                className="border border-pearl/40 bg-transparent text-pearl hover:bg-pearl/10 hover:border-pearl/60 px-12 py-6 text-base rounded-full transition-all duration-300 w-full sm:w-auto font-normal"
              >
                <Link to="/contact/homeowner">Ask Us Anything</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TrueWarranty;
