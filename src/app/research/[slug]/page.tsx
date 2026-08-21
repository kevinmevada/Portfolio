import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllResearch, getResearchBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllResearch().map((item) => ({
    slug: item.slug.split("/").pop()!,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getResearchBySlug(slug);
  if (!item) return {};
  return { title: `${item.title} — Kevin Mevada`, description: item.summary };
}

export default async function ResearchCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getResearchBySlug(slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-24">
      <Link href="/" className="text-primary hover:underline">
        ← Foundation
      </Link>
      <p className="mt-8 font-[family-name:var(--font-mono)] text-[length:var(--step-0)] text-muted uppercase">
        Research · MDX
      </p>
      <h1 className="mt-2 text-[length:var(--step-6)] font-semibold tracking-tight text-text">
        {item.title}
      </h1>
      <p className="mt-4 text-muted">{item.summary}</p>
      <p className="mt-8 text-[length:var(--step-1)] text-muted">
        Body content renders from Velite MDX in later phases. Frontmatter is live.
      </p>
    </article>
  );
}
