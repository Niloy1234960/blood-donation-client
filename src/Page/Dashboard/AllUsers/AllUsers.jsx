import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";

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
    AxiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
      .then(() => fetchUsers());
  };

  return (
    <div className="px-3 sm:px-6">
      {/* ===== Desktop & Tablet Table ===== */}
      <div className="hidden md:block overflow-x-auto mt-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>User Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.email}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={u?.imageLink} alt={u?.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{u?.name}</div>
                      <div className="text-sm opacity-50">{u?.email}</div>
                    </div>
                  </div>
                </td>
                <td>{u?.role}</td>
                <td>{u?.status}</td>
                <td>
                  {u?.status === "active" ? (
                    <button
                      onClick={() => handleStatusChange(u?.email, "blocked")}
                      className="btn btn-error text-white btn-xs"
                    >
                      Blocked
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(u?.email, "active")}
                      className="btn btn-primary text-white btn-xs"
                    >
                      Active
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
        {users?.map((u) => (
          <div
            key={u.email}
            className="border rounded-xl p-4 shadow-sm flex flex-col space-y-2"
          >
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={u?.imageLink} alt={u?.name} />
                </div>
              </div>
              <div className="flex-1">
                <div className="font-bold">{u?.name}</div>
                <div className="text-sm opacity-50">{u?.email}</div>
              </div>
            </div>

            <p className="text-sm">
              <span className="font-semibold">Role:</span> {u?.role}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Status:</span> {u?.status}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {u?.status === "active" ? (
                <button
                  onClick={() => handleStatusChange(u?.email, "blocked")}
                  className="btn btn-error text-white btn-xs w-full"
                >
                  Blocked
                </button>
              ) : (
                <button
                  onClick={() => handleStatusChange(u?.email, "active")}
                  className="btn btn-primary text-white btn-xs w-full"
                >
                  Active
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
