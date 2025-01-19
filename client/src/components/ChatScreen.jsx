import React, { useEffect, useRef, useState } from 'react'
import { FaVideo } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import MessageBar from './MessageBar';
import { useAuthStore } from '../store/authStore';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { useChatStore } from '../store/useChatStore';
import { IoImageOutline } from "react-icons/io5";



const ChatScreen = () => {

  const {selecteduser,messages,getMessages,subscribeToMessages,unsubscribeFromMessages} = useChatStore()
  const [isloading,setisloading] = useState(true)
  const {authUser,onlineusers} = useAuthStore() 


  const messageEndRef = useRef(null)

  const filteredusers = onlineusers.filter(userId => userId != authUser?._id)


  const handlevideoChat = ()=>{

    const user = onlineusers.includes(selecteduser._id)
    console.log(user)

    if(user){
      console.log("Video Chat With Online User ",user)
    }

    console.log(selecteduser._id,"User Not online")

  }



  useEffect(()=>{
    setisloading(false)
    getMessages(selecteduser?._id)
    subscribeToMessages()
    return ()=> unsubscribeFromMessages();
  },[selecteduser?._id,getMessages,subscribeToMessages,unsubscribeFromMessages])


  useEffect(() => {
    if(messages && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  

 const handleLogout = async()=>{
    const res = await axiosInstance.get('/auth/logout')

    try {

        toast.success('Logged Out')
        navigate('/login'); 

    } catch (error) {
        console.log(error)
        toast.error("Try After some time")
    }
 }


  return (
    <div className="w-full flex flex-col h-full">
    
    <header className="h-20 flex items-center font-semibold p-2 text-zinc-300 bg-zinc-900 bg-opacity-20 w-full">

    <div className='w-full p-2 h-20 flex justify-between gap-2 items-center'>

        <span className='img rounded-full w-16 border h-14 overflow-hidden cursor-pointer'>
            <img src={selecteduser?.profilepic || "../../public/dp.jpg"} alt="profile" className='object-cover hover:scale-110 transition-all ease-in-out duration-500'/>
        </span>


        <div className='flex px-2 text-zinc-200 w-full text-sm gap-0 flex-col'>
            <div className='flex items-center justify-between'>
                <p className='font-semibold'>{selecteduser?.username}</p>
                <div className='flex items-center gap-6 justify-between'>
                <div className="relative rounded-full cursor-pointer inline-block group">
  
<FaVideo className='text-zinc-200 font-bold' size={20} onClick={handlevideoChat}/>
  

  
</div>
        

        <MdLogout className='cursor-pointer text-zinc-200' size={20} onClick={handleLogout}/>



                </div>
            </div>
            <div className='w-full'>
                <p className='text-zinc-300 font-normal line-clamp-1'>{filteredusers.includes(selecteduser?._id) ? 'Online' : ''}</p>
            </div>
        </div>

    </div>

    </header>



    <div className="bg-zinc-800 h-full py-4, w-full px-4 overflow-y-scroll">
          

       {messages.map((msg)=>(
        <div key={msg._id} className={`chat ${msg?.sendersId === authUser?._id ? 'chat-start' : 'chat-end'}`} ref={messageEndRef}>

          <div className='chat-image'>
            <div className='size-10 rounded-full border overflow-hidden flex items-center justify-center'>
              <img src={`${msg?.sendersId === authUser?._id ? authUser?.profilepic || '../../public/dp.jpg' : selecteduser?.profilepic || '../../public/dp.jpg'}`} alt="" />
            </div>
          </div>

          <div className='chat-header mb-1'>
            <time className='text-xs opacity-50 ml-1'>{msg?.createdAt}</time>
          </div>

          <div className={`chat-bubble bg-zinc-900 flex flex-col p-2 items-center overflow-hidden justify-center`}>
            {msg.image && (
              <div className='xl:w-80 xl:h-80 md:w-64 md:h-52 flex items-center overflow-hidden rounded-xl'>
                <img src={msg?.image} className='hover:scale-150 object-cover transition-all ease-in-out duration-500 cursor-grab rounded-lg mb-2' alt="" />
              </div>
            )}
            {msg.text && <p className='text-sm text-start'>{msg?.text}</p>}
          </div>

        </div>
       ))
       }

    </div>


    <footer className="h-20 px-4 flex items-center justify-center gap-2 font-semibold p-2 text-zinc-300 bg-zinc-900 bg-opacity-20 w-full">

    
    <MessageBar/>

    </footer>
    


</div>

  )
}

export default ChatScreen