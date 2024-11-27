// import { useState } from 'react'
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register';
import Dashboard from './pages/home/Dashboard';

import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <div className='bg-[#11111a] h-full'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
