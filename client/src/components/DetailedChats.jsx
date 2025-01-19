import React, { useEffect, useState } from 'react'
import Chat from '../Chat.json'
import Lottie from 'lottie-react'
import { FaShareSquare } from "react-icons/fa";
import ChatScreen from './ChatScreen';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import { usesetstore } from '../store/selectionStore';
import Chatbotscreen from '@/screens/Chatbotscreen';
import { useChatStore } from '@/store/useChatStore';



const DetailedChats = () => {


const { data } = usesetstore()

const {selecteduser} = useChatStore()


  
  return (
    <div className='w-full hidden sm:block h-full overflow-hidden bg-zinc-900 bg-opacity-80 rounded-xl'>
        {
          data =='' &&
        <div className='hidden sm:flex w-full h-full mb-10 flex-col items-center justify-center'>
            <Lottie className='w-64 h-64' loop={true} animationData= {Chat}/>
            <p className='font-semibold text-zinc-200'>Texting Like Never Before</p>
            <p className='font-semibold text-zinc-200'>AI</p>
            <button className='font-semibold flex items-center justify-center gap-2 text-base mt-2 text-zinc-200 bg-zinc-800 py-2 px-4 rounded-xl'>Share with your Friends <FaShareSquare /></button>
        </div>

        }

        {
          data == 'Chat' && selecteduser &&
          <div className='w-full h-full'>
            <ChatScreen/>
          </div>
        }


        {
          data == 'Ai Chat' && 
          <div className='w-full h-full'>
              <Chatbotscreen/>
          </div>
        }

        {
        data =='Profile' && <div className='w-full h-full'>
          <ProfilePage/>
        </div>
        }

        {data == 'Setting' && <div className='w-full h-full'>
          <SettingsPage/>
          </div>}
        
    </div>
  )
}

export default DetailedChats