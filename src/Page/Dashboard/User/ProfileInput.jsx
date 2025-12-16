import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

// DUMMY DATA
const initialUserData = {
  email: 'niloymondal1370@gmail.com',
  name: 'Niloy Mondal',
  bloodGroup: 'A+',
  district: 'Chandpur',
  upazila: 'Anwara',
  // আপনার প্রোফাইল ইমেজের URL এখানে দিন
//   profileImg: 'https://i.imgur.com/your-profile-image.jpg', 
};

const ProfileInput = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialUserData);
  const [tempData, setTempData] = useState(initialUserData); // For temporary edits
  const{user} = useContext(AuthContext)
  // Handlers
  const handleEditClick = () => {
    if (isEditing) {
      // Save changes 
      setFormData(tempData);
    } else {
      // Start editing
      setTempData(formData); 
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // একটি ডামি অপশন লিস্ট
  const bloodGroupOptions = ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'];

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-6 sm:p-10 border border-gray-100">

        {/* --- Profile Header --- */}
        <div className="flex flex-col items-center mb-8">
          {/* Profile Picture (Avatar) */}
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-green-500 shadow-lg">
            <img 
              src={formData.profileImg} 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150/008000/FFFFFF?text=NM"; }}
            />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">User Profile</h1>

          {/* Edit Button */}
          <button
            onClick={handleEditClick}
            className={`px-6 py-2 rounded-full font-bold text-white transition-colors duration-200 
              ${isEditing 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-cyan-500 hover:bg-cyan-600'
              } 
              shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          
          {isEditing && (
            <button
              onClick={() => {
                setIsEditing(false);
                setTempData(formData); // Discard changes
              }}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          )}

        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* 1. Email Field (Editable) */}
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={isEditing ? tempData.email : formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 text-base border-2 rounded-md focus:outline-none transition duration-150 ease-in-out
                ${!isEditing 
                  ? 'bg-gray-100 border-gray-300 cursor-not-allowed text-gray-800' 
                  : 'bg-white border-gray-200 focus:border-cyan-500 hover:border-gray-400'
                } 
              `}
            />
          </div>

          {/* 2. Name Field (Editable) */}
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-700 block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={isEditing ? tempData.name : formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 text-base border-2 rounded-md focus:outline-none transition duration-150 ease-in-out
                ${!isEditing 
                  ? 'bg-gray-100 border-gray-300 cursor-not-allowed text-gray-800' 
                  : 'bg-white border-gray-200 focus:border-cyan-500 hover:border-gray-400'
                } 
              `}
            />
          </div>
          
          {/* 3. Blood Group Field (Disabled/Static) */}
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-700 block mb-1">Blood Group*</label>
            <div className="relative opacity-80">
              <select
                name="bloodGroup"
                value={formData.bloodGroup} 
                disabled={true} 
                className="w-full px-4 py-2.5 text-base border-2 rounded-md focus:outline-none bg-gray-100 border-gray-300 cursor-not-allowed text-gray-600 appearance-none"
              >
                {/* এই ফিল্ডটি এডিট করা যাবে না, তাই শুধু বর্তমান মানই অপশন হিসেবে দেখাচ্ছে */}
                {bloodGroupOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {/* Custom arrow for disabled select */}
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* 4. District Field (Disabled/Static) */}
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-700 block mb-1">District*</label>
            <div className="relative opacity-80">
              <select
                name="district"
                value={formData.district} 
                disabled={true} 
                className="w-full px-4 py-2.5 text-base border-2 rounded-md focus:outline-none bg-gray-100 border-gray-300 cursor-not-allowed text-gray-600 appearance-none"
              >
                {/* এই ফিল্ডটি এডিট করা যাবে না */}
                <option value={formData.district}>{formData.district}</option> 
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          
          {/* 5. Upazila Field (Disabled/Static) */}
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-700 block mb-1">Upazila*</label>
            <div className="relative opacity-80">
              <select
                name="upazila"
                value={formData.upazila} 
                disabled={true} 
                className="w-full px-4 py-2.5 text-base border-2 rounded-md focus:outline-none bg-gray-100 border-gray-300 cursor-not-allowed text-gray-600 appearance-none"
              >
                {/* এই ফিল্ডটি এডিট করা যাবে না */}
                <option value={formData.upazila}>{formData.upazila}</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInput;