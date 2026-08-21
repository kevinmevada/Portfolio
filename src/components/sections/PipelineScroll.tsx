"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  steps: string[];
};

export function PipelineScroll({ steps }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = wrapRef.current?.querySelectorAll(".pipe-step");
      if (!items?.length) return;

      gsap.fromTo(
        items,
        { opacity: 0.2, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.5,
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [steps]);

  return (
    <div ref={wrapRef} className="mt-16">
      <h2 className="mb-8 text-[22px] font-semibold tracking-[-0.02em] text-[var(--text)]">
        Pipeline
      </h2>
      <div className="relative">
        <div className="absolute bottom-4 left-[15px] top-4 w-px bg-[var(--line)]" aria-hidden />
        {steps.map((step, i) => (
          <div key={step} className="pipe-step relative flex items-start gap-5 py-4">
            <div className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] font-[family-name:var(--font-mono)] text-[12px] text-[var(--blue)]">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="pt-1 text-[18px] font-semibold tracking-[-0.02em] text-[var(--text)]">
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
