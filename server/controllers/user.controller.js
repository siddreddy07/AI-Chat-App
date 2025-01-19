import moment from "moment/moment.js"
import { sendVerifyEmail } from "../middleware/Email.config.js"
import User from "../models/User.model.js"
import bcrypt from 'bcryptjs'
import cloudinary from "../libs/cloudinary.js"
import {generateToken} from '../libs/utils.js'


const register = async(req,res)=>{

    
    try {
        const {username,email,password,confirmpassword} = req.body

        if(!username || !email || !password){
            return res.status(400).json({success:false,message:"All Fields are required"})
        }

        if(password!=confirmpassword){
            return res.status(400).json({message:"Password and Confirm Password should Match"})
        }


        const Existinguser = await User.findOne({email})
        

        if(Existinguser){
            return res.status(400).json({success:false,message:"User Already Exists"})
        }

        const hashedpassword =  bcrypt.hashSync(password,10)
        const otp = Math.floor(100000 + Math.random()*900000).toString()
        const otpExpires = moment().add(2, 'minutes').toDate();
        const timeleft = moment().add(2, 'minutes').fromNow()


        const user = new User({
            username,
            email,
            password:hashedpassword,
            otp,
            otpExpires
        })

        
        

        await user.save()
        

        sendVerifyEmail(user.email,otp,timeleft)

        return res.status(200).json({success:true,message:"User Registered Successfully"})

    } catch (error) {
        console.log(error)
        return res.status(400).json({success:false,message:"Internal Server Error"})
    }

}


const login = async(req,res)=>{
    try {

        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({success:false,message:"All Fields are required"})
        }

        const Existinguser = await User.findOne({email})

        if(!Existinguser){
            return res.status(400).json({success:false,message:"No User Found"})
        }

        const isMatch = bcrypt.compareSync(password,Existinguser.password);

        if(!isMatch) return res.status(400).json({success:false,message:"Please Verify Credentials"})
        
            generateToken(Existinguser._id,res)
       
        return res.status(200).json({success:true,message:"Login Successful",Existinguser})
    } catch (error) {
        return res.status(400).json({success:false,message:"Internal Server Error"})
        
    }
}


const verifyEmail = async(req,res)=>{

    try {
        
        const {email,otp} = req.body

        const user = await User.findOne({email})

        if(!user) return res.status(400).json({success:false,message:"Please proivde valid email"})
        
        if(moment().isAfter(user.otpExpires)){
            await User.deleteOne({email})
            return res.status(400).json({message:"Otp Expired. Please try Register Again"})
        }

        if(otp!=user.otp){
            return res.status(402).json({message:"Invalid Otp"})
        }

        user.otp = undefined
        user.otpExpires = undefined
        user.isVerfied = true

        generateToken(user._id,res)
        
        await user.save()

        return res.status(200).json({success:true,message:"OTP verfied successfully. Registration Completed",user})

    } catch (error) {
        return res.status(400).json({message:"Try Again",error:error.message})
    }

}


const logout = (req,res)=>{

    console.log(res.cookie)
    try {
        res.cookie("token","",{
            httpOnly: true,              // Keep the cookie httpOnly for security (optional)
            sameSite: "Strict"  
        })
        res.status(200).json({message:"Logged Out Successfully!!"});
    } catch (error) {
        res.status(400).json({message:"Unable to Logout at the moment"})
    }
}

//api/auth/users?search="String"
const allusers = async(req,res)=>{

    const {search} = req.query
     ?{
        $or: [
            {username:{$regex: req.query.search,$options:"i"}},
            {email:{$regex: req.query.search,$options:"i"}},
        ],
     } 
     :{};

     const users = await User.find(search).find({_id:{$ne:req.user._id}}).select('-password')

     res.send(users);

}



const updateProfile = async(req,res)=>{

    try {

        const {profilepic} = req.body;
        const userId = req.user._id;

        if(!profilepic){
            return res.send(400).json({message:"Profile Pic is Required"})
        }

        const uploadres = await cloudinary.uploader.upload(profilepic)

        const updateduser = await User.findByIdAndUpdate(userId,{profilepic:uploadres.secure_url},{new:true});

        res.status(200).json(updateduser)


    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Internal Server Error"})
        
    }

}




const check = async(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(400).json({message:"Internal Server Error"})
    }
}



export { register,login,verifyEmail,logout,updateProfile,check,allusers}