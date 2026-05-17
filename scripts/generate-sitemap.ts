// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://ness.energy";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/commercial", changefreq: "monthly", priority: "0.9" },
  { path: "/homeowners", changefreq: "monthly", priority: "0.9" },
  { path: "/installers", changefreq: "monthly", priority: "0.8" },
  { path: "/find-installer", changefreq: "monthly", priority: "0.7" },
  { path: "/products/ness-ac-sync", changefreq: "monthly", priority: "0.9" },
  { path: "/ev-charging-microgrid", changefreq: "monthly", priority: "0.8" },
  { path: "/warranty", changefreq: "yearly", priority: "0.6" },
  { path: "/company/about", changefreq: "monthly", priority: "0.7" },
  { path: "/company/news", changefreq: "weekly", priority: "0.6" },
  { path: "/knowledge", changefreq: "weekly", priority: "0.7" },
  { path: "/downloads", changefreq: "monthly", priority: "0.5" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
  { path: "/careers", changefreq: "weekly", priority: "0.6" },
  { path: "/support/troubleshooting", changefreq: "monthly", priority: "0.5" },
  { path: "/cookie-policy", changefreq: "yearly", priority: "0.3" },
];

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ].filter(Boolean).join("\n")
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
