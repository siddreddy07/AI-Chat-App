import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./authStore";


export const useChatStore = create((set,get)=>({


    messages:[],
    users:[],
    selecteduser:null,


    getUsers: async()=>{
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users:res.data});
        } catch (error) {
            console.log(error)
        }
    },

    getMessages: async(id)=>{
        try {
            const res = await axiosInstance.get(`/messages/${id}`)
            set({messages:res.data})
        } catch (error) {
            console.log(error)
        }
    },

    sendMessage : async(messagedata)=>{
        const {selecteduser,messages} = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selecteduser._id}`,messagedata);
            set({messages:[...messages,res.data]})
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    },

    setselecteduser : (selecteduser) => set({selecteduser}),


    subscribeToMessages :()=>{

        const {selecteduser} = get()
        if(!selecteduser) return;

        const socket = useAuthStore.getState().socket

        socket.on("newMessage",(newMessage)=>{
            if(newMessage.sendersId !== selecteduser._id) return
            set({
                messages: [...get().messages,newMessage]
            })
        })

    },

    unsubscribeFromMessages : ()=>{
        const socket = useAuthStore.getState().socket
        socket.off()
    }

}))