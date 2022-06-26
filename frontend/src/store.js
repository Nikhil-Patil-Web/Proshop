import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer} from './reducers/productReducer.js'
import { cartReducer } from './reducers/cartRdeucer.js'
import {userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userListReducer} from './reducers/userReducers.js'
import {orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer} from './reducers/orderReducers'
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')):null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
JSON.parse(localStorage.getItem('shippingAddress')):{}



const initialState = {
    cart: { cartItems: cartItemsFromStorage, 
            shippingAddress: shippingAddressFromStorage,
          },
    userLogin: {userInfo: userInfoFromStorage},
}
const middleware=[thunk]
const store= createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store