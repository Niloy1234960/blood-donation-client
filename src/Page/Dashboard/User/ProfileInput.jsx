import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaSave, FaCamera, FaEnvelope, FaUser, FaTint, FaMapMarkerAlt } from "react-icons/fa";

const ProfileInput = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [dbuser, setDbuser] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchUser = () => {
    axiosSecure.get(`user-profile?email=${user?.email}`).then((res) => {
      setDbuser(res.data);
    });
  }

  useEffect(() => { fetchUser(); }, []);

  useEffect(() => {
    axios.get("/upazila.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/district.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const onSubmit = async (data) => {
    setUploading(true);
    const { name, district, upazila, blood, photo } = data;
    let image = dbuser?.imageLink;

    if (photo && photo[0]) {
      const formData = new FormData();
      formData.append("image", photo[0]);
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=039ed19dd7ea9e86d51e69b5a3528627`, formData);
      image = res.data.data.display_url;
    }

    const updateData = { name, district, upazila, blood, image };

    axiosSecure.patch("/update-profile", updateData)
      .then(res => {
        console.log(res)
        updateProfile(user, { displayName: name, photoURL: image });
        fetchUser();
        setIsEditing(false);
        setUploading(false);
        Swal.fire({ title: "Profile Updated!", icon: "success", customClass: { confirmButton: 'bg-black text-white' } });
      })
      .catch(() => setUploading(false));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-visible">
        
        {/* Profile Header with Avatar */}
        <div className="relative h-32 bg-gradient-to-r from-red-600 to-slate-900 rounded-t-[2.5rem]">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0">
            <div className="relative group">
              <img
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl bg-white"
                src={dbuser?.imageLink || "https://via.placeholder.com/150"}
                alt="Profile"
              />
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="absolute bottom-2 right-2 p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-full shadow-lg transition-all"
                >
                  <FaEdit size={16} />
                </button>
              ) : (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <FaCamera className="text-white text-2xl" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-20 md:pt-10 pb-10 px-6 md:px-20 mt-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center mb-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-slate-800">{dbuser.name}</h2>
              <p className="text-slate-500 font-medium">Donor Dashboard / My Profile</p>
            </div>
            {!isEditing && (
                <span className="mt-4 md:mt-0 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-black border border-red-200">
                    Blood Group: {dbuser.blood}
                </span>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    readOnly
                    value={dbuser.email}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 text-sm outline-none cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <FaUser className={`absolute left-4 top-1/2 -translate-y-1/2 ${isEditing ? 'text-red-500' : 'text-slate-300'}`} />
                  <input
                    type="text"
                    disabled={!isEditing}
                    defaultValue={dbuser.name}
                    className={`w-full pl-11 pr-4 py-3 border transition-all rounded-2xl text-sm outline-none ${isEditing ? 'bg-white border-red-200 ring-4 ring-red-500/5' : 'bg-slate-50 border-slate-200 text-slate-600 font-medium'}`}
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-[10px] mt-1 italic">{errors.name.message}</p>}
              </div>

              {/* Image Input (Visible only during Edit) */}
              {isEditing && (
                <div className="space-y-1 animate-fadeIn">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Change Profile Picture</label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full rounded-2xl bg-white border-red-200"
                    {...register("photo")}
                  />
                </div>
              )}

              {/* Blood Group */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Blood Group</label>
                <div className="relative">
                  <FaTint className={`absolute left-4 top-1/2 -translate-y-1/2 ${isEditing ? 'text-red-500' : 'text-slate-300'}`} />
                  <select
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 border transition-all rounded-2xl text-sm outline-none appearance-none ${isEditing ? 'bg-white border-red-200 ring-4 ring-red-500/5' : 'bg-slate-50 border-slate-200 text-slate-600 font-medium'}`}
                    {...register("blood", { required: true })}
                    defaultValue={dbuser.blood}
                  >
                    <option value={dbuser.blood}>{dbuser.blood}</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              {/* District */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">District</label>
                <div className="relative">
                  <FaMapMarkerAlt className={`absolute left-4 top-1/2 -translate-y-1/2 ${isEditing ? 'text-red-500' : 'text-slate-300'}`} />
                  <select
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 border transition-all rounded-2xl text-sm outline-none appearance-none ${isEditing ? 'bg-white border-red-200 ring-4 ring-red-500/5' : 'bg-slate-50 border-slate-200 text-slate-600 font-medium'}`}
                    {...register("district", { required: true })}
                    defaultValue={dbuser.district}
                  >
                    <option value={dbuser.district}>{dbuser.district}</option>
                    {districts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Upazila */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upazila</label>
                <div className="relative">
                  <FaMapMarkerAlt className={`absolute left-4 top-1/2 -translate-y-1/2 ${isEditing ? 'text-red-500' : 'text-slate-300'}`} />
                  <select
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 border transition-all rounded-2xl text-sm outline-none appearance-none ${isEditing ? 'bg-white border-red-200 ring-4 ring-red-500/5' : 'bg-slate-50 border-slate-200 text-slate-600 font-medium'}`}
                    {...register("upazila", { required: true })}
                    defaultValue={dbuser.upazila}
                  >
                    <option value={dbuser.upazila}>{dbuser.upazila}</option>
                    {upazilas.map((u) => <option key={u.id} value={u.name}>{u.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="flex-1 bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {uploading ? <span className="loading loading-spinner loading-sm"></span> : <FaSave />}
                  {uploading ? "Updating..." : "Save Profile Changes"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="px-8 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInput;