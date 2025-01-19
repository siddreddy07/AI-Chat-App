import Message from "../models/Message.model.js";
import User from "../models/User.model.js"
import cloudinary from '../libs/cloudinary.js'
import { getRecieverSocketId, io } from "../libs/socket.js";

const getusers = async(req,res) =>{

    try {

        const userID = req.user._id

        const filteredusers = await User.find({_id:{$ne:userID}}).select('-password');
        res.status(200).json(filteredusers)

    } catch (error) {
        console.log("Unable to find Users")
        res.status(400).json({message:"Internal Server Error"})
    }

}

const getmessage = async(req,res)=>{

    try {
        const {id} = req.params
        const myId = req.user._id


        const messages = await Message.find({
            $or:[
                {sendersId:id,recieversId:myId},
                {sendersId:myId,recieversId:id}
            ]
        })
        res.status(200).json(messages)

    } catch (error) {
        console.log("Error:",error.message)
        res.status(400).json({error:"Internal Server Error"})
    }

}

const sendmessage = async(req,res)=>{

    try {
        
        const {id} = req.params
        console.log("Inside Send Message",id)
        const myId = req.user._id
        const{text,image} = req.body

        let imageUrl=''



        if(image){
        
            const uploadres = await cloudinary.uploader.upload(image)
            imageUrl = uploadres.secure_url;
            // console.log(uploadres)
            
        }

        
    
        const newMessage = new Message({
            sendersId:myId,
            recieversId:id,
            text:text || '',
            image:imageUrl
        })
    
        await newMessage.save();

        const recieverSocketId = getRecieverSocketId(id)

        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
            console.log(recieverSocketId)
        }
    
    
        res.status(201).json(newMessage)


    } catch (error) {
        console.log("Error:",error.message)
        res.status(400).json({error:"Internal Server Error"})
    }



}


export {getusers,getmessage,sendmessage}