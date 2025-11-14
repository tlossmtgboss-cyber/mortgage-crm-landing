'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const workflowSteps = [
  {
    step: "1",
    title: "Appraisal email arrives in your inbox",
    icon: "📧",
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "2",
    title: "AI detects the milestone → updates loan status to Processing",
    icon: "🤖",
    color: "from-cyan-500 to-teal-500",
  },
  {
    step: "3",
    title: "AI generates tasks",
    icon: "📋",
    color: "from-teal-500 to-green-500",
    subtasks: [
      '"Notify borrower" (auto-completed by AI)',
      '"Request insurance binder" (assigned to Processor)',
    ],
  },
  {
    step: "4",
    title: "Team member reviews AI-completed task → provides feedback → AI learns",
    icon: "✅",
    color: "from-green-500 to-emerald-500",
  },
];

export default function AgenticAI() {
  const sectionRef = useRef<HTMLElement>(null);

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
          background: 'radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15), transparent 50%), radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.15), transparent 50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="text-sm font-medium text-gray-200">How It Works</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Agentic AI
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              in action
            </span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Watch how our AI assistant handles real-world mortgage workflows—learning and improving with every interaction.
          </p>
        </div>

        {/* Workflow visualization */}
        <div className="max-w-4xl mx-auto space-y-6">
          {workflowSteps.map((item, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Connecting line */}
              {index < workflowSteps.length - 1 && (
                <div className="absolute left-8 top-24 w-0.5 h-12 bg-gradient-to-b from-white/30 to-transparent"></div>
              )}

              <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                <div className="flex items-start gap-6">
                  {/* Step number */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                    {item.step}
                  </div>

                  <div className="flex-1">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-4xl">{item.icon}</span>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* Subtasks */}
                    {item.subtasks && (
                      <div className="ml-12 space-y-3">
                        {item.subtasks.map((subtask, subIndex) => (
                          <div
                            key={subIndex}
                            className="flex items-center gap-3 text-gray-200 text-lg"
                          >
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span>{subtask}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key benefits */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Every cycle makes the system smarter
            </h3>
            <p className="text-gray-200 text-lg">
              The AI learns from your feedback and corrections, continuously improving its accuracy and decision-making.
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Human intervention becomes the exception
            </h3>
            <p className="text-gray-200 text-lg">
              Over time, routine tasks are fully automated, freeing your team to focus on complex decisions and client relationships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
