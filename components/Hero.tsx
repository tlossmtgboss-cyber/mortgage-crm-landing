'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-blue-100 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-700">AI-Powered Mortgage CRM</span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900">
              Close more loans
            </span>
            <br />
            <span className="text-slate-800">with intelligent automation</span>
          </h1>

          {/* Subheading */}
          <p className={`text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            The only CRM built for modern mortgage teams. AI underwriting, smart lead routing, and automated follow-ups that close deals faster.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link
              href="https://mortgage-crm-production-7a9a.up.railway.app/register"
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10">Start Free Trial</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
            </Link>
            <Link
              href="https://mortgage-crm-production-7a9a.up.railway.app/"
              className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 font-semibold text-lg rounded-xl hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 hover:-translate-y-1"
            >
              Watch Demo
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className={`flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                $2B+
              </div>
              <div className="text-slate-600">Loans Processed</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                500+
              </div>
              <div className="text-slate-600">Loan Officers</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                40%
              </div>
              <div className="text-slate-600">Faster Closings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
