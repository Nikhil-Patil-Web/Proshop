import express from 'express'
import {authUser, registerUser, getUserprofile} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserprofile)
router.route('/').post(registerUser)

export default router