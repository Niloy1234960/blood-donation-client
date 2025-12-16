import axios from "axios";
import { Heart } from "feather-icons-react";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

 

export default function Funding() {
    
    const {user} = useContext(AuthContext)
    

    const handleCheekout =(e)=>{
        e.preventDefault()
        const donateAmount = e.target.donateAmount.value;
        const donorEmail = user?.email;
        const donorName = user?.displayName;

        const formData = {
            donateAmount,
            donorEmail,
            donorName
        }

        axios.post('http://localhost:5000/create-payment-cheekout', formData)
        .then(res=> {
            console.log(res.data)
        })
    }
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-5xl mx-auto px-6">
     
        <h1 className="text-center text-3xl md:text-4xl font-bold text-red-500 mb-12">
          Funding Details
        </h1>

  
        <form onSubmit={handleCheekout } className="flex flex-col sm:flex-row items-center gap-4">
   
          <div className="relative w-full sm:w-80">

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              Amount:
            </span>
            <input
              type="number"
              name="donateAmount"
              className="w-full appearance-none rounded-lg border border-gray-300 pl-24 pr-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            <style>{`input[type=number]::-webkit-inner-spin-button { margin-left: 8px; }`}</style>
          </div>

       
          <button
            className="flex items-center gap-2 rounded-lg bg-teal-200 px-6 py-3 font-semibold text-teal-700 shadow-sm transition hover:bg-teal-300"
          >
            <Heart className="h-5 w-5" />
            Give Funding
          </button>
        </form>
      </div>
    </div>
  );
}
