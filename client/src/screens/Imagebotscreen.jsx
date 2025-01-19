import React, { useEffect, useState } from 'react'
import img from '../img.json'
import Lottie from 'lottie-react'
import toast from 'react-hot-toast'
import { RiDownloadCloud2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';



const Imagebotscreen = () => {

const [imgtext,setimgtext] = useState('')
const [clicked,setclicked] = useState(false)
const [loading,setloading] = useState(false)
const [imgurl,setimgurl] = useState('')



const generateimage = async()=>{
    if(!imgtext || imgtext.length<1) return toast.error('Ensure prompt field is not empty',{
        icon:'😢',
        padding:'12px',
        className:'text-base',
        style: {
          background: '#333',
          color: '#fff',
        },
  
      })

      setloading(true);
      console.log(imgtext)

      try {
        console.log(import.meta.env.VITE_HUGGING_FACE_API_KEY)
        const response = await fetch(
            "https://api-inference.huggingface.co/models/kothariyashhh/GenAi-Texttoimage",
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({"inputs":imgtext}),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error Response:', errorData);
          }
        const result = await response.blob();
        const objectUrl = URL.createObjectURL(result)
        setimgurl(objectUrl)


      } catch (error) {
        console.log(error.message)
      } finally{
        console.log(imgurl)
        setloading(false)
      }

}

const handleForm = (e)=>{
    e.preventDefault()
    generateimage()

}

// useEffect(() => {
//   return () => {
//     if (imgurl) {
//       URL.revokeObjectURL(imgurl);
//     }
//   };
// }, [imgurl]);



  return (
    <div className='w-full flex flex-col items-center justify-center h-full'>
        {
            !imgurl && 
<div className='w-1/2 h-72 flex flex-col items-center'>

{
  loading && <div className='w-80 h-80 flex flex-col items-center justify-center mb-2'>
    <div className="skeleton h-80 px-2 bg-zinc-900 flex flex-col items-center justify-center w-80">
      <p>Creating Wonders <br /> Please Wait...</p>
    <span className="loading loading-bars loading-lg"></span>
    </div>
  </div>
}
{
  !loading &&
      <Lottie className='w-64 h-64' loop={true} animationData = {img}/>
}
      </div>
        }
        {
            imgurl && <div className='w-full flex items-center justify-center h-full'>
              
                <div className='w-80 h-96 flex items-center justify-center overflow-hidden'>
                    {
                        !loading && 
                        <div className='w-full relative flex items-center flex-col'>
                          <a target='_blank' href={imgurl}><img src={imgurl} className='w-80 h-80' alt="generated/image"/></a>
                          <a
    href={imgurl}
    className=""
    download="generated-image.jpg"
  >
                          <div className='w-full flex absolute left-0 cursor-pointer gap-2 -bottom-8'>
    <RiDownloadCloud2Fill />
                      <p className='text-base font-semibold'>Download Now</p>
                          </div>
  </a>
                        </div>
                        
                    }
                    {
                        loading && <div className='w-80 h-80 flex flex-col items-center justify-center mb-2'>
                        <div className="skeleton bg-zinc-900 px-2 h-80 w-80 flex flex-col items-center justify-center">
                          <p>Creating Wonders <br /> Please Wait...</p>
                          <span className="loading loading-bars loading-lg"></span>
                        </div>
                      </div>
                    }
                </div>
            </div>
        }

      <form onSubmit={handleForm} className='flex w-full flex-col items-center justify-center gap-4'>
        <textarea type="text" name=""  value={imgtext} id="" placeholder='Enter text messages' onChange={(e)=>setimgtext(e.target.value)} className='bg-zinc-800 resize-none h-24 focus:outline-none text-base w-96 rounded-xl p-2 '/>
        <button className={`whitespace-nowrap rounded-full px-4 py-2 bg-zinc-800 ${loading ? 'animate-pulse border-none':''} hover:border-zinc-400 transition-all duration-300 hover:text-zinc-300 text-base ease-in-out border-2 border-zinc-800`} disabled={loading} onClick={()=>setclicked(true)}>{loading ? 'Working on It' :'Generate Image'}</button>
      </form>

    </div>
  )
}

export default Imagebotscreen