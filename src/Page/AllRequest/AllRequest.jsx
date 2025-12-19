import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import toast from "react-hot-toast";

const AllRequest = () => {
  const [products, setProducts] = useState([]);
  const [selectStatus, setSelectStatus] = useState("");

  const hendleCencel = (id) => {
    axios
      .patch(`http://localhost:5000/cancel-request?id=${id}&status=canceled`)
      .then(() => {
        toast.success("Your request canceled successfully");
        fetchRequest();
      })
      .catch(() => toast.error("Cancel not successful"));
  };

  const handleStatus = (event) => {
    const value = event.target.value;
    setSelectStatus(value);
  };
  console.log(selectStatus);
  const fetchRequest = () => {
    axios
      .get(`http://localhost:5000/allRequest?status=${selectStatus}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRequest();
  }, [selectStatus]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/Delete-request?id=${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your Request has been deleted.",
              icon: "success",
            });
            fetchRequest();
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <div className="px-3 sm:px-6">
      {/* ===== Desktop & Tablet Table ===== */}
      <div className="hidden md:block overflow-x-auto mt-6">
        <select
          value={selectStatus}
          onChange={handleStatus}
          className="select mt-5"
        >
          <option disabled={true}>Pick a color</option>
          <option value="pending">pending</option>
          <option value="inprogress">inprogress</option>
          <option value="done">Done</option>
        </select>
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
                <td>{product?.name}</td>
                <td>{product?.hospital_name}</td>
                <td>{product?.blood_group}</td>
                <td>{product?.donation_status}</td>
                <td className="space-x-1 flex flex-wrap">
                  {product.donation_status === "inprogress" && (
                    <>
                      <button className="btn btn-xs btn-outline btn-info">
                        done
                      </button>
                      <button className="btn btn-xs btn-outline btn-error">
                        cancel
                      </button>
                    </>
                  )}
                  {product.donation_status === "pending" && (
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      Delete
                    </button>
                  )}
                  <Link
                    to={`/Dashboard/viewDetails/${product._id}`}
                    className="btn btn-xs btn-outline"
                  >
                    View
                  </Link>

                  {product.donation_status !== "canceled" && (
                    <button
                      onClick={() => hendleCencel(product._id)}
                      className="btn btn-xs btn-outline"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Card View ===== */}
      <div className="md:hidden mt-6 space-y-4">
        <select
          value={selectStatus}
          onChange={handleStatus}
          className="select mt-5"
        >
          <option disabled={true}>Pick a color</option>
          <option value="pending">pending</option>
          <option value="inprogress">inprogress</option>
          <option value="done">Done</option>
        </select>
        {products.map((product, index) => (
          <div
            key={product._id}
            className="border rounded-xl p-4 shadow-sm flex flex-col space-y-2"
          >
            <p className="font-semibold">
              #{index + 1} {product?.name}
            </p>
            <p className="text-sm">Hospital: {product?.hospital_name}</p>
            <p className="text-sm">Blood Group: {product?.blood_group}</p>
            <p className="text-sm">
              Status:{" "}
              <span className="font-medium">{product?.donation_status}</span>
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {product.donation_status === "inprogress" && (
                <>
                  <button className="btn btn-xs btn-outline btn-info">
                    done
                  </button>
                </>
              )}

              <button
                onClick={() => handleDelete(product._id)}
                className="btn btn-xs btn-outline btn-error w-full"
              >
                Delete
              </button>
              <Link
                to={`/Dashboard/viewDetails/${product._id}`}
                className="btn btn-xs btn-outline w-full"
              >
                View
              </Link>

              {product.donation_status !== "canceled" && (
                <button
                  onClick={() => hendleCencel(product._id)}
                  className="btn btn-xs btn-outline"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRequest;
