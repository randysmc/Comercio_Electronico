import React, { useState, useEffect } from 'react';
import Config from '../Config';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const TransaccionAll = () => {
    const { getUser, getToken } = AuthUser();
    const [transacciones, setTransacciones] = useState([]);
    const [requestFunction, setRequestFunction] = useState(null);

    useEffect(() => {
        obtenerTransacciones();
    }, [requestFunction]);

    const obtenerTransacciones = async () => {
        if (!requestFunction) return;
        try {
            const response = await requestFunction(getToken());
            const data = response.data;
            if (Array.isArray(data)) { // Verificar si data es un array
                setTransacciones(data);
            } else {
                console.error("Los datos recibidos no son un array:", data);
            }
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
                            <div className="btn-group mb-3">
                                <button className="btn btn-secondary" onClick={() => setRequestFunction(() => Config.getTransaccionTotalDineroPorUsuario)}>Total Dinero Por Usuario</button>
                                <button className="btn btn-secondary" onClick={() => setRequestFunction(() => Config.getTransaccionCantidadProductosComprados)}>Cantidad Productos Comprados</button>
                                <button className="btn btn-secondary" onClick={() => setRequestFunction(() => Config.getTransaccionPromedioDineroGastado)}>Promedio Dinero Gastado</button>
                                <button className="btn btn-secondary" onClick={() => setRequestFunction(() => Config.getTransaccionCantidadTransacciones)}>Cantidad de Transacciones</button>
                                {/* Agrega más botones para otras solicitudes según sea necesario */}
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre Vendedor</th>
                                        <th>Nombre Comprador</th>
                                        <th>Cantidad de Productos</th>
                                        <th>Cantidad de Dinero gastado</th>
                                        <th>Promedio de Dinero Gastado</th>
                                        <th>Cantidad de Transacciones</th>
                                        {/* Agrega más encabezados según sea necesario */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {transacciones.map((transaccion, index) => (
                                        <tr key={index}>
                                            <td>{transaccion.user_vendedor ? transaccion.user_vendedor.name : ''}</td>
                                            <td>{transaccion.user_comprador ? transaccion.user_comprador.name : ''}</td>
                                            <td>{transaccion.cantidad_productos}</td>
                                            <td>{transaccion.total_dinero}</td>
                                            <td>{transaccion.promedio_dinero}</td>
                                            <td>{transaccion.cantidad_transacciones}</td>
                                            {/* Muestra otros datos según el tipo de solicitud */}
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

export default TransaccionAll;
