import HeroNew from "@/components/HeroNew";
import PinnedFeatures from "@/components/PinnedFeatures";
import FinalCTA from "@/components/FinalCTA";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <main id="main-content" className="bg-black">
        <HeroNew />
        <PinnedFeatures />
        <FinalCTA />
      </main>
    </>
  );
}
