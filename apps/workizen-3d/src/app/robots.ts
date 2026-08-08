import type { MetadataRoute } from "next";

/**
 * Apex (workizen.net) robots policy.
 * The public marketing/legal pages SHOULD be indexed. Internal API routes should not.
 * Admin/infrastructure subdomains carry their own noindex policy at the proxy layer.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://workizen.net/sitemap.xml",
    host: "https://workizen.net",
  };
}
