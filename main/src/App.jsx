
import Home from './pages/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import About from './pages/About'
import Ofertas from './pages/Ofertas'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'
import { GeneralProvider } from './context/GeneralContext'
import LoginUser from './pages/LoginUser'
import DetailProduct from './components/DetailProduct/DetailProduct'

import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { fetchProducts } from './redux/thunks/productThunks'
import { CartModal } from './components/CartModal/CartModal'

function App() {

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <GeneralProvider>
        <Router>
          <div className="app-container">
            <CartModal />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/ofertas' element={<Ofertas />} />
              <Route path='/contacto' element={<Contacto />} />
              <Route path='/login' element={<LoginUser />} />
              <Route path="/product/:productId" element={<DetailProduct />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
    </GeneralProvider>
  );
}

export default App;