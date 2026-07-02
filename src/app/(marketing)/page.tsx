import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ExplainSection } from "@/components/sections/explain-section";
import { FrameworkSection } from "@/components/sections/framework-section";
import { OutcomesSection } from "@/components/sections/outcomes-section";
import { CredibilitySection } from "@/components/sections/credibility-section";

export const metadata: Metadata = {
  title: {
    absolute: "Insightful Financial Analytics: See operational risk earlier",
  },
  description:
    "Insightful Financial Analytics helps businesses detect operational patterns, inefficiencies, and emerging risks earlier, creating the visibility needed to make calmer, more informed decisions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Insightful Financial Analytics: See operational risk earlier",
    description:
      "Helping businesses see operational and financial risk earlier through operational intelligence and financial visibility.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ExplainSection />
      <FrameworkSection />
      <OutcomesSection />
      <CredibilitySection />
    </>
  );
}
