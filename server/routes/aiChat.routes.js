import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import sendChat from '../controllers/aiBot.controller.js'

const router = express.Router()

router.post('/chat',sendChat)




export default router