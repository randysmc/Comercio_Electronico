import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Outlet} from 'react-router-dom'

const LayoutPublic = () => {
  return (
    <>
    <h1>Layout Public</h1>
    <Navbar/>
    <h1>Sera que aqui puedo agregar algo</h1>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default LayoutPublic