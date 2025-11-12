'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "How long does it take to get set up?",
    answer: "Most teams are fully operational within 24 hours. Our one-click import handles your existing data, and we provide pre-built workflow templates for common loan stages. No expensive implementation, no consultants required—just sign up and start closing loans.",
  },
  {
    question: "What if I'm already using an LOS like Encompass or Calyx?",
    answer: "Perfect! We integrate seamlessly with major LOS platforms. Our CRM handles lead management, client relationships, and referral partners—things your LOS wasn't built for. Think of us as the missing layer between lead capture and loan processing.",
  },
  {
    question: "Can I import my existing leads and clients?",
    answer: "Absolutely. Upload any Excel or CSV file and our AI automatically maps fields, cleans duplicates, and organizes everything. Whether you have 100 contacts or 10,000, you'll be up and running in minutes. We've imported data from Salesforce, HubSpot, spreadsheets, and even handwritten lists.",
  },
  {
    question: "How does the AI actually help me close more loans?",
    answer: "Three ways: (1) Lead scoring predicts which prospects are most likely to convert so you focus on hot leads. (2) Automated SMS campaigns nurture cold leads 24/7 without you lifting a finger. (3) Predictive analytics tell you exactly when a deal is at risk before it falls apart. It's like having a full-time analyst, marketing team, and assistant—all built into your CRM.",
  },
  {
    question: "Is my client data secure?",
    answer: "We're bank-level secure. AES-256 encryption, SOC 2 Type II compliant, GDPR ready, and regular third-party security audits. Your data is hosted on AWS with automatic backups. We take security as seriously as you take your clients' trust.",
  },
  {
    question: "What happens after my free trial ends?",
    answer: "Nothing—unless you decide to subscribe. Your data stays safe and accessible. If you love it (and 94% of trial users do), you can pick a plan that fits your volume. If not, cancel with one click. No contracts, no hassle.",
  },
  {
    question: "Can my entire team use this, or is it just for individual LOs?",
    answer: "Built for teams of any size—from solo loan officers to enterprise branches with 50+ LOs. Team admins get role-based permissions, branch-level reporting, and centralized lead routing. Everyone sees the deals they should see, nothing they shouldn't.",
  },
  {
    question: "Do you offer training and support?",
    answer: "Yes! Every account gets access to our knowledge base, video tutorials, and email support. Paid plans include live chat and priority phone support. Most users are fully proficient within their first week—the interface is that intuitive.",
  },
  {
    question: "What makes this better than Salesforce or HubSpot?",
    answer: "Those are great general-purpose CRMs. Ours is purpose-built for mortgage. We understand loan stages, lock dates, rate sheets, MUM clients, and referral partner relationships. No customization gymnastics—just features that make sense for how loan officers actually work. Plus, we're 1/3 the price.",
  },
  {
    question: "Can I try it without committing?",
    answer: "That's literally why we offer a 14-day free trial. No credit card upfront, full access to every feature, and you can cancel anytime. We're confident that once you see your pipeline running on autopilot, you won't want to go back to spreadsheets.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15), transparent 60%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="text-sm font-medium text-white/70">Common questions</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Everything you need to know
          </h2>
          <p className="text-xl text-white/85 max-w-2xl mx-auto">
            Still have questions? Our support team is here to help.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {faq.question}
                </h3>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-white/85 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
          <p className="text-white/60 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@mortgagecrm.com"
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Contact our team →
          </a>
        </div>
      </div>
    </section>
  );
}
