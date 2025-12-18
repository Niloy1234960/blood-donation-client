import axios from "axios";
import { HeartHandshake } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";


const DonationDetails = () => {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  // const axiosSecure = useAxiosSecure();

  const hendleDonate = (id, status) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Dont save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/donate?id=${id}&status=${status}`)
          .then((res) => {
            Swal.fire("Saved!", "", "success");
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/donation-details/${id}`)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <HeartHandshake className="w-10 h-10 text-pink-500 mb-2" />
            <h1 className="text-2xl font-semibold text-pink-500">
              Donation Requests Details
            </h1>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-semibold">Requester Name:</span>{" "}
                {details?.requester_name}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Recipient Name:</span>{" "}
                {details?.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold">District:</span>{" "}
                {details?.district_name}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Full Address:</span>{" "}
                {details?.address}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-semibold">Requester email:</span>{" "}
                {details?.requester_email}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Blood Group:</span>{" "}
                {details?.blood_group}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Upazila:</span>{" "}
                {details?.upazila_name}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Hospital Name:</span>{" "}
                {details?.hospital_name}
              </p>

              <p className="text-orange-500 text-lg font-semibold">
                Status: {details?.donation_status}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => hendleDonate(details?._id, "inprogress")}
              className="px-8 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition"
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
