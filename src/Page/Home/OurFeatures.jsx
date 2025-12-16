import React from "react";

const features = [
  {
    title: "Support Our Campaigns",
    description:
      "Highlight any ongoing fundraising campaigns or special initiatives. Provide details on how visitors can contribute, participate, or spread the word. Use engaging visuals and call-to-action buttons to drive participation.",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Did You Know?",
    description:
      "Share interesting and important facts about blood donation. This could include statistics about blood needs, the impact of donations, and dispelling common myths about donating blood.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Success Stories",
    description:
      "Share inspiring stories of people whose lives were saved through blood donations. Include pictures and testimonials from recipients and donors to make the stories more relatable and impactful.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function OurFeatures() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-12">
          Our Features
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
