import { axiosInstance } from '../lib/axios';
import { useAuthStore } from '../store/authStore';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaCamera } from "react-icons/fa6";


const ProfilePage = () => {

  const {authUser,checkAuth} = useAuthStore()
  const [isupdating,setisupdating] = useState(false);
  const [selectedimg,setselectedimg] = useState(null);


  const handleImageupload = async(e)=>{

    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

// Start the file reading process
reader.readAsDataURL(file);

reader.onload = async () => {
  const profilepic = reader.result;

  // Set the selected image to state
  setselectedimg(profilepic);

  // Set isupdating to true before making the API request
  setisupdating(true);

  try {
    // Make the PUT request to update the profile picture
    const res = await axiosInstance.put('/auth/update-profile', { profilepic });

    // Check if the response status is OK (200)
    if (res.status === 200) {
      const { data } = res;
      checkAuth()
      // Do something with the data (e.g., update the UI)
    }
  } catch (error) {
    // Handle errors and show a toast notification with the error message
    console.log(error);
    toast.error(error.response ? error.response.data : error.message);
  } finally {
    // Reset isupdating to false, no matter what (successful or failed request)
    setisupdating(false);
  }
};


  }

  return (
    <div className='hidden sm:flex w-full h-full flex-col items-center justify-center'>

          <div className='flex gap-2 flex-col w-1/3 md:w-96 lg:w-96 items-center'>
            <p className='font-semibold text-2xl text-zinc-200'>Profile Menu</p>
            <p className='font-semibold text-xl text-zinc-200'>Your Profile Information</p>

             <div className="w-full mt-2 rounded-full bg-transparent flex items-center justify-center">
  <div className='w-32 h-32 relative rounded-full overflow-hidden bg-zinc-400'>
                <img src={selectedimg || authUser?.profilepic || "../../public/dp.jpg"} className='object-fill' alt="" />
                <label htmlFor='avatr-upload'>
                <FaCamera className='absolute bottom-0 right-12 text-zinc-800 shadow-xl cursor-pointer'/>
                <input type="file" id='avatr-upload' className='hidden' accept='image/*' disabled={isupdating} onChange={handleImageupload}/>
                </label>
              </div>
 
            </div>
                <p className={`text-base ${isupdating ? 'transition-all ease-in-out duration-300 animate-pulse':''}`}>{isupdating ? "Updating":"Click on Camera icon to update Profile Pic"}</p>

                <div className='w-full flex flex-col items-center gap-2'>

                <label className="form-control w-full">  
  <div className="label w-full">
    <span className="label-text">Username</span>
  
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full" value={authUser?.username}/>
  
                  </label>
                <label className="form-control w-full">  
  <div className="label">
    <span className="label-text">Email</span>
  
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full" value={authUser?.email}/>
  
                  </label>

                </div>
              <div className='w-full mt-2 text-sm flex items-center justify-between'>
              <p>Member Since</p>
              <p className='text-[12px]'>{authUser.createdAt?.split('T')[0]}</p>
              </div>  
              <div className='w-full mt-2 text-sm flex items-center justify-between'>
              <p>Active Status</p>
              <p className='text-green-500'>Online</p>
              </div>

              </div>
            </div>
  )
}

export default ProfilePage