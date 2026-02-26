import { memo } from 'react';
import { Shield, Star, CheckCircle, Zap, Home, Quote } from "lucide-react";

export const BelowFoldSections = memo(() => {
  return (
    <>
      {/* Why NESS - Refined Trust Section */}
      <section
        className="!py-24 md:!py-32 !mt-0 bg-gradient-to-b from-background to-muted/10"
        aria-labelledby="benefits-heading"
      >
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2
              id="benefits-heading"
              className="text-4xl md:text-5xl font-light mb-6 tracking-tight"
            >
              Why Homeowners Choose NESS
            </h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Clean energy is the new luxury. Here's what makes NESS different.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {/* Silent Guardian */}
            <div className="group relative p-6 rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:shadow-lifted-lg hover:border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Shield className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-light mb-4">Silent Guardian</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your neighbors won't know you have backup power. Zero noise. Zero emissions. Pure peace.
                </p>
              </div>
            </div>

            {/* Instant Response */}
            <div className="group relative p-6 rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:shadow-lifted-lg hover:border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Zap className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-light mb-4">Instant Response</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Switches in 10 milliseconds. Your Wi-Fi doesn't drop. Your calls stay connected. Life continues.
                </p>
              </div>
            </div>

            {/* Whole Home Coverage */}
            <div className="group relative p-6 rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:shadow-lifted-lg hover:border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Home className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-light mb-4">Whole Home Coverage</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Run everything—AC, refrigerator, Wi-Fi—for 24+ hours. Not just "essentials." Everything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Elevated Premium Design */}
      <section className="!py-24 md:!py-32 !mt-0 bg-charcoal text-pearl" aria-labelledby="social-proof-heading">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2
              id="social-proof-heading"
              className="text-3xl md:text-5xl font-light mb-4 tracking-tight text-pearl"
            >
              Trusted by discerning homeowners
            </h2>
            <p className="text-lg text-pearl/60 font-light">Across India</p>
          </div>

          {/* Stats Row */}
          <div className="grid md:grid-cols-3 gap-0 mb-20 border border-pearl/10 rounded-2xl overflow-hidden">
            {/* Star Rating */}
            <div className="text-center p-10 border-b md:border-b-0 md:border-r border-pearl/10">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={`rating-star-${i}`} className="w-5 h-5 fill-energy text-energy" />
                ))}
              </div>
              <div className="text-5xl font-light mb-2 text-pearl tracking-tight">4.9</div>
              <div className="text-sm text-pearl/50 uppercase tracking-widest">Customer Rating</div>
            </div>

            {/* BIS Certification */}
            <div className="text-center p-10 border-b md:border-b-0 md:border-r border-pearl/10">
              <div className="w-12 h-12 rounded-full border-2 border-energy/40 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-energy" />
              </div>
              <div className="text-2xl font-light mb-2 text-pearl">BIS Certified</div>
              <div className="text-sm text-pearl/50 uppercase tracking-widest">Government Approved</div>
            </div>

            {/* Homes Protected */}
            <div className="text-center p-10">
              <div className="text-5xl font-light mb-2 text-pearl tracking-tight">500<span className="text-energy">+</span></div>
              <div className="text-sm text-pearl/50 uppercase tracking-widest mb-1">Homes Protected</div>
              <div className="text-xs text-pearl/30">Since 2020</div>
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="relative p-10 rounded-2xl border border-pearl/10 bg-pearl/[0.03]">
              <Quote className="w-8 h-8 text-energy/30 mb-6" aria-hidden="true" />
              <blockquote className="text-lg md:text-xl text-pearl/90 leading-relaxed mb-8 font-light">
                "What made me choose NESS was the silence. My generator used to wake the neighborhood. Now, nobody even knows when the power goes out."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-energy/10 border border-energy/20 flex items-center justify-center text-sm font-medium text-energy">
                  RM
                </div>
                <div>
                  <p className="text-sm font-medium text-pearl">Rajesh Malhotra</p>
                  <p className="text-xs text-pearl/50">Villa Owner · Bangalore · 18 months</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="relative p-10 rounded-2xl border border-pearl/10 bg-pearl/[0.03]">
              <Quote className="w-8 h-8 text-energy/30 mb-6" aria-hidden="true" />
              <blockquote className="text-lg md:text-xl text-pearl/90 leading-relaxed mb-8 font-light">
                "Two years. Not one reset. Not one worry. The grid is just backup now — NESS is our primary power."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-energy/10 border border-energy/20 flex items-center justify-center text-sm font-medium text-energy">
                  MK
                </div>
                <div>
                  <p className="text-sm font-medium text-pearl">Dr. Mohan Krishna</p>
                  <p className="text-xs text-pearl/50">Homeowner · Bengaluru · Off-grid since 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

BelowFoldSections.displayName = 'BelowFoldSections';
