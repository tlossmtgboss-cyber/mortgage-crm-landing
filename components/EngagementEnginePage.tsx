'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

/* ─── Inline SVG Icons ─── */

function PhoneIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function ChatBubbleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}

function EnvelopeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ShieldIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function ClockIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function BoltIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function SignalIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 010-5.304m5.304 0a3.75 3.75 0 010 5.304m-7.425 2.121a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.808 3.808 9.981 0 13.789M12 12h.008v.008H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}

function VoicemailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51" />
    </svg>
  );
}

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function BrainIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function CalendarIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

/* ─── Data ─── */

const channels = [
  {
    icon: PhoneIcon,
    title: 'AI Voice Calls',
    subtitle: 'Aria calls every new lead within 60 seconds',
    features: [
      'Personalized greeting using lead data',
      'Mortgage qualification in natural conversation',
      'Live transfer to LO with whisper briefing',
      'TCPA compliant: quiet hours, DNC, consent',
    ],
    accentColor: 'from-[#4DA3FF] to-[#18a0a6]',
  },
  {
    icon: ChatBubbleIcon,
    title: 'AI SMS (Two-Way)',
    subtitle: 'Not canned templates — real AI conversations',
    features: [
      'Claude-powered responses that adapt to borrower tone',
      'Cross-channel awareness (references prior calls)',
      'Deal Breaker detection with alternative routing',
      'STOP handling with instant compliance',
    ],
    accentColor: 'from-[#3DFFA0] to-[#18a0a6]',
  },
  {
    icon: EnvelopeIcon,
    title: 'AI Email',
    subtitle: 'Sent from YOUR Outlook, not a system address',
    features: [
      'Hyper-personalized with full lead context',
      'Open/click tracking that updates lead scores',
      'Rate drop alerts, document reminders, post-call follow-up',
      'Microsoft Graph integration — borrowers reply directly to you',
    ],
    accentColor: 'from-[#4DA3FF] to-[#a855f7]',
  },
  {
    icon: SignalIcon,
    title: 'Live Transfer',
    subtitle: 'Hot leads, transferred live with context',
    features: [
      'LO hears a whisper briefing before connecting',
      'Real-time LO availability checking',
      'If unavailable: priority callback + SMS alert',
      'Full qualification context in the whisper',
    ],
    accentColor: 'from-[#FFB84D] to-[#18a0a6]',
  },
  {
    icon: VoicemailIcon,
    title: 'Voicemail Drops',
    subtitle: 'Ringless voicemail when they don\'t answer',
    features: [
      'AMD detection triggers pre-recorded message',
      'Automatic SMS follow-up 15 minutes later',
      'No missed opportunities',
    ],
    accentColor: 'from-[#FF6B6B] to-[#FFB84D]',
  },
];

const steps = [
  {
    number: '01',
    title: 'Lead Arrives',
    description: 'Any source: web form, Encompass, Salesforce, manual entry. The moment it hits your pipeline, the engine activates.',
    icon: BoltIcon,
  },
  {
    number: '02',
    title: 'Aria Engages',
    description: 'AI selects the optimal channel based on time of day, borrower preference, and pipeline stage. Voice, SMS, email, or all three.',
    icon: BrainIcon,
  },
  {
    number: '03',
    title: 'You Close',
    description: 'Qualified leads are transferred live to you with a whisper briefing, or an appointment is booked directly on your calendar.',
    icon: CalendarIcon,
  },
];

const triggerActions = [
  { trigger: 'new_lead', action: 'AI voice call', color: 'text-[#4DA3FF]' },
  { trigger: 'no_answer', action: 'Voicemail drop + SMS', color: 'text-[#FFB84D]' },
  { trigger: 'email_opened', action: 'SMS escalation', color: 'text-[#3DFFA0]' },
  { trigger: 'sms_replied', action: 'AI conversation', color: 'text-[#4DA3FF]' },
  { trigger: 'qualified', action: 'Live transfer', color: 'text-[#3DFFA0]' },
  { trigger: 'no_contact_48h', action: 'Channel rotation', color: 'text-[#FF6B6B]' },
  { trigger: 'rate_drop', action: 'Alert email + SMS', color: 'text-[#FFB84D]' },
  { trigger: 'doc_missing', action: 'Reminder sequence', color: 'text-[#a855f7]' },
];

