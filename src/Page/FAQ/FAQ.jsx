import React, { useState } from 'react';

const faqData = [
  {
    id: 1,
    question: "Is there a weight requirement for blood donation?",
    answer: "Yes, donors must weigh at least 50 kg (110 lbs) to be eligible. This ensures the safety of the donor during and after the collection process."
  },
  {
    id: 2,
    question: "How long does the actual donation take?",
    answer: "The blood draw itself usually takes only 8–10 minutes. However, plan for about an hour for the whole process, including registration and a brief recovery period with snacks."
  },
  {
    id: 3,
    question: "Can I donate if I am taking medication?",
    answer: "Most medications do not prevent you from donating, but some (like blood thinners or certain acne meds) might. Please check our detailed eligibility list or consult our medical staff."
  },
  {
    id: 4,
    question: "How will I know if my blood helped someone?",
    answer: "Through your User Dashboard, you will receive a notification once your blood has been dispatched to a hospital or a specific recipient request."
  }
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8">
          <div className="max-w-2xl">
            <span className="text-red-600 font-bold tracking-wider uppercase text-sm">Common Inquiries</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Questions about <span className="text-red-600 underline decoration-red-100">Donation</span></h2>
            <p className="text-gray-500 mt-4 text-lg">
              Find answers to the most common questions about the blood donation process and our platform's features.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="bg-red-50 text-red-600 px-6 py-2 rounded-full font-medium hover:bg-red-100 transition-colors">
              Contact Support
            </button>
          </div>
        </div>

        {/* FAQ Grid Layout - Professional & Clean */}
        <div className="grid gap-4">
          {faqData.map((faq) => (
            <div 
              key={faq.id}
              className={`transition-all duration-300 rounded-xl border ${
                activeId === faq.id 
                ? 'border-red-200 bg-red-50/30 shadow-sm' 
                : 'border-gray-200 bg-white hover:border-red-200'
              }`}
            >
              <button
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className={`text-lg font-semibold ${activeId === faq.id ? 'text-red-700' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${activeId === faq.id ? 'rotate-180' : ''}`}>
                  <svg className={`w-5 h-5 ${activeId === faq.id ? 'text-red-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  activeId === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-red-100/50 mt-1">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra Help Card */}
        <div className="mt-12 p-8 bg-slate-50 rounded-2xl flex flex-col md:flex-row items-center justify-between border border-slate-100">
            <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-900">Still have questions?</h4>
                <p className="text-gray-600">Our medical team is available 24/7 for urgent inquiries.</p>
            </div>
            <button className="mt-6 md:mt-0 px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transform hover:-translate-y-1 transition-all">
                Ask a Professional
            </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;