import './App.css';

import React from 'react'
import Register from './Pages/Register/Register';

import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';


function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
   <Route path='/' element={<Register/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/home' element={<Home/>}/>
   </Routes>
   
   </BrowserRouter>
    </div>
  )
}

export default App