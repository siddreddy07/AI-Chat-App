import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';


const LoginPage = () => {

  const [showPassword,setshowPassword] = useState(false)



  const [email, setEmail] = useState('');

  const {checkAuth,login} = useAuthStore()

  const [formData,setformData] = useState({
  
    email:"",
    password:"",
      })


  const validateForm = ()=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    

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

    if(formData.password.length<6) return toast('Password must be atleast 6 Characters long', {
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






  const handleSubmit = async(e)=>{

    e.preventDefault()

    const success = validateForm()
    
    login(formData)

  }



  return (
    <div className="hero bg-zinc-900 flex rounded-xl items-center justify-center min-h-full">
  
  <div className="hero-content flex-col lg:flex-row-reverse">

    <div className="text-center lg:text-left">
      <h1 className="sm:text-5xl text-2xl font-bold whitespace-nowrap">Welcome Back</h1>
      <p className='text-base mt-2 text-center'>Login to Continue your Conversations and <br /> catch up with  your messages.</p>
      <p className="sm:py-6 py-0 sm:text-xl text-center text-base whitespace-nowrap">
       New here <Link to={'/signup'} className='text-blue-500 hover:underline transition-all ease-linear duration-500'>Register Now</Link>  
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit} className="card-body">
        
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
        
        <div className="form-control mt-6">
          <button className="btn bg-blue-900 hover:bg-blue-800 border-none text-zinc-200 font-semibold btn-primary">Login Now</button>
        </div>
      </form>
      
    </div>
  </div>
</div>
  )
}

export default LoginPage