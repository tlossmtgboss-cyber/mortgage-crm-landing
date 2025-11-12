'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const competitors = [
  {
    name: "Total Expert",
    automation: "Limited",
    aiLearning: false,
    mortgageSpecific: true,
    voiceAgent: false,
    referralROI: false,
  },
  {
    name: "Shape CRM",
    automation: "Manual",
    aiLearning: false,
    mortgageSpecific: true,
    voiceAgent: false,
    referralROI: false,
  },
  {
    name: "Jungo",
    automation: "Basic",
    aiLearning: false,
    mortgageSpecific: true,
    voiceAgent: false,
    referralROI: false,
  },
  {
    name: "Agentic AI",
    automation: "✅ Full",
    aiLearning: true,
    mortgageSpecific: true,
    voiceAgent: true,
    referralROI: true,
    isUs: true,
  },
];

const features = [
  { key: 'automation', label: 'Automation' },
  { key: 'aiLearning', label: 'AI Learning' },
  { key: 'mortgageSpecific', label: 'Mortgage-Specific' },
  { key: 'voiceAgent', label: 'Voice Agent' },
  { key: 'referralROI', label: 'Referral ROI' },
];

export default function CompetitiveLandscape() {
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

  const renderValue = (value: any, isUs: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className={`text-2xl ${isUs ? 'text-green-400' : 'text-green-500'}`}>✅</span>
      ) : (
        <span className="text-2xl text-red-400">❌</span>
      );
    }
    return <span className={`font-semibold ${isUs ? 'text-green-400' : 'text-white/70'}`}>{value}</span>;
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15), transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="text-sm font-medium text-white/70">Competitive Advantage</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Why we're
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              different
            </span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto">
            Other mortgage CRMs offer basic organization. We offer true intelligence—AI that learns, adapts, and executes.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header row */}
            <div className="grid grid-cols-6 gap-4 mb-4">
              <div className="col-span-1 p-4">
                <div className="text-white/60 text-sm font-semibold uppercase tracking-wider">
                  Platform
                </div>
              </div>
              {features.map((feature) => (
                <div key={feature.key} className="p-4 text-center">
                  <div className="text-white/60 text-sm font-semibold uppercase tracking-wider">
                    {feature.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Competitor rows */}
            {competitors.map((competitor, index) => (
              <div
                key={index}
                className={`grid grid-cols-6 gap-4 mb-3 rounded-2xl p-4 border transition-all duration-500 ${
                  competitor.isUs
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-white/30 shadow-2xl shadow-blue-500/20'
                    : 'bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center">
                  <div className={`font-bold text-lg ${competitor.isUs ? 'text-white' : 'text-white/80'}`}>
                    {competitor.name}
                    {competitor.isUs && (
                      <span className="ml-2 text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                        Us
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  {renderValue(competitor.automation, competitor.isUs)}
                </div>
                <div className="flex items-center justify-center">
                  {renderValue(competitor.aiLearning, competitor.isUs)}
                </div>
                <div className="flex items-center justify-center">
                  {renderValue(competitor.mortgageSpecific, competitor.isUs)}
                </div>
                <div className="flex items-center justify-center">
                  {renderValue(competitor.voiceAgent, competitor.isUs)}
                </div>
                <div className="flex items-center justify-center">
                  {renderValue(competitor.referralROI, competitor.isUs)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 text-lg mb-6">
            See the difference for yourself
          </p>
          <a
            href="https://mortgage-crm-production-7a9a.up.railway.app/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/30"
          >
            <span>Start your free trial</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
