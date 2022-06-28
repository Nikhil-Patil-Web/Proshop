import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails,payOrder, deliverOrder} from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'


const OrderScreen = ({match, history}) => {
  
    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] =useState(false)


    const orderDetails = useSelector((state)=>state.orderDetails)
    const {order, loading, error} = orderDetails

    const orderPay = useSelector((state)=>state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay

    const orderDeliver = useSelector((state)=>state.orderDeliver)
    const {loading:loadingDeliver, success:successDeliver} = orderDeliver

    const userLogin = useSelector((state)=>state.userLogin)
    const {userInfo} = userLogin

    if(!loading){
        const addDecimals = (num) =>{
            return (Math.round(num*100)/100).toFixed(2)
        }
    
        order.data.itemsPrice=addDecimals(order.data.orderItems.reduce((acc,item) =>acc+item.price*item.qty,0))
    }

    useEffect(()=>{

              if(!userInfo){
                history.push('/login')
              }
            const addPayPalScript = async () =>{
                const {data: clientId}= await axios.get('/api/config/paypal')
                const script = document.createElement('script')
                script.type='text/javascript'
                script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async=true
                script.onload = () =>{
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }
            if(!order||successPay||successDeliver){
              dispatch({type:ORDER_PAY_RESET})
              dispatch({type:ORDER_DELIVER_RESET})
              dispatch(getOrderDetails(orderId))
            }else if(!order.isPaid){
              if(!window.paypal){
                addPayPalScript();
              }else{
                setSdkReady(true)
              }
            }

    },[dispatch,orderId,successPay, order,successDeliver ])

    const successPaymentHandler=(paymentResult)=>{
      console.log(paymentResult);
      dispatch(payOrder(orderId, paymentResult))

    }

    const deliverHandler =()=>{
      dispatch(deliverOrder(order))
    }

  return loading ?<Loader></Loader>: error ? <Message variant='danger'>{error}</Message>:
  <>
  <h1>Order: {order.data._id}</h1>

  <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>{order.data.user.name}
              </p>
              <p>
                <strong>Email:</strong>
              <a href={`mailto:${order.data.user.email}`}>{order.data.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.data.shippingAddress.address}, {order.data.shippingAddress.city}{' '}
                {order.data.shippingAddress.postalCode},{' '}
                {order.data.shippingAddress.country}
              </p>
              {order.data.isDelivered?<Message variant='success'>Delivered on: {order.data.deliveredAt}</Message>:
              <Message variant='danger'>Is Not Delivered</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
              <strong>Method: </strong>
              {order.data.paymentMethod}
              </p>
              {order.data.isPaid?<Message variant='success'>Paid on: {order.data.paidAt}</Message>:
              <Message variant='danger'>Not Paid</Message>}

            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.data.orderItems.length === 0 ? (
                <Message>No order</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.data.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.data.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.data.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.data.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.data.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

                {!order.data.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader></Loader>}
                    {!sdkReady?<Loader></Loader>:
                    <PayPalButton amount={order.data.totalPrice} 
                    onSuccess={successPaymentHandler}></PayPalButton>}
                  </ListGroup.Item>
                )}
                {loadingDeliver &&<Loader></Loader> }
                {userInfo.isAdmin&&order.data.isPaid&&!order.data.isDelivered&&(
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block'
                   onClick={deliverHandler}>
                    Mark As Delivered
                   </Button>
                </ListGroup.Item>
                )}
                


            </ListGroup>
        </Card>
    </Col>
    </Row>      

  </>
  
}

export default OrderScreen
