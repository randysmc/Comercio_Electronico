import React, { useEffect, useState } from "react";
import AuthUser from "../pageauth/AuthUser";
import Config from "../Config";
import SidebarVendedor from "./SidebarVendedor";
import { Link } from "react-router-dom";

const ServiciosVendedor = () => {
    const { getUser, getToken } = AuthUser();
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        getServicioAll();
    }, []);

    const getServicioAll = async () => {
        try {
            const response = await Config.getServicioAll(getToken());
            const userServicios = response.data;

            setServicios(userServicios);
            console.log(userServicios);
        } catch (error) {
            console.error("Error al obtener servicios");
        }
    };

    return (
        <div className="container bg-light">
            <div className="row">
                <h1>Si</h1>
                <SidebarVendedor />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <Link
                                to={"/vendedor/servicio/create"}
                                className="btn btn-primary"
                            >
                                {" "}
                                Solicitar un Servicio
                            </Link>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!servicios ? (
                                        <tr>
                                            <td colSpan="5">Cargando...</td>
                                        </tr>
                                    ) : (
                                        servicios.map((servicio) => (
                                            <tr key={servicio.id}>
                                                <td>{servicio.id}</td>
                                                <td>{servicio.nombre}</td>
                                                <td>{servicio.descripcion}</td>
                                                <td>{servicio.precio}</td>
                                                <td>
                                                    <Link to={`/vendedor/producto/edit/${servicio.id}`}className="btn btn-primary" >Editar</Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiciosVendedor;
