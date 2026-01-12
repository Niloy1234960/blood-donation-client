import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaEye, FaPlusCircle, FaArrowRight } from "react-icons/fa";

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    axios
      .get("https://assignment-11-server-iota-seven.vercel.app/myRequests")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this request!",
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
            Swal.fire("Deleted!", "Request has been removed.", "success");
            fetchRequests();
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      {/* --- Welcome Header --- */}
      <div className="bg-white border-b border-slate-200 py-10 px-6 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 italic">
              Welcome back, <span className="text-red-600 not-italic">{user?.displayName}!</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Manage your blood donation requests and track status.</p>
          </div>
      
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* --- Quick Stats --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Requests</p>
                <p className="text-3xl font-black text-slate-800 mt-2">{products.length}</p>
            </div>
            <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 shadow-sm">
                <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Pending Needs</p>
                <p className="text-3xl font-black text-red-600 mt-2">
                    {products.filter(p => p.donation_status === 'pending').length}
                </p>
            </div>
            <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl shadow-slate-200">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Completed</p>
                <p className="text-3xl font-black text-white mt-2">
                    {products.filter(p => p.donation_status === 'done').length}
                </p>
            </div>
        </div>

        {/* ===== Desktop Table ===== */}
        <div className="hidden md:block bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Requests</h3>
          </div>
          <table className="table w-full">
            <thead className="bg-slate-50/50">
              <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-none">
                <th className="py-5 pl-8">Recipient</th>
                <th>Location</th>
                <th>Blood</th>
                <th>Status</th>
                <th className="text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 pl-8">
                    <div className="font-bold text-slate-700">{product?.name}</div>
                  </td>
                  <td>
                    <div className="text-sm text-slate-500 font-medium">{product?.hospital_name}</div>
                  </td>
                  <td>
                    <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-black italic">
                      {product?.blood_group}
                    </span>
                  </td>
                  <td>
                    <div className={`badge badge-sm border-none font-bold py-3 px-4 ${
                      product?.donation_status === 'pending' ? 'bg-orange-100 text-orange-600' :
                      product?.donation_status === 'inprogress' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {product?.donation_status}
                    </div>
                  </td>
                  <td className="text-right pr-8">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/Dashboard/Myrequest-edit/${product._id}`}
                        className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all"
                        title="Edit"
                      >
                        <FaEdit size={14}/>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                        title="Delete"
                      >
                        <FaTrashAlt size={14}/>
                      </button>
                      <Link
                        to={`/Dashboard/viewDetails/${product._id}`}
                        className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all"
                        title="View Details"
                      >
                        <FaEye size={14}/>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p className="p-10 text-center text-slate-400">No requests found.</p>}
        </div>

        {/* ===== Mobile Card View ===== */}
        <div className="md:hidden space-y-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-1 rounded mb-2 inline-block">
                        Group {product?.blood_group}
                    </span>
                    <h3 className="font-bold text-slate-800 text-lg">{product?.name}</h3>
                </div>
                <div className={`badge badge-xs py-2 font-bold ${
                      product?.donation_status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                } border-none`}>
                    {product?.donation_status}
                </div>
              </div>
              
              <p className="text-sm text-slate-500 mb-6 font-medium">📍 {product?.hospital_name}</p>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-50">
                <Link to={`/Dashboard/Myrequest-edit/${product._id}`} className="btn btn-sm bg-slate-100 border-none text-slate-600 rounded-xl">Edit</Link>
                <button onClick={() => handleDelete(product._id)} className="btn btn-sm bg-red-50 border-none text-red-600 rounded-xl">Delete</button>
                <Link to={`/Dashboard/viewDetails/${product._id}`} className="btn btn-sm bg-slate-900 border-none text-white rounded-xl">View</Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- Footer Action --- */}
        <div className="mt-12 flex justify-center">
          <Link
            to={"/Dashboard/allRequest"}
            className="group flex items-center gap-3 bg-white border border-slate-200 px-8 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
          >
            Explore All Requests <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;