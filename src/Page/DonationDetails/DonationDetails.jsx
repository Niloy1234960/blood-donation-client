import axios from "axios";
import { HeartHandshake, MapPin, Hospital, Calendar, Mail, User, Droplet, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";

const DonationDetails = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const handleDonate = (id, status) => {
    Swal.fire({
      title: "Confirm Donation?",
      text: "By clicking 'Yes', you agree to donate blood for this request. Please be serious about it!",
      icon: "heart",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, I want to donate!",
      cancelButtonText: "Maybe later",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://assignment-11-server-iota-seven.vercel.app/donate?id=${id}&status=${status}`)
          .then((res) => {
            console.log(res)
            Swal.fire({
              title: "Thank You!",
              text: "The request is now marked 'In Progress'. Please contact the requester.",
              icon: "success",
              confirmButtonColor: "#ef4444",
            });
            // রিফ্রেশ ডাটা
            window.location.reload();
          })
          .catch((error) => {
            console.log(error)
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get(`https://assignment-11-server-iota-seven.vercel.app/donation-details/${id}`)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Breadcrumb or Label */}
        <div className="flex items-center gap-2 text-slate-400 mb-6 text-sm font-medium">
            <Link to="/donation-requests" className="hover:text-red-600 transition-colors">Donation Requests</Link>
            <span>/</span>
            <span className="text-slate-900">Details</span>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          
          {/* Main Header Banner */}
          <div className="bg-gradient-to-r from-red-600 to-rose-500 p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-5">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                  <HeartHandshake size={40} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">Donation Details</h1>
                  <p className="text-red-50 mt-1 opacity-90">Help save a life by fulfilling this request.</p>
                </div>
              </div>
              <div className="bg-white text-red-600 px-6 py-3 rounded-2xl font-black text-2xl shadow-lg italic">
                {details?.blood_group}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left Column: Requester & Recipient Info */}
              <div className="lg:col-span-2 space-y-10">
                
                {/* Section: Basic Info */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Info size={18} className="text-red-500" /> General Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-hover hover:border-red-100">
                      <div className="bg-white p-3 rounded-xl shadow-sm h-fit text-slate-400"><User size={20}/></div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Recipient Name</p>
                        <p className="text-slate-800 font-bold text-lg">{details?.name}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-hover hover:border-red-100">
                      <div className="bg-white p-3 rounded-xl shadow-sm h-fit text-slate-400"><Mail size={20}/></div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Requester Email</p>
                        <p className="text-slate-800 font-semibold">{details?.requester_email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Location Info */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <MapPin size={18} className="text-red-500" /> Location & Medical Facility
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600 font-medium">
                        <Hospital className="text-slate-300" size={18} />
                        <span>{details?.hospital_name}</span>
                      </div>
                      <div className="flex items-start gap-3 text-slate-600 font-medium">
                        <MapPin className="text-slate-300 mt-1" size={18} />
                        <span>{details?.address}, {details?.upazila_name}, {details?.district_name}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600 font-medium">
                        <Calendar className="text-slate-300" size={18} />
                        <span>Date: <span className="text-slate-900 font-bold">{details?.date || "Not set"}</span></span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 font-medium">
                        <Droplet className="text-slate-300" size={18} />
                        <span>Status: <span className="text-orange-500 font-bold capitalize">{details?.donation_status}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: CTA / Donation Box */}
              <div className="lg:col-span-1">
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white sticky top-10 shadow-2xl shadow-slate-400">
                  <h4 className="text-xl font-bold mb-4">Be the Hero</h4>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    By confirming this donation, you agree to contact the recipient and reach the hospital on time.
                  </p>
                  
                  <ul className="space-y-4 mb-10 text-xs font-medium">
                    <li className="flex items-center gap-3">
                        <div className="h-5 w-5 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">✓</div>
                        Contact requester via email
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="h-5 w-5 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">✓</div>
                        Reach {details?.hospital_name}
                    </li>
                  </ul>

                  <button
                    onClick={() => handleDonate(details?._id, "inprogress")}
                    disabled={details?.donation_status !== "pending"}
                    className={`w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 ${
                      details?.donation_status === "pending"
                        ? "bg-red-600 hover:bg-red-700 shadow-xl shadow-red-900/40 hover:-translate-y-1 active:scale-95 text-white"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {details?.donation_status === "pending" ? "Confirm Donation" : "Already Booked"}
                  </button>

                  <p className="text-[10px] text-center text-slate-500 mt-6 uppercase tracking-widest font-bold">
                    Assignment 11 • Blood Donation
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;