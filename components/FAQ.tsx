'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does the 14-day free trial work?',
      a: 'Start using all Professional plan features immediately—no credit card required. Your trial begins when you sign up, and you can cancel anytime before it ends with zero charges.'
    },
    {
      q: 'Can I integrate with my existing tools?',
      a: 'Yes! We offer native integrations with Microsoft Teams, Outlook, Salesforce, HubSpot, Google Calendar, Calendly, and more. Plus, our REST API and Zapier support enable custom workflows.'
    },
    {
      q: 'How does the AI assistant work?',
      a: 'Our AI analyzes your pipeline data, email communication, and lead behavior to automatically prioritize tasks, suggest next actions, create follow-ups, and provide conversion insights—all tailored to your workflow.'
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. We use bank-level encryption (AES-256), SOC 2 Type II compliance, and regular third-party security audits. Your data is never shared or sold, and you maintain full ownership.'
    },
    {
      q: 'What happens if I need to upgrade or downgrade?',
      a: "You can change plans anytime from your account settings. Upgrades are immediate; downgrades take effect at the end of your current billing cycle. We'll prorate charges accordingly."
    },
    {
      q: 'Do you offer training and onboarding?',
      a: 'Yes! All plans include self-service resources and video tutorials. Professional and Scale plans include personalized onboarding sessions and ongoing training with a dedicated success manager.'
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Everything you need to know about our platform
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-lg text-foreground pr-4">
                  {faq.q}
                </span>
                <svg
                  className={`w-6 h-6 text-brand flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional help */}
        <div className="text-center mt-12 p-8 bg-white rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our team is here to help you get started
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-brand text-brand-foreground font-semibold rounded-lg hover:bg-brand-dark transition-colors"
          >
            Contact Support
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
