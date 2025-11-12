'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: "🧩",
    title: "AI Process Builder",
    description: "Upload your SOPs → AI builds dynamic workflows & assigns roles automatically.",
  },
  {
    icon: "⚙️",
    title: "AI Task Completion Engine",
    description: "Executes tasks when milestones hit. AI reads emails, updates loan statuses, creates new tasks, and learns from your feedback.",
  },
  {
    icon: "📧",
    title: "Email & Communication Intelligence",
    description: "Monitors Microsoft 365, Gmail, and Teams for updates and triggers actions.",
  },
  {
    icon: "📞",
    title: "AI Outbound Sales Agent",
    description: "Auto-calls leads and past clients using your tone, schedules meetings via Calendly AI.",
  },
  {
    icon: "🧭",
    title: "Active Loan Funnel",
    description: "Visual pipeline showing real-time loan stages with efficiency scoring.",
  },
  {
    icon: "📊",
    title: "KPI & Coaching Dashboard",
    description: "AI coaching insights: conversion trends, time-in-stage, and performance optimization.",
  },
  {
    icon: "🔄",
    title: "Referral Reciprocity Engine",
    description: "Tracks inbound/outbound referrals, ROI, and owed reciprocation.",
  },
  {
    icon: "💡",
    title: "Mortgages Under Management (MUM)",
    description: "Client-for-life automation—rate triggers, annual reviews, and engagement scoring.",
  },
];

export default function CoreFeatures() {
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
                end: 'top 70%',
                scrub: 1,
              },
              opacity: 0,
              y: 50,
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
          background: 'radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.15), transparent 50%), radial-gradient(circle at 30% 70%, rgba(147, 51, 234, 0.15), transparent 50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="text-sm font-medium text-white/70">Core Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Eight powerful modules.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              One intelligent system.
            </span>
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto">
            Every feature is designed to learn from you and automate what can be automated—so you can focus on what only humans can do.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
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
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent, rgba(147, 51, 234, 0.1))',
                }}
              />

              <div className="relative">
                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl border border-white/20">
            <span className="text-2xl">✨</span>
            <p className="text-xl text-white font-medium">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Automate what can be automated.
              </span>
              {" "}
              <span className="text-white/80">
                Learn what can be learned.
              </span>
              {" "}
              <span className="text-white/80">
                Empower humans to do what only humans can.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
