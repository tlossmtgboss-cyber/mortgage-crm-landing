'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "Import your data",
    description: "Upload your existing leads and loans from any spreadsheet, CRM, or LOS. Our AI automatically maps fields and cleans up duplicates. Takes less than 5 minutes.",
    features: ["One-click Excel/CSV import", "Automatic field mapping", "Duplicate detection"],
    icon: "📥",
  },
  {
    number: "02",
    title: "Configure your workflows",
    description: "Choose from pre-built templates or customize every stage, automation, and notification. Set up SMS campaigns, task triggers, and team routing rules.",
    features: ["Pre-built templates", "Custom automation rules", "Team assignments"],
    icon: "⚙️",
  },
  {
    number: "03",
    title: "Let AI do the work",
    description: "Our AI automatically scores leads, sends follow-ups, tracks documents, and alerts you when deals need attention. Your pipeline moves forward 24/7.",
    features: ["Automated SMS campaigns", "Smart lead scoring", "Intelligent reminders"],
    icon: "🤖",
  },
  {
    number: "04",
    title: "Close more loans",
    description: "Watch your close rate climb as you spend less time on busywork and more time building relationships. Track everything in your real-time dashboard.",
    features: ["Real-time analytics", "Performance tracking", "Team leaderboards"],
    icon: "🎯",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        // Fade in section
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

        // Animate connecting line
        if (lineRef.current) {
          gsap.from(lineRef.current, {
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
            scaleY: 0,
            transformOrigin: 'top',
          });
        }

        // Stagger steps
        stepsRef.current.forEach((step, index) => {
          if (step) {
            gsap.from(step, {
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1,
              },
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
              scale: 0.9,
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
          background: 'radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.15), transparent 50%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="text-sm font-medium text-white/70">Simple setup</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            From signup to
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              closing loans in 24 hours
            </span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto">
            Most teams are fully set up and processing loans within a day. No long onboarding, no expensive implementation—just results.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400/20 via-purple-400/20 to-pink-400/20"
          />

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepsRef.current[index] = el;
                }}
                className={`relative flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 lg:w-1/2">
                  <div className={`text-center ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="inline-flex items-center gap-3 mb-4">
                      <span className="text-6xl">{step.icon}</span>
                      <span className="text-6xl font-bold text-white/10">{step.number}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-white/85 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div className={`flex flex-wrap gap-3 ${index % 2 === 0 ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}>
                      {step.features.map((feature, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-sm text-white/70"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:block relative flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
                  <div className="w-8 h-8 bg-white rounded-full"></div>

                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-400"></div>
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1 lg:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24 p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to get started?
          </h3>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            No contracts, no setup fees, no credit card required. Start your free trial and see why 500+ loan officers switched to our CRM.
          </p>
          <a
            href="https://mortgage-crm-production-7a9a.up.railway.app/register"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/30"
          >
            <span>Start free trial</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
