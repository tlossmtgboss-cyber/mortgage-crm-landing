export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-brand to-brand-dark text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-lg md:text-xl text-white/95 mb-10 max-w-2xl mx-auto">
          Join hundreds of mortgage professionals using AI to close more loans faster
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <a
            href="/demo"
            className="w-full sm:w-auto px-8 py-4 bg-white text-brand font-semibold text-lg rounded-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Start Your Free Trial
          </a>
          <a
            href="/contact-sales"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            Talk to Sales
          </a>
        </div>

        <p className="text-sm text-white/85">
          No credit card required • Setup in minutes • Cancel anytime
        </p>
      </div>
    </section>
  );
}
