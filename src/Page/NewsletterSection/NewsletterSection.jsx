import React, { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    // Fake API delay - replace with real fetch/axios in production
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you! You’re now subscribed ❤️');
      setEmail('');
    }, 1600);
  };

  return (
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-white via-rose-50/40 to-white">
      {/* Very subtle floating hearts background */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute top-[8%] left-[6%] text-6xl md:text-8xl animate-float-slow">♡</div>
        <div className="absolute top-[30%] right-[10%] text-7xl md:text-9xl animate-float-medium delay-1000">♡</div>
        <div className="absolute bottom-[15%] left-[15%] text-8xl md:text-10xl animate-float-slow delay-2000">♡</div>
        <div className="absolute bottom-[25%] right-[12%] text-6xl md:text-8xl animate-float-medium delay-3000">♡</div>
      </div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-4xl relative z-10 text-center">
        {/* Small heart decoration */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-red-50 shadow-sm">
            <svg
              className="h-8 w-8 md:h-9 md:w-9 text-red-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        <h2 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6 md:mb-10">
          Be Part of Something Bigger
        </h2>

        <p className="text-lg sm:text-xl md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10 md:mb-14">
          Join thousands who receive urgent donation alerts, inspiring stories, and life-saving information — straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl md:max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Your email address"
              disabled={status === 'loading' || status === 'success'}
              className={`
                w-full px-6 py-5 text-lg rounded-full
                bg-white/80 backdrop-blur-sm border-2
                shadow-lg transition-all duration-300
                placeholder:text-gray-500
                ${status === 'error'
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-red-100 focus:border-red-400 focus:ring-4 focus:ring-red-200/50'}
              `}
            />

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`
                px-8 py-5 sm:px-10 md:px-12 md:py-6
                bg-gradient-to-r from-red-600 to-rose-600
                hover:from-red-700 hover:to-rose-700
                text-white font-medium text-lg
                rounded-full shadow-lg
                hover:shadow-xl active:scale-[0.98]
                transition-all duration-300
                disabled:opacity-60 disabled:cursor-not-allowed
                flex items-center justify-center gap-3 min-w-[180px] sm:min-w-[200px]
              `}
            >
              {status === 'loading' ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Joining...
                </>
              ) : (
                'Subscribe Now →'
              )}
            </button>
          </div>

          {message && (
            <div
              className={`mt-8 text-lg md:text-xl font-medium ${
                status === 'success' ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {message}
            </div>
          )}
        </form>

        <p className="mt-10 md:mt-12 text-sm text-gray-500">
          We respect your privacy • Unsubscribe anytime • No spam, ever
        </p>
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(4deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(-5deg); }
        }
        .animate-float-slow {
          animation: float-slow 16s infinite ease-in-out;
        }
        .animate-float-medium {
          animation: float-medium 20s infinite ease-in-out;
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-3000 { animation-delay: 3s; }
      `}</style>
    </section>
  );
};

export default NewsletterSection;