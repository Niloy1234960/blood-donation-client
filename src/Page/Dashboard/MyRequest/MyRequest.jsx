import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";

const MyRequest = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  // fetch user requests
  const fetchRequest = () => {
    if (!user?.email) return;

    axios
      .get(`https://assignment-11-server-iota-seven.vercel.app/request/${user.email}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRequest();
  }, [user?.email]);

  // delete request
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
            fetchRequest();
          });
      }
    });
  };

  // cancel request
  const hendleCencel = (id) => {
    axios
      .patch(`https://assignment-11-server-iota-seven.vercel.app/cancel-request?id=${id}&status=canceled`)
      .then(() => {
        toast.success("Your request canceled successfully");
        fetchRequest();
      })
      .catch(() => toast.error("Cancel not successful"));
  };

  // done request
  const hendleDone = (id) => {
    axios
      .patch(`https://assignment-11-server-iota-seven.vercel.app/done-request?id=${id}&status=done`)
      .then(() => {
        toast.success("Your request done successfully");
        fetchRequest();
      })
      .catch(() => toast.error("Done not successful"));
  };

  return (
    <div className="px-3 sm:px-6">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ===== Desktop & Tablet Table ===== */}
      <div className="hidden md:block overflow-x-auto mt-6">
        <table className="table w-full">
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
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.hospital_name}</td>
                <td>{product.blood_group}</td>
                <td className="capitalize">{product.donation_status}</td>
                <td className="space-x-1 flex flex-wrap">
                  {product.donation_status === "done" ? (
                    <>
                      <Link to={`/Dashboard/Myrequest-edit/${product._id}`} className="btn btn-xs btn-outline">Edit</Link>
                      <Link
                        to={`/Dashboard/viewDetails/${product._id}`}
                        className="btn btn-xs btn-outline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => hendleDone(product._id)}
                        className="btn btn-xs btn-outline"
                      >
                        Done
                      </button>
                      <Link
                        to={`/Dashboard/viewDetails/${product._id}`}
                        className="btn btn-xs btn-outline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Delete
                      </button>
                      {product.donation_status !== "canceled" && (
                        <button
                          onClick={() => hendleCencel(product._id)}
                          className="btn btn-xs btn-outline"
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Card View ===== */}
      <div className="md:hidden mt-6 space-y-4">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="border rounded-xl p-4 shadow-sm flex flex-col space-y-2"
          >
            <p className="font-semibold">
              #{index + 1} {product.name}
            </p>
            <p className="text-sm">Hospital: {product.hospital_name}</p>
            <p className="text-sm">Blood Group: {product.blood_group}</p>
            <p className="text-sm capitalize">
              Status: <span className="font-medium">{product.donation_status}</span>
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {product.donation_status === "done" ? (
                <>
                  <Link
                    to={`/Dashboard/viewDetails/${product._id}`}
                    className="btn btn-xs btn-outline w-full"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-xs btn-outline btn-error w-full"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => hendleDone(product._id)}
                    className="btn btn-xs btn-outline w-full"
                  >
                    Done
                  </button>
                  <Link
                    to={`/Dashboard/viewDetails/${product._id}`}
                    className="btn btn-xs btn-outline w-full"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-xs btn-outline btn-error w-full"
                  >
                    Delete
                  </button>
                  {product.donation_status !== "canceled" && (
                    <button
                      onClick={() => hendleCencel(product._id)}
                      className="btn btn-xs btn-outline w-full"
                    >
                      Cancel
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequest;
