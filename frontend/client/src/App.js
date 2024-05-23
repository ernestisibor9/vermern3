import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Header from './component/Header'
import './component/styles.css'
import { Routes, Route } from'react-router-dom'
import Movies from './pages/Movies'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      {/*  Header */}
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='movies' element={<Movies/>}/>
          <Route path='admin' element={<Admin/>}/>
          <Route path='auth' element={<Auth/>}/>
          <Route path='register' element={<Register/>}/>
        </Routes>
        <ToastContainer theme='colored'/>
    </div>
  )
}

export default App
