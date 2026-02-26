import { Link } from "react-router-dom";
import { Mail, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterLinkColumn = ({ title, links }: { title: string; links: { to: string; label: string }[] }) => (
  <div>
    <h4 className="text-caption uppercase tracking-[0.15em] text-pearl/50 mb-5 font-medium">{title}</h4>
    <ul className="space-y-3">
      {links.map(({ to, label }) => (
        <li key={to}>
          <Link to={to} className="text-pearl/60 hover:text-pearl transition-colors duration-200 text-body-small">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <>
      {/* Pre-Footer — Cinematic Closing Moment */}
      <section
        className="!py-36 md:!py-48 !mt-0 bg-charcoal relative overflow-hidden"
        aria-labelledby="closing-cta-heading"
      >
        {/* Layered ambient gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, hsl(151 100% 45% / 0.08), transparent),
              radial-gradient(ellipse 60% 40% at 20% 80%, hsl(151 100% 45% / 0.04), transparent),
              radial-gradient(ellipse 60% 40% at 80% 80%, hsl(151 100% 45% / 0.04), transparent)
            `,
          }}
          aria-hidden="true"
        />
        {/* Top fade from content */}
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to bottom, hsl(0 0% 7%), transparent)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p className="text-caption uppercase tracking-[0.2em] text-energy/60 mb-6">
            The future is uninterrupted
          </p>

          <h2
            id="closing-cta-heading"
            className="font-display text-display-large sm:text-display-xl text-pearl mb-6 leading-[0.95]"
          >
            Ready to end
            <br />
            <span className="text-energy">blackouts?</span>
          </h2>

          <p className="text-body-large text-pearl/60 font-light max-w-md mx-auto mb-14 leading-relaxed">
            500+ Indian homes already have. Yours could be next.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-pearl hover:bg-white text-charcoal font-semibold px-12 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_80px_rgba(255,255,255,0.15)]"
              >
                Get a Quote
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/residential">
              <Button
                size="lg"
                className="border border-pearl/20 bg-transparent text-pearl/70 hover:text-pearl hover:border-pearl/40 px-10 py-6 text-lg rounded-full transition-all duration-300"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sitemap Footer — Editorial, Dark */}
      <footer
        className="bg-charcoal border-t border-pearl/[0.06]"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block mb-6">
                <span className="text-title-large text-pearl font-semibold tracking-tight">NESS</span>
                <span className="text-caption text-pearl/30 ml-2 font-light">by Nunam</span>
              </Link>
              <p className="text-body-small text-pearl/60 leading-relaxed mb-8 max-w-xs">
                Premium energy storage engineered for Indian conditions. Zero blackouts. Zero compromises.
              </p>
              <div className="space-y-3">
                <a href="mailto:contact@nunam.com" className="flex items-center gap-3 text-pearl/60 hover:text-pearl/80 transition-colors text-body-small group">
                  <Mail className="w-4 h-4 group-hover:text-energy transition-colors" aria-hidden="true" />
                  contact@nunam.com
                </a>
                <a href="tel:+918012345678" className="flex items-center gap-3 text-pearl/60 hover:text-pearl/80 transition-colors text-body-small group">
                  <Phone className="w-4 h-4 group-hover:text-energy transition-colors" aria-hidden="true" />
                  +91 80 1234 5678
                </a>
              </div>
            </div>

            {/* Link Columns */}
            <div className="lg:col-span-2">
              <FooterLinkColumn
                title="Products"
                links={[
                  { to: "/residential", label: "Home Solutions" },
                  { to: "/commercial", label: "Commercial" },
                  { to: "/technology", label: "Technology" },
                  { to: "/warranty", label: "Warranty" },
                ]}
              />
            </div>
            <div className="lg:col-span-2">
              <FooterLinkColumn
                title="Company"
                links={[
                  { to: "/about", label: "About" },
                  { to: "/news", label: "News" },
                  { to: "/hiring", label: "Careers" },
                  { to: "/contact", label: "Contact" },
                ]}
              />
            </div>
            <div className="lg:col-span-2">
              <FooterLinkColumn
                title="Support"
                links={[
                  { to: "/find-installer", label: "Find Installer" },
                  { to: "/installers", label: "For Installers" },
                  { to: "/knowledge-hub", label: "Knowledge Hub" },
                  { to: "/downloads", label: "Downloads" },
                ]}
              />
            </div>

            {/* Address */}
            <div className="lg:col-span-2">
              <h4 className="text-caption uppercase tracking-[0.15em] text-pearl/50 mb-5 font-medium">Location</h4>
              <div className="flex items-start gap-2 text-pearl/60 text-body-small leading-relaxed">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>
                  Veerasandra Industrial Area,
                  <br />Electronic City Phase 2,
                  <br />Bengaluru 560100
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-pearl/[0.06]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Legal */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-caption text-pearl/30">
                <Link to="/privacy" className="hover:text-pearl/60 transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-pearl/60 transition-colors">Terms</Link>
                <Link to="/cookie-policy" className="hover:text-pearl/60 transition-colors">Cookies</Link>
                <span>© {new Date().getFullYear()} NESS by Nunam</span>
              </div>

              {/* Social */}
              <div className="flex gap-3">
                {[
                  { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
                  { href: "https://twitter.com", Icon: Twitter, label: "Twitter" },
                  { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
                  { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-pearl/[0.08] hover:border-pearl/20 hover:bg-pearl/[0.04] flex items-center justify-center transition-all duration-300 text-pearl/30 hover:text-pearl/60"
                    aria-label={`Follow us on ${label}`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
