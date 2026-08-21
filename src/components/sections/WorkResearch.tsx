"use client";

import { projects, stack } from "@/data/content";
import { ProjectFeature, SectionIntro, TechMarquee } from "@/components/sections/Shared";

export function ResearchSection() {
  const items = projects.filter((p) => p.category === "research");
  return (
    <section id="research" className="bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        <SectionIntro
          title="Selected research"
          subtitle="Systems where the metric leads — then the method, then the honest limits."
        />
        <div>
          {items.map((project, i) => (
            <ProjectFeature key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkSection() {
  const items = projects.filter((p) => p.category === "work");
  const allTools = stack.flatMap((g) => g.items);

  return (
    <section id="work" className="bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        <SectionIntro
          title="Selected work"
          subtitle="Production deployments across fraud, credit risk, GenAI support, and churn."
        />
        <div>
          {items.map((project, i) => (
            <ProjectFeature key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
      <TechMarquee items={allTools} />
    </section>
  );
}
