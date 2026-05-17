import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://ness.energy";

interface RouteMeta {
  title: string;
  description: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "NESS Energy Systems — Premium Battery Storage Solutions",
    description:
      "NESS designs advanced lithium battery storage for homes, businesses, and EV/microgrid sites — engineered for performance, backed by a true warranty.",
  },
  "/commercial": {
    title: "Commercial & Industrial Battery Storage | NESS Energy",
    description:
      "Reliable C&I battery energy storage for factories, offices, and critical facilities. Reduce demand charges and ensure uninterrupted operations.",
  },
  "/commercial-enhanced": {
    title: "Commercial Battery Storage Systems | NESS Energy",
    description:
      "Scalable commercial battery storage engineered for performance, safety, and long service life.",
  },
  "/ci": {
    title: "Commercial Battery Storage | NESS Energy",
    description:
      "Commercial and industrial battery storage solutions from NESS Energy.",
  },
  "/homeowners": {
    title: "Home Battery Storage & Backup Power | NESS Energy",
    description:
      "Premium residential battery storage that keeps your home powered, lowers bills, and pairs seamlessly with solar.",
  },
  "/residential": {
    title: "Residential Battery Storage | NESS Energy",
    description:
      "Residential battery storage and solar backup systems for Indian homes.",
  },
  "/installers": {
    title: "Become a NESS Certified Installer",
    description:
      "Join the NESS installer network. Training, certification, and ongoing support for solar and storage professionals.",
  },
  "/installers-enhanced": {
    title: "NESS Installer Program",
    description:
      "Tools, training, and incentives for certified NESS battery storage installers.",
  },
  "/find-installer": {
    title: "Find a NESS Certified Installer Near You",
    description:
      "Locate trained NESS installers across India for residential and commercial battery storage installation.",
  },
  "/products/ness-ac-sync": {
    title: "NESS AC Sync — AC-Coupled Hybrid Storage System",
    description:
      "NESS AC Sync is an AC-coupled hybrid battery storage system delivering reliable backup, solar integration, and intelligent energy management.",
    type: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "NESS AC Sync",
      description:
        "AC-coupled hybrid battery storage system for residential and commercial use.",
      brand: { "@type": "Brand", name: "NESS Energy Systems" },
    },
  },
  "/ev-charging-microgrid": {
    title: "EV Charging & Microgrid Solutions | NESS Energy",
    description:
      "Battery-backed EV charging and microgrid systems for resilient, low-cost electrification.",
  },
  "/warranty": {
    title: "NESS True Warranty — Real Coverage You Can Trust",
    description:
      "Learn about the NESS True Warranty: transparent terms, real performance guarantees, and long-term protection.",
  },
  "/company/about": {
    title: "About NESS Energy — Engineering the Future of Storage",
    description:
      "Meet the team and R&D behind NESS Energy. 30,000+ cells tested, 5M+ data points, and a relentless focus on quality.",
  },
  "/company/news": {
    title: "News & Announcements | NESS Energy",
    description:
      "Press releases, product launches, and company updates from NESS Energy Systems.",
  },
  "/knowledge": {
    title: "Knowledge Hub — Battery Storage Guides | NESS Energy",
    description:
      "Articles, guides, and explainers on battery storage, solar integration, and energy resilience.",
  },
  "/knowledge-hub": {
    title: "Knowledge Hub | NESS Energy",
    description:
      "Educational resources on battery storage and renewable energy.",
  },
  "/downloads": {
    title: "Downloads — Datasheets & Manuals | NESS Energy",
    description:
      "Download product datasheets, installation manuals, and brochures for NESS battery storage systems.",
  },
  "/contact": {
    title: "Contact NESS Energy",
    description:
      "Get in touch with NESS Energy for product inquiries, partnerships, and support.",
  },
  "/contact-enhanced": {
    title: "Contact NESS Energy",
    description: "Reach out to the NESS Energy team.",
  },
  "/contact/homeowner": {
    title: "Homeowner Inquiry | NESS Energy",
    description:
      "Tell us about your home and we'll recommend the right NESS battery storage solution.",
  },
  "/contact/installer": {
    title: "Installer Inquiry | NESS Energy",
    description:
      "Apply to become a certified NESS installer and grow your storage business.",
  },
  "/contact/distributor": {
    title: "Distributor Partnership | NESS Energy",
    description:
      "Partner with NESS Energy as a regional distributor for battery storage systems.",
  },
  "/careers": {
    title: "Careers at NESS Energy",
    description:
      "Join NESS Energy. Open roles in engineering, operations, and growth.",
  },
  "/hiring": {
    title: "Careers at NESS Energy",
    description: "Open roles at NESS Energy.",
  },
  "/install": {
    title: "Install the NESS App",
    description: "Add the NESS web app to your home screen.",
  },
  "/support/troubleshooting": {
    title: "Troubleshooting | NESS Energy Support",
    description:
      "Step-by-step troubleshooting guides for NESS battery storage products.",
  },
  "/troubleshooting": {
    title: "Troubleshooting | NESS Energy Support",
    description: "NESS troubleshooting guides.",
  },
  "/cookie-policy": {
    title: "Cookie Policy | NESS Energy",
    description: "How NESS Energy uses cookies and similar technologies.",
  },
};

const FALLBACK: RouteMeta = ROUTE_META["/"];

const RouteSEO = () => {
  const { pathname } = useLocation();
  // Strip trailing slash (except root) and try direct match, then prefix match for dynamic routes
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  let meta: RouteMeta | undefined = ROUTE_META[normalized];

  if (!meta) {
    if (normalized.startsWith("/knowledge/")) {
      const slug = normalized.split("/").pop() || "";
      meta = {
        title: `${slug.replace(/-/g, " ")} | NESS Knowledge Hub`,
        description:
          "In-depth article on battery storage, solar, and energy resilience from NESS Energy.",
        type: "article",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: slug.replace(/-/g, " "),
          publisher: { "@type": "Organization", name: "NESS Energy Systems" },
        },
      };
    } else if (normalized.startsWith("/company/news/")) {
      const slug = normalized.split("/").pop() || "";
      meta = {
        title: `${slug.replace(/-/g, " ")} | NESS News`,
        description: "Latest news and announcements from NESS Energy Systems.",
        type: "article",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: slug.replace(/-/g, " "),
          publisher: { "@type": "Organization", name: "NESS Energy Systems" },
        },
      };
    } else if (normalized.startsWith("/support/troubleshooting/")) {
      meta = {
        title: "Troubleshooting Guide | NESS Support",
        description: "Detailed troubleshooting guide for NESS products.",
      };
    } else {
      meta = FALLBACK;
    }
  }

  const url = `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
  const ldArray = meta.jsonLd
    ? Array.isArray(meta.jsonLd)
      ? meta.jsonLd
      : [meta.jsonLd]
    : [];

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={meta.type || "website"} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default RouteSEO;
