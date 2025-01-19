import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL= 'http://localhost:5000'

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSignIn:false,
    isLoginIn:false,
    isUpdatingProfile:false,
    socket:null,
    onlineusers:[],

    isCheckingAuth:true,

    checkAuth: async()=>{

            try {
                
                const res = await axiosInstance.get('/auth/check')
                set({authUser:res.data});
                get().connectSocket()

            } catch (error) {
                set({authUser:null});
                console.log("error in auth Store",error)
            } finally{
                set({isCheckingAuth:false})
            }

    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
          get().connectSocket()
    
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },


    logout: async()=>{
        try {
            await axiosInstance.get("/auth/logout")
            set({authUser:null});
            toast.success("Logged Out")
            get().disconnectSocket()
        } catch (error) {
            console.log(error)
        }
    },

    connectSocket:()=>{
      const {authUser} = get()
      if(!authUser || get().socket?.connected) return;
      const socket = io(BASE_URL,
        {
          query : {
          userId:authUser._id
        }
      }
      )
      socket.connect()
      
      socket.on("getOnlineUsers",(userId)=>{
        set({onlineusers:userId})
      })

      set({socket:socket})

    },
    disconnectSocket :()=>{
      if(get().socket?.connected) get().socket.disconnect()
    }


    

}))