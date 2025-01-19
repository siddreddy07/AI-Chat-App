import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";



const Searchbar = () => {


    const [isFocused, setIsFocused] = useState(true);


  const handleFocus = () => setIsFocused(false);
  const handleBlur = () => setIsFocused(true);

  return (
    <div className='flex w-full h-full rounded-lg bg-zinc-800 items-center justify-between px-2 gap-2 text-base'>
        {
            isFocused ? <IoSearchOutline size={20} className='text-zinc-200 transition-all duration-500 ease-in-out'/> : <IoMdArrowBack size={20} className='text-zinc-200 transition-all duration-500 ease-linear'/>
        }
        
        <input type="text" name="" id="" onFocus={handleFocus}
          onBlur={handleBlur} className='w-full h-full text-zinc-200 focus:shadow border-none focus:outline-none shadow-sm bg-zinc-800 rounded-lg p-2 text-base' placeholder='Search'/>
    </div>
  )
}

export default Searchbar