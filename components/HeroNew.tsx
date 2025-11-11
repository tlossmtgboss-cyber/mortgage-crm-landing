'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroNew() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade-in animation
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.6')
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
      }, '-=0.4');

      // Floating orbs animation
      gsap.to(orb1Ref.current, {
        y: -30,
        x: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(orb2Ref.current, {
        y: 40,
        x: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      gsap.to(orb3Ref.current, {
        y: -20,
        x: -20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });

      // Scroll-triggered animation
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          opacity: 0.3,
          scale: 0.95,
          filter: 'blur(10px)',
        });

        gsap.to(bgRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          scale: 1.2,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Animated radial gradient background */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)',
        }}
      />

      {/* Floating gradient orbs */}
      <div ref={orb1Ref} className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%)',
        }}
      />
      <div ref={orb2Ref} className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent 70%)',
        }}
      />
      <div ref={orb3Ref} className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)',
        }}
      />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-12 hover:bg-white/10 transition-all duration-500 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
              AI-Powered Intelligence
            </span>
          </div>

          {/* Main Heading */}
          <h1
            ref={titleRef}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            <span className="block text-white">
              Transform
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400">
              mortgage lending
            </span>
          </h1>

          {/* Subheading */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-white/60 mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            The only CRM built for modern mortgage teams. Close loans faster with intelligent automation.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
            <Link
              href="https://mortgage-crm-production-7a9a.up.railway.app/register"
              className="group relative w-full sm:w-auto px-10 py-5 bg-white text-black font-semibold text-lg rounded-xl hover:scale-105 transition-all duration-500 shadow-2xl shadow-blue-500/20 overflow-hidden"
            >
              <span className="relative z-10">Start free trial</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            <Link
              href="https://mortgage-crm-production-7a9a.up.railway.app/"
              className="group w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-xl text-white font-semibold text-lg rounded-xl hover:bg-white/10 transition-all duration-500 border border-white/10"
            >
              <span className="group-hover:text-white/90 transition-colors">Watch demo</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { value: '$2B+', label: 'Loans processed' },
              { value: '500+', label: 'Loan officers' },
              { value: '40%', label: 'Faster closings' },
            ].map((stat, index) => (
              <div
                key={index}
                className="group hover:scale-105 transition-transform duration-500"
              >
                <div className="text-5xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-500">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-xs text-white uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
}
