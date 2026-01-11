import { Link } from "react-router";


const categories = [
  {
    name: 'Blood Donors',
    icon: '🩸',
    subtitle: 'Find available donors',
    count: 1247,
    gradient: 'from-red-600/10 to-rose-600/10',
    hoverText: 'text-red-600 dark:text-red-400',
    link: '/donors'
  },
  {
    name: 'Blood Requests',
    icon: '❤️',
    subtitle: 'Post or find urgent requests',
    count: 389,
    gradient: 'from-rose-500/10 to-pink-600/10',
    hoverText: 'text-rose-600 dark:text-rose-400',
    link: '/requests'
  },
  {
    name: 'Blood Banks',
    icon: '🏥',
    subtitle: 'Nearby blood banks & inventory',
    count: 142,
    gradient: 'from-red-500/10 to-orange-600/10',
    hoverText: 'text-red-600 dark:text-red-400',
    link: '/blood-banks'
  },
  {
    name: 'Campaigns',
    icon: '📢',
    subtitle: 'Join or organize donation camps',
    count: 67,
    gradient: 'from-rose-600/10 to-red-700/10',
    hoverText: 'text-rose-600 dark:text-rose-400',
    link: '/campaigns'
  },
  {
    name: 'Eligibility Check',
    icon: '✅',
    subtitle: 'Am I eligible to donate?',
    count: null,
    gradient: 'from-emerald-500/10 to-teal-600/10',
    hoverText: 'text-emerald-600 dark:text-emerald-400',
    link: '/eligibility'
  },
  {
    name: 'Donation History',
    icon: '📊',
    subtitle: 'Your past donations',
    count: null,
    gradient: 'from-blue-500/10 to-indigo-600/10',
    hoverText: 'text-blue-600 dark:text-blue-400',
    link: '/history' // (visible after login)
  },
];

export default function Categories() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white  ">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header - Life saving feel */}
        <div className="text-center mb-14 md:mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-red-600/10 dark:bg-red-500/30 text-red-600  text-sm font-semibold mb-4 tracking-wide">
            SAVE LIVES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-red-700 to-gray-900 dark:from-white dark:via-red-400 dark:to-white bg-clip-text text-transparent">
            How Can You Help Today?
          </h2>
          <p className="mt-5 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
            One drop can save a life. Explore different ways to contribute.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 md:gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.link}
              className={`
                group relative overflow-hidden rounded-2xl 
                bg-white/70 dark:bg-gray-900/60 
                backdrop-blur-xl border border-gray-200/70 dark:border-gray-700/50
                shadow-md hover:shadow-2xl 
                transition-all duration-400 hover:-translate-y-3
                hover:border-red-500/50 dark:hover:border-red-500/40
              `}
            >
              {/* Hover gradient overlay */}
              <div className={`
                absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 
                transition-opacity duration-500 ${cat.gradient}
              `} />

              <div className="p-6 md:p-7 lg:p-8 text-center relative z-10">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`
                    w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl 
                    bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700
                    flex items-center justify-center text-4xl md:text-5xl shadow-inner
                    transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                  `}>
                    {cat.icon}
                  </div>
                </div>

                <h3 className={`
                  text-xl md:text-2xl font-bold text-gray-900 dark:text-white 
                  group-hover:${cat.hoverText.split(' ')[0]} 
                  transition-colors duration-300
                `}>
                  {cat.name}
                </h3>

                <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {cat.subtitle}
                </p>

                {cat.count !== null && (
                  <div className="
                    mt-4 inline-flex items-center gap-2 px-4 py-1.5 
                    rounded-full text-sm font-medium
                    bg-red-50/80 dark:bg-red-950/40 
                    group-hover:bg-red-100/70 dark:group-hover:bg-red-900/50
                    transition-colors duration-300
                  ">
                    <span className="text-red-600 dark:text-red-400 font-bold">
                      {cat.count.toLocaleString()}
                    </span>
                    <span>active</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/register"
            className="
              inline-flex items-center gap-3 px-3 py-3 rounded-xl 
              bg-gradient-to-r from-red-600 to-rose-600 
              hover:from-red-700 hover:to-rose-700 
              text-white font-bold text-lg shadow-xl shadow-red-600/30 
              hover:shadow-2xl hover:shadow-red-700/40 
              transition-all duration-300 transform hover:scale-[1.04]
            "
          >
            Become a Donor Now
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}