import React, { useEffect, useState } from 'react';
import Config from '../Config';
import Sidebar from './Sidebar';
import AuthUser from '../pageauth/AuthUser';

const Voluntariados = () => {
    const { getToken } = AuthUser();
    const [trueques, setTrueques] = useState([]);

    useEffect(() => {
        obtenerTrueques();
    }, []);

    const obtenerTrueques = async () => {
        try {
            const response = await Config.getTruequeAll(getToken());
            const truequesData = response.data;
            setTrueques(truequesData);
        } catch (error) {
            console.error("Error al obtener los trueques:", error);
        }
    };

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Usuario Publicador</th>
                                        <th>Usuario Voluntario</th>
                                        <th>Servicio</th>
                                        <th>Créditos</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trueques.map((trueque) => (
                                        <tr key={trueque.id}>
                                            <td>{trueque.user_publicador ? trueque.user_publicador.name : ''}</td>
                                            <td>{trueque.user_voluntario ? trueque.user_voluntario.name : ''}</td>
                                            <td>{trueque.servicio ? trueque.servicio.nombre : ''}</td>
                                            <td>{trueque.creditos}</td>
                                            <td>{trueque.fecha}</td>
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

export default Voluntariados;
