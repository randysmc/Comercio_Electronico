import React, { useEffect, useState } from 'react';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const ServiciosRealizados = () => {
    const { getToken } = AuthUser();
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        getServicioAll();
    }, []);

    const getServicioAll = async () => {
        try {
            const response = await Config.getServiciosRealizados(getToken());
            const userServicios = response.data;

            setServicios(userServicios);
        } catch (error) {
            console.error("Error al obtener servicios");
        }
    };

    return (
        <div className="container bg-light">
            <div className="row">
                <SidebarVendedor />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {servicios.map((servicio) => (
                            <div className="col" key={servicio.id}>
                                <div className="card">
                                    <img src={servicio.urlfoto} className="card-img-top" alt={servicio.nombre} />
                                    <div className="card-body">
                                        <h5 className="card-title">{servicio.nombre}</h5>
                                        <p className="card-text">{servicio.descripcion}</p>
                                        <p className="card-text">Pago: {servicio.precio} créditos</p>
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiciosRealizados;
