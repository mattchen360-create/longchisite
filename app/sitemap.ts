import type { MetadataRoute } from "next";
import { site, solutions, products } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/solutions/",
    "/products/",
    "/about/",
    "/resources/",
    "/contact/",
    "/privacy/",
    ...solutions.map((s) => `/solutions/${s.slug}/`),
    ...products.map((p) => `/products/${p.slug}/`),
  ].map((path) => ({
    url: `${site.origin}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : path.startsWith("/solutions/") ? 0.9 : 0.7,
  }));
}
