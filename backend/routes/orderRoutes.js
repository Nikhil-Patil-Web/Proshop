import express from 'express'
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, getOrders} from '../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
const router = express.Router()


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').put(updateOrderToPaid)


export default router