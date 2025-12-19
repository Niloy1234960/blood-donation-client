import React, { useContext } from "react";
import { FaDonate, FaHeartbeat, FaUsers } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";

const AdminHomePage = () => {
    const {user} = useContext(AuthContext)
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-12 py-6">
        {/* Welcome Section */}
        <div className="bg-red-500 text-white rounded-2xl p-6 shadow-md mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome{" "}
            <span className="text-yellow-300">
              {user?.displayName || "Dashboard User"}
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base">
            Here's a quick overview of your dashboard statistics
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="flex items-center p-4 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="p-4 bg-red-100 text-red-600 rounded-full text-2xl">
              <FaUsers />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">125</p>
              <p className="text-gray-500">Total Users (Donors)</p>
            </div>
          </div>

          {/* Total Funds */}
          <div className="flex items-center p-4 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="p-4 bg-green-100 text-green-600 rounded-full text-2xl">
              <FaDonate />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">$15,250</p>
              <p className="text-gray-500">Total Funds Raised</p>
            </div>
          </div>

          {/* Total Blood Donation Requests */}
          <div className="flex items-center p-4 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full text-2xl">
              <FaHeartbeat />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">78</p>
              <p className="text-gray-500">Blood Donation Requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
