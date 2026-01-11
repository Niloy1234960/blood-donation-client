// components/Testimonials.jsx
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sree Niloy Chandra Mondal",
    location: "Mirpur, Dhaka",
    bloodGroup: "A+",
    date: "December 15, 2025",
    image: "https://i.ibb.co.com/x8mq8kqp/1767160979553-modified.png",
    rating: 5,
    text: "First time donating blood. The whole team was extremely caring and professional. I felt completely safe and well taken care of. Will definitely come again!",
  },
  {
    id: 2,
    name: "Fatima Begum",
    location: "Sylhet",
    bloodGroup: "A+",
    date: "January 03, 2026",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "Donated for my cousin who needed O-. The process was smooth, staff were very kind, and they even followed up the next day. Highly recommend this platform!",
  },
  {
    id: 3,
    name: "Sabbir Hossain",
    location: "Chattogram",
    bloodGroup: "B+",
    date: "November 28, 2025",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 4,
    text: "Very organized campaign. Quick registration, proper health check-up before donation, and excellent post-donation care. One of the best experiences I've had.",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    location: "Rajshahi",
    bloodGroup: "AB-",
    date: "October 19, 2025",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 5,
    text: "As a rare blood group donor, I always feel nervous. But the team here made me feel very comfortable and important. Thank you for your wonderful service!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Donors Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real heroes who saved lives through blood donation
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden 
                       border border-gray-200
                       hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Person Info */}
              <div className="p-6 pb-2 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-red-500 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.location} • {testimonial.bloodGroup}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="px-6 pb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="px-6 pb-6 flex-grow">
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Date */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                Donated on {testimonial.date}
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Testimonials;