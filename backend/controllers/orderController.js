import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create a new order
// @route POST api/orders
// @acess Private

const addOrderItems = asyncHandler(async(req, res)=>{
    const { orderItems,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        } = req.body

    if(orderItems&&orderItems.length===0){
        res.status(400)
        throw new Error ('No order items')
        return
    }
    else{
        const order= new Order({
            orderItems,
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
})


// @desc Get a specific order by ID
// @route GET api/orders/:id
// @acess Private


const getOrderById = asyncHandler(async(req, res)=>{
const order = await Order.findById(req.params.id).populate('user', 'name email')
if(order){
    res.json(order)
}
else{
    res.status(404)
    throw new Error('Item not found')
}
})


// @desc Updates the isPaid option to Paid
// @route GET api/orders/:id/pay
// @acess Private


const updateOrderToPaid = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid =true;
        order.paidAt =Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    
    else{
        res.status(404)
        throw new Error('Item not found')
    }
    })
    


// @desc get the logged in user's orders
// @route GET /api/orders/myorders
// @acess Private


const getMyOrders = asyncHandler(async(req, res)=>{
    const order = await Order.find({user: req.user._id})
    res.json(order);
})
    

// @desc get the all orders for the admin
// @route GET /api/orders/
// @acess Private, Admin


const getOrders = asyncHandler(async(req, res)=>{
    const order = await Order.find().populate('user','id name')
    res.json(order);
})



export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders};