import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Sidebar/Sidebar'
import Dashboard from './Dashboard/Dashboard'
import { Routes, Route } from 'react-router-dom'
import Login from './Login/Login'
import { Navigate } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute>< Dashboard/></ProtectedRoute>} />
        <Route path="/login" element={< Login/>} />
      </Routes>
    </>
  )
}

function ProtectedRoute({children}){
  if(localStorage.getItem('name')){
    return children
  }else{
    return <Navigate to='/login' />
  }
}

export default App
