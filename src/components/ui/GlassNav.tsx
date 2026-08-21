"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { site } from "@/data/content";

const links = [
  { href: "#research", label: "Research" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function GlassNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3">
      <motion.nav
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.45)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.06)"
            : "0 1px 0 rgba(255,255,255,0.4)",
        }}
        transition={{ duration: 0.35 }}
        className="flex w-full max-w-[720px] items-center justify-between rounded-full border border-white/60 px-5 py-2.5 backdrop-blur-2xl backdrop-saturate-150"
        style={{ WebkitBackdropFilter: "blur(28px) saturate(180%)" }}
      >
        <a
          href="#hero"
          className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--text)]"
        >
          {site.name}
        </a>
        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 text-[12px] font-medium text-[var(--muted)] transition-colors duration-300 hover:text-[var(--text)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-[var(--blue)] px-3.5 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[var(--blue-hover)]"
        >
          Contact
        </a>
      </motion.nav>
    </header>
  );
}
