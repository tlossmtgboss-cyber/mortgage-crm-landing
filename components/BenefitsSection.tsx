'use client';

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Stop drowning in admin work
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Mortgage professionals save an average of 10+ hours per week using our AI-powered automation.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div className="text-6xl font-bold text-white mb-2">10+</div>
            <div className="text-xl font-semibold text-white mb-2">Hours Saved</div>
            <div className="text-blue-100">Per week on email processing and data entry</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div className="text-6xl font-bold text-white mb-2">40%</div>
            <div className="text-xl font-semibold text-white mb-2">Faster Closings</div>
            <div className="text-blue-100">Reduce time-to-close with automation</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div className="text-6xl font-bold text-white mb-2">3x</div>
            <div className="text-xl font-semibold text-white mb-2">More Volume</div>
            <div className="text-blue-100">Close more loans without hiring more staff</div>
          </div>
        </div>

        {/* Feature list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">✓</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Automatic Email Processing</h3>
              <p className="text-blue-100">AI reads and processes every borrower email</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">✓</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Smart Task Creation</h3>
              <p className="text-blue-100">Never miss a follow-up or deadline again</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">✓</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Pipeline Intelligence</h3>
              <p className="text-blue-100">Real-time insights and forecasting</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">✓</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Bank-Level Security</h3>
              <p className="text-blue-100">AES-128 encryption and GLBA compliant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
