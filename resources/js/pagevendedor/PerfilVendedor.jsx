import React, { useState, useEffect } from 'react';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';

const PerfilVendedor = () => {
    const { getUser } = AuthUser();
    const user = getUser();

    // Aquí puedes acceder a los atributos como nombre y correo del usuario
    //const { nombre, correo } = user;

    return (
        <div className='container bg-light'>
            <div className='row'>
                <SidebarVendedor />
                <div className='col-sm-9 mt-3 mb-3'>
                    <div className='card'>
                        <div className='card-body'>
                            <h1>Perfil del Vendedor</h1>
                            <div>
                                <strong>Nombre:</strong> {user.name}
                            </div>
                            <div>
                                <strong>Correo:</strong> {user.email}
                            </div>
                            {/* Aquí puedes agregar más campos del usuario si es necesario */}
                            <div>
                                <strong>Moneda:</strong> {"camilla"}
                            </div>
                            <div>
                                <strong>Nombre:</strong> {user.name}
                            </div>
                            <div>
                                <strong>Nombre:</strong> {user.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilVendedor;
