import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidDonateBlood } from "react-icons/bi";
import { useParams } from "react-router";

const ViewDetails = () => {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://assignment-11-server-iota-seven.vercel.app/Dashboard/view-request/${id}`)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
           <span className="text-red-500">Blood</span> Request Details
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Requester Name</p>
              <p className="font-medium">{details?.requester_name}</p>
            </div>

            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Requester Email</p>
              <p className="font-medium">{details?.requester_email}</p>
            </div>

            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{details?.name}</p>
            </div>

            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-gray-500">District</p>
              <p className="font-medium">{details?.district_name}</p>
            </div>

            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Upazila</p>
              <p className="font-medium">{details?.upazila_name}</p>
            </div>

            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Hospital Name</p>
              <p className="font-medium">{details?.hospital_name}</p>
            </div>

            <div className="bg-gray-200 rounded-lg p-3 sm:col-span-2">
              <p className="text-gray-500">Address</p>
              <p className="font-medium">{details?.address}</p>
            </div>

            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Blood Group</p>
              <p className="font-semibold text-red-600">{details?.blood_group}</p>
            </div>

            <div className="bg-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Donation Status</p>
              <p className="font-medium">{details?.donation_status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
