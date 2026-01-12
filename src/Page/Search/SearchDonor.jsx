import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch, FaTint, FaMapMarkerAlt, FaEnvelope, FaUser } from "react-icons/fa";

const SearchDonor = () => {
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    const bloodGroup = e.target.blood.value;

    axios
      .get(
        `https://assignment-11-server-iota-seven.vercel.app/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          toast.success(`Found ${res.data.length} matches!`);
          setFilterData(res.data);
        } else {
          toast.error("No matches found for your criteria");
          setFilterData([]);
        }
        setIsSearching(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        toast.error("Something went wrong!");
        setIsSearching(false);
      });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- Search Hero Section --- */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 shadow-sm">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
            Find a <span className="text-red-600">Life Saver</span>
          </h1>
          <p className="text-slate-500">Search for blood donation requests in your area</p>
        </div>

        <div className="max-w-6xl mx-auto bg-white border border-slate-100 shadow-2xl shadow-slate-200 rounded-[2.5rem] p-4 md:p-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Blood Group */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Blood Group</label>
              <select
                name="blood"
                required
                className="select select-bordered w-full bg-slate-50 border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none rounded-2xl"
              >
                <option value="">Select Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className="select select-bordered w-full bg-slate-50 border-slate-200 rounded-2xl"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d?.name}>{d?.name}</option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Upazila</label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                required
                className="select select-bordered w-full bg-slate-50 border-slate-200 rounded-2xl"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u?.name}>{u?.name}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              disabled={isSearching}
              className="btn bg-red-600 hover:bg-red-700 text-white border-none h-[3rem] rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95"
            >
              {isSearching ? <span className="loading loading-spinner"></span> : <><FaSearch className="mr-2" /> Search Now</>}
            </button>
          </form>
        </div>
      </div>

      {/* --- Result Grid --- */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        {filterData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterData.map((data, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 pb-0 flex justify-between items-start">
                  <div className="bg-red-50 text-red-600 w-12 h-12 rounded-2xl flex items-center justify-center border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    <span className="text-lg font-black">{data?.blood_group}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <FaTint className="text-red-400 animate-pulse" />
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <FaUser size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Recipient</p>
                      <p className="text-slate-800 font-bold">{data?.requester_name || "Anonymous"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <FaEnvelope size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Contact</p>
                      <p className="text-slate-600 text-xs font-medium truncate w-48">{data?.requester_email || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-slate-50">
                    <FaMapMarkerAlt className="text-red-400 mt-1" />
                    <p className="text-sm text-slate-500 leading-snug">
                      {data?.address || "Address not provided"}
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="p-4 bg-slate-50/50 border-t border-slate-50">
                   <button className="w-full py-2 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors">
                     View Full Details
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filterData.length === 0 && !isSearching && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 max-w-2xl mx-auto">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch size={40} className="text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Donors Found</h3>
            <p className="text-slate-400 px-10">Try adjusting your filters or blood group to find matches in other areas.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonor;