// components/StatisticsSection.jsx
export default function StatisticsSection() {
  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-7xl">
        {/* Section heading - professional & calm */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Our Impact at a Glance
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Real data showing the difference your community is making every day.
          </p>
        </div>

        {/* Stats grid - balanced, clean cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm hover:shadow transition-shadow duration-300">
            <div className="text-4xl md:text-5xl font-extrabold text-red-600 mb-3">12,480</div>
            <div className="text-lg font-semibold text-gray-800">Registered Donors</div>
            <div className="mt-2 text-sm text-gray-600">Active volunteers ready to help</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm hover:shadow transition-shadow duration-300">
            <div className="text-4xl md:text-5xl font-extrabold text-red-600 mb-3">37,890</div>
            <div className="text-lg font-semibold text-gray-800">Total Donations</div>
            <div className="mt-2 text-sm text-gray-600">Units collected to date</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm hover:shadow transition-shadow duration-300">
            <div className="text-4xl md:text-5xl font-extrabold text-red-600 mb-3">2,145</div>
            <div className="text-lg font-semibold text-gray-800">Available Units</div>
            <div className="mt-2 text-sm text-gray-600">In stock for emergencies</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm hover:shadow transition-shadow duration-300">
            <div className="text-4xl md:text-5xl font-extrabold text-red-600 mb-3">28,940</div>
            <div className="text-lg font-semibold text-gray-800">Lives Saved</div>
            <div className="mt-2 text-sm text-gray-600">Through timely transfusions</div>
          </div>
        </div>

        {/* Personal stat - subtle and elegant */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-xl border border-gray-200 px-12 py-10 shadow-sm">
            <div className="text-4xl md:text-5xl font-extrabold text-emerald-600 mb-3">7</div>
            <div className="text-lg font-semibold text-gray-800 mb-1">Your Donations</div>
            <div className="text-sm text-gray-600">
              You've helped save <span className="font-bold text-emerald-700">21 lives</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}