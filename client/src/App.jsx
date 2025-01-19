import React, { useEffect } from 'react'
import HomePage from './pages/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/authStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useChatStore } from './store/useChatStore'


const App = () => {

  const {authUser,checkAuth,isCheckingAuth,onlineusers} = useAuthStore()
  

  const{getMessages} = useChatStore()
  console.log(onlineusers)

  useEffect(() => {
    checkAuth();

  }, [checkAuth,getMessages]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center bg-zinc-900 justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <div className='text-2xl bg-zinc-800 w-full overflow-hidden h-[700px] sm:h-screen sm:p-4'>
      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to={'/login'}/>}/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to={'/'}/>}/>
        <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to={'/'}/>}/>
        <Route path='/settings' element={authUser?<SettingsPage/>:<Navigate to={'/login'}/>}/>
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to={'/login'}/>}/>

      </Routes>
      <Toaster/>
    </div>
  )
}

export default App