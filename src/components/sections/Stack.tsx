"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stack } from "@/data/content";
import { SectionIntro } from "@/components/sections/Shared";

gsap.registerPlugin(ScrollTrigger);

export function StackSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".stack-col"),
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" className="bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        <SectionIntro
          title="Technical stack"
          subtitle="Tools folded into the work — not a wall of badges."
        />
        <div ref={ref} className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((group) => (
            <div key={group.group} className="stack-col opacity-0">
              <h3 className="mb-4 text-[13px] font-semibold tracking-[0.04em] text-[var(--faint)] uppercase">
                {group.group}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-[16px] tracking-[-0.01em] text-[var(--text)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
