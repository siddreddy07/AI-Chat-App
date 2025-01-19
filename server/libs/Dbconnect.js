import mongoose from "mongoose";

export const dbconnect = async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Db Connected Successfully !!")
    } catch (error) {
        console.log("Unable to Connect to Db",error)
    }
}