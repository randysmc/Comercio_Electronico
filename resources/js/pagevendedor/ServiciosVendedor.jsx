import React from 'react'
import AuthUser from '../pageauth/AuthUser'

const ServiciosVendedor = () => {
  const {getUser, getToken} = AuthUser();

  console.log("EStamos aqui")
  return (
    <div>ServiciosVendedor</div>
  )
}

export default ServiciosVendedor