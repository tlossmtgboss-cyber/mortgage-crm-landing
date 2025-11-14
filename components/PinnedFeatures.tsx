'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: 'See',
    subtitle: 'Your entire pipeline,',
    highlight: 'at a glance',
    description: 'Never lose track of a deal again. Our intelligent dashboard gives you real-time visibility into every loan—from initial contact to funding. Color-coded stages, automated SLA tracking, and predictive close dates powered by AI. Know exactly which deals need attention and why.',
    icon: '👁️',
    stats: ['Real-time updates', 'Smart prioritization', 'Predictive analytics'],
  },
  {
    title: 'Know',
    subtitle: 'Your clients better than',
    highlight: 'they know themselves',
    description: 'Our AI analyzes every interaction, text message, and document to build complete borrower profiles. Get intelligent recommendations on the best loan products, optimal timing for rate locks, and personalized talking points before every call. Stop guessing—start knowing.',
    icon: '🧠',
    stats: ['AI borrower insights', 'Smart recommendations', 'Conversation intelligence'],
  },
  {
    title: 'Close',
    subtitle: 'More deals while',
    highlight: 'working less',
    description: 'Automated SMS follow-ups. Smart document tracking. Intelligent deadline reminders. Our AI handles the busywork while you focus on relationships. Set it once, let it run forever. Your pipeline moves forward even while you sleep.',
    icon: '⚡',
    stats: ['Automated SMS', 'Document AI', 'Smart workflows'],
  },
  {
    title: 'Grow',
    subtitle: 'Your volume without',
    highlight: 'adding overhead',
    description: 'Built-in referral partner management tracks every realtor, builder, and CPA relationship. Automated reciprocity scoring shows who sends you deals. Integrated MUM dashboard turns every closed loan into your next refi. Scale from 5 to 50 loans/month without hiring more staff.',
    icon: '🚀',
    stats: ['Partner tracking', 'MUM automation', 'Unlimited scale'],
  },
];

export default function PinnedFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        // Pin each section
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        // Fade out and scale when scrolling past
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
          },
          opacity: 0,
          scale: 0.9,
          filter: 'blur(20px)',
        });

        // Animate content
        const title = section.querySelector('.section-title');
        const content = section.querySelector('.section-content');
        const icon = section.querySelector('.section-icon');

        if (title && content && icon) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          });

          tl.from(icon, {
            scale: 0.5,
            opacity: 0,
            rotation: -180,
            duration: 1,
          })
          .from(title, {
            y: 100,
            opacity: 0,
            duration: 1,
          }, '-=0.5')
          .from(content, {
            y: 50,
            opacity: 0,
            duration: 1,
          }, '-=0.5');
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {features.map((feature, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionsRef.current[index] = el;
          }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${50 + index * 10}% ${50 - index * 5}%, rgba(${index * 20}, ${100 - index * 10}, ${200 - index * 30}, 0.1), black)`,
          }}
        >
          {/* Animated background gradient */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${30 + index * 15}% ${40 + index * 10}%, rgba(${59 + index * 20}, ${130 - index * 15}, ${246 - index * 20}, 0.2), transparent 60%)`,
            }}
          />

          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Icon */}
              <div className="section-icon text-8xl mb-12 transform hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>

              {/* Title */}
              <div className="section-title mb-12">
                <div className="text-2xl text-gray-400 uppercase tracking-widest mb-4">
                  {feature.title}
                </div>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white/95">{feature.subtitle}</span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    {feature.highlight}
                  </span>
                </h2>
              </div>

              {/* Description */}
              <p className="section-content text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-12">
                {feature.description}
              </p>

              {/* Feature stats */}
              <div className="section-content flex flex-wrap items-center justify-center gap-6 max-w-2xl mx-auto">
                {feature.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  animation: `float ${3 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </section>
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
