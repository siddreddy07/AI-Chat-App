import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';




export const protectRoute = async(req,res,next)=>{

    try {
        
        const {token} = req.cookies

        if(!token) return res.status(401).json({message:"Unauthorized - No Access Provided"})

        const decode = jwt.verify(token,process.env.JWT_SECRET)
        
        if(!decode) return res.status(401).json({message:"Invalid User - Invalid Token Access"})


        const user = await User.findById(decode.userId).select("-password");

        if(!user) {
            return res.status(404).json({message:"User not Found"})
        }

        req.user = user;
        next();
            


    } catch (error) {
        
    }

}