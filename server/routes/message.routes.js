import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { getmessage, getusers, sendmessage } from '../controllers/messages.controller.js'
const router = express.Router()


router.get("/users",protectRoute,getusers)
router.get("/:id",protectRoute,getmessage)
router.post("/send/:id",protectRoute,sendmessage)


export default router