import mongoose from "mongoose";

const userSchema = new mongoose.Schema({


    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    profilepic:{
        type:String,
        default:" "
    },

    isVerfied:{
        type:Boolean,
        default:false
    },

    otp:String,

    otpExpires: { type: Date }
    
},{timestamps:true})


const User = mongoose.model('User',userSchema)
export default User