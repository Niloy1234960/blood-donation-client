import { useContext, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  AiFillHome,
  AiFillDashboard,
  AiOutlineUser,
  AiOutlineAppstore,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const Aside = () => {
  // const {role} = useContext(AuthContext)
  const { LogOut } = use(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {role} = useContext(AuthContext)
 
  const handleLogout = () => {
    LogOut();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-4 text-2xl fixed top-2 left-2 z-50 bg-lime-500 text-white rounded-lg shadow-md"
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-lime-400 text-gray-400 p-6 flex flex-col justify-between 
          transform transition-transform duration-300 
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

          <nav className="space-y-3">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-indigo-600" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              <AiFillHome size={20} />
              Home
            </NavLink>

            <NavLink
              to="/Dashboard/Main"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              <AiFillDashboard size={20} />
              Main Dashboard
            </NavLink>

            {
              role == "donor" && (   <NavLink
              to="/Dashboard/AddRequest"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              <AiFillDashboard size={20} />
              Add Request
            </NavLink>)
            }

         
            {
              role == "donor" && (    <NavLink
              to="/Dashboard/myRequest"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              <AiFillDashboard size={20} />
             My Request
            </NavLink>)
            }


            {
              role == "admin" && ( <NavLink
              to="/Dashboard/allRequest"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              <AiFillDashboard size={20} />
            All Request
            </NavLink>
            )}


            {
              role == "volunteer" && ( <NavLink
              to="/Dashboard/allRequest"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              <AiFillDashboard size={20} />
            All Request
            </NavLink>
)
            }
        

           
            <NavLink
              to="/Dashboard/Users"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-green-600" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              <AiOutlineUser size={20} />
              User Profile
            </NavLink>


            {
              role == "admin" && (   <NavLink
              to="/Dashboard/allUsers"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-green-600" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              <AiOutlineUser size={20} />
              All Users
            </NavLink>)
            }


          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            handleLogout();
            setOpen(false);
          }}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
        >
          <AiOutlineLogout size={20} />
          Logout
        </button>
      </aside>

 
    </div>
  );
};

export default Aside;
