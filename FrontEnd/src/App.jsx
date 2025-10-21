import React from 'react'
import {Routes, Route, useLocation,Navigate} from 'react-router-dom'
import Registration from './pages/registration.jsx'
import Home from './pages/Home'     
import Login from './pages/Login'
import Navbar from './components/Navbar.jsx'
import { useContext } from 'react'
import { userDataContext } from './context/userContext.jsx'
import About from './pages/About.jsx'
import Collections from './pages/Collections.jsx'
import Product from './pages/Product.jsx'
import Contact from './pages/Contact.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Order from './pages/Order.jsx'
import NotFound from './pages/NotFound.jsx'
import AI from './components/AI.jsx';

function App() {
  let {userData}=useContext(userDataContext);
  let location=useLocation()
  return (
    <>
     {userData && <Navbar/>}
      <Routes>
          <Route path='/signup' element={userData?
             (<Navigate to={location.state?.from || "/"}/>) 
             :(<Registration/>)} />

          <Route path='/login' element={userData?
             (<Navigate to={location.state?.from || "/"}/>) 
             :(<Login/>)}/>
             
          <Route path='/'
           element={userData? <Home/> : <Navigate to="/login" 
           state={{from:location.pathname}}/> }/>

          <Route path='/about' element={userData? <About/> : <Navigate to="/login" 
           state={{from:location.pathname}}/> }/>

          <Route path='/collection' element={userData? <Collections/> : <Navigate to="/login" 
           state={{from:location.pathname}}/> }/>

          <Route path='/product' element={userData? <Product/> : <Navigate to="/login" 
           state={{from:location.pathname}}/> }/>

          <Route path='/contact' element={userData? <Contact/> : <Navigate to="/login" 
           state={{from:location.pathname}}/> }/>

           <Route path='/productdetail/:productId' element={userData? <ProductDetails/> : <Navigate to="/login" 
           state={{from:location.pathname}}/> }/>

           <Route path='/cart' element={userData? <Cart/> : <Navigate to="/login" 
           state={{from:location.pathname}}/> }/>

           <Route path='/placeorder' element={userData? <PlaceOrder/> : <Navigate to="/login" 
           state={{from:location.pathname}}/> }/>

           <Route path='/order' element={userData? <Order/> : <Navigate to="/login" 
           state={{from:location.pathname}}/> }/>

           <Route path='*' element={<NotFound/>}/>
      </Routes>
      <AI/>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
  )
}

export default App

