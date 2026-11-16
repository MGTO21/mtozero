import { MetadataRoute } from "next";
import { getBlogPosts, getPortfolio, getSaasProducts, getServices } from "@/lib/content";

const BASE = "https://mtozero.com";
const LOCALES = ["ar", "en"] as const;

export const revalidate = 3600;

type Entry = { path: string; lastModified?: string; priority: number };

function expand(entries: Entry[]): MetadataRoute.Sitemap {
  return entries.flatMap((e) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}${e.path}`,
      lastModified: e.lastModified ? new Date(e.lastModified) : new Date(),
      priority: e.priority,
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE}/${l}${e.path}`])) },
    })),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts, products, services] = await Promise.all([getPortfolio(), getBlogPosts(), getSaasProducts(), getServices()]);
  const stamp = (d: { updated_at?: string; created_at?: string }) => d.updated_at || d.created_at;

  return expand([
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/portfolio", priority: 0.9 },
    { path: "/saas", priority: 0.9 },
    { path: "/blog", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/quote", priority: 0.8 },
    ...services.map((s) => ({ path: `/services/${s.id}`, lastModified: stamp(s), priority: 0.7 })),
    ...products.map((p) => ({ path: `/saas/${p.slug}`, lastModified: stamp(p), priority: 0.8 })),
    ...projects.map((p) => ({ path: `/portfolio/${p.id}`, lastModified: stamp(p), priority: 0.7 })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastModified: stamp(p), priority: 0.6 })),
  ]);
}
