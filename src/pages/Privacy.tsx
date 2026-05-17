import Layout from "@/components/Layout";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: May 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NESS Energy Systems is a brand of Nunam Pvt. Ltd., incorporated in India. Our registered
                address is Veerasandra Industrial Area, Electronic City Phase 2, Bengaluru 560100, Karnataka,
                India. We design and supply lithium battery energy storage systems for residential and
                commercial applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy explains how we collect, use, and protect your personal data when you
                visit <strong>ness.energy</strong> or contact us about our products.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">Data We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect personal data only when you actively provide it — for example, when you submit a
                contact form, request a quote, or sign up for installer certification. This may include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Name and contact details (email, phone)</li>
                <li>Property or business address (for installation estimates)</li>
                <li>Technical requirements (system size, existing solar setup)</li>
                <li>Company name and role (for installer and distributor enquiries)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We also collect standard web analytics data (page views, referrers, device type) through
                privacy-preserving analytics tools. This data is aggregated and not linked to individuals.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">How We Use Your Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use your data to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Respond to enquiries and provide product recommendations</li>
                <li>Process installer certification applications</li>
                <li>Send product updates or service communications (with your consent)</li>
                <li>Improve our website and products based on aggregated usage data</li>
                <li>Comply with legal obligations under Indian law (IT Act 2000 and rules thereunder)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your data only as long as necessary to fulfil the purpose for which it was
                collected, or as required by law. Contact form submissions are retained for 24 months.
                You may request deletion at any time by emailing{" "}
                <a href="mailto:contact@nunam.com" className="text-primary hover:underline">
                  contact@nunam.com
                </a>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under applicable Indian data protection law, you have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for marketing communications at any time</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:contact@nunam.com" className="text-primary hover:underline">
                  contact@nunam.com
                </a>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies to improve your browsing experience. See our{" "}
                <a href="/cookie-policy" className="text-primary hover:underline">
                  Cookie Policy
                </a>{" "}
                for full details.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy-related queries, write to us at{" "}
                <a href="mailto:contact@nunam.com" className="text-primary hover:underline">
                  contact@nunam.com
                </a>{" "}
                or by post to Nunam Pvt. Ltd., Veerasandra Industrial Area, Electronic City Phase 2,
                Bengaluru 560100, India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
