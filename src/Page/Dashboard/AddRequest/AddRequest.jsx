import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const AxiosSecure = useAxiosSecure()

  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

  useEffect(() => {
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;

    const requester_name = form.requester_name.value;
    const requester_email = form.requester_email.value;
    const name = form.name.value;
    const district_name = form.district_name.value;
    const upazila_name = form.upazila_name.value;
    const hospital_name = form.hospital_name.value;
    const address = form.address.value;
    const blood_group = form.blood_group.value;

    const formData = {
      requester_name,
      requester_email,
      name,
      district_name,
      upazila_name,
      hospital_name,
      address,
      blood_group,
      donation_status: "pending",
    };

    AxiosSecure
      .post("/request", formData)
      .then((res) => {
        console.log(res.data);
        toast.success("add successfull")
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Toaster></Toaster>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">
          Blood Donation Request
        </h2>

        <form onSubmit={handleRequest} className="space-y-4">
          {/* Requester Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Requester Name
              </label>
              <input
                type="text"
                readOnly
                value={user?.displayName}
                name="requester_name"
                className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Requester Email
              </label>
              <input
                type="email"
                readOnly
                value={user?.email}
                name="requester_email"
                className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2"
              />
            </div>
          </div>

          {/* Recipient Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>

          {/* District & Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                name="district_name"
                className="w-full rounded-lg border border-gray-300 p-2"
              >
                <option>Select District</option>
                {districts.map((d) => (
                  <option value={d?.name} key={d.id}>
                    {d?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Upazila
              </label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                name="upazila_name"
                className="w-full rounded-lg border border-gray-300 p-2"
              >
                <option>Select Upazila</option>
                {upazilas.map((u) => (
                  <option value={u?.name} key={u.id}>
                    {u?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Hospital Name
            </label>
            <input
              type="text"
              name="hospital_name"
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Address Line
            </label>
            <input
              type="text"
              name="address"
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Group
            </label>
            <select
              name="blood_group"
              className="w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="">Select</option>
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

          {/* Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-black text-white font-medium hover:bg-red-700"
            >
              Request Blood Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequest;
