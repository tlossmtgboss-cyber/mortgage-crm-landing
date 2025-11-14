'use client';

import Link from 'next/link';

export default function HeroClean() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32 pb-20 overflow-hidden">
      {/* Simple decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-blue-900">
              Trusted by 500+ loan officers nationwide
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Your Mortgage Operating System
          </h1>

          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Automate, Learn, and Grow
          </p>

          {/* Subheading */}
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            An intelligent AI assistant that reads your emails, updates your milestones,
            executes tasks, and learns from your feedback—while your team focuses on
            relationships and revenue.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="https://mortgage-crm-production-7a9a.up.railway.app/register"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Free Trial →
            </Link>
            <Link
              href="https://mortgage-crm-production-7a9a.up.railway.app/"
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
            >
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">$4.2B</div>
              <div className="text-gray-600 font-medium">CRM Market Size</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">300K+</div>
              <div className="text-gray-600 font-medium">U.S. Originators</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-pink-600 mb-2">70%</div>
              <div className="text-gray-600 font-medium">Report Tech Inefficiency</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
