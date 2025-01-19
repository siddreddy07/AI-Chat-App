import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'
import Bot from '../Bot.json'
import { axiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import { MdContentCopy } from "react-icons/md";
import { usesetstore } from '@/store/selectionStore'
import Imagebotscreen from './Imagebotscreen'


const Chatbotscreen = () => {

  const [usermessage,setusermessage] = useState('')
  const [clicked,setclicked] = useState(false)
  const [questions,setquestion] = useState([])
  const [chatData, setChatData] = useState([])

  const {menudata} = usesetstore()



  const sendMessage = async(msg)=>{
    if(!msg || msg.length<1) return toast.error('Empty String Not Allowed', {
      icon: '😒',
      padding:'12px',
      className:'text-base',
      style: {
        background: '#333',
        color: '#fff',
      },

    })
      
    questions.push(msg)
      try {
        
        const res = await axiosInstance.post('/ai/chat',{
            msg
          })
        const {data} = res
        
        setChatData(prevData=>[
          ...prevData,
          {question:msg,response:data}
        ])
        
        
      } catch (error) {
        console.log(error)
      }
      
  }

  // console.log(usermessage)
  const handleForm = (e)=>{
    e.preventDefault()
    sendMessage(usermessage)
    setusermessage('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        toast.success("Copied to clipboard!",{
          padding:'12px',
          className:'text-base',
          style: {
            background: '#333',
            color: '#fff',
          },
    
        });
    }).catch((err) => {
        console.error("Failed to copy text: ", err);
    });
};


  useEffect(()=>{
    setclicked(false)
  },[])
  
  
  console.log(chatData)

  return (
    <div className='w-full flex flex-col items-center justify-center h-full'>
{(menudata == 'chatbot' || menudata == '') && 

    <div className='w-full flex flex-col items-center justify-center h-full'>
       {chatData.length===0 && 
      <div className='w-1/2 h-64 flex flex-col items-center'>
      <Lottie className='w-64 h-64' loop={true} animationData = {Bot}/>
      </div>
       }
      
  {
    chatData.length>0 && <div className='w-full sm:p-2 xl:px-8 xl:py-4 scroll-smooth overflow-y-scroll h-full gap-2 flex flex-col'>
      {
        chatData.map((chat,index)=>(
        <div key={index}>
      
            
              <div className="chat chat-start">
                <div className="chat-bubble text-sm px-2 lg:text-xl overflow-auto xl:text-[18px]">
                  {chat.question}  
        </div>
              </div>
           
      
            
              <div className="chat px-2 chat-end ">
              <div className="chat-bubble relative text-base overflow-x-auto overflow-y-hidden lg:text-base px-2 py-2 xl:px-6 xl:py-4 xl:text-[18px]"><Markdown>{chat.response}</Markdown> <button
                                    onClick={() => copyToClipboard(chat.response)}
                                    className=" right-0 absolute -bottom-2 xl:-bottom-1 p-1 text-[12px] xl:text-sm text-zinc-400 rounded"
                                >
                                    <div className='flex items-center gap-1 xl:gap-2'><MdContentCopy/>Copy</div>
                                </button></div>
            </div>
            
          
        </div>
        )) 
        
        }
    </div>
}


      <form onSubmit={handleForm} className='flex w-full items-center justify-center gap-2'>
        <input type="text" name="" value={usermessage} id="" placeholder='Enter text messages' onChange={(e)=>setusermessage(e.target.value)} className='bg-zinc-800 focus:outline-none text-base w-96 rounded-xl p-3 '/>
        <button className='whitespace-nowrap text-xl rounded-full px-4 py-2 bg-zinc-800' onClick={()=>setclicked(true)}>Ai</button>
      </form>

    </div>
}

{
  menudata == 'image' && 
  <div className='w-full h-full'>
      <Imagebotscreen/>
  </div>
}
      


    </div>
  )
}

export default Chatbotscreen