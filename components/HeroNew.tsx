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
      {/* Enhanced animated gradient background */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.25), rgba(147, 51, 234, 0.15), transparent 80%)',
        }}
      />

      {/* More vibrant floating gradient orbs */}
      <div ref={orb1Ref} className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(99, 102, 241, 0.4), transparent 70%)',
        }}
      />
      <div ref={orb2Ref} className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.5), rgba(168, 85, 247, 0.3), transparent 70%)',
        }}
      />
      <div ref={orb3Ref} className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.5), rgba(59, 130, 246, 0.4), transparent 70%)',
        }}
      />

      {/* Additional accent orbs for more depth */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-10 blur-2xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4), transparent 70%)',
          animationDuration: '4s',
        }}
      />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full opacity-10 blur-2xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.4), transparent 70%)',
          animationDuration: '5s',
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
              Trusted by 500+ loan officers nationwide
            </span>
          </div>

          {/* Main Heading */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[1.05] mb-10"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.03em',
            }}
          >
            <span className="block text-white mb-5 drop-shadow-2xl">
              Your Mortgage Operating System
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 drop-shadow-2xl">
              Automate, Learn, and Grow
            </span>
          </h1>

          {/* Subheading */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-white/95 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
          >
            An intelligent, coachable AI assistant that <span className="text-blue-300 font-medium">reads your emails</span>, <span className="text-purple-300 font-medium">updates your milestones</span>, <span className="text-indigo-300 font-medium">executes tasks</span>, and learns from your feedback—while your team focuses on relationships and revenue.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-28">
            <Link
              href="https://mortgage-crm-production-7a9a.up.railway.app/register"
              className="group relative w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-bold text-lg rounded-2xl hover:scale-110 transition-all duration-500 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            <Link
              href="https://mortgage-crm-production-7a9a.up.railway.app/"
              className="group w-full sm:w-auto px-12 py-6 bg-white/10 backdrop-blur-xl text-white font-bold text-lg rounded-2xl hover:bg-white/20 hover:scale-105 transition-all duration-500 border-2 border-white/20 hover:border-white/40 shadow-xl"
            >
              <span className="flex items-center gap-2 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                Watch Demo
              </span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {[
              { value: '$4.2B', label: 'CRM Market Size', color: 'from-blue-400 to-cyan-400' },
              { value: '300K+', label: 'U.S. Originators', color: 'from-indigo-400 to-blue-400' },
              { value: '70%', label: 'Report Tech Inefficiency', color: 'from-purple-400 to-indigo-400' },
            ].map((stat, index) => (
              <div
                key={index}
                className="group hover:scale-110 transition-all duration-500 relative"
              >
                <div className={`text-6xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:drop-shadow-2xl transition-all duration-500`}>
                  {stat.value}
                </div>
                <div className="text-base text-white/80 uppercase tracking-wider font-medium group-hover:text-white transition-colors">{stat.label}</div>
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`}></div>
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
