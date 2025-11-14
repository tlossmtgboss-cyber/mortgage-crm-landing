'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MetricsDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

        cardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 65%',
                scrub: 1,
              },
              opacity: 0,
              y: 30,
              scale: 0.95,
            });
          }
        });
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
          background: 'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15), transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-sm font-medium text-gray-200">Real-time metrics from actual users</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            This is what
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              success looks like
            </span>
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            These are real metrics from loan officers using our platform. Your dashboard could look like this too.
          </p>
        </div>

        {/* MORTGAGES UNDER MANAGEMENT */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[2px] w-8 bg-gradient-to-r from-blue-400 to-transparent"></div>
            <h3 className="text-sm uppercase tracking-widest text-blue-400 font-semibold">
              Mortgages Under Management
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Total UPB */}
            <div
              ref={(el) => { cardsRef.current[0] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2">$184.3M</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Total UPB Under MGT</div>
            </div>

            {/* Net MUM Growth */}
            <div
              ref={(el) => { cardsRef.current[1] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-green-400 mb-2">+$3.4M</div>
              <div className="text-xs text-gray-300 mb-1">(MoM)</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Net MUM Growth</div>
            </div>

            {/* Portfolio Revenue Yield */}
            <div
              ref={(el) => { cardsRef.current[2] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2">1.82%</div>
              <div className="text-xs text-gray-300 mb-1">Annual Yield</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Portfolio Revenue Yield</div>
            </div>

            {/* Client Lifetime Value */}
            <div
              ref={(el) => { cardsRef.current[3] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2">$12,480</div>
              <div className="text-xs text-gray-300 mb-1">Avg. per Client</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Client Lifetime Value</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Client Count */}
            <div
              ref={(el) => { cardsRef.current[4] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2">487</div>
              <div className="text-xs text-gray-300 mb-1">Active Clients</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Client Count</div>
            </div>

            {/* Loans Added vs Lost */}
            <div
              ref={(el) => { cardsRef.current[5] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2">+22 / -5</div>
              <div className="text-xs text-gray-300 mb-1">Added / Lost</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Loans Added vs Lost</div>
            </div>

            {/* Capture Rate Alpha */}
            <div
              ref={(el) => { cardsRef.current[6] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-green-400 mb-2">+41%</div>
              <div className="text-xs text-gray-300 mb-1">Above Industry Avg</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Capture Rate Alpha</div>
            </div>

            {/* Attrition Risk Index */}
            <div
              ref={(el) => { cardsRef.current[7] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-orange-400/30 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2">12.4%</div>
              <div className="text-xs text-gray-300 mb-1">At-Risk Clients</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Attrition Risk Index</div>
            </div>
          </div>
        </div>

        {/* PORTFOLIO OPPORTUNITIES */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[2px] w-8 bg-gradient-to-r from-green-400 to-transparent"></div>
            <h3 className="text-sm uppercase tracking-widest text-green-400 font-semibold">
              Portfolio Opportunities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rate Rebound Opps */}
            <div
              ref={(el) => { cardsRef.current[8] = el; }}
              className="group bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-xl rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300"
            >
              <div className="text-6xl font-bold text-white mb-4">74</div>
              <div className="text-gray-300 mb-4">Clients Eligible</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-4">Rate Rebound Opps</div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-400/20 rounded-full border border-blue-400/30 text-xs text-blue-300">
                18 High-Priority
              </div>
            </div>

            {/* Equity Access Opps */}
            <div
              ref={(el) => { cardsRef.current[9] = el; }}
              className="group bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl rounded-2xl p-8 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300"
            >
              <div className="text-6xl font-bold text-white mb-4">112</div>
              <div className="text-gray-300 mb-4">Clients &gt; $150K Equity</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-4">Equity Access Opps</div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-400/20 rounded-full border border-purple-400/30 text-xs text-purple-300">
                37 Ready Now
              </div>
            </div>

            {/* HELOC / Refi Heatmap */}
            <div
              ref={(el) => { cardsRef.current[10] = el; }}
              className="group bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-xl rounded-2xl p-8 border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300"
            >
              <div className="text-6xl font-bold text-white mb-4">32</div>
              <div className="text-gray-300 mb-4">High-Priority Files</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-4">HELOC / Refi Heatmap</div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-400/20 rounded-full border border-pink-400/30 text-xs text-pink-300">
                rate drop + equity + LTV
              </div>
            </div>
          </div>
        </div>

        {/* ANNUAL REVENUE PERFORMANCE */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[2px] w-8 bg-gradient-to-r from-purple-400 to-transparent"></div>
            <h3 className="text-sm uppercase tracking-widest text-purple-400 font-semibold">
              Annual Revenue Performance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Annual Revenue per Client */}
            <div
              ref={(el) => { cardsRef.current[11] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-white mb-4">$2,180</div>
              <div className="text-gray-300 mb-2">per Client</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Annual Revenue / CL</div>
            </div>

            {/* Referral Rate */}
            <div
              ref={(el) => { cardsRef.current[12] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-white mb-4">0.64</div>
              <div className="text-gray-300 mb-2">Referrals/yr</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Referral Rate / Client</div>
            </div>

            {/* Repeat Purchase Rate */}
            <div
              ref={(el) => { cardsRef.current[13] = el; }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-white mb-4">21%</div>
              <div className="text-gray-300 mb-2">5-Yr Rolling</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Repeat Purchase Rate</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">
            Your metrics dashboard is waiting
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            See exactly where your business stands, identify opportunities, and track growth—all in real-time.
          </p>
          <a
            href="https://mortgage-crm-production-7a9a.up.railway.app/register"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/30"
          >
            <span>Start tracking your success</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
