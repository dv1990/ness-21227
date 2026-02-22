import { Link } from "react-router-dom";
import { Mail, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <>
      {/* Pre-Footer — Bold Closing Statement */}
      <section 
        className="!py-32 md:!py-40 !mt-0 bg-graphite text-pearl text-center relative overflow-hidden"
        aria-labelledby="closing-cta-heading"
      >
        {/* Subtle radial glow */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ background: 'radial-gradient(ellipse at 50% 100%, hsl(151 100% 45% / 0.15), transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 
            id="closing-cta-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[-0.03em] leading-[1.15] mb-8"
          >
            Ready to end
            <br />
            <span className="text-energy font-light">blackouts forever?</span>
          </h2>
          <p className="text-lg md:text-xl text-pearl/50 font-light max-w-xl mx-auto mb-12 leading-relaxed">
            Join 500+ Indian homes that never worry about power cuts again.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-pearl hover:bg-white text-charcoal font-semibold px-12 py-7 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,255,255,0.2)]"
              >
                Get a Quote
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/residential">
              <Button
                size="lg"
                className="border border-pearl/30 bg-transparent text-pearl hover:bg-pearl/10 px-10 py-7 text-lg rounded-2xl transition-all duration-300"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sitemap Footer */}
      <footer 
        className="bg-foreground text-background border-t border-border/10"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-semibold mb-4">NESS</h3>
              <p className="text-background/70 mb-6 leading-relaxed">
                Premium energy storage solutions engineered for Indian conditions. 
                Trusted by homes and businesses nationwide.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-background/70">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <a href="mailto:contact@nunam.com" className="hover:text-background transition-colors">
                    contact@nunam.com
                  </a>
                </div>
                
                <div className="flex items-start gap-3 text-background/70">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
                  <span>
                    Nunam Technologies India Private Limited<br />
                    Plot no, 19 A, 3rd Cross, Veerasandra Industrial Area,<br />
                    Electronic City - Phase 2, Bengaluru, Karnataka 560100
                  </span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/residential" className="text-background/70 hover:text-background transition-colors">
                    Home Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/commercial" className="text-background/70 hover:text-background transition-colors">
                    Commercial Systems
                  </Link>
                </li>
                <li>
                  <Link to="/warranty" className="text-background/70 hover:text-background transition-colors">
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-background/70 hover:text-background transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="text-background/70 hover:text-background transition-colors">
                    News
                  </Link>
                </li>
                <li>
                  <Link to="/hiring" className="text-background/70 hover:text-background transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-background/70 hover:text-background transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/find-installer" className="text-background/70 hover:text-background transition-colors">
                    Find Installer
                  </Link>
                </li>
                <li>
                  <Link to="/installers" className="text-background/70 hover:text-background transition-colors">
                    For Installers
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge-hub" className="text-background/70 hover:text-background transition-colors">
                    Knowledge Hub
                  </Link>
                </li>
                <li>
                  <Link to="/downloads" className="text-background/70 hover:text-background transition-colors">
                    Downloads
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-background/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-background/60">
                <Link to="/privacy" className="hover:text-background transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-background transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookie-policy" className="hover:text-background transition-colors">
                  Cookie Policy
                </Link>
                <Link to="/warranty" className="hover:text-background transition-colors">
                  Warranty Terms
                </Link>
                <span>© 2025 NESS by Nunam. All rights reserved.</span>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors" aria-label="Follow us on LinkedIn">
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors" aria-label="Follow us on Twitter">
                  <Twitter className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors" aria-label="Follow us on Facebook">
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors" aria-label="Follow us on Instagram">
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
