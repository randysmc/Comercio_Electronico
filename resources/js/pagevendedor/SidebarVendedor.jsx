import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarVendedor = () => {
  return (

        <div className="col-sm-3 pt-3 pb-3">
            <div className="list-group">
                
                <NavLink to={`/vendedor/profile`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")}  >Perfil</NavLink>
                <NavLink to={`/vendedor/producto`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Productos Publicados</NavLink>
                <NavLink to={`/vendedor/servicio`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Servicios publicados</NavLink>
                <NavLink to={`/admin/servicio`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Ofertas Recibidas</NavLink>
                <NavLink to={`/home`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Historial de ventas</NavLink>
                <NavLink to={`/home`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")}  >Inbox</NavLink>
            </div>
        </div>


  )
}

export default SidebarVendedor