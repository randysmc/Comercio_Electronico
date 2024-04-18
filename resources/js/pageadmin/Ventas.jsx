import React, { useEffect, useState } from 'react';
import Config from '../Config';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';


const Ventas = () => {
    const { getUser, getToken } = AuthUser();
    const [transacciones, setTransacciones] = useState([]);

    useEffect(() => {
        obtenerTransacciones();
    }, []);

    const obtenerTransacciones = async () => {
        try {
            const response = await Config.getTransaccionAll(getToken());
            const transaccionesData = response.data;
            setTransacciones(transaccionesData);
        } catch (error) {
            console.error("Error al obtener las transacciones:", error);
        }
    };

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Vendedor</th>
                                        <th>Comprador</th>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transacciones.map((transaccion) => (
                                        <tr key={transaccion.id}>
                                            <td>{transaccion.user_vendedor.name}</td>
                                            <td>{transaccion.user_comprador.name}</td>
                                            <td>{transaccion.producto.nombre}</td>
                                            <td>{transaccion.dinero}</td>
                                            <td>{transaccion.fecha}</td>
                                            <td>
                                                <Link to={`/admin/transaccion/${transaccion.id}`} className="btn btn-primary">
                                                    
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ventas