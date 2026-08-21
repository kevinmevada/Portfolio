import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: "Portfolio foundation — design tokens and MDX content pipeline.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-text">{children}</body>
    </html>
  );
}
