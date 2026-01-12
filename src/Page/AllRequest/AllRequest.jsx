import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { FaTrashAlt, FaEye, FaTimesCircle, FaCheckCircle, FaFilter } from "react-icons/fa";

const AllRequest = () => {
  const [products, setProducts] = useState([]);
  const [selectStatus, setSelectStatus] = useState("");

  const hendleCencel = (id) => {
    axios
      .patch(`https://assignment-11-server-iota-seven.vercel.app/cancel-request?id=${id}&status=canceled`)
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

  const fetchRequest = () => {
    axios
      .get(`https://assignment-11-server-iota-seven.vercel.app/allRequest?status=${selectStatus}`)
      .then((res) => {
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
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://assignment-11-server-iota-seven.vercel.app/Delete-request?id=${id}`)
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
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Donation Requests</h2>
            <p className="text-slate-500 text-sm">Manage and track all blood donation status</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full">
              <FaFilter className="absolute left-3 top-3.5 text-slate-400 text-sm" />
              <select
                value={selectStatus}
                onChange={handleStatus}
                className="select select-bordered w-full pl-10 bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===== Desktop Table View ===== */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="table w-full">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="py-4 px-6 font-semibold">Recipient</th>
                <th className="py-4 font-semibold">Hospital & Location</th>
                <th className="py-4 font-semibold text-center">Group</th>
                <th className="py-4 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-700">{product?.name}</div>
                  </td>
                  <td className="py-4 text-slate-600">
                    <span className="block font-medium">{product?.hospital_name}</span>
                    <span className="text-xs text-slate-400">{product?.address || "Location N/A"}</span>
                  </td>
                  <td className="py-4 text-center">
                    <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg font-bold text-sm border border-red-100 italic">
                      {product?.blood_group}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      product?.donation_status === 'done' ? 'bg-green-100 text-green-600' :
                      product?.donation_status === 'pending' ? 'bg-amber-100 text-amber-600' :
                      product?.donation_status === 'inprogress' ? 'bg-blue-100 text-blue-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {product?.donation_status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        to={`/Dashboard/viewDetails/${product._id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FaEye size={18} />
                      </Link>

                      {product.donation_status === "inprogress" && (
                        <>
                          <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg" title="Mark as Done">
                            <FaCheckCircle size={18} />
                          </button>
                        </>
                      )}

                      {product.donation_status === "pending" && (
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Request"
                        >
                          <FaTrashAlt size={17} />
                        </button>
                      )}

                      {product.donation_status !== "canceled" && (
                        <button
                          onClick={() => hendleCencel(product._id)}
                          className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Cancel Request"
                        >
                          <FaTimesCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-20 text-center text-slate-400">No requests found with this status.</div>
          )}
        </div>

        {/* ===== Mobile Card View ===== */}
        <div className="md:hidden space-y-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-red-600 text-white text-xs font-bold rounded-bl-xl italic">
                {product?.blood_group}
              </div>
              
              <h3 className="font-bold text-slate-800 text-lg mb-1">{product?.name}</h3>
              <p className="text-slate-500 text-sm mb-4">🏥 {product?.hospital_name}</p>
              
              <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product?.donation_status === 'done' ? 'bg-green-100 text-green-600' :
                      product?.donation_status === 'pending' ? 'bg-amber-100 text-amber-600' :
                      'bg-slate-100 text-slate-500'
                }`}>
                  {product?.donation_status}
                </span>

                <div className="flex gap-3">
                    <Link to={`/Dashboard/viewDetails/${product._id}`} className="text-slate-400 p-1"><FaEye size={20}/></Link>
                    {product.donation_status === "pending" && (
                        <button onClick={() => handleDelete(product._id)} className="text-red-400 p-1"><FaTrashAlt size={18}/></button>
                    )}
                    {product.donation_status !== "canceled" && (
                        <button onClick={() => hendleCencel(product._id)} className="text-orange-400 p-1"><FaTimesCircle size={20}/></button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AllRequest;