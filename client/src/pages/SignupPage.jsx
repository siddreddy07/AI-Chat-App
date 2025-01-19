import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { axiosInstance } from '@/lib/axios';
import OtpInput from '@/components/OtpInput';
import { useAuthStore } from '@/store/authStore';


const SignupPage = () => {

  const [showPassword,setshowPassword] = useState(false)

  const [otpmodal,setotpmodal] = useState(false)

  const [email, setEmail] = useState('');

  const {checkAuth} = useAuthStore()

  const [formData,setformData] = useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:""
  })


  const validateForm = ()=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!formData.username.trim()) return toast('All fields are required', {
      icon: '🤨',
      padding:'12px',
      className:'text-sm',
      style: {
        background: '#333',
        color: '#fff',
      },

    });

    if(formData.username.length<3) return toast('username must be of min 3 Characters', {
      icon: '🤨',
      padding:'12px',
      className:'text-sm',
      style: {
        background: '#333',
        color: '#fff',
      },

    });

    if(!formData.email.trim()) return toast('All fields are required', {
      icon: '🤨',
      padding:'12px',
      className:'text-base',
      style: {
        background: '#333',
        color: '#fff',
      },

    });
    if(!emailRegex.test(formData.email.trim())) return toast('Invalid email', {
      icon: '🤨',
      padding:'12px',
      className:'text-base',
      style: {
        background: '#333',
        color: '#fff',
      },

    });
    if(!formData.password || !formData.confirmpassword) return toast('All fields are required', {
      icon: '🤨',
      padding:'12px',
      className:'text-sm',
      style: {
        background: '#333',
        color: '#fff',
      },

    });
    if(formData.password.length<6) return toast('Password must be atleast 6 Characters long', {
      icon: '🤨',
      padding:'12px',
      className:'text-sm',
      style: {
        background: '#333',
        color: '#fff',
      },

    });
      if(formData.password != formData.confirmpassword) return toast('Confirm Password is invalid', {
        icon: '🤨',
        padding:'12px',
        className:'text-sm',
        style: {
          background: '#333',
          color: '#fff',
        },
  
      });

    return true

  }


  const [otpVerificationData, setOtpVerificationData] = useState(null);

  const navigate = useNavigate();

  // Callback function to receive OTP verification result from child (OtpInput)
  const handleOtpVerified = (data) => {
    setOtpVerificationData(data);
    if(data){
      console.log("otp verified successfully")
      checkAuth()
    }
  };

  const handleSubmit = async(e)=>{

    e.preventDefault()

    const success = validateForm()
    toast.success('Validated Please Verify ', {
      padding:'12px',
      className:'text-sm',
      style: {
        background: '#333',
        color: '#fff',
      },

    });

    try {
          if(success){
            const res = await axiosInstance.post('/auth/register',formData)
            
            if(res.status===200){
              setotpmodal(true)
              console.log(otpmodal)
            }
          }
                  
    } catch (error) {
          console.log("error in signup page",error)      
    } finally{
    }

  console.log(formData)

  }


  return (
    <div className="hero bg-zinc-900 flex rounded-lg items-center justify-center min-h-full">
  
  <div className="hero-content flex-col lg:flex-row-reverse">

    <div className="text-center lg:text-left">
      <h1 className="sm:text-5xl text-2xl font-bold whitespace-nowrap">{otpmodal?"Verify Your Account":"Register  now!"}</h1>
      <p className="sm:py-6 py-0 sm:text-xl text-base whitespace-nowrap">
      {otpmodal?<span>One time Password has been Successfully <br /> sent to your email address</span>:<span>Already have an Account ? <Link to={'/login'} className='text-blue-500 hover:underline transition-all ease-linear duration-500'>Login Now</Link></span>}  
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      {otpmodal ? <OtpInput email={formData.email} onOtpVerified={handleOtpVerified}/> : <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="johndoe" className="input input-bordered" value={formData.username} onChange={(e)=>setformData({...formData,username:e.target.value})} required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="johndoe@eamil.com" className="input input-bordered" value={formData.email} onChange={(e)=>setformData({...formData,email:e.target.value})} required />
        </div>
        <div className="form-control w-full">
          <div className='w-full'>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type={showPassword?"text":"password"} placeholder="password" className="input w-full input-bordered" value={formData.password} onChange={(e)=>setformData({...formData,password:e.target.value})} required />
          <button onClick={()=>setshowPassword(!showPassword)} className='absolute inset-y-0 right-0 pt-14 pr-12 flex items-center'>
            {
              showPassword ? <FaRegEye size={16}/>:<FaRegEyeSlash size={16}/>
            }
            </button>
          </div>

        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input type={showPassword?"text":"password"} placeholder="Confirm password" className="input input-bordered" value={formData.confirmpassword} onChange={(e)=>setformData({...formData,confirmpassword:e.target.value})} required />
          <button onClick={()=>setshowPassword(!showPassword)} className='absolute inset-y-0 right-0 pt-60 pr-12 flex items-center'>
          {
              showPassword ? <FaRegEye size={16}/>:<FaRegEyeSlash size={16}/>
            }
          </button>


        </div>
        <div className="form-control mt-6">
          <button className="btn bg-blue-900 hover:bg-blue-800 border-none text-zinc-200 font-semibold btn-primary">Register Now</button>
        </div>
      </form>}
      
    </div>
  </div>
</div>
  )
}

export default SignupPage