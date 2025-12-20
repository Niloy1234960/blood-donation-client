import React, { use, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaTint, FaMapMarkerAlt } from "react-icons/fa";
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
    const loadingToast = toast.loading("Creating your account..."); 
    
    try {
      const { name, password, email, photo, blood } = data;
      const file = photo[0];
      const formData = new FormData();
      formData.append("image", file);

     
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=039ed19dd7ea9e86d51e69b5a3528627`, formData);
      const imageLink = res.data.data.display_url;

     
      const result = await Creatuser(email, password);
      const user = result.user;

      
      await updateProfile(user, { displayName: name, photoURL: imageLink });
      setUser({ ...user, displayName: name, photoURL: imageLink });

    
      const userData = { name, email, imageLink, blood, district, upazila, role: 'donor', status: 'active' };
      await axios.post("http://localhost:5000/users", userData);

      toast.dismiss(loadingToast); 
      toast.success("Registration Successful! Welcome 🩸");
      navigate("/"); 
      
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || "Registration failed. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-10 px-4">
      
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-error">Join as a Donor</h1>
            <p className="text-gray-500 mt-1">Fill the form to start saving lives</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered focus:input-error"
                  {...register("name", { required: "Name is required" })}
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase">Email</label>
                <input
                  type="email"
                  className="input input-bordered focus:input-error"
                  {...register("email", { required: "Email is required" })}
                />
              </div>

              {/* Blood Group */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase">Blood Group</label>
                <select className="select select-bordered focus:select-error" {...register("blood", { required: true })}>
                  <option value="">Select Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              {/* District */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase">District</label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="select select-bordered" required>
                  <option value="">Select District</option>
                  {districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)}
                </select>
              </div>

              {/* Upazila */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase">Upazila</label>
                <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="select select-bordered" required>
                  <option value="">Select Upazila</option>
                  {upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)}
                </select>
              </div>

              {/* Photo */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase">Profile Photo</label>
                <input type="file" className="file-input file-input-bordered file-input-error w-full" {...register("photo", { required: true })} />
              </div>
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label font-bold text-xs uppercase">Password</label>
              <input
                type={show ? "text" : "password"}
                className="input input-bordered focus:input-error"
                {...register("password", { required: true, minLength: 6 })}
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-11">
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="btn bg-black w-full text-white font-bold text-lg mt-4 shadow-lg transition-all active:scale-95">
              Create Account
            </button>

            <p className="text-center mt-4">
              Already a member? <Link className="text-error font-bold hover:underline" to="/Login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;