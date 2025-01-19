import React, { useEffect, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import Searchbar from './Searchbar';
import ChatMember from './ChatMember';
import { useAuthStore } from '../store/authStore';
import { IoAdd } from "react-icons/io5";
<IoAdd />
import { usesetstore } from '@/store/selectionStore';





const ChatsMenu = () => {

  const [activeSpan, setActiveSpan] = useState('All');
  const [clickedSpanName, setClickedSpanName] = useState('All');
  const [clicked,setclicked] = useState(false)

  const {checkAuth,authUser} = useAuthStore()

  
    const setmenudata = usesetstore((state)=>state.setmenudata)
    const {menudata} = usesetstore()
    console.log(menudata)

  const [usersid,setusersid] = useState()

  const { data } = usesetstore()


  // const handleclick = async(sid)=>{
  //   setclicked(true)
  //   getmessages(sid)
  // }

  // useEffect(()=>{
  //   setclicked(false)
  //   if(!clicked){
  //     getmessages('')
  //   }
  // },[clicked])



  return (
    <div className='flex flex-col h-full w-full md:w-1/2 xl:w-1/3'>

      {
         (data == '' || data == 'Chat') && 
        <div>
        <div className='px-4 w-full flex flex-col gap-2 border-b-2 border-transparent shadow-xl items-center justify-between'>
          <div className='w-full flex items-center justify-between'>
            <p className='font-semibold text-zinc-200'>{data == '' || data =='chat' ? 'Chat' : data}</p>

                <div className="relative rounded-full py-2 cursor-pointer inline-block group">
                      {/* The element to hover over */}
                      
                      <IoIosAdd className='text-zinc-200 font-bold' size={32}/>
                      
                
                      {/* Popover */}
                      <div className="absolute hidden sm:block left-full top-1/2 py-1 transform -translate-y-1/2 ml-2 text-center text-sm bg-transparent bg-zinc-500 text-zinc-300 px-2 font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10 pointer-events-none group-hover:pointer-events-auto whitespace-nowrap">
                        New Chat
                      </div>
                    </div>
          </div>
          <Searchbar/>
          <div className='flex justify-start w-full mb-2 gap-2'>
          <span className={`${
          clickedSpanName === 'All' ? 'bg-blue-900 text-zinc-200' : 'bg-gray-200 text-gray-800'
        } cursor-pointer text-xs font-medium me-2 px-3 py-1 rounded-xl transition-all duration-200 dark:${clickedSpanName === 'All' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300'}`} onClick={(e)=>handleclick('All',e)}>All</span>
          <span className={`${
          clickedSpanName === 'Unread' ? 'bg-blue-900 text-zinc-200' : 'bg-gray-200 text-gray-800'
        } cursor-pointer text-xs font-medium me-2 px-3 py-1 rounded-xl transition-all duration-200 dark:${clickedSpanName === 'Unread' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300'}`} onClick={(e)=>handleclick('Unread',e)}>Unread</span>
          <span className={`${
          clickedSpanName === 'Groups' ? 'bg-blue-900 zinc-200' : 'bg-gray-200 text-gray-800'
        } cursor-pointer text-xs font-medium me-2 px-3 py-1 rounded-xl transition-all duration-200 dark:${clickedSpanName === 'Groups' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300'}`} onClick={(e)=>handleclick('Groups',e)}>Groups</span>
          </div>
        </div>

        <div className='chat-member w-full overflow-y-auto scrollbar-color:none h-full'>
        <ChatMember/>
        </div>
        </div>
      }

      {
        data == 'Ai Chat' && 
        <div className='w-full h-full flex flex-col gap-4 p-2'>
          <div className='flex  items-center justify-center'>
          <h1 className='text-2xl'>Ai Powered Tools</h1>
          
          </div>
          
          <div  className={`bg-zinc-900 border-2 ${menudata =='chatbot' || '' ? 'border-zinc-300 hover:font-semibold font-semibold' : 'border-zinc-800'} cursor-pointer rounded-xl p-2 w-full h-22 shadow-xl`} onClick={()=>setmenudata('chatbot')}>
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-xl line-clamp-1 text-zinc-300">Ai Chat Bot</h2>
    <p className='text-sm line-clamp-2'>Enhanced Chat bot</p>
  </div>
</div>

          <div  className={`bg-zinc-900 border-2 ${menudata =='image' ? 'border-zinc-300 hover:font-semibold font-semibold' : 'border-zinc-800'} cursor-pointer rounded-xl p-2 w-full h-22 shadow-xl`} onClick={()=>setmenudata('image')}>
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-xl line-clamp-1 text-zinc-300">Ai Image Generator</h2>
    <p className='text-sm line-clamp-2'>Generate images From text</p>
  </div>
</div>

          <div  className={`bg-zinc-900 border-2 ${menudata =='runaway' ? 'border-zinc-300 hover:font-semibold font-semibold' : 'border-zinc-800'} cursor-pointer rounded-xl p-2 w-full h-22 shadow-xl`} onClick={()=>setmenudata('runaway')}>
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-xl line-clamp-1 text-zinc-300">Ai Chat Bot</h2>
    <p className='text-sm line-clamp-2'>Enhanced Chat bot</p>
  </div>
</div>
           
        </div>
      }
      

      

        
    </div>
  )
}

export default ChatsMenu