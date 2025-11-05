import { memo } from 'react';
import { Link } from "react-router-dom";
import { Shield, Star, CheckCircle, Users, Zap, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BelowFoldSections = memo(() => {
  return (
    <>
      {/* Why NESS - Refined Trust Section */}
      <section className="py-32 md:py-48 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 tracking-tight">
              Why Homeowners Choose NESS
            </h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Clean energy is the new luxury. Here's what makes NESS different.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Silent Guardian */}
            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-light mb-4">Silent Guardian</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your neighbors won't know you have backup power. Zero noise. Zero emissions. Pure peace.
                </p>
              </div>
            </div>

            {/* Instant Response */}
            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-light mb-4">Instant Response</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Switches in 10 milliseconds. Your Wi-Fi doesn't drop. Your calls stay connected. Life continues.
                </p>
              </div>
            </div>

            {/* Whole Home Coverage */}
            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Home className="w-8 h-8 text-primary" />
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

      {/* Social Proof Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6 tracking-tight">
              Trusted by discerning homeowners across India
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Star Rating */}
            <div className="text-center p-6">
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={`rating-star-${i}`} className="w-6 h-6 fill-primary text-primary" />)}
              </div>
              <div className="text-3xl font-light mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>

            {/* BIS Certification */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-light mb-2">BIS Certified</div>
              <div className="text-sm text-muted-foreground">Government Approved</div>
            </div>

            {/* Homes Protected */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-light mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Homes Protected</div>
              <div className="text-xs text-muted-foreground/60 mt-1">Since 2020</div>
            </div>
          </div>

          {/* Customer Testimonial */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/30">
              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(5)].map((_, i) => <Star key={`testimonial-star-${i}`} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <blockquote className="text-lg text-center text-muted-foreground leading-relaxed mb-4">
                "What made me choose NESS was the silence. My generator used to wake the neighborhood. Now, nobody even knows when the power goes out. It's been flawless for 18 months."
              </blockquote>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Rajesh Malhotra</p>
                <p className="text-xs text-muted-foreground">Villa Owner • Bangalore</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/">
              <Button variant="outline" size="lg" className="rounded-full px-8 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Explore All NESS Systems
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
});

BelowFoldSections.displayName = 'BelowFoldSections';
