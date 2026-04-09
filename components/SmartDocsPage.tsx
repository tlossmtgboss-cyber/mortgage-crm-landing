'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from './Header';

/* ─── Data ─── */

const stats = [
  { value: '20+', label: 'Document types' },
  { value: '99%', label: 'Classification accuracy' },
  { value: '< 10s', label: 'Processing time' },
  { value: '14', label: 'Income types calculated' },
];

const pipelineSteps = [
  {
    number: '01',
    title: 'Borrower Uploads',
    description: 'Paystubs, W-2s, bank statements, tax returns — dropped into the portal or emailed directly to the LO.',
  },
  {
    number: '02',
    title: 'AI Classifies & Extracts',
    description: 'Document type detected in seconds from 20+ mortgage categories. Income, employment, dates, and key fields extracted with confidence scores.',
  },
  {
    number: '03',
    title: 'Verified & Scored',
    description: 'Triple-layer screenshot detection, freshness checks, quality scoring, and fraud analysis — all before you see it.',
  },
  {
    number: '04',
    title: 'Income Calculated',
    description: 'Qualifying income computed per FNMA guidelines across 14 income types. Form 1084 generated. Tasks created for anything missing.',
  },
];

const aiCapabilities = [
  {
    name: 'Document Classification',
    description: 'AI identifies document type from 20+ mortgage categories — paystubs, W-2s, 1099s, tax returns, bank statements, VOEs, and more. No manual sorting.',
    color: '#4DA3FF',
  },
  {
    name: 'OCR & Data Extraction',
    description: 'Multi-engine OCR extracts income, employment, dates, and financial data into structured fields with confidence scores per field.',
    color: '#18a0a6',
  },
  {
    name: 'Screenshot Detection',
    description: 'Triple-layer system checks EXIF metadata, visual heuristics, and semantic patterns to catch and reject phone screenshots before they enter your file.',
    color: '#FF6B6B',
  },
  {
    name: 'Freshness Monitoring',
    description: 'Auto-tracks document expiration. Paystubs at 30 days, bank statements at 60. Borrower renewal requests sent before they expire.',
    color: '#FFB84D',
  },
  {
    name: 'Income Calculation',
    description: '14 income types calculated per FNMA guidelines — W-2, self-employment, rental, bank statement, 1099, SSA, pension, and more. Form 1084 auto-generated.',
    color: '#a855f7',
  },
  {
    name: 'Compliance & Audit',
    description: 'Full audit trail on every document action. Maker-checker approval workflow. PII encryption at rest and in transit. GLBA compliant.',
    color: '#3DFFA0',
  },
];

const trackingFeatures = [
  {
    name: 'Smart Needs List',
    description: 'Auto-generates required documents based on loan program, occupancy type, income type, and borrower profile. Updates dynamically as conditions change.',
    color: '#4DA3FF',
  },
  {
    name: 'SLA Tracking',
    description: '3-business-day default SLA. Breaches flagged, escalations triggered, processors notified automatically. No documents fall through the cracks.',
    color: '#FFB84D',
  },
  {
    name: 'Borrower Portal',
    description: 'Borrowers see exactly what is needed, what has been received, and what is outstanding — with one-tap upload from their phone. No calls required.',
    color: '#3DFFA0',
  },
];

const docTypes = [
  { name: 'Paystubs', freshness: '30 days' },
  { name: 'W-2s', freshness: 'Tax year' },
  { name: 'Tax Returns (1040)', freshness: '2 years' },
  { name: 'Bank Statements', freshness: '60 days' },
  { name: '1099s', freshness: 'Tax year' },
  { name: 'P&L Statements', freshness: '90 days' },
  { name: 'VOE Letters', freshness: '30 days' },
  { name: 'Purchase Contracts', freshness: 'Active' },
  { name: 'Driver License / ID', freshness: 'Valid' },
  { name: 'Gift Letters', freshness: 'At closing' },
  { name: 'HOI Declarations', freshness: 'Active' },
  { name: 'SSA Award Letters', freshness: 'Current year' },
];

