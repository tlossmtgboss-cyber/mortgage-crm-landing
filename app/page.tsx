import HeaderClean from "@/components/HeaderClean";
import Footer from "@/components/Footer";
import HeroClean from "@/components/HeroClean";
import FeaturesClean from "@/components/FeaturesClean";
import BenefitsClean from "@/components/BenefitsClean";
import FAQClean from "@/components/FAQClean";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <HeaderClean />
      <main id="main-content">
        <HeroClean />
        <FeaturesClean />
        <BenefitsClean />
        <FAQClean />

        {/* Final CTA */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Ready to transform your mortgage business?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join 500+ loan officers who are closing more deals with less effort
            </p>
            <a
              href="https://mortgage-crm-production-7a9a.up.railway.app/register"
              className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Your Free Trial →
            </a>
            <p className="text-gray-500 mt-4">No credit card required • 14-day free trial</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
