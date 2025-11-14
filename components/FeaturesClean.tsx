'use client';

export default function FeaturesClean() {
  const features = [
    {
      icon: "🤖",
      title: "AI Email Processing",
      description: "Automatically reads and processes emails, extracting key information and updating loan statuses without manual data entry."
    },
    {
      icon: "📊",
      title: "Smart Pipeline Management",
      description: "Track leads, active loans, and closed deals in one unified dashboard with real-time updates and insights."
    },
    {
      icon: "📧",
      title: "Automated Follow-ups",
      description: "Never miss a follow-up. AI sends timely reminders and communications based on loan milestones."
    },
    {
      icon: "📞",
      title: "Integrated Communications",
      description: "SMS, email, and calendar integrations keep all your client communications in one place."
    },
    {
      icon: "📈",
      title: "Analytics & Reporting",
      description: "Real-time dashboards showing conversion rates, pipeline value, and team performance metrics."
    },
    {
      icon: "🔗",
      title: "Seamless Integrations",
      description: "Connect with Microsoft 365, Calendly, Twilio, Encompass, and more through our integration platform."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to close more loans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed specifically for mortgage professionals
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
