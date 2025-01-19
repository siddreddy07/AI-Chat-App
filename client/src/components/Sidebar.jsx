import React from 'react'
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";
import { GiRoundTable } from "react-icons/gi";
import { PiMetaLogoBold } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { useAuthStore } from '../store/authStore';

import { usesetstore } from '../store/selectionStore';
import { useChatStore } from '../store/useChatStore';




const Sidebar = () => {

  const {logout} = useAuthStore()



  const setData = usesetstore((state)=>state.setData)
  const {getMessages} = useChatStore()

  const handlelogout = ()=>{
    setData('')
    logout() 
  }
  

  return (
    <div className='h-full flex flex-col border-r-2 sm:px-2 px-0 border-zinc-800 justify-between'>

        <div className='flex items-center py-4 flex-col gap-2 h-1/2'>


        <div className="relative rounded-full p-2 inline-block group">
      {/* The element to hover over */}
      
      <BsFillChatLeftTextFill className='text-zinc-200 font-bold' size={18} onClick={()=>setData('Chat')}/>
      

      {/* Popover */}
      <div className="absolute left-full top-1/2 py-1 transform -translate-y-1/2 ml-2 text-center text-sm bg-zinc-100 text-black px-2 font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10 pointer-events-none group-hover:pointer-events-auto">
        Chats
      </div>
    </div>

    <div className="relative rounded-full p-2 inline-block group">
      {/* The element to hover over */}
      
      <MdGroups2 className='text-zinc-200 font-bold' size={20} onClick={()=>setData('Collaborations')}/>
      

      {/* Popover */}
      <div className="absolute left-full top-1/2 py-1 transform -translate-y-1/2 ml-2 text-center text-sm bg-zinc-100 text-black px-2 font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10 pointer-events-none group-hover:pointer-events-auto">
        Collaborations
      </div>
    </div>

          
             <div className="relative rounded-full p-2 inline-block group">
      {/* The element to hover over */}
      
      <PiMetaLogoBold className='text-zinc-200 font-bold' size={20} onClick={()=>setData('Ai Chat')}/>
      

      {/* Popover */}
      <div className="absolute left-full top-1/2 py-1 transform -translate-y-1/2 ml-2 text-center text-sm bg-zinc-100 text-black px-2 font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10 pointer-events-none whitespace-nowrap group-hover:pointer-events-auto">
        Ai Chat
      </div >
    </div>
        </div>



        <div className='flex items-center py-4 flex-col gap-2'>
            
           
        <div className="relative rounded-full p-2 inline-block group">
      {/* The element to hover over */}
      
      <RxAvatar className='text-zinc-200 font-bold' size={24} onClick={()=>setData('Profile')}/>
      

      {/* Popover */}
      <div className="absolute left-full top-1/2 py-1 transform -translate-y-1/2 ml-2 text-center text-sm bg-zinc-100 text-black px-2 font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10 pointer-events-none group-hover:pointer-events-auto">
        Profile
      </div>
    </div>
        <div className="relative  rounded-full p-2 inline-block group">
      {/* The element to hover over */}
      
      <MdLogout className='text-zinc-200 hover:text-red-600 font-bold' size={24} onClick={handlelogout}/>
      

      {/* Popover */}
      <div className="absolute left-full rounded-xl top-1/2 py-1 transform -translate-y-1/2 ml-2 text-sm bg-zinc-100 text-black px-2 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10 pointer-events-none group-hover:pointer-events-auto">
        Logout
      </div>
    </div>


        </div>

    </div>
  )
}

export default Sidebar