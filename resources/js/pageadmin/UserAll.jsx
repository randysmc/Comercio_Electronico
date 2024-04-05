import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Config from "../Config";
import { Link } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";

const UserAll = () => {
    const [users, setUser] = useState();
    const { getRol, getLogout, getToken } = AuthUser();

    useEffect(() => {
        getUserAll();
    }, []);

    const getUserAll = async () => {
        const token = getToken();
        if (!token) {
            // Manejar el caso en que el token no esté presente
            console.log("Token no encontrado");
            return;
        }

        try {
            const response = await Config.getUserAll(token); // Pasa el token a la función getUserAll
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
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
                                        <th>Id</th>
                                        <th>Name</th> 
                                        <th>Email</th>
                                        <th>Tipo de usuario</th>
                                        <th>Billetera</th> {/* Nueva columna para la billetera */}
                                        <th>Acciones</th> {/* Columna para las acciones */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {!users ? (
                                        <tr>
                                            <td colSpan="6">...loading</td> {/* Si no hay usuarios, mostrar mensaje de carga */}
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.aprobado ? "Aprobado" : "No aprobado"}</td>
                                                <td> {/* Mostrar información de la billetera y monedas */}
                                                    {user.cartera ? (
                                                        <div>
                                                            <p>ID de la cartera: {user.cartera.id}</p>
                                                            {user.cartera.monedas_cartera.map((moneda) => (
                                                                <p key={moneda.id}>
                                                                    Moneda: {moneda.moneda.nombre}, Cantidad: {moneda.cantidad}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        "Sin billetera"
                                                    )}
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/admin/user/edit/${user.id}`}
                                                        className="btn btn-primary"
                                                    >
                                                        Editar {/* Enlace para editar el usuario */}
                                                    </Link>
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

export default UserAll;
