import Home from './pages/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import About from './pages/About'
import Ofertas from './pages/Ofertas'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'
import { GeneralProvider } from './context/GeneralContext'
import { CartProvider } from './context/CartContext'
import LoginUser from './pages/LoginUser'
import DetailProduct from './components/DetailProduct/DetailProduct'

function App() {
  return (

    <GeneralProvider>
      <CartProvider>
          <Router>
            <div className="app-container">
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/about' element={ <About />} />
                  <Route path='/ofertas' element={<Ofertas />} />
                  <Route path='/contacto' element={<Contacto />} />
                  <Route path='/login' element={<LoginUser />} />
                  <Route path="/product/:productId" element={<DetailProduct />} />
                  <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </Router>
      </CartProvider>
    </GeneralProvider>
  )
}

export default App
