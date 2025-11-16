'use client';

import DeviceMockup from './DeviceMockup';

export default function HeroWithMockup() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
            <span className="text-2xl">🚀</span>
            <span className="text-sm font-semibold text-gray-700">
              Trusted by 500+ Mortgage Professionals
            </span>
          </div>
        </div>

        {/* Hero headline */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6">
            Your Mortgage
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Operating System
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            AI-powered CRM that automates email processing, tracks your pipeline, and closes more loans—all in one place.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#demo"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Watch Demo
            </a>
          </div>
        </div>

        {/* MacBook mockup with CRM screenshot */}
        <div className="relative z-10">
          <DeviceMockup
            type="laptop"
            imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&h=1125&fit=crop&q=90"
            alt="Mortgage CRM Dashboard showing pipeline and active loans"
          />
        </div>

        {/* Trust indicators */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">$4.2B+</div>
            <div className="text-gray-600">Loans Managed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">10+ hrs</div>
            <div className="text-gray-600">Saved Per Week</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">40%</div>
            <div className="text-gray-600">Faster Closings</div>
          </div>
        </div>
      </div>
    </section>
  );
}
