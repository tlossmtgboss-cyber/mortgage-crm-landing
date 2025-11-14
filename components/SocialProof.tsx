'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: "This CRM paid for itself in the first month. The automated SMS follow-ups alone recovered 3 deals I thought were dead. Game changer.",
    author: "Michael Rodriguez",
    role: "Senior Loan Officer",
    company: "Pacific Home Loans",
    volume: "$4.2M monthly volume",
    avatar: "MR",
  },
  {
    quote: "I went from drowning in spreadsheets to having a clear picture of my entire pipeline. Now I actually know which deals need attention and when.",
    author: "Sarah Chen",
    role: "Branch Manager",
    company: "Summit Mortgage Group",
    volume: "12-person team",
    avatar: "SC",
  },
  {
    quote: "The AI lead scoring is scary accurate. I focus on the hot leads and let the system nurture the rest. My close rate went from 22% to 34%.",
    author: "David Thompson",
    role: "Loan Officer",
    company: "Freedom Financial",
    volume: "34% close rate",
    avatar: "DT",
  },
  {
    quote: "Finally, a CRM that doesn't feel like it was built for car salespeople. Every feature makes sense for mortgage. The MUM dashboard alone is worth it.",
    author: "Jessica Park",
    role: "Senior LO",
    company: "HomeTrust Lending",
    volume: "$8M annual production",
    avatar: "JP",
  },
  {
    quote: "My team closed 40% more loans last quarter without working weekends. The automation handles all the routine stuff so we can focus on relationships.",
    author: "Robert Martinez",
    role: "Team Lead",
    company: "Coastal Mortgage",
    volume: "8-person team",
    avatar: "RM",
  },
  {
    quote: "The referral partner tracking is genius. I finally know which realtors are actually sending me business and who I need to work on. My referrals doubled.",
    author: "Emily Watson",
    role: "Loan Officer",
    company: "Premier Lending",
    volume: "85% referral business",
    avatar: "EW",
  },
];

const metrics = [
  { value: "$2.1B+", label: "Total loan volume processed" },
  { value: "500+", label: "Active loan officers" },
  { value: "40%", label: "Average time saved per week" },
  { value: "4.9/5", label: "Average customer rating" },
];

export default function SocialProof() {
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
              y: 50,
              rotateX: -10,
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
          background: 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15), transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="text-sm font-medium text-gray-200">Trusted by top producers</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Join 500+ loan officers
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              closing more loans
            </span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            From solo LOs to enterprise teams—mortgage professionals trust us to power their business.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
            >
              {/* Quote */}
              <div className="mb-6">
                <svg className="w-10 h-10 text-blue-400/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-100 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  <div className="text-white/30 text-xs">{testimonial.company}</div>
                </div>
              </div>

              {/* Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs text-gray-300">
                <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {testimonial.volume}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent 70%)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg mb-2">
            Ready to join them?
          </p>
          <a
            href="https://mortgage-crm-production-7a9a.up.railway.app/register"
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Start your free 14-day trial →
          </a>
        </div>
      </div>
    </section>
  );
}
