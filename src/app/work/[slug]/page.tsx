import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/content";
import { BenchmarkStrip } from "@/components/sections/Shared";
import { PipelineScroll } from "@/components/sections/PipelineScroll";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Kevin Mevada`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-8">
      <Link
        href="/#work"
        className="text-[14px] font-medium text-[var(--blue)] transition-opacity hover:opacity-70"
      >
        ← Back
      </Link>

      <h1 className="display mt-12 text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] text-[var(--text)]">
        {project.title}
      </h1>
      <p className="mt-6 text-[18px] leading-relaxed text-[var(--muted)]">{project.summary}</p>

      <BenchmarkStrip metrics={project.metrics} />
      <PipelineScroll steps={project.pipeline} />

      <section className="mt-16">
        <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[var(--text)]">Methods</h2>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--muted)]">{project.methods}</p>
      </section>

      <section className="mt-12 border-t border-[var(--line)] pt-10">
        <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Limitations
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--muted)]">{project.limitations}</p>
      </section>
    </article>
  );
}
