import React, { useContext } from "react";

import { AuthContext } from "../../../Context/AuthContext";
import { FaArrowUp, FaDonate, FaHeartbeat, FaUsers } from "react-icons/fa";

const AdminHomePage = () => {
  const { user } = useContext(AuthContext);

  // ডায়নামিক ডেটা (এটি আপনি পরে ডাটাবেজ থেকে আনতে পারবেন)
  const donationStats = [
    { bloodGroup: "A+", count: 45, percentage: "80%" },
    { bloodGroup: "B+", count: 32, percentage: "60%" },
    { bloodGroup: "O+", count: 58, percentage: "95%" },
    { bloodGroup: "AB+", count: 12, percentage: "25%" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <div className="px-4 sm:px-6 lg:px-12 py-8">
        
        {/* 1. Welcome Header (White Theme Update) */}
        <div className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Hello, <span className="text-red-600">{user?.displayName || "Admin"}</span> 👋
            </h1>
            <p className="text-gray-500 mt-1">Here is what's happening with your blood bank today.</p>
          </div>
          <div className="absolute right-0 top-0 h-full w-32 bg-red-600 opacity-5 -skew-x-12 translate-x-10"></div>
        </div>

        {/* 2. Stats Cards (Keep your existing logic but updated UI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:border-red-500 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Donors</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">1,250</h3>
              </div>
              <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                <FaUsers size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-500 text-sm">
              <FaArrowUp className="mr-1" /> <span>12% increase</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:border-red-500 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Funds Raised</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">$15,250</h3>
              </div>
              <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                <FaDonate size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-500 text-sm">
              <FaArrowUp className="mr-1" /> <span>5% increase</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:border-red-500 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Requests</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">78</h3>
              </div>
              <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                <FaHeartbeat size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-red-500 text-sm">
              <span>Pending Action</span>
            </div>
          </div>
        </div>

        {/* 3. Visual "Custom Chart" using Tailwind (No Packages Needed) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Blood Availability Progress Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Blood Group Availability</h3>
            <div className="space-y-6">
              {donationStats.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">{item.bloodGroup}</span>
                    <span className="text-sm font-medium text-gray-500">{item.count} Bags</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-red-600 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: item.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Logs Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Status</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-red-600 font-bold">
                    {i}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">New donation request from Dhaka Medical</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full">PENDING</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-red-600 font-semibold text-sm hover:underline">
              View All Logs
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;