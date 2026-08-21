"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WordReveal } from "@/components/ui/ScrollEffects";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".contact-anim"),
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-40">
        <WordReveal
          as="h2"
          className="display max-w-3xl text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.98] text-[var(--text)]"
        >
          Let&apos;s build something real.
        </WordReveal>
        <p className="contact-anim mt-6 max-w-lg text-[17px] leading-relaxed text-[var(--muted)] opacity-0 md:text-[18px]">
          Open to full-time roles, internships, and research collaborations in AI/ML, MLOps, and
          GenAI deployment.
        </p>
        <div className="contact-anim mt-12 flex flex-wrap gap-3 opacity-0">
          <MagneticButton href={`mailto:${site.email}`}>Email me</MagneticButton>
          <MagneticButton href={site.linkedin} variant="ghost">
            LinkedIn
          </MagneticButton>
          <MagneticButton href={site.github} variant="ghost">
            GitHub
          </MagneticButton>
        </div>
        <div className="contact-anim mt-14 flex flex-wrap gap-x-10 gap-y-3 text-[14px] text-[var(--faint)] opacity-0">
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-[var(--blue)]">
            {site.email}
          </a>
          <a
            href={`tel:${site.phone.replace(/-/g, "")}`}
            className="transition-colors hover:text-[var(--blue)]"
          >
            {site.phone}
          </a>
          <span>{site.location}</span>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-[13px] text-[var(--faint)] md:px-10">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>
          {site.location} · {site.role}
        </span>
      </div>
    </footer>
  );
}
