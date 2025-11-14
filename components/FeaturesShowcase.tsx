'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    category: 'AI Intelligence',
    title: 'Smart Lead Scoring',
    description: 'Our AI analyzes 50+ data points to predict which leads are most likely to close. Stop wasting time on tire-kickers.',
    icon: '🎯',
  },
  {
    category: 'AI Intelligence',
    title: 'Predictive Analytics',
    description: 'Know exactly when a loan will close—before your borrower does. AI-powered forecasting based on historical patterns.',
    icon: '📊',
  },
  {
    category: 'AI Intelligence',
    title: 'Document Intelligence',
    description: 'Automatically extract data from paystubs, tax returns, and bank statements. No more manual data entry.',
    icon: '📄',
  },
  {
    category: 'Automation',
    title: 'SMS Autopilot',
    description: 'Pre-built campaigns for every stage: application, processing, clear-to-close, and post-funding. Set it and forget it.',
    icon: '💬',
  },
  {
    category: 'Automation',
    title: 'Smart Routing',
    description: 'Automatically assign leads to the right LO based on workload, location, loan type, and performance.',
    icon: '🔄',
  },
  {
    category: 'Automation',
    title: 'Task Engine',
    description: 'Every loan stage triggers the right tasks, reminders, and follow-ups. Never miss a deadline again.',
    icon: '✅',
  },
  {
    category: 'Pipeline',
    title: 'Visual Kanban',
    description: 'Drag-and-drop interface shows exactly where every deal stands. Color-coded by urgency and status.',
    icon: '📋',
  },
  {
    category: 'Pipeline',
    title: 'SLA Tracking',
    description: 'Automated alerts when deals are at risk. Know which loans need attention before they fall apart.',
    icon: '⏰',
  },
  {
    category: 'Pipeline',
    title: 'Team Dashboard',
    description: 'See your entire team\'s performance at a glance. Track volume, conversion rates, and average close times.',
    icon: '👥',
  },
  {
    category: 'Growth',
    title: 'Referral Hub',
    description: 'Track every realtor, builder, and referral partner. Automated reciprocity scoring shows who to focus on.',
    icon: '🤝',
  },
  {
    category: 'Growth',
    title: 'MUM Dashboard',
    description: 'Every closed loan automatically enters your portfolio. Get alerts when clients are ready to refinance.',
    icon: '💼',
  },
  {
    category: 'Growth',
    title: 'Marketing Center',
    description: 'Built-in email and SMS campaigns. Pre-built templates for every occasion—rate drops, market updates, seasonal promos.',
    icon: '📢',
  },
];

export default function FeaturesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

        // Stagger cards
        cardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1,
              },
              opacity: 0,
              y: 50,
              scale: 0.95,
            });
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const categories = Array.from(new Set(features.map(f => f.category)));

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15), transparent 50%), radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.15), transparent 50%)',
        }}
      />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="text-sm font-medium text-gray-200">Everything you need</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Built for the way
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              loan officers actually work
            </span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Every feature designed to save you time, close more deals, and grow your business.
            No bloat, no complexity—just what works.
          </p>
        </div>

        {/* Features grid by category */}
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="mb-20">
            <h3 className="text-2xl font-bold text-gray-100 mb-8 uppercase tracking-wider">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.filter(f => f.category === category).map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[catIndex * 10 + index] = el;
                  }}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                >
                  {/* Icon */}
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-100 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent 70%)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-6 text-lg">
            And 50+ more features built for mortgage teams
          </p>
          <a
            href="https://mortgage-crm-production-7a9a.up.railway.app/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
          >
            <span>See all features</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
