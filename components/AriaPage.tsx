'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

/* ─── Data ─── */

const capabilities = [
  {
    label: 'Voice',
    title: 'Calls every lead in 60 seconds',
    description: 'Aria places an AI voice call the moment a lead arrives. Natural conversation, not a robocall. She qualifies borrowers, answers questions, and decides the next step — all in under 3 minutes.',
    icon: PhoneIcon,
    color: '#4DA3FF',
  },
  {
    label: 'SMS',
    title: 'Two-way AI text conversations',
    description: 'Claude-powered responses that adapt to borrower tone and context. Aria references prior calls, emails, and qualification data — no canned templates, no repetition.',
    icon: ChatIcon,
    color: '#3DFFA0',
  },
  {
    label: 'Email',
    title: 'Sent from YOUR Outlook address',
    description: 'Hyper-personalized emails sent via Microsoft Graph from your actual inbox. Open and click tracking update lead scores in real time. Borrowers reply directly to you.',
    icon: EnvelopeIcon,
    color: '#a855f7',
  },
  {
    label: 'Transfer',
    title: 'Hot leads, transferred live',
    description: 'When a borrower is ready, Aria bridges them to you with a whisper briefing — name, credit, loan type, timeline, everything. Average transfer time: 8 seconds.',
    icon: TransferIcon,
    color: '#FFB84D',
  },
  {
    label: 'Voicemail',
    title: 'Ringless drops with SMS follow-up',
    description: 'AMD detection triggers a pre-recorded voicemail, followed by an automatic SMS 15 minutes later. No missed opportunities, ever.',
    icon: VoicemailIcon,
    color: '#FF6B6B',
  },
  {
    label: 'Scheduling',
    title: 'Books your calendar automatically',
    description: 'Aria checks your real-time availability via Microsoft Graph and books consultations directly. Borrowers get confirmation SMS and a prep sequence before the call.',
    icon: CalendarIcon,
    color: '#18a0a6',
  },
];

const agents = [
  { name: 'Receptionist', role: 'Inbound calls, greeting, routing', icon: '01' },
  { name: 'Lead Qualifier', role: 'Credit, income, timeline assessment', icon: '02' },
  { name: 'Pipeline Analyst', role: 'Stage tracking, risk detection', icon: '03' },
  { name: 'Document Tracker', role: 'Missing docs, upload reminders', icon: '04' },
  { name: 'Rate Monitor', role: 'Rate alerts, lock timing', icon: '05' },
  { name: 'Compliance Checker', role: 'TRID, RESPA, fair lending', icon: '06' },
  { name: 'Email Processor', role: 'Classification, routing, replies', icon: '07' },
  { name: 'SLA Tracker', role: 'Milestones, closing deadlines', icon: '08' },
  { name: 'Content Creator', role: 'Marketing, social, campaigns', icon: '09' },
  { name: 'Team Coach', role: 'Performance, metrics, training', icon: '10' },
  { name: 'Scheduler', role: 'Calendar, appointments, prep', icon: '11' },
  { name: 'Voice Agent', role: 'Outbound calls, voicemail drops', icon: '12' },
  { name: 'Turn Down Agent', role: 'ECOA-compliant alternatives', icon: '13' },
  { name: 'Estimate Advisor', role: 'Loan estimates, closing costs', icon: '14' },
  { name: 'Deal Breaker Radar', role: 'Risk flags, alternative routing', icon: '15' },
  { name: 'Lead Nurturer', role: '12-month drip orchestration', icon: '16' },
  { name: 'Referral Partner', role: 'Partner management, co-marketing', icon: '17' },
  { name: 'Recruiting Agent', role: 'LO recruiting, outreach', icon: '18' },
  { name: 'Call Intelligence', role: 'Transcription, QA, extraction', icon: '19' },
  { name: 'SMS Intelligence', role: 'AI conversations, deal breakers', icon: '20' },
  { name: 'Workflow Engine', role: 'Automation rules, triggers', icon: '21' },
  { name: 'Post-Close Agent', role: 'Referrals, anniversary nurture', icon: '22' },
];

