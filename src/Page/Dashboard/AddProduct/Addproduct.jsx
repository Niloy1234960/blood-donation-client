import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';


const Addproduct = () => {
  const [showOnHome, setShowOnHome] = useState(false);
  const {user} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
   
    reset,
    formState: { errors },
  } = useForm()
   

  // const axiosInstance = useAxios()

  const onSubmit = async(data) => {
    const {paymentOption,images,minimumOrder,availableQuantity,price,productDescription,productName,requesterName,requesterEmail}=data;

    const formdata ={
      paymentOption,
      images,
      minimumOrder : Number(minimumOrder)  ,
      availableQuantity:Number(availableQuantity),
      price :Number(price),
      productDescription,
      productName,
      requesterName,
      requesterEmail,
      managerEmail : user?.email,

    }
    // const file =images[0];
    
    // const formdata = new FormData();
    // formdata.append("photo",file);

    // const res =await axios.post(`https://api.imgbb.com/1/upload?key=039ed19dd7ea9e86d51e69b5a3528627`,formdata);

    // console.log(res.data.data.display_url)

    console.log(data);

    await axios.post("http://localhost:5000/Addproduct",formdata)
    .then(result =>{
      console.log(result.data)
      toast.success("Your product add successfull")
    })
    .catch(error => console.log(error))


    reset()
    setShowOnHome(false);
  };
  

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Add New Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Product Name */}
        <div>
          <label className="block mb-2 font-semibold">Requester Name</label>
          <input
            type="text"
            {...register('requesterName', { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Requester name"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Requester Email</label>
          <input
            type="text"
            {...register('requesterEmail', { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Requester email"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Product Name</label>
          <input
            type="text"
            {...register('productName', { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product name"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block mb-2 font-semibold">Product Description</label>
          <textarea
            {...register('productDescription', { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            placeholder="Enter product description"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="number"
            {...register('price', { required:true, min:{
              value:0,
              message:"Price is no nagative "
            }})}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter price"
          />
          {errors.price && <p className='text-red-500 text-xs'>{errors.price.message}</p>}
        </div>

        {/* Available Quantity */}
        <div>
          <label className="block mb-2 font-semibold">Available Quantity</label>
          <input
            type="number"
            {...register('availableQuantity', { required: true, min: 0 })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Available quantity"
          />
        </div>

        {/* Minimum Order */}
        <div>
          <label className="block mb-2 font-semibold">Minimum Order</label>
          <input
            type="number"
            {...register('minimumOrder', { required: true, min: {
              value:1,
              message:"please try to positive number"
            } })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Minimum order quantity"
          />
          {errors.minimumOrder && <p className='text-red-500 text-xs'>{errors.minimumOrder.message}</p>}
        </div>


        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold">Product Images</label>
          <input
            type="text"
            {...register('images')}
            multiple
            placeholder='Image url'
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Payment Option */}
        <div>
          <label className="block mb-2 font-semibold">Payment Option</label>
          <select
            {...register('paymentOption')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
          </select>
        </div>

        {/* Show on Home Page */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={showOnHome}
            onChange={() => setShowOnHome(!showOnHome)}
            className="mr-2 w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="font-semibold">Show on Home Page</label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition duration-300"
        >
          Add Product
        </button>
     
      </form>
    </div>
  );
};

export default Addproduct;
