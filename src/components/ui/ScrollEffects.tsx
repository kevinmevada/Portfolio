"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Split element text into word spans for mask reveals */
export function splitWords(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.textContent = "";
  el.setAttribute("aria-label", text);

  const words = text.split(/(\s+)/);
  words.forEach((chunk) => {
    if (/^\s+$/.test(chunk)) {
      el.appendChild(document.createTextNode(chunk));
      return;
    }
    const wrap = document.createElement("span");
    wrap.className = "word-mask";
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.verticalAlign = "bottom";
    const inner = document.createElement("span");
    inner.className = "word-inner";
    inner.style.display = "inline-block";
    inner.textContent = chunk;
    wrap.appendChild(inner);
    el.appendChild(wrap);
  });

  return el.querySelectorAll<HTMLElement>(".word-inner");
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "h2" | "h3" | "p" | "section";
  y?: number;
  delay?: number;
  scrub?: boolean | number;
};

export function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  y = 64,
  delay = 0,
  scrub = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;

    const ctx = gsap.context(() => {
      if (scrub) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 55%",
              scrub: typeof scrub === "number" ? scrub : 0.6,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [y, delay, scrub]);

  return (
    <Tag ref={ref as never} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}

export function WordReveal({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) {
      if (el) el.style.opacity = "1";
      return;
    }

    const words = splitWords(el);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 120, rotate: 4 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          stagger: 0.045,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [children]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

export function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced()) {
      el.textContent = value;
      return;
    }

    const numeric = value.replace(/[^0-9.]/g, "");
    const suffix = value.replace(/[0-9.,]/g, "");
    const prefix = value.match(/^[^\d]*/)?.[0] ?? "";
    const end = parseFloat(numeric);

    if (Number.isNaN(end)) {
      el.textContent = value;
      return;
    }

    const decimals = numeric.includes(".") ? (numeric.split(".")[1]?.length ?? 0) : 0;
    const obj = { n: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: end,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          const n = decimals ? obj.n.toFixed(decimals) : Math.round(obj.n).toString();
          el.textContent = `${prefix}${n}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-transparent">
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-[var(--blue)]"
      />
    </div>
  );
}
