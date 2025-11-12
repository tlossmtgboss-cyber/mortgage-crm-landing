'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const problems = [
  {
    problem: "Disconnected tools (LOS, CRM, Email, Text, Calendar)",
    solution: "Unified platform with seamless integrations—Microsoft 365, Twilio, Calendly, Encompass, and more",
    icon: "🔌",
    solutionIcon: "🔗",
  },
  {
    problem: "Loan officers waste 60–70% of their time on non-revenue tasks",
    solution: "AI handles doc chasing, milestone updates, and reminders—reclaim 10+ hours per week",
    icon: "⏰",
    solutionIcon: "🤖",
  },
  {
    problem: "Manual data entry and human follow-up dependency",
    solution: "Agentic AI reads emails, updates loan statuses, and executes tasks automatically",
    icon: "📋",
    solutionIcon: "⚡",
  },
  {
    problem: "Missed opportunities due to human delay",
    solution: "AI outbound sales agent auto-calls leads and schedules meetings in real-time",
    icon: "📞",
    solutionIcon: "🎯",
  },
  {
    problem: "No feedback loops for continuous improvement",
    solution: "Every AI action can be reviewed and corrected—the system learns and improves daily",
    icon: "🔄",
    solutionIcon: "📈",
  },
  {
    problem: "Burnout from admin overload",
    solution: "Focus on relationships and revenue while AI handles the busywork",
    icon: "😰",
    solutionIcon: "🚀",
  },
];

export default function ProblemSolution() {
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
                end: 'top 60%',
                scrub: 1,
              },
              opacity: 0,
              x: -50,
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
          background: 'radial-gradient(circle at 30% 50%, rgba(239, 68, 68, 0.1), transparent 50%), radial-gradient(circle at 70% 50%, rgba(34, 197, 94, 0.1), transparent 50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="text-sm font-medium text-white/70">The Problem</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            The mortgage industry runs on
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
              outdated systems
            </span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto">
            Systems that depend on human follow-up and manual data entry. Loan officers waste 60–70% of their time on non-revenue tasks: chasing docs, updating milestones, sending reminders, and rekeying data between systems.
          </p>
        </div>

        {/* Problems & Solutions */}
        <div className="space-y-6">
          {problems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.05), transparent, rgba(34, 197, 94, 0.05))',
                }}
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Problem */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-4xl opacity-60">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-red-400 mb-2">
                      The Problem
                    </div>
                    <h3 className="text-xl font-semibold text-white/90 leading-relaxed">
                      {item.problem}
                    </h3>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-green-500/20 rounded-full flex items-center justify-center border border-white/10">
                    <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Solution */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-4xl">
                    {item.solutionIcon}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-green-400 mb-2">
                      Our Solution
                    </div>
                    <h3 className="text-xl font-semibold text-white leading-relaxed">
                      {item.solution}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            <div className="text-5xl font-bold text-white mb-2">10+</div>
            <div className="text-white/60 mb-4">hours saved per week</div>
            <div className="text-white/40 text-sm">vs. traditional CRMs</div>
          </div>
          <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            <div className="text-5xl font-bold text-white mb-2">40%</div>
            <div className="text-white/60 mb-4">faster close times</div>
            <div className="text-white/40 text-sm">with AI automation</div>
          </div>
          <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            <div className="text-5xl font-bold text-white mb-2">3x</div>
            <div className="text-white/60 mb-4">more volume capacity</div>
            <div className="text-white/40 text-sm">without adding staff</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-white/40 text-lg mb-6">
            See the difference yourself
          </p>
          <a
            href="https://mortgage-crm-production-7a9a.up.railway.app/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/30"
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
