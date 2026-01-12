import React, { use, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaTint, FaMapMarkerAlt, FaImage, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router"; 
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast"; 

const Register = () => {
  const [show, setShow] = useState(false);
  const { Creatuser, setUser } = use(AuthContext);
  const [upazila, setUpazila] = useState('');
  const [district, setDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
    axios.get('/district.json').then(res => setDistricts(res.data.districts));
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Creating your hero account..."); 
    
    try {
      const { name, password, email, photo, blood } = data;
      const file = photo[0];
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(`https://api.imgbb.com/1/upload?key=aeb73cdd2cfeecb85edcd1ea05b4b36d`, formData);
      const imageLink = res.data.data.display_url;

      const result = await Creatuser(email, password);
      const user = result.user;

      await updateProfile(user, { displayName: name, photoURL: imageLink });
      setUser({ ...user, displayName: name, photoURL: imageLink });

      const userData = { name, email, imageLink, blood, district, upazila, role: 'donor', status: 'active' };
      await axios.post("https://assignment-11-server-iota-seven.vercel.app/users", userData);

      toast.dismiss(loadingToast); 
      toast.success("Registration Successful! Welcome 🩸");
      navigate("/"); 
      
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100 flex flex-col md:flex-row">
        
        {/* --- Left Side: Info --- */}
        <div className="md:w-1/3 bg-[#0F172A] p-10 text-white flex flex-col justify-center">
          <FaTint className="text-red-600 text-5xl mb-6 animate-pulse" />
          <h2 className="text-3xl font-black mb-4 leading-tight">Become a <br /><span className="text-red-600">Life Saver</span></h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your registration as a blood donor brings hope to those in emergency. Join our community of heroes today.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div> 100% Free Registration
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div> Direct Donor Contact
            </div>
          </div>
        </div>

        {/* --- Right Side: Form --- */}
        <div className="md:w-2/3 p-8 sm:p-12">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl font-black text-slate-800">Registration Form</h1>
            <p className="text-slate-500 text-xs mt-1">Please provide accurate information</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="email"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
                    placeholder="john@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
              </div>

              {/* Blood Group */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Blood Group</label>
                <div className="relative group">
                  <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" />
                  <select className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm appearance-none" {...register("blood", { required: true })}>
                    <option value="">Select Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              {/* District */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">District</label>
                <div className="relative group">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" />
                  <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm appearance-none" required>
                    <option value="">Select District</option>
                    {districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Upazila */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upazila</label>
                <div className="relative group">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" />
                  <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm appearance-none" required>
                    <option value="">Select Upazila</option>
                    {upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Photo */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Photo</label>
                <div className="relative group">
                  <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors z-10" />
                  <input type="file" className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-xs file:hidden" {...register("photo", { required: true })} />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" />
                <input
                  type={show ? "text" : "password"}
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
                  placeholder="••••••••"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2">
               Create Hero Account
            </button>

            <p className="text-center text-sm font-medium text-slate-500 mt-6">
              Already a member? <Link className="text-red-600 font-bold hover:underline" to="/Login">Log In Here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;