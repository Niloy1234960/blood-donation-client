import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  AiFillHome,
  AiFillDashboard,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlinePlusCircle,
  AiOutlineUnorderedList,
  AiOutlineTeam
} from "react-icons/ai";
import { AuthContext } from "../../../Context/AuthContext";

const Aside = () => {
  const { LogOut, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    LogOut();
    navigate("/");
  };

  // একটি কমন স্টাইল ফাংশন যাতে কোড ক্লিন থাকে
  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
      isActive 
        ? "bg-red-600 text-white shadow-md shadow-red-200" 
        : "text-slate-600 hover:bg-red-50 hover:text-red-600"
    }`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-3 text-2xl fixed top-4 left-4 z-50 bg-red-600 text-white rounded-xl shadow-lg"
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-72 bg-white border-r border-slate-100 p-6 flex flex-col justify-between 
          transform transition-transform duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-red-600 p-2 rounded-lg">
               <AiFillDashboard className="text-white text-2xl" />
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Life<span className="text-red-600">Flow</span>
            </h2>
          </div>

          <nav className="space-y-2">
            {/* Common Routes */}
            <NavLink to="/" className={navLinkStyles} onClick={() => setOpen(false)}>
              <AiFillHome size={20} />
              <span className="font-medium">Public Home</span>
            </NavLink>

            <NavLink to="/Dashboard/Main" className={navLinkStyles} onClick={() => setOpen(false)}>
              <AiFillDashboard size={20} />
              <span className="font-medium">Statistics Overview</span>
            </NavLink>

            {/* Separator */}
            <div className="my-4 border-t border-slate-50 pt-4 px-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management</span>
            </div>

            {/* Role Based Routes */}
            {role === "donor" && (
              <>
                <NavLink to="/Dashboard/AddRequest" className={navLinkStyles} onClick={() => setOpen(false)}>
                  <AiOutlinePlusCircle size={20} />
                  <span className="font-medium">Add Request</span>
                </NavLink>
                <NavLink to="/Dashboard/myRequest" className={navLinkStyles} onClick={() => setOpen(false)}>
                  <AiOutlineUnorderedList size={20} />
                  <span className="font-medium">My Requests</span>
                </NavLink>
              </>
            )}

            {(role === "admin" || role === "volunteer") && (
              <NavLink to="/Dashboard/allRequest" className={navLinkStyles} onClick={() => setOpen(false)}>
                <AiOutlineUnorderedList size={20} />
                <span className="font-medium">All Requests</span>
              </NavLink>
            )}

            {role === "admin" && (
              <NavLink to="/Dashboard/allUsers" className={navLinkStyles} onClick={() => setOpen(false)}>
                <AiOutlineTeam size={20} />
                <span className="font-medium">Manage Users</span>
              </NavLink>
            )}

            <NavLink to="/Dashboard/Users" className={navLinkStyles} onClick={() => setOpen(false)}>
              <AiOutlineUser size={20} />
              <span className="font-medium">My Profile</span>
            </NavLink>
          </nav>
        </div>

        {/* Bottom Section: User Info & Logout */}
        <div className="border-t border-slate-100 pt-6">
          <button
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all font-semibold"
          >
            <AiOutlineLogout size={20} />
            Logout Account
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {open && (
        <div 
          onClick={() => setOpen(false)} 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Aside;