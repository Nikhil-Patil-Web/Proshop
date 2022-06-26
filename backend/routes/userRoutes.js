import express from 'express'
import {authUser,
        registerUser, 
        getUserprofile, 
        updateUserprofile,
        getUsers
    } from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
const router = express.Router()


router.route('/')
      .post(registerUser)
      .get(protect, admin, getUsers)
router.route('/login')
      .post(authUser)
router.route('/profile')
      .get(protect, getUserprofile)
      .put(protect, updateUserprofile)


     

export default router