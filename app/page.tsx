import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import HowItWorks from "@/components/HowItWorks";
import Integrations from "@/components/Integrations";
import Testimonials from "@/components/Testimonials";
import PricingTeaser from "@/components/PricingTeaser";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <main id="main-content">
        <Hero />
        <FeatureGrid />
        <HowItWorks />
        <Integrations />
        <Testimonials />
        <PricingTeaser />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
