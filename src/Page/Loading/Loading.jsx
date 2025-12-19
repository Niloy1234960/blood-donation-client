import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      {/* Blood Drop Animation */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-red-600 rounded-full animate-ping absolute opacity-75"></div>
        <div className="w-16 h-16 bg-red-600 rounded-full"></div>
      </div>

      {/* App Name */}
      <h1 className="text-3xl font-bold text-red-700 mb-2">
        AMR Blood Donation
      </h1>

      {/* Tagline */}
      <p className="text-red-500 mb-6 text-center">
        Saving lives, one drop at a time
      </p>

      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-red-300 border-t-red-600 rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="mt-4 text-red-600 font-medium">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
