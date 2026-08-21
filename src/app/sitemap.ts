import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/content";

const base = "https://kevinmevada.github.io/Portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, lastModified: new Date() },
    ...getAllCaseStudies().map((item) => ({
      url: `${base}${item.permalink}/`,
      lastModified: new Date(),
    })),
  ];
}
