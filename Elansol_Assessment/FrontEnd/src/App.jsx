import { useState } from 'react'
import './App.css'
import Register from './components/register_page/Register'
import Dashboard from './components/dashboard_page/Dashboard'
import Login from './components/login_page/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home_page/Home'
import AddContact from './components/addconatct/AddContact'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/addContact' element={<AddContact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
