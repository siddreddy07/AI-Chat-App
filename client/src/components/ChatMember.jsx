import { useAuthStore } from '../store/authStore'
import { usesetstore } from '../store/selectionStore'
import { useChatStore } from '../store/useChatStore'
import React, { useEffect, useState } from 'react'

const ChatMember = () => {

    const [clicked,setclicked] = useState(false)

    const { users,getUsers,getMessages,messages } = useChatStore()
    const {selecteduser} = useChatStore()

    const {onlineusers} = useAuthStore()
    

    // console.log(users)
       const setData = usesetstore((state)=>state.setData)
      const setselecteduser = useChatStore((state)=>state.setselecteduser)

    const handleclick = (user,value)=>{
            setclicked(true)

        setData(value)
        setselecteduser(user)
        
    }

    const mostRecentMessage = messages.reduce((latest, current) => {
        const latestDate = new Date(latest.updatedAt || latest.createdAt);
        const currentDate = new Date(current.updatedAt || current.createdAt);
    
        // Return the more recent message
        return currentDate > latestDate ? current : latest;
      }, messages[0]);
    
    useEffect(()=>{
        getUsers()
        getMessages(selecteduser?._id)
    },[getUsers,selecteduser])
      

  return (
    <div>
        {users.map((user,id)=>(
    <div key={id} className={`cursor-pointer hover:bg-zinc-900 bg-opacity-90 ${clicked?'bg-zinc-800':''}`} onClick={()=>handleclick(user,'Chat')}>
    <div className='w-full p-2 h-20 flex justify-evenly items-center'>


        <span className='rounded-full overflow-hidden w-20 flex items-center justify-center h-16 cursor-pointer border'>
            <img src={user?.profilepic || '../../public/dp.jpg'} alt="profile" className='object-cover hover:scale-110 transition-all ease-in-out duration-500'/>
        </span>
                 
            

        <div className='flex px-4 text-zinc-200 w-full text-sm gap-2 flex-col'>
            <div className='flex gap-2 items-center justify-between'>
                <p className='font-semibold'>{user?.username}</p>
                <p className='text-zinc-300'>{onlineusers.includes(user._id) ? 'online' : ''}</p>
            </div>
            <div className='w-full'>
                <p className='text-zinc-300 line-clamp-1'>{mostRecentMessage?.image ? "Sent a photo" : mostRecentMessage?.text}</p>
            </div>
        </div>

    </div>
    <hr className="mr-2 ml-2 h-px border-0 bg-zinc-700"/>
    </div>
        ))}
    </div>
  )
}

export default ChatMember