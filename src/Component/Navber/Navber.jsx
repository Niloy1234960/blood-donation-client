import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { FaTint } from "react-icons/fa";

const Navber = () => {
  const { user, LogOut } = use(AuthContext);

  const hendleLogout = () => {
    LogOut()
      .then((resut) => {
        toast.success("log out successfull");
        console.log(resut);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* navbar start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <NavLink to="/" className="border btn mr-2">
              <li>Home</li>
            </NavLink>
            <NavLink to="/request" className="border btn mr-2">
              <li>Donation Request</li>
            </NavLink>
            <NavLink to="/funding" className="border btn mr-2">
              <li>Funding</li>
            </NavLink>
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-2xl">
          <FaTint /> <span className="text-red-500">Blood</span> Donation
        </Link>
      </div>

      {/* navbar center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLink to="/">
            <li className="border btn mr-2">Home</li>
          </NavLink>
          <NavLink to="/request">
            <li className="border btn mr-2">Donation Request</li>
          </NavLink>
          <NavLink to="/funding">
            <li className="border btn mr-2">Funding</li>
          </NavLink>
        </ul>
      </div>

      {/* navbar end */}
      <div className="navbar-end flex gap-2">
        {/* 🌙 Dark / Light Mode Toggle */}
        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input type="checkbox" className="theme-controller" value="dark" />
          <span className="swap-off text-xl">🌞</span>
          <span className="swap-on text-xl">🌙</span>
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-[40px] rounded-full">
                <img src={user?.photoURL} alt="" />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li>
                <Link to="Dashboard/main" className="text-lg">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={hendleLogout} className="text-lg">
                  Log out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <NavLink to="/login" className="btn">
              LogIn
            </NavLink>
            <NavLink to="/register" className="btn">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navber;
