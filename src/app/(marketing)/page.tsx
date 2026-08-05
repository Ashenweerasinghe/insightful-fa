import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ExplainSection } from "@/components/sections/explain-section";
import { SeeAheadSection } from "@/components/sections/see-ahead-section";

export const metadata: Metadata = {
  title: {
    absolute:
      "Insightful Financial Analytics: See where your business is heading",
  },
  description:
    "Insightful Financial Analytics combines customized dashboards, AI-assisted analysis, and experienced financial professionals to help businesses make better decisions before month-end.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Insightful Financial Analytics: See where your business is heading",
    description:
      "Customized financial and operational dashboards with practical recommendations from experienced financial professionals.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ExplainSection />
      <SeeAheadSection />
    </>
  );
}
