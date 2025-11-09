import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand to-brand-dark text-white pt-32 pb-20 md:pt-40 md:pb-28">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-balance">
            Turn conversations into closed deals — automatically
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto text-balance">
            An AI-powered CRM that routes, nurtures, and books meetings while your team sells
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/demo"
              className="w-full sm:w-auto px-8 py-4 bg-white text-brand font-semibold text-lg rounded-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Request a demo
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Start free (14 days)
            </Link>
          </div>

          {/* Trust Indicators */}
          <p className="text-sm text-white/85">
            14-day free trial • No credit card required • Cancel anytime
          </p>

          {/* Social Proof Row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-90">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">4.8/5</span>
              <span className="text-white/75 text-sm">on G2</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold">500+</span>
              <span className="text-white/75"> mortgage professionals</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold">$2B+</span>
              <span className="text-white/75"> in loans processed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
