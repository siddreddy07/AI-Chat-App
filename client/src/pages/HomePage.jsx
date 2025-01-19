import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import DetailedChats from '../components/DetailedChats'
import ChatsMenu from '../components/ChatsMenu'

const HomePage = () => {


  return (
    <div className='w-full h-full p-2 bg-black bg-opacity-50 flex rounded-xl'>
        <Sidebar/>
        <ChatsMenu/>
        <DetailedChats/>
    </div>
  )
}

export default HomePage