const complianceBadges = [
  {
    label: 'TCPA',
    title: 'Telephone Consumer Protection Act',
    description: 'Automatic quiet hours enforcement (8am-9pm local), prior express consent verification, and rate limiting on all outbound communications.',
  },
  {
    label: 'ECOA',
    title: 'Equal Credit Opportunity Act',
    description: 'AI messaging is reviewed for fair lending language. No prohibited basis factors in any borrower-facing communication.',
  },
  {
    label: 'DNC',
    title: 'Do Not Call Registry',
    description: 'Real-time DNC scrub before every outbound call. Federal and state registry checks with freshness enforcement.',
  },
  {
    label: 'A2P 10DLC',
    title: 'Application-to-Person Messaging',
    description: 'Registered campaign with carrier-approved throughput. STOP/HELP keyword handling with instant opt-out compliance.',
  },
];

/* ─── Component ─── */

export default function EngagementEnginePage() {
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for fade-in animations
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

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[var(--bg-0)] text-[var(--text-primary)] overflow-x-hidden" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
      {/* Noise texture + ambient glows (matching cinematic landing) */}
      <div className="noise fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[60vw] h-[60vh] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(77,163,255,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(24,160,166,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <Header />

      {/* ────────────────────────── HERO ────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32">
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 60%, rgba(77,163,255,0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(24,160,166,0.04) 0%, transparent 60%), var(--bg-0)' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#18a0a6]/8 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-[#4DA3FF]/6 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#18a0a6]/30 bg-[#18a0a6]/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#18a0a6] animate-pulse" />
            <span className="text-sm font-medium text-[#18a0a6] tracking-wide">Omnichannel AI Engagement</span>
          </div>

          {/* Headline */}
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 max-w-5xl mx-auto">
            Every Lead Contacted in{' '}
            <span className="bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent">
              60 Seconds
            </span>
            .{' '}
            <br className="hidden md:block" />
            Every Channel. Every Time.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Aria, your AI loan officer assistant, calls, texts, and emails leads the moment they arrive — qualifying borrowers, booking appointments, and transferring hot prospects live to you.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="https://app.perenniaai.com/register"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgba(77,163,255,0.9), rgba(120,200,255,0.8))', color: '#040508', boxShadow: '0 8px 40px rgba(77,163,255,0.3)' }}
            >
              Start Free Trial
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={scrollToDemo}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-normal tracking-wider uppercase transition-all duration-300 hover:border-[rgba(77,163,255,0.4)] hover:text-white"
              style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
            {[
              { value: '60s', label: 'Speed to Lead' },
              { value: '5', label: 'Channels' },
              { value: '12mo', label: 'Drip Sequences' },
              { value: '24/7', label: 'Always On' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────── CHANNEL SHOWCASE ────────────────────────── */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium mb-4">
              Five Channels.{' '}
              <span className="bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent">
                One AI Brain.
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every channel is orchestrated by the same AI — Aria remembers every interaction across every touchpoint.
            </p>
          </div>

          <div className="space-y-12 md:space-y-20">
            {channels.map((channel, index) => {
              const IconComponent = channel.icon;
              const isReversed = index % 2 === 1;

              return (
                <div
                  key={channel.title}
                  data-animate
                  className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}
                >
                  {/* Content side */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${channel.accentColor} bg-opacity-10`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-white">
                          {channel.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-lg text-gray-400 mb-6 font-light">{channel.subtitle}</p>
                    <ul className="space-y-3">
                      {channel.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckIcon className="w-5 h-5 text-[#18a0a6] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual side */}
                  <div className="flex-1 w-full">
                    <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}>
                      <ChannelVisual channel={channel.title} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────── HOW IT WORKS ────────────────────────── */}
      <section ref={demoRef} className="py-20 md:py-32 relative bg-gradient-to-b from-transparent via-[#0c1018]/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium mb-4">
              How It{' '}
              <span className="bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From lead arrival to live transfer in three steps. No manual dialing. No forgotten follow-ups.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-[#4DA3FF]/30 via-[#18a0a6]/50 to-[#3DFFA0]/30" />

            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.number} data-animate className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4DA3FF]/20 to-[#18a0a6]/20 border border-white/10 mb-6 relative z-10">
                    <StepIcon className="w-7 h-7 text-[#18a0a6]" />
                  </div>
                  <div className="text-xs font-mono text-[#18a0a6] tracking-widest mb-2">{step.number}</div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>

          {/* Training guide link */}
          <div className="mt-12 text-center" data-animate>
            <Link
              href="/engagement-engine/training"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-normal tracking-wider uppercase transition-all duration-300 hover:border-[rgba(77,163,255,0.4)] hover:text-white"
              style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
            >
              Read the Full Training Guide
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────── THE ORCHESTRATOR ────────────────────────── */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: description */}
            <div data-animate>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#18a0a6]/30 bg-[#18a0a6]/10 mb-6">
                <BrainIcon className="w-4 h-4 text-[#18a0a6]" />
                <span className="text-xs font-medium text-[#18a0a6] tracking-wide uppercase">Orchestration Engine</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium mb-6">
                The Brain Behind Every{' '}
                <span className="bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent">
                  Engagement
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed font-light">
                15 trigger events. Intelligent channel selection based on time, borrower preference, and stage.
                Fatigue prevention ensures no borrower is overwhelmed. Compliance gates validate every message before it sends.
              </p>
              <div className="space-y-4">
                {[
                  'Selects the optimal channel for each lead in real time',
                  'Prevents contact fatigue with configurable rate limits',
                  'Routes through compliance gates before every touchpoint',
                  'Adapts strategy based on engagement signals',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-[#3DFFA0] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: trigger/action grid */}
            <div data-animate>
              <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">Trigger / Action Map</div>
                <div className="space-y-3">
                  {triggerActions.map((item) => (
                    <div
                      key={item.trigger}
                      className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-gray-500">{item.trigger}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRightIcon className="w-4 h-4 text-gray-600" />
                        <span className={`text-sm font-medium ${item.color}`}>{item.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── 12-MONTH DRIP ────────────────────────── */}
      <section className="py-20 md:py-32 relative bg-gradient-to-b from-transparent via-[#0c1018]/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium mb-4">
              12 Months of{' '}
              <span className="bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent">
                Intelligent Nurture
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Adaptive drip campaigns that adjust intensity based on engagement. The moment a lead responds, the drip pauses and Aria starts a live conversation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                phase: 'Phase 1',
                period: 'Days 1 - 7',
                title: 'High Frequency',
                description: 'Aggressive multi-channel outreach. AI call on day 1, SMS follow-up, email sequence. Up to 3 touchpoints per day across different channels.',
                color: 'from-[#FF6B6B] to-[#FFB84D]',
                borderColor: 'border-[#FFB84D]/20',
                items: ['Day 1: AI call + SMS + email', 'Days 2-3: SMS + email', 'Days 4-7: Alternate channels daily'],
              },
              {
                phase: 'Phase 2',
                period: 'Days 8 - 90',
                title: 'Weekly Nurture',
                description: 'Consistent weekly touchpoints with rate alerts, market updates, and check-ins. Channel rotation to avoid fatigue.',
                color: 'from-[#4DA3FF] to-[#18a0a6]',
                borderColor: 'border-[#4DA3FF]/20',
                items: ['Weekly email with rate insights', 'Bi-weekly SMS check-in', 'Monthly AI voice call'],
              },
              {
                phase: 'Phase 3',
                period: 'Days 91 - 365',
                title: 'Monthly Touchpoints',
                description: 'Light-touch engagement that keeps you top of mind. Market updates, rate drop alerts, and milestone reminders.',
                color: 'from-[#3DFFA0] to-[#18a0a6]',
                borderColor: 'border-[#3DFFA0]/20',
                items: ['Monthly market update email', 'Rate drop SMS alerts', 'Quarterly AI voice check-in'],
              },
            ].map((phase) => (
              <div
                key={phase.phase}
                data-animate
                className="rounded-2xl p-6 md:p-8 transition-colors hover:brightness-110"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}
              >
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${phase.color} text-xs font-semibold text-white mb-4`}>
                  {phase.phase}
                </div>
                <div className="text-sm font-mono text-gray-500 mb-2">{phase.period}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{phase.title}</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckIcon className="w-4 h-4 text-[#18a0a6] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Adaptive callout */}
          <div className="mt-12 text-center" data-animate>
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#18a0a6]/20 bg-[#18a0a6]/5">
              <BoltIcon className="w-5 h-5 text-[#18a0a6]" />
              <span className="text-gray-300">
                <span className="text-white font-medium">Adaptive</span> — the moment a lead responds, the drip pauses and Aria starts a live conversation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── COMPLIANCE ────────────────────────── */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium mb-4">
              Compliance{' '}
              <span className="bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent">
                Built In
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Enterprise-grade compliance is not an add-on — it is built into every AI interaction.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceBadges.map((badge) => (
              <div
                key={badge.label}
                data-animate
                className="rounded-2xl p-6 hover:brightness-110 transition-all duration-300 group"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#18a0a6]/10 border border-[#18a0a6]/20 group-hover:bg-[#18a0a6]/20 transition-colors">
                    <ShieldIcon className="w-5 h-5 text-[#18a0a6]" />
                  </div>
                  <span className="text-lg font-bold text-white font-mono">{badge.label}</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">{badge.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────── FINAL CTA ────────────────────────── */}
      <section className="py-20 md:py-32 relative">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-[#18a0a6]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-animate>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium mb-6">
              Stop Losing Leads.{' '}
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent">
                Start Closing More.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Every minute without Perennia AI is a lead that went to voicemail and never called back.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://app.perenniaai.com/register"
                className="group inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, rgba(77,163,255,0.9), rgba(120,200,255,0.8))', color: '#040508', boxShadow: '0 8px 40px rgba(77,163,255,0.3)' }}
              >
                Start Free Trial
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/engagement-engine/training"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-normal tracking-wider uppercase transition-all duration-300 hover:border-[rgba(77,163,255,0.4)] hover:text-white"
                style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
              >
                Read the Training Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Channel Visual Components ─── */

function ChannelVisual({ channel }: { channel: string }) {
  switch (channel) {
    case 'AI Voice Calls':
      return <VoiceCallVisual />;
    case 'AI SMS (Two-Way)':
      return <SMSVisual />;
    case 'AI Email':
      return <EmailVisual />;
    case 'Live Transfer':
      return <LiveTransferVisual />;
    case 'Voicemail Drops':
      return <VoicemailDropVisual />;
    default:
      return null;
  }
}

function VoiceCallVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#3DFFA0] animate-pulse" />
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Live AI Call</span>
      </div>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#18a0a6]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-[#18a0a6]">A</span>
          </div>
          <div className="bg-white/5 rounded-xl rounded-tl-sm px-4 py-3 max-w-xs">
            <p className="text-sm text-gray-300">&quot;Hi Sarah, this is Aria calling from First National. I saw you were looking at refinance options — do you have a quick minute?&quot;</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <div className="bg-[#18a0a6]/10 rounded-xl rounded-tr-sm px-4 py-3 max-w-xs">
            <p className="text-sm text-gray-300">&quot;Yes, actually I was wondering about current rates for a 30-year fixed.&quot;</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#4DA3FF]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-[#4DA3FF]">S</span>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#18a0a6]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-[#18a0a6]">A</span>
          </div>
          <div className="bg-white/5 rounded-xl rounded-tl-sm px-4 py-3 max-w-xs">
            <p className="text-sm text-gray-300">&quot;Great question. Let me connect you with your loan officer who can pull live rates for you right now...&quot;</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
        <ClockIcon className="w-4 h-4 text-gray-600" />
        <span className="text-xs text-gray-600">Call duration: 2m 34s</span>
        <span className="text-xs text-[#3DFFA0] ml-auto">Qualified — transferring</span>
      </div>
    </div>
  );
}

function SMSVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#3DFFA0]" />
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">SMS Conversation</span>
      </div>
      <div className="space-y-3">
        <div className="bg-[#18a0a6]/10 rounded-xl px-4 py-2.5 max-w-[85%]">
          <p className="text-sm text-gray-300">Hi James, this is Aria from First National. We spoke briefly on the phone earlier — I wanted to follow up on the purchase loan you mentioned. What price range are you looking at?</p>
          <span className="text-[10px] text-gray-600 mt-1 block">10:32 AM</span>
        </div>
        <div className="bg-white/5 rounded-xl px-4 py-2.5 max-w-[85%] ml-auto">
          <p className="text-sm text-gray-300">Around 400k. What kind of down payment would I need?</p>
          <span className="text-[10px] text-gray-600 mt-1 block">10:34 AM</span>
        </div>
        <div className="bg-[#18a0a6]/10 rounded-xl px-4 py-2.5 max-w-[85%]">
          <p className="text-sm text-gray-300">For $400K, conventional loans start at 3% down ($12K). FHA is 3.5% ($14K). Would you like me to book a 15-minute call with your loan officer to run exact numbers?</p>
          <span className="text-[10px] text-gray-600 mt-1 block">10:34 AM</span>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
        <ChatBubbleIcon className="w-4 h-4 text-gray-600" />
        <span className="text-xs text-gray-600">AI-powered response</span>
        <span className="text-xs text-[#4DA3FF] ml-auto">Cross-channel aware</span>
      </div>
    </div>
  );
}

function EmailVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#4DA3FF]" />
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Outbound Email</span>
      </div>
      <div className="border border-white/5 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">From: john.smith@firstnational.com</div>
            <div className="text-xs text-gray-500">To: sarah.johnson@email.com</div>
          </div>
          <div className="text-[10px] text-gray-600">via Microsoft Graph</div>
        </div>
        <div className="border-t border-white/5 pt-3">
          <div className="text-sm font-medium text-white mb-2">Sarah, rates just dropped to 6.25%</div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Hi Sarah, I wanted to reach out because 30-year fixed rates moved down to 6.25% today. Based on the $450K refinance we discussed, this could save you approximately $215/month compared to your current rate...
          </p>
        </div>
        <div className="flex items-center gap-4 pt-2 border-t border-white/5">
          <span className="text-[10px] text-[#3DFFA0]">Opened 3x</span>
          <span className="text-[10px] text-[#4DA3FF]">Link clicked</span>
          <span className="text-[10px] text-[#FFB84D] ml-auto">Lead score +15</span>
        </div>
      </div>
    </div>
  );
}

function LiveTransferVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#FFB84D] animate-pulse" />
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Live Transfer</span>
      </div>
      <div className="space-y-4">
        {/* Whisper briefing */}
        <div className="border border-[#FFB84D]/20 bg-[#FFB84D]/5 rounded-xl p-4">
          <div className="text-xs font-mono text-[#FFB84D] uppercase mb-2">Whisper Briefing</div>
          <p className="text-sm text-gray-300">
            &quot;Incoming transfer: Sarah Johnson, pre-qualified, $450K refinance, 760 FICO, currently at 7.1% — interested in 30-year fixed. She is ready to proceed.&quot;
          </p>
        </div>
        {/* Transfer status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#18a0a6]/20 flex items-center justify-center">
              <span className="text-xs font-bold text-[#18a0a6]">A</span>
            </div>
            <span className="text-xs text-gray-500">Aria</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-px bg-gradient-to-r from-[#18a0a6]/50 to-[#3DFFA0]/50" />
            <span className="text-xs text-[#3DFFA0] font-mono">CONNECTED</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#3DFFA0]/50 to-[#4DA3FF]/50" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">John S.</span>
            <div className="w-8 h-8 rounded-full bg-[#4DA3FF]/20 flex items-center justify-center">
              <span className="text-xs font-bold text-[#4DA3FF]">LO</span>
            </div>
          </div>
        </div>
        {/* Availability */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#3DFFA0]" />
          <span className="text-xs text-gray-500">LO available</span>
          <span className="text-xs text-gray-600 ml-auto">Avg. transfer time: 8s</span>
        </div>
      </div>
    </div>
  );
}

function VoicemailDropVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Voicemail Sequence</span>
      </div>
      <div className="space-y-3">
        {/* Timeline */}
        <div className="relative pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-[#FF6B6B]/50 via-[#FFB84D]/50 to-[#3DFFA0]/50" />

          <div className="relative pb-4">
            <div className="absolute left-[-18px] w-2.5 h-2.5 rounded-full bg-[#FF6B6B] border-2 border-[#040508]" />
            <div className="text-xs font-mono text-gray-600 mb-1">0:00</div>
            <div className="text-sm text-gray-300">AMD detected — answering machine</div>
          </div>

          <div className="relative pb-4">
            <div className="absolute left-[-18px] w-2.5 h-2.5 rounded-full bg-[#FFB84D] border-2 border-[#040508]" />
            <div className="text-xs font-mono text-gray-600 mb-1">0:02</div>
            <div className="text-sm text-gray-300">Ringless voicemail dropped (pre-recorded)</div>
          </div>

          <div className="relative pb-4">
            <div className="absolute left-[-18px] w-2.5 h-2.5 rounded-full bg-[#4DA3FF] border-2 border-[#040508]" />
            <div className="text-xs font-mono text-gray-600 mb-1">+15 min</div>
            <div className="text-sm text-gray-300">Automatic SMS follow-up sent</div>
          </div>

          <div className="relative">
            <div className="absolute left-[-18px] w-2.5 h-2.5 rounded-full bg-[#3DFFA0] border-2 border-[#040508]" />
            <div className="text-xs font-mono text-gray-600 mb-1">+22 min</div>
            <div className="text-sm text-[#3DFFA0]">Borrower replied to SMS</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
        <VoicemailIcon className="w-4 h-4 text-gray-600" />
        <span className="text-xs text-gray-600">No missed opportunities</span>
      </div>
    </div>
  );
}
