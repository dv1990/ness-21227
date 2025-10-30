import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background border-t border-border/10">
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
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@nunam.com" className="hover:text-background transition-colors">
                  contact@nunam.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-4 h-4" />
                <a href="tel:+911234567890" className="hover:text-background transition-colors">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
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
              <span>© 2024 NESS by Nunam. All rights reserved.</span>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
