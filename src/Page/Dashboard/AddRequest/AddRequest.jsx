import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { FaPlusCircle, FaHospital, FaMapMarkerAlt, FaTint, FaUser } from "react-icons/fa";

const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const AxiosSecure = useAxiosSecure();

  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/upazila.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/district.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const formData = {
      requester_name: user?.displayName,
      requester_email: user?.email,
      name: form.name.value,
      district_name: district,
      upazila_name: upazila,
      hospital_name: form.hospital_name.value,
      address: form.address.value,
      blood_group: form.blood_group.value,
      donation_status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await AxiosSecure.post("/request", formData);
      if (res.data.insertedId) {
        toast.success("Blood Donation Request Created Successfully!");
        form.reset();
        setDistrict("");
        setUpazila("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4">
      <Toaster position="top-center" />
      
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-t-[2rem] p-8 border-b border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
              <FaPlusCircle size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">Create Donation Request</h2>
              <p className="text-slate-500 text-sm font-medium">Please provide accurate details for the patient.</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleRequest} className="bg-white rounded-b-[2rem] p-8 shadow-xl shadow-slate-200/50 space-y-8">
          
          {/* Section 1: Requester Info (Read Only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="text"
                  readOnly
                  value={user?.displayName}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-500 text-sm outline-none cursor-not-allowed"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Email</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="email"
                  readOnly
                  value={user?.email}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-500 text-sm outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Recipient Details */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-800 border-l-4 border-red-500 pl-3">Patient & Location Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recipient Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Recipient Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Enter patient name"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
                />
              </div>

              {/* Blood Group */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Blood Group Needed</label>
                <div className="relative">
                  <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
                  <select
                    required
                    name="blood_group"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm appearance-none"
                  >
                    <option value="">Select Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* District */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">District</label>
                <select
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option value={d?.name} key={d.id}>{d?.name}</option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upazila</label>
                <select
                  required
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((u) => (
                    <option value={u?.name} key={u.id}>{u?.name}</option>
                  ))}
                </select>
              </div>

              {/* Hospital */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hospital Name</label>
                <div className="relative">
                  <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    required
                    type="text"
                    name="hospital_name"
                    placeholder="e.g. Dhaka Medical College Hospital"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Address Line</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    required
                    type="text"
                    name="address"
                    placeholder="House no, Road no, Area..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              disabled={loading}
              type="submit"
              className={`w-full md:w-auto px-10 py-4 bg-[#0F172A] hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <FaPlusCircle />
              )}
              {loading ? "Processing..." : "Publish Donation Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequest;