"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroScene } from "@/components/three/HeroScene";
import { splitWords } from "@/components/ui/ScrollEffects";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !root.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const words = splitWords(titleRef.current);
        gsap.fromTo(
          words,
          { yPercent: 130, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.15,
          }
        );
      }

      gsap.fromTo(
        ".hero-line",
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.55,
        }
      );

      if (sceneRef.current) {
        gsap.to(sceneRef.current, {
          yPercent: 28,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.to(".hero-content", {
        autoAlpha: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "center top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".scroll-cue",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8, delay: 1.2 }
      );

      gsap.to(".scroll-cue", {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: root.current,
          start: "30% top",
          end: "50% top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 35%, #ffffff 0%, #f5f5f7 55%, #eef1f6 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.035) 0.6px, transparent 0.6px)",
          backgroundSize: "3px 3px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)",
        }}
      />

      <div ref={sceneRef} className="absolute inset-0 will-change-transform">
        <HeroScene />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.15) 70%, rgba(245,245,247,0.92) 100%)",
        }}
      />

      <div className="hero-content relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-16 pt-28 text-center md:px-8">
        <p className="hero-line mb-6 text-[13px] font-medium tracking-[0.02em] text-[var(--muted)] opacity-0">
          {site.role}
        </p>

        <h1
          ref={titleRef}
          className="display text-[clamp(3.6rem,12vw,8.5rem)] leading-[0.9] text-[var(--text)]"
        >
          {site.name}
        </h1>

        <p className="hero-line mt-7 max-w-md text-[17px] leading-relaxed text-[var(--muted)] opacity-0 md:text-[19px]">
          {site.tagline}
        </p>

        <div className="hero-line mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0">
          <MagneticButton href="#research">Explore the work</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in touch
          </MagneticButton>
        </div>
      </div>

      <div className="scroll-cue absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0">
        <span className="text-[11px] font-medium tracking-[0.14em] text-[var(--faint)] uppercase">
          Scroll
        </span>
        <span className="block h-10 w-px origin-top animate-pulse bg-[var(--text)]/25" />
      </div>
    </section>
  );
}
