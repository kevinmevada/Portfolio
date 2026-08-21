import Link from "next/link";
import { site } from "@/data/site";
import { getAllResearch, getAllWork } from "@/lib/content";

/**
 * Phase 1 — empty shell.
 * Tokens + MDX content wired. No visual design yet.
 */
export default function HomePage() {
  const research = getAllResearch();
  const work = getAllWork();

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <p
        className="font-[family-name:var(--font-mono)] text-[length:var(--step-0)] tracking-widest text-muted uppercase"
      >
        Phase 1 · Foundation
      </p>
      <h1 className="mt-4 text-[length:var(--step-7)] font-semibold tracking-tight text-text">
        {site.name}
      </h1>
      <p className="mt-2 text-muted">{site.role}</p>
      <p className="mt-8 text-[length:var(--step-2)] leading-relaxed text-muted">
        Empty Next.js shell. Design tokens (Museum White / Luxury AI Laboratory) and Velite MDX
        pipeline are in place. Visual design starts in Phase 2.
      </p>

      <section className="mt-16 border-t border-border pt-8">
        <h2 className="text-[length:var(--step-3)] font-semibold text-primary">Research (MDX)</h2>
        <ul className="mt-4 space-y-2">
          {research.map((item) => (
            <li key={item.slug}>
              <Link href={item.permalink} className="text-text underline-offset-4 hover:underline">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-border pt-8">
        <h2 className="text-[length:var(--step-3)] font-semibold text-primary">Work (MDX)</h2>
        <ul className="mt-4 space-y-2">
          {work.map((item) => (
            <li key={item.slug}>
              <Link href={item.permalink} className="text-text underline-offset-4 hover:underline">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
