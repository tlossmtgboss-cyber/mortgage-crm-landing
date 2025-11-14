import HeaderClean from "@/components/HeaderClean";
import Footer from "@/components/Footer";
import HeroWithMockup from "@/components/HeroWithMockup";
import FeaturesWithMockups from "@/components/FeaturesWithMockups";
import BenefitsSection from "@/components/BenefitsSection";
import FAQClean from "@/components/FAQClean";
import FinalCTA from "@/components/FinalCTA";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <HeaderClean />
      <main id="main-content">
        <HeroWithMockup />
        <FeaturesWithMockups />
        <BenefitsSection />
        <FAQClean />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