const qualifyingFlow = [
  { question: 'What type of loan are you looking for?', answer: 'We\'re looking to purchase our first home.', tag: 'Purchase' },
  { question: 'What price range are you targeting?', answer: 'Around $420,000.', tag: '$420K' },
  { question: 'And what\'s your estimated credit score?', answer: 'I think it\'s around 740.', tag: '740 FICO' },
  { question: 'Are you currently employed — W-2, self-employed, or retired?', answer: 'W-2, both of us.', tag: 'W-2' },
  { question: 'What\'s your timeline — are you ready now or still exploring?', answer: 'We want to be in a house by summer.', tag: '< 3 months' },
];

const complianceItems = [
  { label: 'TCPA', detail: 'Quiet hours enforced (8am–9pm borrower local time). Prior express consent verified before every automated contact.' },
  { label: 'ECOA', detail: 'Aria never asks about race, sex, religion, national origin, marital status, or age. Every response checked before sending.' },
  { label: 'DNC', detail: 'Federal and state registry checked before every outbound dial. Stale DNC data blocks the call entirely — fail-closed.' },
  { label: 'A2P 10DLC', detail: 'Registered campaign, carrier-approved throughput. STOP/HELP handled instantly with full audit trail.' },
  { label: 'SOC 2', detail: 'Tenant isolation on every query. Audit logging on every state change. PII filtered from logs.' },
  { label: 'NMLS', detail: 'License number included in every email footer and call disclosure. State-specific rules enforced per LO.' },
];

/* ─── Component ─── */

