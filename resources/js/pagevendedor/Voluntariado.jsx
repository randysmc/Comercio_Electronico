import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';

const Voluntariado = () => {
    const { getUser, getToken } = AuthUser();
    const user = getUser();

    const params = new URLSearchParams(window.location.search);
    const creditos = params.get('precio');
    const user_id_publicador = params.get('user_id_publicador');
    const id_servicio = params.get('id_servicio');
    const [mensajeServidor, setMensajeServidor] = useState('');

    // Obtener el id del usuario autenticado
    const user_id_voluntario = user.id;

    const navigate = useNavigate();

    const realizarVoluntariado = async () => {
        try {
            // Realizar la transacción de voluntariado
            const response = await Config.getVoluntarioStore(getToken(), {
                creditos,
                user_id_publicador,
                user_id_voluntario,
                id_servicio,
            });

            if (response.status === 200) {
                const message = response.data.message;
                setMensajeServidor(message);
                navigate('/usuario');
            } else if (response.status === 400) {
                setMensajeServidor('El usuario solicitante no tiene suficientes créditos');
            } else if (response.status === 401) {
                setMensajeServidor('Usuario no autenticado');
            } else if (response.status === 500) {
                setMensajeServidor('Error en el servidor');
            }
        } catch (error) {
            console.error("Error al realizar el voluntariado:", error);
            setMensajeServidor('Error al realizar el voluntariado. Por favor, inténtelo de nuevo más tarde.');
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
                                    <label htmlFor="creditos" className="form-label">Creditos:</label>
                                    <input type="text" id="creditos" name="horas" className="form-control" value={creditos} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="user_id_publicador" className="form-label">ID del Publicador:</label>
                                    <input type="text" id="user_id_publicador" name="user_id_publicador" className="form-control" value={user_id_publicador} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="id_servicio" className="form-label">ID del Servicio:</label>
                                    <input type="text" id="id_servicio" name="id_servicio" className="form-control" value={id_servicio} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="id_voluntario" className="form-label">ID del Voluntario:</label>
                                    <input type="text" id="id_voluntario" name="id_voluntario" className="form-control" value={user_id_voluntario} readOnly />
                                </div>
                                <div className="btn-group mt-3">
                                    <Link to={-1} className='btn btn-secondary'> Regresar </Link>
                                    <button type="button" className="btn btn-primary" onClick={realizarVoluntariado}>Realizar Voluntariado</button>
                                </div>
                                {mensajeServidor && (
                                    <div className={`alert alert-${obtenerClaseAlerta(mensajeServidor)} mt-3`} role="alert">
                                    <strong>Mensaje:</strong> {mensajeServidor}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function obtenerClaseAlerta(mensaje){
        if (mensaje.includes("Voluntariado realizado exitosamente")) {
            return "success";
          } else if (mensaje.includes("Usuario no autenticado") || mensaje.includes("Error")) {
            return "danger";
          } else {
            return "warning"; // Default class for other messages
          }
    }
};

export default Voluntariado;
