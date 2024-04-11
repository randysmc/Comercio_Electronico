import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';

const CompraProducto = () => {
    const { getUser, getToken } = AuthUser();
    const user = getUser();

    const params = new URLSearchParams(window.location.search);
    const dinero = params.get('precio');
    const user_id_vendedor = params.get('user_id_vendedor');
    const id_producto = params.get('id_producto');
    
    // Obtener el id del usuario autenticado
    const user_id_comprador = user.id;

    const navigate = useNavigate();
    
    const realizarCompra = async () => {
        try {
            // Realizar la transacción
            console.log("Precio:", dinero);
            console.log("ID del vendedor:", user_id_vendedor);
            console.log("ID del comprador:", user_id_comprador);
            console.log("ID del producto:", id_producto);
            await Config.getTransaccionStore(getToken(), {
                dinero,
                user_id_vendedor,
                user_id_comprador,
                id_producto,
            });

            // Redirigir al usuario a la página "/usuario"
            navigate('/usuario');
        } catch (error) {
            console.error("Error al realizar la compra:", error);
            // Manejar el error según sea necesario
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <SidebarVendedor/>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">Formulario de Compra</h2>
                        </div>
                        <div className="card-body">
                            <form>
                                {/* Mostrar los datos del producto */}
                                <div className="mb-3">
                                    <label htmlFor="dinero" className="form-label">Precio:</label>
                                    <input type="text" id="dinero" name="dinero" className="form-control" value={dinero} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="user_id_vendedor" className="form-label">ID del Vendedor:</label>
                                    <input type="text" id="user_id_vendedor" name="user_id_vendedor" className="form-control" value={user_id_vendedor} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="id_producto" className="form-label">ID del Producto:</label>
                                    <input type="text" id="id_producto" name="id_producto" className="form-control" value={id_producto} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="id_comprador" className="form-label">ID del Comprador:</label>
                                    <input type="text" id="id_comprador" name="id_comprador" className="form-control" value={user_id_comprador} readOnly />
                                </div>
                                <div className="btn-group mt-3">
                                    <Link to={-1} className='btn btn-secondary'> Regresar </Link>
                                    <button type="button" className="btn btn-primary" onClick={realizarCompra}>Realizar Compra</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompraProducto;
