import { research, work } from "#site/content";

export type CaseStudy = (typeof research)[number] | (typeof work)[number];

export function getAllResearch() {
  return [...research]
    .filter((item) => item.published)
    .sort((a, b) => a.order - b.order);
}

export function getAllWork() {
  return [...work]
    .filter((item) => item.published)
    .sort((a, b) => a.order - b.order);
}

export function getResearchBySlug(slug: string) {
  return getAllResearch().find((item) => item.slug.endsWith(slug) || item.slug === slug);
}

export function getWorkBySlug(slug: string) {
  return getAllWork().find((item) => item.slug.endsWith(slug) || item.slug === slug);
}

export function getAllCaseStudies() {
  return [...getAllResearch(), ...getAllWork()];
}
