'use client';

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
            <span className="text-xl">🎯</span>
            <span className="text-sm font-semibold text-blue-600">Ready to get started?</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Start closing more loans today
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 500+ mortgage professionals who trust our CRM to automate their workflow and grow their business.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://mortgage-crm-production-7a9a.up.railway.app/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
            >
              Start Free 14-Day Trial
            </a>
            <a
              href="#demo"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 text-lg"
            >
              Schedule Demo
            </a>
          </div>

          <p className="text-sm text-gray-500">
            No credit card required • Setup in 5 minutes • Cancel anytime
          </p>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span className="text-sm font-medium text-gray-600">GLBA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="text-sm font-medium text-gray-600">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                <span className="text-sm font-medium text-gray-600">Bank-Level Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
