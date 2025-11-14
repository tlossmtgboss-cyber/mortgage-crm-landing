'use client';

export default function BenefitsClean() {
  const benefits = [
    {
      stat: "10+",
      label: "Hours Saved Weekly",
      description: "Reclaim time spent on manual data entry and follow-ups"
    },
    {
      stat: "40%",
      label: "Faster Close Times",
      description: "Streamlined processes mean loans close quicker"
    },
    {
      stat: "3x",
      label: "More Volume",
      description: "Handle more loans without adding staff"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Real results from loan officers like you
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Stop wasting time on busywork. Focus on what matters: closing loans and building relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="text-6xl font-bold text-white mb-2">
                {benefit.stat}
              </div>
              <div className="text-xl font-semibold text-white mb-3">
                {benefit.label}
              </div>
              <p className="text-blue-100">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://mortgage-crm-production-7a9a.up.railway.app/register"
            className="inline-block px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-xl"
          >
            Start Your Free Trial →
          </a>
        </div>
      </div>
    </section>
  );
}
