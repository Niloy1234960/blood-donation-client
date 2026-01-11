import { Link } from "react-router";


const stats = [
  { value: "12,847", label: "Lives Saved", icon: "❤️" },
  { value: "4,392", label: "Active Donors", icon: "🩸" },
  { value: "28,619", label: "Blood Units", icon: "💉" },
  { value: "156", label: "Campaigns", icon: "📢" },
];

export default function HighlightsSection() {
  return (
    <section className="py-10 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header - Compact */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block mb-3 px-6 py-1.5 rounded-full bg-red-600/10 dark:bg-red-500/20 text-red-600 dark:text-red-600 text-xs md:text-sm font-semibold ">
            OUR IMPACT
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 ">
            Every Drop Makes a Difference
          </h2>
          <p className="mt-3 text-base text-gray-600  max-w-2xl mx-auto">
            Real results from our community of life-savers
          </p>
        </div>

        {/* Compact Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="
                group relative rounded-xl 
                bg-white dark:bg-gray-800/80 
                border border-gray-200/70 dark:border-gray-700/50
                shadow-sm hover:shadow-md 
                transition-all duration-300 hover:-translate-y-1
                p-5 md:p-6 text-center
              "
            >
              {/* Subtle hover accent */}
              <div className="
                absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 
                opacity-0 group-hover:opacity-100 rounded-xl 
                transition-opacity duration-300
              " />

              <div className="relative z-10">
                <div className="
                  w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-lg 
                  bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600
                  flex items-center justify-center text-2xl md:text-3xl
                  group-hover:scale-105 transition-transform
                ">
                  {stat.icon}
                </div>

                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {stat.value}
                </div>

                <div className="mt-1 text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      
 
      </div>
    </section>
  );
}