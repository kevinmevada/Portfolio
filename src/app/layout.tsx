import type { Metadata } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { GlassNav } from "@/components/ui/GlassNav";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollEffects";
import { SiteFooter } from "@/components/sections/Contact";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kevin Mevada — AI / ML Engineer",
  description:
    "Kevin Mevada — AI engineer building production machine learning and GenAI systems.",
  openGraph: {
    title: "Kevin Mevada — AI / ML Engineer",
    description: "Production AI systems with research rigor and measurable outcomes.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--bg)] text-[var(--text)]">
        <SmoothScroll>
          <ScrollProgress />
          <GlassNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
