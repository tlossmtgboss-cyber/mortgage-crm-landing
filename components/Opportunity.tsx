'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Opportunity() {
  const sectionRef = useRef<HTMLElement>(null);

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
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="text-sm font-medium text-white/70">The Opportunity</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            AI has changed
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              everything
            </span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto mb-12">
            Automation, natural language understanding, and adaptive learning can now manage the mortgage lifecycle end-to-end—from lead to lifetime relationship.
          </p>
        </div>

        {/* Opportunity stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                $4.2B
              </div>
              <div className="text-lg text-white/90 font-semibold mb-2">
                CRM market for mortgage/real estate professionals
              </div>
              <div className="text-sm text-white/60">
                Growing 15% year-over-year
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                300K+
              </div>
              <div className="text-lg text-white/90 font-semibold mb-2">
                Originators in the U.S.
              </div>
              <div className="text-sm text-white/60">
                All looking for better tools
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400">
                70%
              </div>
              <div className="text-lg text-white/90 font-semibold mb-2">
                Of loan officers report tech inefficiency
              </div>
              <div className="text-sm text-white/60">
                As their #1 bottleneck
              </div>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/20 rounded-2xl p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-4xl">💡</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              The market is ready for true AI automation
            </h3>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Loan officers don't need another basic CRM. They need an intelligent operating system that learns, adapts, and executes—freeing them to focus on what they do best: building relationships and closing deals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
