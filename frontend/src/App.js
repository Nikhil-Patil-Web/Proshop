import Header from './components/Header'
import {BrowserRouter as Router, Route} from 'react-router-dom' 
import {Container}  from 'react-bootstrap'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'

const App = () => {
  return (
    <Router>
    <Header />
    <main className='py-3'>
      <Container>
        <Route path ='/shipping' component={ShippingScreen}/>
        <Route path='/login' component={LoginScreen}/>
        <Route path='/products/:id' component={ProductScreen}/>
        <Route path='/cart/:id?' component={CartScreen}/>
        <Route  path='/'component={HomeScreen} exact />
        <Route path ='/register' component={RegisterScreen}></Route>
        <Route path ='/profile' component={ProfileScreen}></Route>
        <Route path ='/payment' component={PaymentScreen}></Route>
        <Route path='/placeorder' component={PlaceOrderScreen}></Route>
        <Route path='/orders/:id' component={OrderScreen}></Route>
        <Route path='/admin/userList' component={UserListScreen}></Route>
      </Container>
    </main>
    <Footer />
    
    </Router>
  );
}

export default App;
