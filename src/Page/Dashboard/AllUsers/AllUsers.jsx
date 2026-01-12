import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import { FaUserShield, FaUserEdit, FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";

const AllUsers = () => {
  const AxiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchUsers = () => {
    if (!user) return;
    AxiosSecure("/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, [AxiosSecure, user]);

  const handleStatusChange = (email, status) => {
    AxiosSecure.patch(
      `/update/user/status?email=${email}&status=${status}`
    ).then(() => fetchUsers());
  };

  const handlerole = (email, role) => {
    AxiosSecure.patch(`/update/user/role?email=${email}&role=${role}`)
      .then(() => fetchUsers())
      .catch((error) => console.log(error));
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">User Management</h2>
          <p className="text-slate-500 text-sm mt-1">Control user access levels and account statuses from one central place.</p>
        </div>

        {/* ===== Desktop View ===== */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="table w-full border-separate border-spacing-0">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="py-4 px-6 font-semibold uppercase text-[11px] tracking-wider">User Information</th>
                <th className="py-4 px-6 font-semibold uppercase text-[11px] tracking-wider">Current Role</th>
                <th className="py-4 px-6 font-semibold uppercase text-[11px] tracking-wider text-center">Account Status</th>
                <th className="py-4 px-6 font-semibold uppercase text-[11px] tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users?.map((u) => (
                <tr key={u.email} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="avatar ring-2 ring-slate-100 rounded-full p-0.5">
                        <div className="mask mask-squircle h-11 w-11">
                          <img src={u?.imageLink || "https://i.ibb.co/mJR9z8y/user.png"} alt={u?.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{u?.name}</div>
                        <div className="text-xs text-slate-400">{u?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-tighter italic border ${
                      u?.role === 'admin' ? 'bg-red-50 text-red-600 border-red-100' : 
                      u?.role === 'volunteer' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                      'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>
                      {u?.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      u?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${u?.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      {u?.status}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="dropdown dropdown-left dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle hover:bg-slate-100">
                        <FaEllipsisV className="text-slate-400" />
                      </label>
                      <ul tabIndex={0} className="dropdown-content z-[20] menu p-2 shadow-xl bg-white rounded-xl w-52 border border-slate-100 mt-2">
                        <li className="menu-title text-slate-400 text-[10px] uppercase font-bold px-4 py-2">Quick Actions</li>
                        {u?.status === "active" ? (
                          <li>
                            <button onClick={() => handleStatusChange(u?.email, "blocked")} className="text-red-500 font-medium">
                              <FaBan className="mr-2" /> Block User
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button onClick={() => handleStatusChange(u?.email, "active")} className="text-green-600 font-medium">
                              <FaCheckCircle className="mr-2" /> Unblock User
                            </button>
                          </li>
                        )}
                        <div className="h-px bg-slate-100 my-1"></div>
                        <li>
                          <button onClick={() => handlerole(u?.email, "volunteer")}>
                            <FaUserEdit className="mr-2 text-blue-500" /> Make Volunteer
                          </button>
                        </li>
                        <li>
                          <button onClick={() => handlerole(u?.email, "admin")}>
                            <FaUserShield className="mr-2 text-red-500" /> Make Admin
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== Mobile Card View ===== */}
        <div className="md:hidden mt-6 space-y-4">
          {users?.map((u) => (
            <div key={u.email} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="avatar ring-1 ring-slate-100 rounded-lg overflow-hidden">
                    <div className="h-12 w-12">
                      <img src={u?.imageLink} alt={u?.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{u?.name}</div>
                    <div className="text-xs text-slate-400">{u?.email}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                   u?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {u?.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Role: {u?.role}</span>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-sm bg-slate-50 border-slate-100 text-slate-600 px-4 rounded-lg capitalize">
                    Manage
                  </label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-white rounded-xl w-52 mt-2">
                    {u?.status === "active" ? (
                      <li><button onClick={() => handleStatusChange(u?.email, "blocked")} className="text-red-500">Block Account</button></li>
                    ) : (
                      <li><button onClick={() => handleStatusChange(u?.email, "active")} className="text-green-500">Activate Account</button></li>
                    )}
                    <li><button onClick={() => handlerole(u?.email, "volunteer")}>Promote to Volunteer</button></li>
                    <li><button onClick={() => handlerole(u?.email, "admin")}>Promote to Admin</button></li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;