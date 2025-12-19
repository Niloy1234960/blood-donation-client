import React, { use, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
  const [show, setShow] = useState();
  const { googleLogin, Login } = use(AuthContext);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit=(data)=>{
    const {email,password}=data;

    Login(email,password)
    .then(result=>{
        console.log(result.user);
        toast.success("your login successfull")
    })
    .then(error =>{
        navigate("/")
        toast.success("your log in successfull")
        console.log(error);
    })

  }



  const hendleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-center min-h-screen items-center text-black">
      <div className="card bg-base-100 w-11/12 max-w-sm shrink-0 shadow-2xl ">
        <form onSubmit={handleSubmit(onsubmit)} className="card-body">
          <h1 className="text-3xl font-bold text-center">Login your account</h1>
          <fieldset className="fieldset">
            {/* email field */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please Enter the valid email",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-l">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* password field */}
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={show ? "text" : "password"}
                className="input"
                placeholder="Password"
                {...register("password", {
                  required: "password is required",
                  pattern: {
                    value: /^[A-Za-z0-9]{6,}$/,
                    message: "Password must be at  6 characters long.",
                  },
                })}
              />

              <span
                onClick={() => setShow(!show)}
                className="absolute cursor-pointer top-6 right-6 z-50"
              >
                {show ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
              </span>

              {errors.password && (
                <p className="text-red-500 text-xs mt-l">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            

            <div className="flex w-full flex-col h-10">
              <div className="divider">OR</div>
            </div>
            <button onClick={hendleGoogleLogin} className="btn mb-5 ">
              {" "}
              <FaGoogle size={24} className="text-[#34A853]" /> LogIn with
              Google
            </button>

            <p className="font-semibold">
              Dont't Have An Account ?{" "}
              <Link className="text-green-600" to="/register">
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;
