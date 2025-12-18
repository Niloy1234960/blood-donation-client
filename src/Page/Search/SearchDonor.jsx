import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
   
const SearchDonor = () => {
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

  const handleSearch = (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;

    axios
      .get(
        `http://localhost:5000/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
      )
      .then((res) => {
        // Check korchi data length 0 er beshi kina
        if (res.data.length > 0) {
          toast.success("Blood match");
          console.log("Matched Data:", res.data);
        } else {
          toast.error("Not match");
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
      <form
        onSubmit={handleSearch}
        className="fieldset flex justify-center mt-12 gap-8 "
      >
        <div>
          <label>Chose Blood Group</label>
          <select
            name="blood"
            defaultValue="Chose blood group"
            className="select"
            // {...register("blood")}
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
        </div>

        <div>
          {/* district field */}
          <label>Chose Blood district</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select"
          >
            <option disabled selected value=" ">
              Select Your district
            </option>
            {districts.map((d) => (
              <option value={d?.name} key={d.id}>
                {d?.name}
              </option>
            ))}
          </select>
        </div>
        {/* upazila field */}
        <div>
          <label>Chose Blood upazila</label>
          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="select"
          >
            <option disabled selected value=" ">
              Select Your upazila
            </option>
            {upazilas.map((u) => (
              <option value={u?.name} key={u.id}>
                {u?.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn mt-4">Search</button>
      </form>
    </div>
  );
};

export default SearchDonor;
