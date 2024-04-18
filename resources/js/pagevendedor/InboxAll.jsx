import React, { useEffect, useState } from 'react';
import SidebarVendedor from './SidebarVendedor';
import AuthUser from '../pageauth/AuthUser';
import Config from '../Config';
import { Link } from 'react-router-dom';

const InboxAll = () => {
    const { getUser, getToken } = AuthUser();
    const user = getUser();
    const [conversaciones, setConversaciones] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getConversaciones();
    }, []);


    const getConversaciones = async () => {
        try {
            const response = await Config.getInboxConversacion(getToken());
            const userConversaciones = response.data;
            const conversacionesAgrupadas = agruparConversaciones(userConversaciones);
            setConversaciones(conversacionesAgrupadas);
            console.log('Conversaciones recibidas:', conversacionesAgrupadas); // Depuración
            setCargando(false);
        } catch (error) {
            setError("Error al cargar las conversaciones.");
            setCargando(false);
        }
    }

    const agruparConversaciones = (mensajes) => {
        const conversacionesAgrupadas = {};
        mensajes.forEach((mensaje) => {
            const remitenteId = mensaje.remitente.id;
            const destinatarioId = mensaje.destinatario.id;
            const key = `${remitenteId}-${destinatarioId}`;
            if (!conversacionesAgrupadas[key]) {
                conversacionesAgrupadas[key] = [];
            }
            conversacionesAgrupadas[key].push(mensaje);
        });
        return Object.values(conversacionesAgrupadas);
    };

    const esRemitenteAutenticado = (mensaje) => mensaje.remitente.id === user.id;
    const esDestinatarioAutenticado = (mensaje) => mensaje.destinatario.id === user.id;

    console.log(conversaciones);

    return (
        <div className='container bg-light'>
            <div className='row'>
                <SidebarVendedor/>
                <div className='col-sm-9 mt-3 mb-3'>
                    <Link to={'/usuario/inbox/create'} className='btn btn-primary'>Nuevo Mensaje</Link>
                    <div className='row'>
                        {cargando ? (
                            <div className='col'>
                                Cargando...
                            </div>
                        ) : error ? (
                            <div className='col'>
                                {error}
                            </div>
                        ) : (
                            <div>
                                {conversaciones.map((conversacion, index) => (
                                    <div key={index} className='mb-4'>
                                        {conversacion.map((mensaje, index) => (
                                            <div
                                                key={index}
                                                className={`mb-2 ${
                                                    esRemitenteAutenticado(mensaje) ? 'text-right' : 'text-left'
                                                }`}
                                            >
                                                <h3>Remitente: {mensaje.remitente.name}</h3>
                                                <h3>Destinatario: {mensaje.destinatario.name}</h3>
                                                <div>
                                                    <p>Contenido: {mensaje.contenido}</p>
                                                    <p>Fecha: {mensaje.fecha}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InboxAll;

