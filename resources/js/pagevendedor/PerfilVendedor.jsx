import React from 'react';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';

const PerfilVendedor = () => {
    const { getUser } = AuthUser();
    const user = getUser();

    return (
        <div className='container bg-light'>
            <div className='row'>
                <SidebarVendedor />
                <div className='col-sm-9 mt-3 mb-3'>
                    <div className='card'>
                        <div className='card-body'>
                            <h1 className="mb-4">Perfil del Vendedor</h1>
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
                                <strong>URL de foto:</strong> <img src={user.photo_url} alt="Foto de perfil" className="img-fluid" />
                            </div>
                            {/* Puedes agregar más campos según sea necesario */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilVendedor;
