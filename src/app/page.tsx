import { Hero } from "@/components/sections/Hero";
import { ResearchSection, WorkSection } from "@/components/sections/WorkResearch";
import { AboutSection } from "@/components/sections/About";
import { StackSection } from "@/components/sections/Stack";
import { ContactSection } from "@/components/sections/Contact";
import { StatementBand } from "@/components/sections/StatementBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ResearchSection />
      <StatementBand />
      <WorkSection />
      <StackSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
