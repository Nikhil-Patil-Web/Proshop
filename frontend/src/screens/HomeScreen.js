import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Helmet} from 'react-helmet'
import Product from '../components/Product.js'
import Loader from '../components/Loader.js'
import Paginate from '../components/Paginate.js'
import Message from '../components/Message.js'
import { Link } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel.js'
import {Row, Col} from 'react-bootstrap'
import {listProducts} from '../actions/productActions.js'

const HomeScreen = ({match}) => {

  const keyword= match.params.keyword
  const pageNumber = match.params.pageNumber || 1

const dispatch =useDispatch();

const productList = useSelector(state =>state.productList)
const { loading, error, products, page, pages } = productList


  useEffect(()=>{
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
    <Helmet>
      <title>Welcome to Proshop | Home</title>
      <meta name='description' content='We sell the best products for cheap prices'/>
      <meta name='keywords' content='electronics, buy electronics, cheap electronics'/>

    </Helmet>
     {!keyword ? (<ProductCarousel></ProductCarousel>):(
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>)}
      <h1> Latest Products </h1>
      {loading ? <Loader></Loader>:error?<Message variant='danger'>{error}</Message>: (
        <>
        <Row>
        {products.map((product) =>(
            <Col key={product._id} sm = {12} md={6} lg={4} xl={3}>
               <Product product = {product}/>
            </Col>
        ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword: ''}>

      </Paginate>
      </>
      )}
    </>
  )
}

export default HomeScreen
