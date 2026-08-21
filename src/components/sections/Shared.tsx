"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/content";
import { CountUp, WordReveal } from "@/components/ui/ScrollEffects";

gsap.registerPlugin(ScrollTrigger);

export function SectionIntro({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = subRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="mb-16 max-w-3xl md:mb-20">
      <WordReveal
        as="h2"
        className="display text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.02] text-[var(--text)]"
      >
        {title}
      </WordReveal>
      {subtitle && (
        <p
          ref={subRef}
          className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--muted)] opacity-0"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const lead = project.metrics[0];
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".pf-anim"),
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.08,
          ease: "power3.out",
          delay: index * 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power2.out",
            duration: 1.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [index]);

  return (
    <article ref={ref} className="group relative py-14 md:py-16">
      <div
        ref={lineRef}
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--line)]"
      />
      <Link
        href={`/work/${project.slug}`}
        className="grid items-start gap-8 outline-none md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16"
      >
        <div>
          <h3 className="pf-anim text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--text)] opacity-0 transition-colors duration-300 group-hover:text-[var(--blue)]">
            {project.title}
          </h3>
          <p className="pf-anim mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--muted)] opacity-0 md:text-[17px]">
            {project.summary}
          </p>
          <div className="pf-anim mt-6 flex items-center gap-2 text-[14px] font-medium text-[var(--blue)] opacity-0">
            <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--blue)] after:transition-transform after:duration-300 group-hover:after:scale-x-100">
              View case study
            </span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </div>
        </div>

        <div className="pf-anim flex items-start justify-between gap-6 opacity-0 md:justify-end md:pt-1">
          <div className="text-left md:text-right">
            <CountUp
              value={lead.value}
              className="font-[family-name:var(--font-mono)] text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-none tracking-[-0.04em] text-[var(--text)]"
            />
            <div className="mt-2 text-[13px] text-[var(--faint)]">{lead.label}</div>
          </div>
          <div className="hidden space-y-4 sm:block md:min-w-[120px]">
            {project.metrics.slice(1).map((m) => (
              <div key={m.label} className="md:text-right">
                <CountUp
                  value={m.value}
                  className="font-[family-name:var(--font-mono)] text-[18px] font-medium tracking-[-0.02em] text-[var(--text)]"
                />
                <div className="text-[12px] text-[var(--faint)]">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

export function BenchmarkStrip({ metrics }: { metrics: Project["metrics"] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".bm"),
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mt-12 grid grid-cols-3 gap-6 border-y border-[var(--line)] py-8">
      {metrics.map((m) => (
        <div key={m.label} className="bm opacity-0">
          <CountUp
            value={m.value}
            className="font-[family-name:var(--font-mono)] text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium tracking-[-0.03em] text-[var(--text)]"
          />
          <div className="mt-2 text-[13px] text-[var(--faint)]">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

/** Horizontal scrubbed tech ticker */
export function TechMarquee({ items }: { items: string[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const row = track.current;
    if (!el || !row || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const total = row.scrollWidth / 2;
      gsap.to(row, {
        x: -total,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [items]);

  const doubled = [...items, ...items];

  return (
    <div ref={wrap} className="overflow-hidden border-y border-[var(--line)] py-8">
      <div ref={track} className="flex w-max gap-10 will-change-transform">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-[var(--text)]/80"
          >
            {item}
            <span className="ml-10 text-[var(--faint)]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
