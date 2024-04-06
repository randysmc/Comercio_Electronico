import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarVendedor = () => {
  return (

        <div className="col-sm-3 pt-3 pb-3">
            <div className="list-group">
                
                <NavLink to={`/usuario/profile`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")}  >Perfil</NavLink>
                <NavLink to={`/usuario/producto`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Catalogo</NavLink>
                <NavLink to={`/usuario/mis-productos`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Mis productos</NavLink>
                
            
            </div>
        </div>


  )
}

export default SidebarVendedor