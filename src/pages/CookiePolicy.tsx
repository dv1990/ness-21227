import Layout from "@/components/Layout";
import { Cookie, Shield, Eye, Settings } from "lucide-react";

const CookiePolicy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-charcoal py-20">
        <div className="max-w-4xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-energy/20 mb-6">
              <Cookie className="w-8 h-8 text-energy" />
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-pearl mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-pearl/60">
              Last updated: January 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-light text-pearl mb-4">
                What Are Cookies?
              </h2>
              <p className="text-pearl/60 leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit
                our website. They are widely used to make websites work more efficiently and provide information
                to website owners.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-light text-pearl mb-4">
                How We Use Cookies
              </h2>
              <p className="text-pearl/60 leading-relaxed mb-6">
                NESS uses cookies to improve your experience on our website and to understand how our site is used.
                We use different types of cookies for different purposes:
              </p>

              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border border-pearl/10 rounded-xl p-6 bg-pearl/[0.03]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-energy/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-energy" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-pearl mb-2">
                        Essential Cookies
                      </h3>
                      <p className="text-pearl/60 leading-relaxed mb-3">
                        These cookies are necessary for the website to function properly. They enable basic
                        functions like page navigation, access to secure areas, and remembering your cookie preferences.
                      </p>
                      <p className="text-sm text-pearl/40">
                        <strong className="text-pearl">Cannot be disabled:</strong> These cookies are essential for site functionality.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-pearl/10 rounded-xl p-6 bg-pearl/[0.03]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-energy/20 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-6 h-6 text-energy" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-pearl mb-2">
                        Analytics Cookies
                      </h3>
                      <p className="text-pearl/60 leading-relaxed mb-3">
                        These cookies help us understand how visitors interact with our website by collecting
                        and reporting information anonymously. This helps us improve our website's performance
                        and user experience.
                      </p>
                      <p className="text-sm text-pearl/40">
                        <strong className="text-pearl">Can be disabled:</strong> You can opt out of these cookies.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border border-pearl/10 rounded-xl p-6 bg-pearl/[0.03]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-energy/20 flex items-center justify-center flex-shrink-0">
                      <Settings className="w-6 h-6 text-energy" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-pearl mb-2">
                        Functional Cookies
                      </h3>
                      <p className="text-pearl/60 leading-relaxed mb-3">
                        These cookies enable enhanced functionality and personalization, such as remembering
                        your preferences, language settings, and region. They may be set by us or by third-party
                        providers.
                      </p>
                      <p className="text-sm text-pearl/40">
                        <strong className="text-pearl">Can be disabled:</strong> Disabling may affect website functionality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-light text-pearl mb-4">
                Third-Party Cookies
              </h2>
              <p className="text-pearl/60 leading-relaxed mb-4">
                In addition to our own cookies, we may use third-party cookies to provide enhanced functionality
                and analyze site usage. These may include:
              </p>
              <ul className="space-y-2 text-pearl/60">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy mt-2 flex-shrink-0"></span>
                  <span><strong className="text-pearl">Google Analytics:</strong> To understand how visitors use our website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy mt-2 flex-shrink-0"></span>
                  <span><strong className="text-pearl">Social Media Platforms:</strong> To enable social sharing features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy mt-2 flex-shrink-0"></span>
                  <span><strong className="text-pearl">Marketing Partners:</strong> To deliver relevant advertisements</span>
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-light text-pearl mb-4">
                Managing Your Cookie Preferences
              </h2>
              <p className="text-pearl/60 leading-relaxed mb-4">
                You have the right to decide whether to accept or reject cookies. You can manage your cookie
                preferences through:
              </p>
              <ul className="space-y-2 text-pearl/60 mb-6">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy mt-2 flex-shrink-0"></span>
                  <span><strong className="text-pearl">Cookie Banner:</strong> When you first visit our website, you can choose to accept or decline cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy mt-2 flex-shrink-0"></span>
                  <span><strong className="text-pearl">Browser Settings:</strong> Most web browsers allow you to control cookies through their settings</span>
                </li>
              </ul>
              <div className="bg-pearl/[0.03] border border-pearl/10 rounded-xl p-6">
                <p className="text-sm text-pearl/60 leading-relaxed">
                  <strong className="text-pearl">Please note:</strong> If you disable cookies, some features
                  of our website may not function properly, and your user experience may be affected.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-light text-pearl mb-4">
                Browser-Specific Cookie Management
              </h2>
              <p className="text-pearl/60 leading-relaxed mb-4">
                You can manage cookies through your browser settings:
              </p>
              <ul className="space-y-2 text-pearl/60">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy mt-2 flex-shrink-0"></span>
                  <span><strong className="text-pearl">Chrome:</strong> Settings → Privacy and security → Cookies and other site data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy mt-2 flex-shrink-0"></span>
                  <span><strong className="text-pearl">Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy mt-2 flex-shrink-0"></span>
                  <span><strong className="text-pearl">Safari:</strong> Preferences → Privacy → Cookies and website data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy mt-2 flex-shrink-0"></span>
                  <span><strong className="text-pearl">Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</span>
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-light text-pearl mb-4">
                Updates to This Policy
              </h2>
              <p className="text-pearl/60 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for
                legal, operational, or regulatory reasons. We encourage you to review this page periodically
                for the latest information on our cookie practices.
              </p>
            </section>

            <section className="mb-12 bg-pearl/[0.03] border border-pearl/10 rounded-xl p-8">
              <h2 className="text-3xl font-light text-pearl mb-4">
                Contact Us
              </h2>
              <p className="text-pearl/60 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
              <div className="space-y-2 text-pearl/60">
                <p><strong className="text-pearl">Email:</strong> privacy@ness.energy</p>
                <p><strong className="text-pearl">Phone:</strong> +91 123 456 7890</p>
                <p><strong className="text-pearl">Address:</strong> NESS Energy Solutions, Mumbai, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
