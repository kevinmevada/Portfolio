"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export function MagneticButton({ href, children, variant = "primary" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 18, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        x.set(dx * 0.28);
        y.set(dy * 0.28);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  const external = href.startsWith("http");

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      whileTap={{ scale: 0.96 }}
      className={
        variant === "primary"
          ? "inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[var(--blue-hover)]"
          : "inline-flex items-center justify-center rounded-full bg-[var(--surface)] px-7 py-3.5 text-[15px] font-medium text-[var(--blue)] transition-colors hover:bg-[#e8e8ed]"
      }
    >
      {children}
    </motion.a>
  );
}
