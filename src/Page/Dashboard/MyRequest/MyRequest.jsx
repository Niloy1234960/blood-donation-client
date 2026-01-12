import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye, FaCheckCircle, FaTimesCircle, FaPlus } from "react-icons/fa";

const MyRequest = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://assignment-11-server-iota-seven.vercel.app/Delete-request?id=${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Request has been removed.", "success");
            fetchRequest();
          });
      }
    });
  };

  const handleStatusUpdate = (id, status) => {
    const endpoint = status === 'done' ? 'done-request' : 'cancel-request';
    axios
      .patch(`https://assignment-11-server-iota-seven.vercel.app/${endpoint}?id=${id}&status=${status}`)
      .then(() => {
        toast.success(`Request marked as ${status}`);
        fetchRequest();
      })
      .catch(() => toast.error("Operation failed"));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "done": return "bg-green-100 text-green-700 border-green-200";
      case "canceled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <Toaster position="top-center" />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800">My Donation Requests</h1>
            <p className="text-slate-500 text-sm">Manage and track your blood donation posts</p>
          </div>
          <Link to="/Dashboard/AddRequest" className="btn bg-red-600 hover:bg-red-700 border-none text-white gap-2 rounded-xl px-6 shadow-lg shadow-red-200">
            <FaPlus /> New Request
          </Link>
        </div>

        {/* ===== Desktop Table View ===== */}
        <div className="hidden md:block bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <table className="table w-full border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[11px] font-bold tracking-widest">
              <tr>
                <th className="py-5 pl-8">Recipient</th>
                <th>Location</th>
                <th className="text-center">Blood</th>
                <th>Status</th>
                <th className="text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.length > 0 ? products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 pl-8">
                    <span className="font-bold text-slate-700">{product.name}</span>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-600">{product.hospital_name}</span>
                      <span className="text-[10px] text-slate-400">{product.district_name}, {product.upazila_name}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-lg font-black text-xs">
                      {product.blood_group}
                    </span>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(product.donation_status)}`}>
                      {product.donation_status}
                    </span>
                  </td>
                  <td className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      {product.donation_status === "pending" && (
                        <>
                          <button onClick={() => handleStatusUpdate(product._id, 'done')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Mark Done">
                            <FaCheckCircle size={18} />
                          </button>
                          <button onClick={() => handleStatusUpdate(product._id, 'canceled')} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Cancel Request">
                            <FaTimesCircle size={18} />
                          </button>
                        </>
                      )}
                      <Link to={`/Dashboard/viewDetails/${product._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <FaEye size={18} />
                      </Link>
                      <button onClick={() => handleDelete(product._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center py-20 text-slate-400 font-medium italic">No requests found. Create one now!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===== Mobile Card View ===== */}
        <div className="md:hidden space-y-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-slate-800 text-lg">{product.name}</h3>
                  <p className="text-xs text-slate-400">{product.hospital_name}</p>
                </div>
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-xl font-black text-sm">
                  {product.blood_group}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(product.donation_status)}`}>
                  {product.donation_status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-slate-50 pt-4">
                {product.donation_status === "pending" && (
                  <>
                    <button onClick={() => handleStatusUpdate(product._id, 'done')} className="btn btn-sm bg-green-50 text-green-600 border-none normal-case rounded-xl">Done</button>
                    <button onClick={() => handleStatusUpdate(product._id, 'canceled')} className="btn btn-sm bg-amber-50 text-amber-600 border-none normal-case rounded-xl">Cancel</button>
                  </>
                )}
                <Link to={`/Dashboard/viewDetails/${product._id}`} className="btn btn-sm bg-blue-50 text-blue-600 border-none normal-case rounded-xl">Details</Link>
                <button onClick={() => handleDelete(product._id)} className="btn btn-sm bg-red-50 text-red-500 border-none normal-case rounded-xl">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRequest;