import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (

        <div className="col-sm-3 pt-3 pb-3">
            <div className="list-group">
                
                <NavLink to={`/admin/user`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")}  >User</NavLink>
                <NavLink to={`/admin/categoria`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Categorias</NavLink>
                <NavLink to={`/admin/producto`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Productos</NavLink>
                <NavLink to={`/admin/producto-no-aprobado`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Productos para aprobar</NavLink>
                <NavLink to={`/admin/servicio`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Servicios</NavLink>
                <NavLink to={`/admin/reportes`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Reportes de usuarios</NavLink>
                <NavLink to={`/admin/ventas`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Lista de Ventas</NavLink>
                <NavLink to={`/admin/voluntariados`} className={({isActive}) => (isActive ? "list-group-item active" : "list-group-item ")} >Lista de Voluntariados</NavLink>
                
            </div>
        </div>


  )
}

export default Sidebar