'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from './Header';
import BookingModal from '@/components/BookingModal';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pipelineSteps = [
  {
    number: '01',
    title: 'Call Ends',
    description: 'Inbound, outbound, or dialer — every call is captured automatically.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Transcribed in Seconds',
    description: 'Speaker-diarized transcript with word-level timestamps. You vs. borrower, labeled.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'AI Extracts Everything',
    description: 'Income, employment, property, assets, declarations — pulled into structured fields.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Scored & Filed',
    description: 'Compliance score, QA scorecard, risk flags, and follow-up tasks — all automatic.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const extractionDomains = [
  { name: 'Identity', fields: 'Name, DOB, SSN (last 4), contact info', color: 'from-blue-500 to-blue-600' },
  { name: 'Property', fields: 'Address, purchase price, occupancy, type', color: 'from-emerald-500 to-emerald-600' },
  { name: 'Employment', fields: 'Employer, title, years, income type', color: 'from-purple-500 to-purple-600' },
  { name: 'Financial', fields: 'Income, assets, liabilities, reserves', color: 'from-amber-500 to-amber-600' },
  { name: 'Compliance', fields: 'Declarations, disclosures, consent', color: 'from-red-500 to-red-600' },
  { name: 'Intent', fields: 'Loan purpose, timeline, preferences', color: 'from-indigo-500 to-indigo-600' },
];

const qaCategories = [
  { name: 'Compliance', weight: '12%', score: 4.8 },
  { name: 'Product Knowledge', weight: '12%', score: 4.6 },
  { name: 'Problem Resolution', weight: '15%', score: 4.5 },
  { name: 'Active Listening', weight: '12%', score: 4.3 },
  { name: 'Communication', weight: '12%', score: 4.7 },
  { name: 'Empathy & Rapport', weight: '10%', score: 4.2 },
];

const aiAgents = [
  {
    name: 'The Scribe',
    role: 'Comprehensive Recap',
    description: '5 C\'s of credit analysis, key decisions, commitments, and next steps from every call.',
    gradient: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  {
    name: 'Junior Loan Officer',
    role: 'Application Analysis',
    description: 'Pre-qualification calculation, DTI analysis, document requirements, and loan product recommendations.',
    gradient: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
  },
  {
    name: 'The Underwriter',
    role: 'Risk Assessment',
    description: 'Risk flags across credit, income, employment, property, and compliance — with severity ratings.',
    gradient: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
  },
];

const stats = [
  { value: '< 60s', label: 'Transcription time' },
  { value: '6', label: 'Extraction domains' },
  { value: '3', label: 'AI agents per call' },
  { value: '10', label: 'QA scoring criteria' },
];

/* ------------------------------------------------------------------ */
/*  Fade-in hook                                                       */
/* ------------------------------------------------------------------ */

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CallIntelligencePage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const pipeline = useFadeIn();
  const extraction = useFadeIn();
  const agents = useFadeIn();
  const qa = useFadeIn();
  const whisper = useFadeIn();
  const automation = useFadeIn();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-0,#040508)] text-[var(--text-primary,rgba(230,238,255,0.96))] overflow-hidden">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      <Header />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/15 rounded-full blur-[160px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8 transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-sm font-medium text-gray-300">AI-Powered Call Analysis</span>
          </div>

          {/* Headline */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 transition-all duration-1000 delay-100 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
          >
            Every call becomes
            <br />
            <em className="bg-gradient-to-r from-[var(--accent-blue,#4DA3FF)] via-blue-300 to-purple-400 bg-clip-text text-transparent not-italic">
              intelligence
            </em>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-200 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Automatically transcribe, extract income and employment data,
            score compliance, flag risk, and draft follow-ups — on every
            borrower call.
          </p>

          {/* CTA */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-300 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={() => setBookingOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Demo
            </button>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold text-lg rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              See How It Works
            </a>
          </div>

          {/* Stats bar */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS — Pipeline                                     */}
      {/* ============================================================ */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />

        <div
          ref={pipeline.ref}
          className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            pipeline.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              From call to intelligence in{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                under 3 minutes
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipelineSteps.map((step, i) => (
              <div
                key={step.number}
                className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-500 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-blue-400/40 text-5xl font-black absolute top-4 right-4 group-hover:text-blue-400/60 transition-colors">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  EXTRACTION DOMAINS                                          */}
      {/* ============================================================ */}
      <section id="features" className="py-24 relative">
        <div
          ref={extraction.ref}
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            extraction.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">AI Extraction</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Six domains extracted from{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                every call
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              One optimized AI call analyzes the full transcript and pulls structured data
              across all six mortgage domains — with confidence scores on every field.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {extractionDomains.map((domain, i) => (
              <div
                key={domain.name}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`inline-block px-3 py-1 rounded-lg bg-gradient-to-r ${domain.color} text-white text-xs font-bold mb-4`}>
                  {domain.name}
                </div>
                <p className="text-gray-300 text-sm">{domain.fields}</p>
              </div>
            ))}
          </div>

          {/* Confidence bar */}
          <div className="mt-12 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-300">Confidence threshold for auto-approval</span>
              <span className="text-sm font-bold text-emerald-400">85%</span>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 rounded-full" style={{ width: '85%' }} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Manual review</span>
              <span>Auto-approved</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THREE AI AGENTS                                             */}
      {/* ============================================================ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/15 to-transparent pointer-events-none" />

        <div
          ref={agents.ref}
          className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            agents.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">Parallel Analysis</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Three AI agents on{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                every call
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Like having a scribe, a junior LO, and an underwriter all listening simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiAgents.map((agent, i) => (
              <div
                key={agent.name}
                className={`p-8 rounded-2xl bg-gradient-to-br ${agent.gradient} border ${agent.border} hover:scale-[1.02] transition-all duration-500`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${agent.iconColor} mb-5`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{agent.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{agent.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  QA SCORING                                                  */}
      {/* ============================================================ */}
      <section className="py-24 relative">
        <div
          ref={qa.ref}
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            qa.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Quality Assurance</p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Every call{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  scored
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                10 weighted criteria evaluated on every call. Compliance adherence,
                product knowledge, active listening, empathy — all measured automatically.
                Scores feed into coaching dashboards and performance reviews.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  4.5
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-400">Excellent</div>
                  <div className="text-xs text-gray-500">Average team score this month</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Excellent', range: '4.5+', color: 'text-emerald-400' },
                  { label: 'Good', range: '4.0-4.5', color: 'text-blue-400' },
                  { label: 'Needs Work', range: '<3.5', color: 'text-red-400' },
                ].map((tier) => (
                  <div key={tier.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className={`text-lg font-bold ${tier.color}`}>{tier.range}</div>
                    <div className="text-xs text-gray-500">{tier.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: scorecard mockup */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">QA Scorecard</h3>
                <span className="text-xs text-gray-500">Auto-generated</span>
              </div>
              <div className="space-y-4">
                {qaCategories.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-300">{cat.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{cat.weight}</span>
                        <span className="text-sm font-bold text-white">{cat.score}</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          cat.score >= 4.5 ? 'bg-emerald-400' : cat.score >= 4.0 ? 'bg-blue-400' : 'bg-amber-400'
                        }`}
                        style={{ width: qa.visible ? `${(cat.score / 5) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LIVE WHISPER                                                */}
      {/* ============================================================ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />

        <div
          ref={whisper.ref}
          className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            whisper.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-3">Real-Time</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Live call{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                whisper
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              AI suggestions appear on your screen during the call — talking points,
              objection handlers, compliance reminders, and rate info. The borrower
              never sees or hears them.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Talking Points', icon: '💬' },
              { label: 'Objection Handling', icon: '🛡' },
              { label: 'Compliance Alerts', icon: '⚖' },
              { label: 'Rate Info', icon: '📊' },
              { label: 'Questions to Ask', icon: '❓' },
              { label: 'Closing Cues', icon: '🎯' },
            ].map((w) => (
              <div
                key={w.label}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
              >
                <div className="text-2xl mb-2">{w.icon}</div>
                <div className="text-xs text-gray-400 font-medium">{w.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-2 text-sm text-cyan-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Delivered in under 2 seconds
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  POST-CALL AUTOMATION                                        */}
      {/* ============================================================ */}
      <section className="py-24 relative">
        <div
          ref={automation.ref}
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            automation.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold text-sm uppercase tracking-wider mb-3">After Every Call</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Five automations run{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                simultaneously
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: 'AI Summary',
                desc: 'Quick, standard, executive, or coaching — four summary types per call.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
              },
              {
                title: 'Action Items',
                desc: 'Tasks extracted and created in your dashboard with priority and due dates.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Follow-up SMS',
                desc: 'Personalized draft referencing call details — review and send in one tap.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                ),
              },
              {
                title: 'Compliance Score',
                desc: 'TRID, fair lending, consent, rate accuracy — seven dimensions scored.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
              {
                title: 'Sentiment',
                desc: 'Borrower sentiment tracked through the call — trajectory and risk flags.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold mb-1.5 text-sm">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECURITY CALLOUT                                            */}
      {/* ============================================================ */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">GLBA-grade security on every call</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Full SSNs are never stored — only last 4 digits. All PII is redacted before
                  AI processing. Transcripts encrypted at rest and in transit. Two-party consent
                  state detection built in. Complete audit trail on every access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BOTTOM CTA                                                  */}
      {/* ============================================================ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Stop taking notes.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Start closing.
            </span>
          </h2>
          <p className="text-[var(--text-secondary,rgba(180,200,230,0.85))] text-lg mb-10">
            Every call analyzed. Every field extracted. Every risk flagged.
            Every call analyzed. Every field extracted. Every risk flagged.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => setBookingOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-[var(--accent-blue,#4DA3FF)] to-purple-600 text-white font-semibold text-lg rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Demo
            </button>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/5 text-white font-semibold text-lg rounded-xl border border-[var(--glass-border,rgba(180,220,255,0.09))] hover:bg-white/10 transition-all duration-300"
            >
              Talk to Sales
            </Link>
          </div>
          <Link
            href="/call-intelligence/training"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent-blue,#4DA3FF)] hover:underline transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
            Read the Training Guide
          </Link>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
}
