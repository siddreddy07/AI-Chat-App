import express from 'express'
import dotenv from 'dotenv'
import { dbconnect } from './libs/Dbconnect.js'
import router from './routes/user.routes.js'
import airouter from './routes/aichat.routes.js'
import messagerouter from './routes/message.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import cleanupUnverifiedUser from './services/cleanup.js'
import { app,server } from './libs/socket.js'

dotenv.config()

const PORT = process.env.PORT || 6000

app.use(express.json())
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:4000",
    credentials:true
}))

app.use('/api/auth',router)
app.use('/api/messages',messagerouter)

app.use('/api/ai',airouter)

setInterval(cleanupUnverifiedUser,3*60*1000);

server.listen(PORT,()=>{
    console.log(`App Running on Port ${PORT}`)
    dbconnect()
})