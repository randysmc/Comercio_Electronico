import React, { useEffect, useState } from 'react';
import AuthUser from '../pageauth/AuthUser';
import Config from '../Config';
import SidebarVendedor from './SidebarVendedor';
import { Link } from 'react-router-dom';

const TodosLosServicios = () => {
    const { getUser, getToken } = AuthUser();
    const [servicios, setServicios] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        getServicioAll();
    }, []);

    const getServicioAll = async () => {
        try {
            const response = await Config.getServicioAll(getToken());
            const userServicios = response.data;

            setServicios(userServicios);
        } catch (error) {
            console.error("Error al obtener servicios");
        }
    };

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const serviciosFiltrados = servicios.filter(servicio =>
        servicio.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container bg-light">
            <div className="row">
                <SidebarVendedor />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="mb-3">
                        <label htmlFor="busqueda">Buscar por nombre:</label>
                        <input
                            type="text"
                            id="busqueda"
                            name="busqueda"
                            className="form-control"
                            value={busqueda}
                            onChange={handleBusquedaChange}
                        />
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {serviciosFiltrados.map((servicio) => (
                            <div className="col" key={servicio.id}>
                                <div className="card">
                                    <img src={servicio.urlfoto} className="card-img-top" alt={servicio.nombre} />
                                    <div className="card-body">
                                        <h5 className="card-title">{servicio.nombre}</h5>
                                        <p className="card-text">{servicio.descripcion}</p>
                                        <p className="card-text">Pago: {servicio.precio} creditos</p>
                                        <Link to={`/usuario/servicio/info/${servicio.id}`} className="btn btn-primary">Ver Servicio</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodosLosServicios;
