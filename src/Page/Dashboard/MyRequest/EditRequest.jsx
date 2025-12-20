import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const EditRequest = () => {
  const { user } = useContext(AuthContext);
  const AxiosSecure = useAxiosSecure();
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();

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

        axios
    .put(`https://assignment-11-server-iota-seven.vercel.app/Dashboard/update-request/${id}`, formData)
    .then((res) => {
      console.log(res.data);
      toast.success("your Update successfull");
      navigate("/Dashboard/myRequest");
    })
    .catch((error) => {
      console.log(error);
    });

  };

  useEffect(() => {
    axios
      .get(`https://assignment-11-server-iota-seven.vercel.app/Dashboard/view-request/${id}`)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);



  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <div>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Donation Request Edit</h2>

          <form onSubmit={handleRequest} className="space-y-4">
            {/* Requester Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {details?.requester_name}
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
                defaultValue={details?.name}
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
                  defaultValue={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  name="district_name"
                  className="w-full rounded-lg border border-gray-300 p-2"
                >
                  <option>{details?.district_name}</option>
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
                  defaultValue={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  name="upazila_name"
                  className="w-full rounded-lg border border-gray-300 p-2"
                >
                  <option>{details?.upazila_name}</option>
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
                defaultValue={details?.hospital_name}
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
                defaultValue={details?.address}
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
                defaultValue={details?.blood_group}
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
                className="px-6 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRequest;
