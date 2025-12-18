import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router";

const MainDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  //    const axiosInstance = useAxios()

  useEffect(() => {
    axios
      .get("http://localhost:5000/myRequests")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(products);

  return (
    <div className="">
      <h1 className="text-3xl text-center font-bold text-red-500">
        Welcome{" "}
        <span className="text-3xl text-black font-bold">
          {user?.displayName}
        </span>
      </h1>
      <div className="overflow-x-auto mt-9">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Recipient Name</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((product, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{product?.name}</td>
                <td>{product?.hospital_name}</td>
                <td>{product?.blood_group}</td>
                <td>{product?.donation_status}</td>

                <td className="space-x-1">
                  <button className="btn btn-xs btn-outline">Edit</button>
                  <button className="btn btn-xs btn-outline btn-error">
                    Delete
                  </button>
                  <button className="btn btn-xs btn-outline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
      <div className="text-center">
        <Link to={"/Dashboard/allRequest"} className="btn mt-4 rounded-2xl  bg-red-600 text-white font-semibold">View All Request</Link>
      </div>
    </div>
  );
};

export default MainDashboard;
