import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';

const Voluntariado = () => {
    const { getUser, getToken } = AuthUser();
    const user = getUser();

    const params = new URLSearchParams(window.location.search);
    const horas = params.get('horas');
    const user_id_vendedor = params.get('user_id_vendedor');
    const id_servicio = params.get('id_servicio');

    // Obtener el id del usuario autenticado
    const user_id_comprador = user.id;

    const navigate = useNavigate();

    const realizarVoluntariado = async () => {
        try {
            // Realizar la transacción de voluntariado
            console.log("Horas:", horas);
            console.log("ID del vendedor:", user_id_vendedor);
            console.log("ID del comprador:", user_id_comprador);
            console.log("ID del servicio:", id_servicio);
            await Config.getVoluntarioStore(getToken(), {
                horas,
                user_id_vendedor,
                user_id_comprador,
                id_servicio,
            });

            // Redirigir al usuario a la página "/usuario"
            navigate('/usuario');
        } catch (error) {
            console.error("Error al realizar el voluntariado:", error);
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
                            <h2 className="mb-0">Formulario de Voluntariado</h2>
                        </div>
                        <div className="card-body">
                            <form>
                                {/* Mostrar los datos del servicio */}
                                <div className="mb-3">
                                    <label htmlFor="horas" className="form-label">Horas:</label>
                                    <input type="text" id="horas" name="horas" className="form-control" value={horas} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="user_id_vendedor" className="form-label">ID del Vendedor:</label>
                                    <input type="text" id="user_id_vendedor" name="user_id_vendedor" className="form-control" value={user_id_vendedor} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="id_servicio" className="form-label">ID del Servicio:</label>
                                    <input type="text" id="id_servicio" name="id_servicio" className="form-control" value={id_servicio} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="id_comprador" className="form-label">ID del Comprador:</label>
                                    <input type="text" id="id_comprador" name="id_comprador" className="form-control" value={user_id_comprador} readOnly />
                                </div>
                                <div className="btn-group mt-3">
                                    <Link to={-1} className='btn btn-secondary'> Regresar </Link>
                                    <button type="button" className="btn btn-primary" onClick={realizarVoluntariado}>Realizar Voluntariado</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Voluntariado;
