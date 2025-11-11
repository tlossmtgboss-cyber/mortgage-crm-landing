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
    subtitle: 'Your pipeline,',
    highlight: 'crystal clear',
    description: 'Real-time visibility into every deal. Track loans from application to closing with intelligent insights that keep you ahead.',
    icon: '👁️',
  },
  {
    title: 'Know',
    subtitle: 'Every client,',
    highlight: 'deeply',
    description: 'AI-powered intelligence that learns from every interaction. Know exactly what each client needs, when they need it.',
    icon: '🧠',
  },
  {
    title: 'Close',
    subtitle: 'More deals,',
    highlight: 'faster',
    description: 'Automate the routine, focus on relationships. Our AI handles follow-ups, document tracking, and deadline management.',
    icon: '⚡',
  },
  {
    title: 'Grow',
    subtitle: 'Your business,',
    highlight: 'exponentially',
    description: 'Scale without adding overhead. Build a referral engine that compounds your success with every closed loan.',
    icon: '🚀',
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
                <div className="text-2xl text-white/40 uppercase tracking-widest mb-4">
                  {feature.title}
                </div>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white/80">{feature.subtitle}</span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    {feature.highlight}
                  </span>
                </h2>
              </div>

              {/* Description */}
              <p className="section-content text-xl sm:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                {feature.description}
              </p>
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
