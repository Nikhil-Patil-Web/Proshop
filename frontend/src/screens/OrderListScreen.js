import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {listOrders} from '../actions/orderActions.js'

const OrderListScreen = ({history}) => {
    
    const dispatch =useDispatch()


    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect (() =>{
        if(userInfo&&userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            history.push('/login')
        }
    },[])

  return (
    <>
      <h1>ORDERS</h1>
      {loading?<Loader></Loader>:error?<Message variant='danger'>{error}</Message>:(
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>TOTAL PRICE</th>
                    <th>IS PAID?</th>
                    <th>IS DELIVERED?</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders?.data?.map(order =>(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user&& order.user.name}</td>
                        <td>${order.totalPrice}</td>
                        <td>{order.isPaid?(order.paidAt.substring(0,10)):
                        (<i className='fas fa-times' style={{color: 'red'}}></i>) }
                        </td>

                        <td>{order.isDelivered?(order.deliveredAt.substring(0,10)):
                        (<i className='fas fa-times' style={{color: 'red'}}></i>) }
                        </td>

                        <td>
                            <LinkContainer to={`/orders/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                    DETAILS
                                </Button>
                            </LinkContainer>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
