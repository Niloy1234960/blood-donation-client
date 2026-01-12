import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUser, FaTint } from "react-icons/fa";

const AboutUs = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://assignment-11-server-iota-seven.vercel.app/donation-page")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* --- Hero Section --- */}
      <div className="bg-white border-b border-slate-200 py-16 px-6 mb-10 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            All <span className="text-red-600">Donation</span> Requests
          </h1>
          <p className="text-slate-500 text-lg">
            Every drop counts. Browse all current blood requirements and find someone you can help today.
          </p>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-red-600"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Card Top: Blood Type Indicator */}
                <div className="p-6 pb-0 flex justify-between items-start">
                  <div className="bg-red-50 text-red-600 w-14 h-14 rounded-2xl flex flex-col items-center justify-center border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    <FaTint className="text-xs mb-0.5" />
                    <span className="text-lg font-black leading-none">{product.blood_group}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    Urgent
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
                    <FaUser className="text-slate-300 text-sm" /> {product.name}
                  </h2>

                  <div className="space-y-4 text-sm text-slate-500">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-red-400 mt-1 shrink-0" />
                      <p className="leading-relaxed font-medium text-slate-600">{product.address}</p>
                    </div>

                    <div className="flex items-center gap-6 pt-2 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-slate-300" />
                        <span className="font-semibold text-slate-700">{product.date || "Dec 13, 2025"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-slate-300" />
                        <span className="font-semibold text-slate-700">{product.time || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/donation-details/${product?._id}`}
                    className="block text-center bg-slate-900 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-red-200 active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
               <FaTint className="text-slate-300 text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No active requests</h3>
            <p className="text-slate-400">All donors are currently fulfilled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;