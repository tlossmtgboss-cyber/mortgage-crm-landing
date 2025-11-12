'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DashboardShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.from(sectionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
          opacity: 0,
          y: 100,
        });

        if (imageRef.current) {
          gsap.from(imageRef.current, {
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.2), transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            <span className="text-sm font-medium text-white/70">Live from the platform</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            See your business
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              in crystal clarity
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Real dashboards from loan officers managing $180M+ in their MUM portfolio.
            This could be your view tomorrow.
          </p>
        </div>

        {/* Dashboard Screenshot */}
        <div
          ref={imageRef}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Image container */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 overflow-hidden">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              {/* Replace with your actual dashboard screenshot */}
              <img
                src="/dashboard-metrics.png"
                alt="Mortgage CRM Dashboard showing portfolio performance, client metrics, and opportunities"
                className="w-full h-auto"
              />

              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating feature badges */}
            <div className="absolute top-8 left-8 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="px-4 py-2 bg-blue-500/90 backdrop-blur-xl rounded-full text-sm text-white font-semibold shadow-lg">
                Real-time tracking
              </div>
              <div className="px-4 py-2 bg-purple-500/90 backdrop-blur-xl rounded-full text-sm text-white font-semibold shadow-lg">
                $184M+ managed
              </div>
              <div className="px-4 py-2 bg-green-500/90 backdrop-blur-xl rounded-full text-sm text-white font-semibold shadow-lg">
                +41% vs industry
              </div>
            </div>
          </div>

          {/* Bottom info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">487</div>
              <div className="text-sm text-white/60">Active clients tracked</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">+22</div>
              <div className="text-sm text-white/60">New loans this month</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-400 mb-2">74</div>
              <div className="text-sm text-white/60">Hot opportunities</div>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Portfolio Intelligence
              </h3>
              <p className="text-white/85 leading-relaxed">
                Track every client's lifetime value, referral potential, and refinance opportunities.
                Know exactly where your revenue is coming from.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Predictive Opportunities
              </h3>
              <p className="text-white/85 leading-relaxed">
                AI identifies clients ready for rate-and-term refis, HELOCs, and equity access.
                Never miss a revenue opportunity again.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Revenue Analytics
              </h3>
              <p className="text-white/85 leading-relaxed">
                See exactly how much each client is worth over their lifetime.
                Understand your referral rates and repeat purchase patterns.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Attrition Prevention
              </h3>
              <p className="text-white/85 leading-relaxed">
                Get early warnings when clients are at risk of refinancing elsewhere.
                Proactive alerts help you retain more business.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-lg mb-6">
            This dashboard is already built and waiting for your data
          </p>
          <a
            href="https://mortgage-crm-production-7a9a.up.railway.app/register"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/30"
          >
            <span>See your dashboard in 5 minutes</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
