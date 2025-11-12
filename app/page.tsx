import HeroNew from "@/components/HeroNew";
import ProblemSolution from "@/components/ProblemSolution";
import Opportunity from "@/components/Opportunity";
import CoreFeatures from "@/components/CoreFeatures";
import AgenticAI from "@/components/AgenticAI";
import HowItWorks from "@/components/HowItWorks";
import Integrations from "@/components/Integrations";
import CompetitiveLandscape from "@/components/CompetitiveLandscape";
import DashboardShowcase from "@/components/DashboardShowcase";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <main id="main-content" className="bg-black">
        <HeroNew />
        <ProblemSolution />
        <Opportunity />
        <CoreFeatures />
        <AgenticAI />
        <HowItWorks />
        <DashboardShowcase />
        <Integrations />
        <CompetitiveLandscape />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  );
}
