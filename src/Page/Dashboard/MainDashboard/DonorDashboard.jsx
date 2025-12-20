import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://assignment-11-server-iota-seven.vercel.app/myRequests")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://assignment-11-server-iota-seven.vercel.app/Delete-request?id=${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your Request has been deleted.", "success");
            
          });
      }
    });
  };
  return (
    <div>
      <div className="px-3 sm:px-6">
        <h1 className="text-xl sm:text-3xl text-center font-bold text-red-500">
          Welcome <span className="text-black">{user?.displayName}</span>
        </h1>

        {/* ===== Desktop & Tablet Table ===== */}
        <div className="hidden md:block overflow-x-auto mt-8">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Recipient</th>
                <th>Location</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product?.name}</td>
                  <td>{product?.hospital_name}</td>
                  <td>{product?.blood_group}</td>
                  <td>{product?.donation_status}</td>
                  <td className="space-x-1">
                    <Link
                      to={`/Dashboard/Myrequest-edit/${product._id}`}
                      className="btn btn-xs btn-outline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/Dashboard/viewDetails/${product._id}`}
                      className="btn btn-xs btn-outline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== Mobile Card View ===== */}
        <div className="md:hidden mt-6 space-y-4">
          {products.map((product, index) => (
            <div key={product._id} className="border rounded-xl p-4 shadow-sm">
              <p className="font-semibold">
                #{index + 1} {product?.name}
              </p>
              <p className="text-sm">Hospital: {product?.hospital_name}</p>
              <p className="text-sm">Blood Group: {product?.blood_group}</p>
              <p className="text-sm">
                Status:{" "}
                <span className="font-medium">{product?.donation_status}</span>
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <Link
                  to={`/Dashboard/Myrequest-edit/${product._id}`}
                  className="btn btn-xs btn-outline"
                >
                  Edit
                </Link>
                <button className="btn btn-xs btn-outline btn-error">
                  Delete
                </button>
                <Link
                  to={`/Dashboard/viewDetails/${product._id}`}
                  className="btn btn-xs btn-outline"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to={"/Dashboard/allRequest"}
            className="btn mt-6 rounded-2xl bg-black text-white font-semibold w-full sm:w-auto"
          >
            View All Request
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
