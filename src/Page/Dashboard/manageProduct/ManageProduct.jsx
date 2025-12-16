import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  //    const axiosInstance = useAxios()
  const { user } = useContext(AuthContext);

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
                  <button className="btn btn-xs btn-outline btn-error">
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

export default ManageProduct;
