import Header from './components/Header'
import {BrowserRouter as Router, Route} from 'react-router-dom' 
import {Container}  from 'react-bootstrap'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
const App = () => {
  return (
    <Router>
    <Header />
    <main className='py-3'>
      <Container>
        <Route  path='/'component={HomeScreen} exact />
        <Route path='/products/:id' component={ProductScreen}/>
      </Container>
    </main>
    <Footer />
    
    </Router>
  );
}

export default App;
