import React, { use, useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
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
    
    // Loading state start
    const id = toast.loading("Logging in... please wait");

    try {
      await Login(email, password);
      
      // Success state
      toast.success("Login Successful!", { id });
      navigate("/");
    } catch (error) {
      // Error state
      console.error(error);
      toast.error(error.message || "Failed to login. Check credentials.", { id });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      {/* Toast container must be present for hot-toast */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-300">
        <form onSubmit={handleSubmit(onsubmit)} className="card-body p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Welcome Back!</h1>
            <p className="text-gray-500 mt-2">Enter your details to access your account</p>
          </div>

          <div className="space-y-4">
            {/* Email field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaEnvelope className="text-gray-400" /> Email
                </span>
              </label>
              <input
                type="email"
                className={`input input-bordered focus:input-primary ${errors.email ? 'input-error' : ''}`}
                placeholder="example@mail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-error text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaLock className="text-gray-400" /> Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  className={`input input-bordered w-full focus:input-primary ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-4 text-gray-500 hover:text-primary transition-colors"
                >
                  {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </span>
              </div>
              {errors.password && (
                <p className="text-error text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="text-right">
                <Link className="text-xs link link-hover text-gray-500">Forgot password?</Link>
            </div>

            <button type="submit" className="btn bg-black text-white w-full mt-2 shadow-lg">
              Login Now
            </button>
          </div>

          <div className="divider text-gray-400 text-sm">OR</div>

          <p className="text-center text-sm font-medium">
            Don't have an account?{" "}
            <Link className="text-secondary hover:underline font-bold" to="/register">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;