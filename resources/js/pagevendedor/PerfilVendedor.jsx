import React, { useState, useEffect } from 'react';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';
import Config from '../Config';

const PerfilVendedor = () => {
    const { getUser, getToken } = AuthUser();
    const [user, setUser] = useState(null); // Inicializa el estado del usuario como null

    useEffect(() => {
        obtenerUsuario();
    }, []);

    const obtenerUsuario = async () => {
        try {
            const response = await Config.getUsuario(getToken());
            setUser(response.data); // Almacena el usuario en el estado
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            // Manejar el error según sea necesario
        }
    };

    return (
        <div className='container bg-light'>
            <div className='row'>
                <SidebarVendedor />
                <div className='col-sm-9 mt-3 mb-3'>
                    <div className='card'>
                        <div className='card-body'>
                            <h1 className="mb-4">Perfil del Vendedor</h1>
                            {/* Verifica si el usuario está cargado */}
                            {user ? (
                                <>
                                    <div className="mb-3">
                                        <strong>Nombre:</strong> {user.name}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Apellido:</strong> {user.lastname}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Nombre de usuario:</strong> {user.username}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Correo electrónico:</strong> {user.email}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Fecha de nacimiento:</strong> {user.fecha_nacimiento}
                                    </div>
                                    <div className="mb-3">
                                        <strong>URL de foto:</strong> <img src={user.urlfoto} alt="Foto de perfil" className="img-fluid" />
                                    </div>
                                    {/* Mostrar información de la cartera y las monedas */}
                                    <div className="mb-3">
                                        <strong>Cartera:</strong>
                                        {user.cartera ? (
                                            <div>
                                                <p>ID de la cartera: {user.cartera.id}</p>
                                                <p>Monedas:</p>
                                                <ul>
                                                    {user.cartera.monedas_cartera.map((moneda) => (
                                                        <li key={moneda.id}>
                                                            <strong>Moneda:</strong> {moneda.moneda.nombre}, <strong>Cantidad:</strong> {moneda.cantidad}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            "Sin cartera"
                                        )}
                                    </div>
                                    {/* Puedes agregar más campos según sea necesario */}
                                </>
                            ) : (
                                <p>Cargando...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilVendedor;
