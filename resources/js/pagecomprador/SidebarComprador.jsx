import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarComprador = () => {
    return (

        <div className="col-sm-3 pt-3 pb-3">
            <div className="list-group">
                
                <NavLink to={`/comprador/profile`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")}  >Perfil</NavLink>
                <NavLink to={`/comprador/producto`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Catalogo de Productos</NavLink>
                <h3>Servicios proximamente</h3>
            </div>
        </div>


  )
}

export default SidebarComprador