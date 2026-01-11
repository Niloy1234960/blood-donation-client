import React, { use } from "react";

import { AuthContext } from "../../Context/AuthContext"; // assuming এটা ঠিক আছে
import { toast } from "react-toastify";
import { FaTint, FaUserCircle, FaSun, FaMoon } from "react-icons/fa"; // icons যোগ করা হলো
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { user, LogOut } = use(AuthContext);

  const handleLogout = async () => {
    try {
      await LogOut();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/request", label: "Donation Requests" },
    { to: "/funding", label: "Funding" },
    { to: "/search", label: "Find Donors" },
  ];

  const activeClass =
    "text-white bg-red-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-red-800 shadow-sm";
  const inactiveClass =
    "text-red-100 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-red-800/30";

  return (
    <div className="navbar bg-black text-red-100 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      {/* Start - Logo + Mobile Menu */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-red-700 rounded-box w-52 text-white"
          >
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? "bg-red-800 font-semibold" : ""
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight hover:scale-105 transition-transform"
        >
          <FaTint className="text-red-200 text-3xl" />
          <span className="text-white">Blood</span>
          <span className="text-red-200">Donation</span>
        </Link>
      </div>

      {/* Center - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* End - Theme Toggle + Auth */}
      <div className="navbar-end flex items-center gap-3 md:gap-4 pr-2 md:pr-6">
        {/* Theme Toggle - DaisyUI compatible */}
        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input type="checkbox" className="theme-controller" value="dark" />
          <FaSun className="swap-off h-6 w-6" />
          <FaMoon className="swap-on h-6 w-6" />
        </label>

        {/* Auth Section */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-red-300 ring-offset-base-100 ring-offset-2">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} />
                ) : (
                  <FaUserCircle className="w-full h-full text-red-200" />
                )}
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-box w-56 text-base-content border border-red-200"
            >
              <li className="mb-2 border-b pb-2">
                <div className="font-semibold">{user.displayName || "Donor"}</div>
                <div className="text-sm opacity-70">{user.email}</div>
              </li>
              <li>
                <Link to="/dashboard/main" className="justify-between">
                  Dashboard
                  <span className="badge badge-primary">New</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="btn btn-outline border-red-300 text-red-100 hover:bg-red-700 hover:border-red-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-red-700 hover:bg-red-800 text-white border-none"
            >
              Join as Donor
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;