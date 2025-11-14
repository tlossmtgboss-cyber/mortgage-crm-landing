'use client';

import DeviceMockup from './DeviceMockup';

export default function FeaturesWithMockups() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-4">
            <span className="text-xl">✨</span>
            <span className="text-sm font-semibold text-blue-600">Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to close more loans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built for mortgage professionals who want to spend less time on admin and more time with clients.
          </p>
        </div>

        {/* Feature 1: AI Email Processing - Laptop */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">🤖</div>
                <h3 className="text-3xl font-bold text-gray-900">AI Email Processing</h3>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Stop manually reading hundreds of emails. Our AI automatically processes emails from borrowers,
                extracts key information, creates tasks, and updates your pipeline—all in real-time.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Automatic task creation from email content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Extract credit scores, income, loan amounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Update deal stages automatically</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <DeviceMockup
                type="laptop"
                imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=1000&fit=crop&q=90"
                alt="AI Email Processing Dashboard"
              />
            </div>
          </div>
        </div>

        {/* Feature 2: Pipeline Management - Phone */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <DeviceMockup
                type="phone"
                imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=1300&fit=crop&q=90"
                alt="Mobile Pipeline View"
              />
            </div>
            <div className="order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">📊</div>
                <h3 className="text-3xl font-bold text-gray-900">Visual Pipeline</h3>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                See your entire pipeline at a glance. Drag-and-drop deals between stages,
                track metrics in real-time, and never let a deal slip through the cracks.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Kanban-style deal tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Real-time metrics and forecasting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Mobile access anywhere</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature 3: Scorecard & Analytics - Laptop */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">📈</div>
                <h3 className="text-3xl font-bold text-gray-900">Performance Scorecard</h3>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Track your team's performance with detailed scorecards. Monitor conversion rates,
                loan volumes, response times, and identify coaching opportunities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Individual & team performance metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Conversion rate tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Customizable dashboards</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <DeviceMockup
                type="laptop"
                imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=1000&fit=crop&q=90"
                alt="Performance Scorecard Dashboard"
              />
            </div>
          </div>
        </div>

        {/* Feature 4: Mortgages Under Management - Phone */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <DeviceMockup
                type="phone"
                imageUrl="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=1300&fit=crop&q=90"
                alt="Mortgages Under Management View"
              />
            </div>
            <div className="order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">💼</div>
                <h3 className="text-3xl font-bold text-gray-900">Mortgages Under Management</h3>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Track every active loan in one place. See status updates, pending documents,
                upcoming deadlines, and loan details—all organized for easy access.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Complete loan portfolio overview</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Status tracking & deadline alerts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Document checklist management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
