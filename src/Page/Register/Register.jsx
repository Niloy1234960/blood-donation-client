import React, { use,  useEffect,  useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const Register = () => {
  const [show, setShow] = useState(false);
  const { googleLogin, Creatuser, setUser } = use(AuthContext);
  const [upazila, setUpazila] = useState('')
  const [district, setDistrict] = useState('')
  const [upazilas, setUpazilas] = useState([])
  const [districts, setDistricts] = useState([])

  useEffect(()=>{
    axios.get('/upazila.json')
    .then(res => {
      setUpazilas(res.data.upazilas)
    })
  },[])

  useEffect(()=>{
    axios.get('/district.json')
    .then(res => {
      setDistricts(res.data.districts)
    })
  },[])

  const {
    register,
    handleSubmit,
  
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, password, email, photo, blood } = data;
    const file = photo[0];

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=039ed19dd7ea9e86d51e69b5a3528627`,
      formData
    );

    const imageLink = res.data.data.display_url;

    const userData = {
      name,
      password,
      email,
      imageLink,
      blood,
      district,
      upazila
    };
    console.log(userData)

    await Creatuser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: name,
          photoURL: imageLink,
        });
        setUser({ ...user, displayName: name, photoURL: imageLink });
        toast.success("your log register successfull");
        console.log(result.user);

        axios
          .post("http://localhost:5000/users", userData)
          .then((res) => {
            console.log(res.data);
            toast.success("your log register successfull");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hendleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        toast.success("your Google login Successfull");
      })
      .cathc((error) => console.log(error));
  };

  return (
    <div className="flex justify-center min-h-screen items-center text-black">
      <div className="card bg-base-100 w-11/12 max-w-sm shrink-0 shadow-2xl ">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h1 className="text-2xl font-bold text-center">
            Regester your account
          </h1>
          <fieldset className="fieldset">
            {/* Name field */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Your Name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name cannot be long",
                  },
                })}
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-l">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            {/* Photo field */}
            <label className="label">Photo Url</label>
            <input
              type="file"
              className="input"
              placeholder="Your Photo Url"
              {...register("photo", { required: "photo is required" })}
            />
             {/* blood grp field */}
            <label>Chose Blood Group</label>
            <select
              defaultValue="Chose blood group"
              className="select"
              {...register("blood")}
            >
              <option disabled={true}>Chose Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            {/* district field */}
            <label>Chose Blood district</label>
            <select value={district} onChange={(e) => setDistrict(e.target.value)} className="select">
               <option disabled selected value=" ">Select Your district</option>
               {
                districts.map(d=> <option value={d?.name} key={d.id}>{d?.name}</option>)
               }
            </select>
            {/* upazila field */}
             <label>Chose Blood upazila</label>
            <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="select">
               <option disabled selected value=" ">Select Your upazila</option>
               {
                upazilas.map(u=> <option value={u?.name} key={u.id}>{u?.name}</option>)
               }
            </select>

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
                className="absolute top-6 right-6 z-50"
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
              Regester
            </button>
            <div className="flex w-full flex-col h-10">
              <div className="divider">OR</div>
            </div>
            <button onClick={hendleGoogleLogin} className="btn mb-5 ">
              {" "}
              <FaGoogle size={24} className="text-[#34A853]" /> Regester with
              Google
            </button>
            <p className="font-semibold text-center">
              Already Have An Account ?{" "}
              <Link className="text-green-600" to="/Login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Register;
