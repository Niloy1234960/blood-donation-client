

// ==============================
// Contact Us Section Component
// ==============================

export function ContactSection() {
  return (
    <section className="bg-[#9b1537] py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            We'd love to hear from you! Let's get in touch
          </h3>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="tel"
                placeholder="+880 1111 000-000"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <textarea
              rows="4"
              placeholder="Type your message here"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-sm max-w-md mb-6">
            Not sure what you need? The team will be happy to listen to you and
            suggest event ideas you hadn't considered.
          </p>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              info@bloodbridge.com
            </p>
            <p>
              <span className="font-semibold">Support:</span>{" "}
              (+880) 123 456 586
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

