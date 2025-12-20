import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SearchDonor = () => {
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filterData, setFilterData] = useState([]); // ✅ FIXED

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

  const handleSearch = (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;

    axios
      .get(
        `https://assignment-11-server-iota-seven.vercel.app/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          toast.success("Blood match");
          setFilterData(res.data);
        } else {
          toast.error("Not match");
          setFilterData([]); // optional but safe
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="fieldset flex justify-center mt-12 gap-8"
      >
        <div>
          <label>Chose Blood Group</label>
          <select
            name="blood"
            defaultValue="Chose Blood Group"
            className="select"
          >
            <option disabled>Chose Blood Group</option>
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

        <div>
          <label>Chose Blood District</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select"
          >
            <option disabled value="">
              Select Your District
            </option>
            {districts.map((d) => (
              <option key={d.id} value={d?.name}>
                {d?.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Chose Blood Upazila</label>
          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="select"
          >
            <option disabled value="">
              Select Your Upazila
            </option>
            {upazilas.map((u) => (
              <option key={u.id} value={u?.name}>
                {u?.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn mt-4">Search</button>
      </form>

      {/* Result Cards */}
      <div className="min-h-screen mt-7 bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterData.map((data, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Blood Group:{" "}
                <span className="font-bold text-red-600">
                  {data?.blood_group}
                </span>
              </h2>

              <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  <span className="font-semibold">Recipient Name:</span>{" "}
                  {data?.requester_name || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">Recipient email:</span>{" "}
                  {data?.requester_email || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {data?.address || "N/A"}
                </p>
   
                <div className="flex justify-between">
               
          

                
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filterData.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No data found</p>
        )}
      </div>
    </div>
  );
};

export default SearchDonor;
