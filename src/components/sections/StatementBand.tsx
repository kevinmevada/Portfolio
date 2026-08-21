"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Pinned statement band between sections */
export function StatementBand() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const line = el.querySelector(".statement-line");
      const words = el.querySelectorAll(".sw");

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        animation: gsap
          .timeline()
          .fromTo(
            words,
            { autoAlpha: 0.12, y: 30 },
            { autoAlpha: 1, y: 0, stagger: 0.08, ease: "none" }
          )
          .fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, ease: "none" },
            0.2
          ),
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const phrase = ["Research", "that", "ships.", "Systems", "that", "scale."];

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-[var(--text)] text-white"
    >
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <p className="display text-[clamp(2.4rem,7vw,5.5rem)] leading-[1.05]">
          {phrase.map((w) => (
            <span key={w} className="sw mr-[0.28em] inline-block opacity-[0.12]">
              {w}
            </span>
          ))}
        </p>
        <div className="statement-line mx-auto mt-10 h-px w-40 origin-left scale-x-0 bg-white/40" />
      </div>
    </section>
  );
}
