import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const MyRequest = () => {
  const [products, setProducts] = useState([]);
  //    const axiosInstance = useAxios()
  const { user } = useContext(AuthContext);

  const fetchRequest = () => {
    axios
      .get("http://localhost:5000/Delete-request")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  console.log(products);

  const handleDelete = (id) => {
    console.log(id);
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
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your Request has been deleted.",
              icon: "success",
            });
            fetchRequest();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:5000/request/${user.email}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.email]);
  console.log(products);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
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
            {/* row 1 */}
            {products.map((product, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.hospital_name}</td>
                <td>{product.blood_group}</td>
                <td>{product.donation_status}</td>

                <td className="space-x-1">
                  <button className="btn btn-xs btn-outline">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="btn btn-xs btn-outline btn-error">
                    Delete
                  </button>
                  <button className="btn btn-xs btn-outline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default MyRequest;