const complianceBadges = [
  { label: 'GLBA', detail: 'Gramm-Leach-Bliley safeguards for borrower financial data. PII encrypted at rest and in transit.' },
  { label: 'SOC 2', detail: 'Tenant isolation on every query. Immutable audit logging. Role-based access controls on document actions.' },
  { label: 'FNMA', detail: 'Income calculations per Fannie Mae Selling Guide. Form 1084 auto-generated with supporting worksheets.' },
  { label: 'TRID', detail: 'Document freshness rules aligned with TRID timing requirements. Stale documents flagged before disclosure deadlines.' },
];

/* ─── Component ─── */

export default function SmartDocsPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ background: 'var(--bg-0)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
    >
      {/* Noise + ambient */}
      <div className="noise fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[60vw] h-[60vh] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(77,163,255,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <Header />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 60%, rgba(168,85,247,0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 30%, rgba(77,163,255,0.04) 0%, transparent 60%), var(--bg-0)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#a855f7]/20 bg-[#a855f7]/5 mb-8 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="w-2 h-2 rounded-full bg-[#3DFFA0] animate-pulse" />
            <span className="text-sm font-medium text-[#a855f7] tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>AI Document Intelligence</span>
          </div>

          {/* Title */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 max-w-5xl mx-auto transition-all duration-1000 delay-150 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            Every document{' '}
            <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>reads itself</em>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'var(--text-secondary)' }}
          >
            Upload a paystub. AI classifies it, extracts income, detects screenshots, checks freshness, calculates qualifying income per FNMA guidelines, and generates Form 1084 — before you open it.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Link
              href="https://app.perenniaai.com/register"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgba(77,163,255,0.9), rgba(120,200,255,0.8))', color: '#040508', boxShadow: '0 8px 40px rgba(77,163,255,0.3)' }}
            >
              Start Free Trial
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-normal tracking-wider uppercase transition-all duration-300 hover:border-[rgba(77,163,255,0.4)] hover:text-white"
              style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
            >
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-light" style={{ fontFamily: 'var(--font-display)', color: '#4DA3FF' }}>
                  {s.value}
                </div>
                <div className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how-it-works" className="py-20 md:py-32 relative" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(168,85,247,0.03) 0%, transparent 70%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: '#a855f7' }}>How It Works</div>
            <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              From upload to{' '}
              <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>underwriting-ready.</em>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Four steps. Zero manual sorting. Every document classified, extracted, verified, and calculated before you touch it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipelineSteps.map((step) => (
              <div
                key={step.number}
                data-animate
                className="relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:brightness-110 group"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}
              >
                <div className="absolute top-4 right-4 text-4xl font-light" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(168,85,247,0.15)' }}>
                  {step.number}
                </div>
                <div className="p-2.5 rounded-xl w-fit mb-4" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
                  <div className="w-5 h-5 rounded-sm" style={{ background: 'rgba(168,85,247,0.4)' }} />
                </div>
                <h3 className="text-lg font-medium text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ AI CAPABILITIES ═══════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>AI Engine</div>
            <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Six layers of{' '}
              <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>document intelligence.</em>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Every document passes through classification, extraction, verification, fraud detection, income calculation, and compliance review — automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiCapabilities.map((cap) => (
              <div
                key={cap.name}
                data-animate
                className="rounded-2xl p-6 md:p-8 transition-all duration-300 hover:brightness-110"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl" style={{ background: `${cap.color}15`, border: `1px solid ${cap.color}25` }}>
                    <div className="w-5 h-5 rounded-sm" style={{ background: `${cap.color}60` }} />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-mono)', color: cap.color }}>{cap.name.split(' ')[0]}</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-3">{cap.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ DOCUMENT TRACKING ═══════════ */}
      <section className="py-20 md:py-32 relative" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(77,163,255,0.03) 0%, transparent 70%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: '#3DFFA0' }}>Document Tracking</div>
            <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Never chase a{' '}
              <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>document again.</em>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Smart needs lists, SLA monitoring, and borrower portal notifications eliminate the back-and-forth entirely.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trackingFeatures.map((feat) => (
              <div
                key={feat.name}
                data-animate
                className="rounded-2xl p-6 md:p-8 transition-all duration-300 hover:brightness-110"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl" style={{ background: `${feat.color}15`, border: `1px solid ${feat.color}25` }}>
                    <svg className="w-5 h-5" style={{ color: feat.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feat.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SUPPORTED DOCUMENT TYPES ═══════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: description */}
            <div data-animate>
              <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: '#FFB84D' }}>Supported Documents</div>
              <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Every document type.{' '}
                <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>Covered.</em>
              </h2>
              <p className="text-lg mb-8 leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
                Income, assets, property, compliance, identity — Smart Docs knows what each document is, when it expires, and what data to extract. Freshness policies enforced automatically.
              </p>
              <div className="space-y-4">
                {[
                  'Classified and extracted in under 10 seconds',
                  'Freshness rules enforced per FNMA Selling Guide',
                  'Stale documents trigger borrower renewal requests automatically',
                  'Pushes extracted data directly to Encompass via LOS integration',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#3DFFA0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: document type grid */}
            <div data-animate>
              <div className="grid grid-cols-2 gap-3">
                {docTypes.map((doc) => (
                  <div
                    key={doc.name}
                    className="rounded-xl p-4 transition-all duration-300 hover:brightness-110"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#a855f7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="text-sm font-medium text-white">{doc.name}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Freshness: {doc.freshness}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ ARIA INTEGRATION ═══════════ */}
      <section className="py-20 md:py-32 relative" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(77,163,255,0.03) 0%, transparent 70%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>Platform Integration</div>
            <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Part of the{' '}
              <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>Aria ecosystem.</em>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Smart Docs is not a standalone tool. It is wired directly into Aria&apos;s 22-agent fleet, your pipeline, and your LOS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-animate>
            {[
              {
                title: 'Document Tracker Agent',
                description: 'Aria\'s Agent #04 monitors every loan file for missing, expired, or incomplete documents and triggers borrower requests automatically.',
                color: '#4DA3FF',
                tag: 'Agent 04',
              },
              {
                title: 'Pipeline Automation',
                description: 'When all conditions are satisfied, Smart Docs advances the loan stage automatically — from Processing to Submitted to Underwriting.',
                color: '#3DFFA0',
                tag: 'Workflow',
              },
              {
                title: 'Encompass LOS Sync',
                description: 'Extracted data pushes directly to Encompass. Loan fields populated, conditions tracked, and document images attached — no double entry.',
                color: '#FFB84D',
                tag: 'Integration',
              },
              {
                title: 'Engagement Engine',
                description: 'Missing documents trigger SMS and email reminders through the engagement engine. Borrowers upload directly from the link — no portal login needed.',
                color: '#a855f7',
                tag: 'Omnichannel',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-6"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}
              >
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full mb-4 inline-block" style={{ fontFamily: 'var(--font-mono)', background: `${card.color}10`, color: card.color, border: `1px solid ${card.color}20` }}>{card.tag}</span>
                <h3 className="text-lg font-medium text-white mb-2">{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COMPLIANCE ═══════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: '#18a0a6' }}>Compliance</div>
            <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Audit-ready.{' '}
              <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>Always.</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceBadges.map((item) => (
              <div
                key={item.label}
                data-animate
                className="rounded-2xl p-6 transition-all duration-300 hover:brightness-110"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(24,160,166,0.1)', border: '1px solid rgba(24,160,166,0.2)' }}>
                    <svg className="w-4 h-4 text-[#18a0a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                  </div>
                  <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-mono)' }}>{item.label}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-24 md:py-40 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[500px] rounded-full blur-[150px]" style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-animate>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Stop chasing documents.{' '}
            <br className="hidden md:block" />
            <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>Let AI handle it.</em>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
            Every hour spent requesting, reviewing, and organizing documents is an hour not spent with borrowers. Smart Docs does it all — faster and more accurately.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://app.perenniaai.com/register"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgba(77,163,255,0.9), rgba(120,200,255,0.8))', color: '#040508', boxShadow: '0 8px 40px rgba(77,163,255,0.3)' }}
            >
              Start Free Trial
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
            <Link
              href="/aria"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-normal tracking-wider uppercase transition-all duration-300 hover:border-[rgba(77,163,255,0.4)] hover:text-white"
              style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
            >
              Meet Aria
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
