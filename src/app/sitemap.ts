import type { MetadataRoute } from "next";
import { projects } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kevinmevada.github.io";
  return [
    { url: base, lastModified: new Date() },
    ...projects.map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
