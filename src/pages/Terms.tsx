import Layout from "@/components/Layout";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-foreground mb-4">
              Terms of Use
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: May 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">1. Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing <strong>ness.energy</strong> you agree to these Terms of Use. If you do not
                agree, please stop using the site. These terms are governed by the laws of India and the
                jurisdiction of the courts of Bengaluru, Karnataka.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">2. Use of This Site</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This website is operated by Nunam Pvt. Ltd. ("NESS", "we", "us"). You may use the site for
                lawful purposes only. You must not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Scrape, copy, or redistribute our content without written permission</li>
                <li>Attempt to gain unauthorised access to any part of the site or its systems</li>
                <li>Use the site in any way that could damage, disable, or impair it</li>
                <li>Submit false information through our contact or enquiry forms</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">3. Product Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Product specifications, pricing, and availability shown on this site are indicative and
                subject to change without notice. Final specifications are confirmed at the time of order.
                NESS makes no representation that products described are available in all locations.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this site — including text, images, product designs, logos, and technical
                documentation — is the property of Nunam Pvt. Ltd. or its licensors and is protected by
                applicable intellectual property laws. You may not reproduce or distribute any content
                without our prior written consent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, NESS and Nunam Pvt. Ltd. are not liable for any
                indirect, incidental, or consequential loss arising from your use of this website or
                reliance on information contained herein. Our total liability shall not exceed INR 10,000
                in any case.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">6. Links to Third Parties</h2>
              <p className="text-muted-foreground leading-relaxed">
                This site may contain links to third-party websites. These are provided for convenience
                only. NESS has no control over the content of those sites and accepts no responsibility for
                them.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">7. Changes to These Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update these Terms of Use from time to time. Continued use of the site after changes
                are published constitutes acceptance of the revised terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about these terms? Email us at{" "}
                <a href="mailto:contact@nunam.com" className="text-primary hover:underline">
                  contact@nunam.com
                </a>
                {" "}or write to Nunam Pvt. Ltd., Veerasandra Industrial Area, Electronic City Phase 2,
                Bengaluru 560100, India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
