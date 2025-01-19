import express from 'express'
import {register,login, verifyEmail, logout, check, updateProfile, allusers} from '../controllers/user.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router()


router.post('/register',register);
router.post('/login',login);
router.post('/verify-email',verifyEmail)
router.get('/logout',logout)

router.put('/update-profile',protectRoute,updateProfile)
router.get('/check',protectRoute,check)
router.get('/users',protectRoute,allusers)



export default router
