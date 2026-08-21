import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kevinmevada.vercel.app";
  return [
    { url: base, lastModified: new Date() },
    ...getAllCaseStudies().map((item) => ({
      url: `${base}${item.permalink}`,
      lastModified: new Date(),
    })),
  ];
}
