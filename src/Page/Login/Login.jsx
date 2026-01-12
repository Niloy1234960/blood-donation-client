import React, { use, useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaHeartbeat } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [show, setShow] = useState(false);
  const { Login } = use(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    const { email, password } = data;
    const id = toast.loading("Verifying credentials...");

    try {
      await Login(email, password);
      toast.success("Welcome back!", { id });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Invalid email or password.", { id });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl w-full flex bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
        
        {/* --- Left Side: Branding/Illustration (Hidden on Mobile) --- */}
        <div className="hidden lg:flex w-1/2 bg-[#0F172A] p-12 flex-col justify-between text-white relative">
          <div className="z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
                <FaHeartbeat size={20} />
              </div>
              <span className="text-xl font-black tracking-tighter">BLOOD HERO</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Your contribution <br /> can save a <span className="text-red-500">Life.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Log in to manage your donations, track requests, and stay updated with emergency needs in your area.
            </p>
          </div>
          
          <div className="z-10 bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
             <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Emergency Fact</p>
             <p className="text-sm italic">"One donation can save up to three lives. Every drop counts toward a healthier community."</p>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* --- Right Side: Login Form --- */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-slate-800 mb-2">Login Account</h1>
            <p className="text-slate-500 text-sm font-medium">Please enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
            
            {/* Email field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500 transition-colors">
                  <FaEnvelope size={16} />
                </div>
                <input
                  type="email"
                  className={`w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-slate-700 font-medium placeholder:text-slate-400 ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
                  placeholder="name@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
               
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500 transition-colors">
                  <FaLock size={16} />
                </div>
                <input
                  type={show ? "text" : "password"}
                  className={`w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-slate-700 font-medium placeholder:text-slate-400 ${errors.password ? 'border-red-500 bg-red-50' : ''}`}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Must be at least 6 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] mt-4"
            >
              Login Now
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm font-medium">
              New here?{" "}
              <Link className="text-red-600 hover:text-red-700 font-black ml-1" to="/register">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;