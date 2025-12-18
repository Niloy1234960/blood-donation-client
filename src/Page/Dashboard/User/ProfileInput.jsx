import React, {  useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "firebase/auth";
// import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import Swal from "sweetalert2";

const ProfileInput = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [dbuser, setDbuser] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchUser =()=>{
    axiosSecure.get(`user-profile?email=${user?.email}`).then((res) => {
      setDbuser(res.data);
    });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const onSubmit = async(data) => {
    const { name, district, upazila, blood , photo } = data;
    const file =photo[0];

    const formData =new FormData()
    formData.append("image",file)

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=039ed19dd7ea9e86d51e69b5a3528627`,
      formData
    );

    const image =res.data.data.display_url
    const updateData ={
      name,
      district,
      upazila,
      blood,
      image
    }

    axiosSecure.patch("/update-profile",updateData)
    .then(res=>{
      updateProfile(user,{
        displayName:name,photoURL:image,upazila:upazila,district:district,blood:blood
      })
      console.log(res);
       fetchUser()
       setIsEditing(false)
        Swal.fire({
          title: "Your update successfull",
          icon: "success",
          draggable: true
        });
    })
    
  };

  return (
    <div className=" max-w-5xl mx-auto shadow-xl p-5">
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-5">
          <img
            className="w-50 h-50 rounded-full object-cover"
            src={dbuser?.imageLink}
            alt=""
          />
          {isEditing ? (
            " "
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn rounded-2xl  bg-red-600 text-white"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-2 grid-cols-1 mt-10 gap-5"
      >
        {/* email field */}
        <div>
          <label className="block mb-1 font-medium"> Email</label>
          <input
            type="text"
            readOnly
            value={dbuser.email}
            {...register("email")}
            className="w-full p-2 rounded-lg border"
          />
        </div>
        {/* name field  */}
        <div>
          <label className="block mb-1 font-medium"> Name</label>
          <input
            type="text"
            disabled={!isEditing}
            defaultValue={dbuser.name}
            className="w-full p-2 rounded-lg border"
            {...register("name",{required:"please fill name"})}
          />
           {errors.name && <p className="text-red-500  mb-1 text-xs ">{errors.name.message}</p>}

        </div>
        {/* image field  */}
        <div>
          <label className="block mb-1 font-medium"> Your Photo</label>
          <input
            type="file"
            className="w-full p-2 rounded-lg border relative z-10"
            {...register("photo",{required:"please fill photo"})}
          />
           {errors.photo && <p className="text-red-500  mb-1 text-xs ">{errors.photo.message}</p>}

        </div>
        {/* blood group */}
        <div>
          <label className="block font-medium mb-1" for="bloodGroup">
            Blood Group
          </label>
          <select
            disabled={!isEditing}
            defaultValue={"Select Blood Group"}
            className="select w-full p-2 rounded-lg border-black"
            {...register("blood",{required:"please fill blood group"})}
          >
            <option>{dbuser.blood}</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
           {errors.blood && <p className="text-red-500  mb-1 text-xs ">{errors.blood.message}</p>}
        </div>

        {/* select district */}

        <div>
          <label className="block font-medium mb-1">District</label>
          <select
            defaultValue={"Select Your District"}
            disabled={!isEditing}
            className="select w-full p-2 rounded-lg border-black"
            {...register("district",{required:"please fill district"})}
          >
            <option>{dbuser.district}</option>
            {districts.map((district) => (
              <option key={district.id} value={district?.name}>
                {district?.name}
              </option>
            ))}
          </select>
           {errors.district && <p className="text-red-500  mb-1 text-xs ">{errors.district.message}</p>}
        </div>

        {/* Upazila Selector */}
        <div>
          <label className="block font-medium mb-1">Upazila</label>
          <select
            defaultValue={"Select Your Upazila"}
            disabled={!isEditing}
            className="select w-full p-2 rounded-lg border-black"
            {...register("upazila",{required:"please fill upazila"})}
          >
            <option>{dbuser.upazila}</option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila?.name}>
                {upazila?.name}
              </option>
            ))}
          </select>
          {errors.upazila && <p className="text-red-500  mb-1 text-xs ">{errors.upazila.message}</p>}
        </div>

        <div className="lg:col-span-2">
          {isEditing && (
          <button type="submit" className="btn bg-lime-500 w-full mt-5">
            Save
          </button>
        )}
        </div>
      </form>
    </div>
  );
};

export default ProfileInput;