export default function AriaPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeAgent, setActiveAgent] = useState(0);
  const orbitRef = useRef<HTMLDivElement>(null);

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

    // Cycle through agents
    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length);
    }, 2500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ background: 'var(--bg-0)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
    >
      {/* Noise + ambient */}
      <div className="noise fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[60vw] h-[60vh] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(77,163,255,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(24,160,166,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <Header />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 60%, rgba(77,163,255,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 30%, rgba(24,160,166,0.05) 0%, transparent 60%), var(--bg-0)' }} />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[150px]" style={{ background: 'radial-gradient(ellipse, rgba(77,163,255,0.06) 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4DA3FF]/20 bg-[#4DA3FF]/5 mb-8 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="w-2 h-2 rounded-full bg-[#3DFFA0] animate-pulse" />
            <span className="text-sm font-medium text-[#4DA3FF] tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>AI Loan Officer Assistant</span>
          </div>

          {/* Title */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 max-w-5xl mx-auto transition-all duration-1000 delay-150 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            Meet{' '}
            <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>Aria</em>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'var(--text-secondary)' }}
          >
            The AI that calls every lead in 60 seconds, qualifies borrowers in natural conversation, and transfers hot prospects live to you with a full briefing. 22 specialized agents. Every channel. Always on.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Link
              href="https://app.perenniaai.com/register"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgba(77,163,255,0.9), rgba(120,200,255,0.8))', color: '#040508', boxShadow: '0 8px 40px rgba(77,163,255,0.3)' }}
            >
              Try Aria Free
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
            <Link
              href="#capabilities"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-normal tracking-wider uppercase transition-all duration-300 hover:border-[rgba(77,163,255,0.4)] hover:text-white"
              style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
            >
              See What Aria Does
            </Link>
          </div>

          {/* Waveform visualization */}
          <div className={`transition-all duration-1000 delay-700 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <WaveformHero />
          </div>
        </div>
      </section>

      {/* ═══════════ CAPABILITIES ═══════════ */}
      <section id="capabilities" className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>Capabilities</div>
            <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              One AI.{' '}
              <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>Every channel.</em>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Aria orchestrates voice, SMS, email, live transfer, voicemail, and scheduling from a single intelligence layer. Every interaction informs the next.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.label}
                  data-animate
                  className="rounded-2xl p-6 md:p-8 transition-all duration-300 hover:brightness-110 group"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl" style={{ background: `${cap.color}15`, border: `1px solid ${cap.color}25` }}>
                      <Icon className="w-5 h-5" style={{ color: cap.color }} />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-mono)', color: cap.color }}>{cap.label}</span>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">{cap.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{cap.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ QUALIFYING CONVERSATION ═══════════ */}
      <section className="py-20 md:py-32 relative" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(77,163,255,0.04) 0%, transparent 70%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: description */}
            <div data-animate>
              <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>Live Qualification</div>
              <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Natural conversation.{' '}
                <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>Real qualification.</em>
              </h2>
              <p className="text-lg mb-6 leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
                Aria asks one question at a time, adapts based on answers, and never feels scripted. By the end of a 3-minute call, she knows credit range, timeline, loan type, employment, and price range — everything you need to close.
              </p>
              <div className="space-y-4">
                {[
                  'Adapts questions based on prior answers',
                  'References context from SMS, email, and prior calls',
                  'Merges qualification data across all channels',
                  'Routes to Deal Breaker Radar when blockers detected',
                  'ECOA-compliant — never asks prohibited questions',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#3DFFA0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: conversation mockup */}
            <div data-animate>
              <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#3DFFA0] animate-pulse" />
                  <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Live AI Call — Qualifying</span>
                </div>
                <div className="space-y-4">
                  {qualifyingFlow.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(77,163,255,0.15)' }}>
                          <span className="text-[10px] font-bold" style={{ color: '#4DA3FF' }}>A</span>
                        </div>
                        <div className="rounded-xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>&quot;{item.question}&quot;</p>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <div className="rounded-xl rounded-tr-sm px-3.5 py-2.5 max-w-[85%]" style={{ background: 'rgba(24,160,166,0.08)' }}>
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>&quot;{item.answer}&quot;</p>
                        </div>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(24,160,166,0.15)' }}>
                          <span className="text-[10px] font-bold text-[#18a0a6]">B</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ fontFamily: 'var(--font-mono)', background: 'rgba(61,255,160,0.08)', color: '#3DFFA0' }}>{item.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-4 mt-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
                  <svg className="w-4 h-4 text-[#3DFFA0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: '#3DFFA0' }}>QUALIFIED — INITIATING LIVE TRANSFER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ AGENT FLEET ═══════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>Agent Fleet</div>
            <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              22 agents.{' '}
              <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>One brain.</em>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Aria is not a single bot — she is a fleet of specialized agents orchestrated by LangGraph. Each agent is an expert in its domain, and they share context in real time.
            </p>
          </div>

          {/* Agent orbit visualization */}
          <div data-animate className="relative">
            {/* Active agent spotlight */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl transition-all duration-500" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(77,163,255,0.12)', border: '1px solid rgba(77,163,255,0.2)' }}>
                  <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-mono)', color: '#4DA3FF' }}>{agents[activeAgent].icon}</span>
                </div>
                <div className="text-left">
                  <div className="text-lg font-medium text-white">{agents[activeAgent].name}</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{agents[activeAgent].role}</div>
                </div>
              </div>
            </div>

            {/* Agent grid */}
            <div ref={orbitRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {agents.map((agent, i) => (
                <button
                  key={agent.name}
                  onClick={() => setActiveAgent(i)}
                  className={`rounded-xl p-3 text-left transition-all duration-300 cursor-pointer ${i === activeAgent ? 'ring-1 ring-[#4DA3FF]/40 brightness-125' : 'hover:brightness-110'}`}
                  style={{ background: i === activeAgent ? 'rgba(77,163,255,0.08)' : 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                >
                  <div className="text-[10px] font-medium mb-1" style={{ fontFamily: 'var(--font-mono)', color: i === activeAgent ? '#4DA3FF' : 'var(--text-dim)' }}>{agent.icon}</div>
                  <div className="text-xs font-medium text-white truncate">{agent.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ LIVE TRANSFER ═══════════ */}
      <section className="py-20 md:py-32 relative" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(255,184,77,0.03) 0%, transparent 70%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: transfer visual */}
            <div data-animate>
              <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#FFB84D] animate-pulse" />
                  <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Live Transfer in Progress</span>
                </div>

                {/* Whisper card */}
                <div className="rounded-xl p-4 mb-6" style={{ background: 'rgba(255,184,77,0.06)', border: '1px solid rgba(255,184,77,0.15)' }}>
                  <div className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-mono)', color: '#FFB84D' }}>Whisper Briefing</div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    &quot;Incoming transfer. Sarah Johnson. Purchase, $420K, 740 FICO. W-2 employed, both borrowers. Timeline: before summer. Property: single family, Charleston SC. She is ready to proceed.&quot;
                  </p>
                </div>

                {/* Transfer flow */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(77,163,255,0.12)' }}>
                      <span className="text-xs font-bold" style={{ color: '#4DA3FF' }}>A</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">Aria</div>
                      <div className="text-[10px]" style={{ color: 'var(--text-dim)' }}>AI</div>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(77,163,255,0.3), rgba(61,255,160,0.5))' }} />
                    <span className="text-[10px] font-medium" style={{ fontFamily: 'var(--font-mono)', color: '#3DFFA0' }}>BRIDGED</span>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(61,255,160,0.5), rgba(255,184,77,0.3))' }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="text-xs font-medium text-white text-right">You</div>
                      <div className="text-[10px] text-right" style={{ color: 'var(--text-dim)' }}>LO</div>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,184,77,0.12)' }}>
                      <span className="text-xs font-bold" style={{ color: '#FFB84D' }}>LO</span>
                    </div>
                  </div>
                </div>

                {/* Status steps */}
                <div className="flex flex-wrap gap-2">
                  {['initiated', 'lo_ringing', 'lo_answered', 'whisper', 'bridged'].map((step, i) => (
                    <span key={step} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px]" style={{ fontFamily: 'var(--font-mono)', background: i <= 4 ? 'rgba(61,255,160,0.08)' : 'rgba(255,255,255,0.03)', color: i <= 4 ? '#3DFFA0' : 'var(--text-dim)', border: '1px solid ' + (i <= 4 ? 'rgba(61,255,160,0.15)' : 'var(--glass-border)') }}>
                        {step}
                      </span>
                      {i < 4 && <span style={{ color: 'var(--text-dim)' }} className="text-[10px]">&rarr;</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: description */}
            <div data-animate>
              <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: '#FFB84D' }}>Live Transfer</div>
              <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                8 seconds from qualified{' '}
                <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>to connected.</em>
              </h2>
              <p className="text-lg mb-6 leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
                When a borrower is ready, Aria places them on a brief hold, dials you, plays a whisper briefing with everything you need, then bridges both of you into a live conversation. If you are unavailable, she creates a priority callback and texts you immediately.
              </p>
              <div className="space-y-4">
                {[
                  'Whisper includes cross-channel context from SMS, email, and prior calls',
                  'LO availability tracked in real time with 30-second TTL cache',
                  'Tenant isolation verified before every transfer attempt',
                  'Every stage logged: initiated → ringing → answered → whisper → bridged',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FFB84D] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CROSS-CHANNEL INTELLIGENCE ═══════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>Cross-Channel Intelligence</div>
            <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Every interaction{' '}
              <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>informs the next.</em>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Aria shares a unified memory across voice, SMS, and email. She never asks the same question twice, never repeats context, and always knows where the conversation left off.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6" data-animate>
            {[
              {
                title: 'Unified Memory',
                description: 'Qualification data from a call is available in SMS. Email engagement signals inform the next voice conversation. Nothing is siloed.',
                metric: '100%',
                metricLabel: 'context retention',
              },
              {
                title: 'Engagement Scoring',
                description: 'Every touchpoint updates the lead score. Call answered: +10. SMS reply: +5. Email opened: +2. Appointment booked: +20. Scores drive channel selection.',
                metric: '5',
                metricLabel: 'signal types tracked',
              },
              {
                title: 'Channel Preference',
                description: 'Over time, Aria learns which channel each borrower responds to most and weights future outreach accordingly. Prefer texting? You will get texts.',
                metric: 'Auto',
                metricLabel: 'preference detection',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}>
                <div className="text-3xl font-light mb-1" style={{ fontFamily: 'var(--font-display)', color: '#4DA3FF' }}>{card.metric}</div>
                <div className="text-[10px] uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{card.metricLabel}</div>
                <h3 className="text-lg font-medium text-white mb-2">{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COMPLIANCE ═══════════ */}
      <section className="py-20 md:py-32 relative" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(24,160,166,0.03) 0%, transparent 70%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <div className="text-xs font-medium uppercase tracking-[0.22em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: '#18a0a6' }}>Compliance</div>
            <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Enterprise-grade compliance.{' '}
              <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>Built in.</em>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Every AI interaction passes through multi-layer compliance checks before dispatch. Not an add-on — it is the foundation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceItems.map((item) => (
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
          <div className="w-[700px] h-[500px] rounded-full blur-[150px]" style={{ background: 'radial-gradient(ellipse, rgba(77,163,255,0.06) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-animate>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Your leads are waiting.{' '}
            <br className="hidden md:block" />
            <em className="not-italic" style={{ color: 'rgba(190,220,255,0.9)' }}>Aria is ready.</em>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
            Every minute without Aria is a lead that went to voicemail and never called back.
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
              href="/engagement-engine"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-normal tracking-wider uppercase transition-all duration-300 hover:border-[rgba(77,163,255,0.4)] hover:text-white"
              style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
            >
              Explore the Engine
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Waveform Hero Visualization ─── */

function WaveformHero() {
  return (
    <div className="max-w-2xl mx-auto rounded-2xl p-6 md:p-8" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-3 h-3 rounded-full bg-[#3DFFA0] animate-pulse" />
        <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Aria — Active Call</span>
        <span className="text-xs ml-auto" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>00:47</span>
      </div>

      {/* Waveform bars */}
      <div className="flex items-center justify-center gap-[3px] h-16 mb-5">
        {Array.from({ length: 48 }).map((_, i) => {
          const h = 12 + Math.sin(i * 0.4) * 20 + Math.cos(i * 0.7) * 15;
          return (
            <div
              key={i}
              className="w-[3px] rounded-full"
              style={{
                height: `${Math.max(8, h)}px`,
                background: i < 30 ? 'linear-gradient(to top, rgba(77,163,255,0.4), rgba(77,163,255,0.8))' : 'rgba(77,163,255,0.15)',
                animation: i < 30 ? `waveBar 1.2s ease-in-out ${i * 0.03}s infinite alternate` : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Transcript preview */}
      <div className="space-y-2">
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(77,163,255,0.15)' }}>
            <span className="text-[9px] font-bold" style={{ color: '#4DA3FF' }}>A</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>&quot;Great, and what timeline are you looking at for the purchase?&quot;</p>
        </div>
        <div className="flex gap-3 justify-end">
          <p className="text-sm text-right" style={{ color: 'var(--text-secondary)' }}>&quot;We want to close by June if possible.&quot;</p>
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(24,160,166,0.15)' }}>
            <span className="text-[9px] font-bold text-[#18a0a6]">S</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes waveBar {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

/* ─── Inline SVG Icons ─── */

function PhoneIcon({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function ChatIcon({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}

function EnvelopeIcon({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function TransferIcon({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

function VoicemailIcon({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51" />
    </svg>
  );
}

function CalendarIcon({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}
