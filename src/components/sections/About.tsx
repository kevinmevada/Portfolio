"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, education, experience, certifications } from "@/data/content";
import { SectionIntro } from "@/components/sections/Shared";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".about-anim"),
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        <SectionIntro title="About" />
        <div ref={ref} className="grid gap-20 lg:grid-cols-[1.35fr_1fr]">
          <div className="space-y-6 text-[18px] leading-[1.65] text-[var(--text)]/88 md:text-[19px]">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 28)} className="about-anim opacity-0">
                {p}
              </p>
            ))}
          </div>

          <div className="space-y-12">
            <div className="about-anim opacity-0">
              <h3 className="mb-5 text-[13px] font-semibold tracking-[0.04em] text-[var(--faint)] uppercase">
                Experience
              </h3>
              <ul className="space-y-7">
                {experience.map((job) => (
                  <li key={job.role + job.company}>
                    <div className="text-[16px] font-semibold tracking-[-0.01em] text-[var(--text)]">
                      {job.role}
                    </div>
                    <div className="mt-1 text-[14px] text-[var(--muted)]">{job.company}</div>
                    <div className="mt-0.5 font-[family-name:var(--font-mono)] text-[12px] text-[var(--faint)]">
                      {job.dates}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-anim opacity-0">
              <h3 className="mb-5 text-[13px] font-semibold tracking-[0.04em] text-[var(--faint)] uppercase">
                Education
              </h3>
              <ul className="space-y-6">
                {education.map((ed) => (
                  <li key={ed.degree}>
                    <div className="text-[16px] font-semibold tracking-[-0.01em]">{ed.degree}</div>
                    <div className="mt-1 text-[14px] text-[var(--muted)]">
                      {ed.field} · GPA {ed.gpa}
                    </div>
                    <div className="text-[13px] text-[var(--faint)]">{ed.school}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-anim opacity-0">
              <h3 className="mb-5 text-[13px] font-semibold tracking-[0.04em] text-[var(--faint)] uppercase">
                Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((c) => (
                  <li key={c.name} className="text-[14px] text-[var(--muted)]">
                    {c.name}
                    <span className="text-[var(--faint)]"> · {c.org}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
