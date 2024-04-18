import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarVendedor = () => {
  return (

        <div className="col-sm-3 pt-3 pb-3">
            <div className="list-group">
                
                <NavLink to={`/usuario/profile`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")}  >Perfil</NavLink>
                <NavLink to={`/usuario/producto`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Catalogo Productos</NavLink>
                <NavLink to={`/usuario/mis-productos`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Mis productos</NavLink>
                <NavLink to={`/usuario/producto-compra`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Productos Comprados</NavLink>
                <NavLink to={`/usuario/servicio`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Catalogo de Servicios</NavLink>
                <NavLink to={`/usuario/mis-servicios`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Servicios Solicitados</NavLink>
                <NavLink to={`/usuario/inbox`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Bandeja de Mensajes</NavLink>
                <NavLink to={`/usuario/transferencia`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Monedas</NavLink>

                
            
            </div>
        </div>


  )
}

export default SidebarVendedor