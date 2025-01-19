import { useChatStore } from '../store/useChatStore';
import React, { useState } from 'react'
import { IoMdAdd, IoMdSend } from "react-icons/io";
import { IoImageOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';


const MessageBar = () => {

  const [text,settext] = useState('')
  const [imagefile,setimagefile] = useState(null)
  const {selecteduser,sendMessage} =  useChatStore()


  const handleSendMessage = async(e)=>{
    e.preventDefault()
    if(!text.trim() && !imagefile) return;

  

    try {
      await sendMessage({
        text:text,
        image:imagefile
      })
      settext('')
      setimagefile(false)
    } catch (error) {
      console.log("Failed to send Message : ",error)
    }

  }


  const handleImageChange = (e)=>{
    const file = e.target.files[0]
    if(!file.type.startsWith("image/")){
      return toast.error('Please select an image file');
    }

    
    const reader = new FileReader();

    reader.readAsDataURL(file);

reader.onloadend = async () => {
  setimagefile (reader.result);
}


  }

  return (
    <form onSubmit={handleSendMessage} className='flex w-full items-center gap-2 rounded-xl justify-between'>
      <div className="dropdown dropdown-top">
        <div tabIndex={0} role="button" className="m-1"><IoMdAdd/></div>
        <ul tabIndex={0} className="dropdown-content menu bg-zinc-800 rounded-box z-[1] w-52 p-2 shadow">
          <label htmlFor="input-image">
          <li><a className='text-base'><IoImageOutline size={20}/> Image</a></li>
          <input type="file" name="" accept='image/*' id="input-image" className='hidden' onChange={handleImageChange}/>
          </label>
          <li><a>Item 2</a></li>
        </ul>
      </div>
        <div className='w-full'>
          {imagefile &&
          <div className='absolute bottom-20'> 
          <div className='overflow-hidden border-2 h-28 flex items-center justify-center w-28 border-zinc-600 bg-zinc-800 rounded-xl bottom-20'>
            <img src={imagefile} alt="" className='object-fill'/>
            <div className='bg-zinc-700 border-1 hover:border-1 hover:bg-opacity-50 cursor-pointer flex items-center justify-center absolute bottom-24 -right-5 rounded-full p-1' onClick={()=>setimagefile(null)}>
            <RxCross2 size={20} className=' text-zinc-200'/>
            </div>
            </div>
            </div>
            }
            <input type="text" className='w-full bg-zinc-700 text-sm focus:text-base p-2 rounded-xl focus:outline-none' value={text} id="" placeholder='Enter your message here' onChange={(e)=>settext(e.target.value)} />
        </div>
        <button className={`rounded-full p-2 flex items-center justify-center ${text.trim() || imagefile ? 'bg-zinc-700 transition-all ease-in-out duration-500': 'bg-zinc-900 transition-all ease-in-out duration-500'}`} disabled={!text.trim() && !imagefile}>
        <IoMdSend size={24} className={`${text.trim() || imagefile ? 'text-zinc-200 transition-all ease-in-out duration-500' : 'text-zinc-800 transition-all ease-in-out duration-500'}`}/>
        </button>
    </form>
  )
}

export default MessageBar