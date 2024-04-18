import React, { useEffect, useState } from 'react';
import Config from '../Config';
import Sidebar from "./Sidebar";
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const ServiciosAll = () => {
    const { getUser, getToken } = AuthUser();
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        getAllServicios();
    }, []);

    const getAllServicios = async () => {
        try {
            const response = await Config.getAdminServiciosAll(getToken());
            const userServicios = response.data;
            setServicios(userServicios);
        } catch (error) {
            console.error("Error al obtener servicios:", error);
        }
    }

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <ul className="list-group">
                                {!servicios ? (
                                    <li className="list-group-item">Cargando...</li>
                                ) : (
                                    servicios.map((servicio) => (
                                        <li key={servicio.id} className="list-group-item">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    {/* Aquí puedes colocar la imagen del servicio si tienes una */}
                                                </div>
                                                <div className="col-md-9">
                                                    <h5>{servicio.nombre}</h5>
                                                    <p><strong>Descripción:</strong> {servicio.descripcion}</p>
                                                    <p><strong>Precio:</strong> {servicio.precio}</p>
                                                    <p><strong>Estado:</strong> {servicio.publicado ? 'Aprobado' : 'No aprobado'}</p>
                                                    <Link to={`/admin/servicio/edit/${servicio.id}`} className="btn btn-primary">
                                                        Editar
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiciosAll;
