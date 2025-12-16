import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router";

const AboutUs = () => {
  const [products, setProducts] = useState([]);
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

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="text-center text-3xl font-bold mt-3 mb-10">
        <h1 className="text-red-500">All Donation Requests</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white  transition-all duration-300 ease-out 
      hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.03] rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col justify-between "
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-100 pb-3">
                Blood Needs For:{" "}
                <span className="text-gray-900">{product.blood_group}</span>
              </h2>

              <div className="space-y-3 text-[15px] text-gray-600">
                <p>
                  <span className="font-bold text-gray-800">Recipient:</span>{" "}
                  {product.name}
                </p>

                <p className="leading-relaxed">
                  <span className="font-bold text-gray-800">Address:</span>{" "}
                  {product.address}
                </p>

                <div className="flex justify-between items-start pt-2">
                  <p>
                    <span className="font-bold text-gray-800">Date:</span>{" "}
                    {product.date || "2025-12-13"}
                  </p>
                  <p className="max-w-[120px] text-right">
                    <span className="font-bold text-gray-800">Time:</span>{" "}
                    {product.time || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50">
              <Link
                to={`/donation-details/${product?._id}`}
                className="bg-[#ff2d55] hover:bg-[#e6264a] text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-all active:scale-95 w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No requests found.
        </div>
      )}
    </div>
  );
};

export default AboutUs;
