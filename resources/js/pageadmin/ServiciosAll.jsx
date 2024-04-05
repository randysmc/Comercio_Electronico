import React, { useEffect, useState } from 'react';
import Config from '../Config';
import Sidebar from "./Sidebar";
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';


const ServiciosAll = () => {
    const { getUser, getToken } = AuthUser();
    //const user = getUser();
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        getAllServicios();
    },[]);

    const getAllServicios = async() =>{
        const response = await Config.getAdminServiciosAll(getToken());
        //console.log(response.data)
        const userProducts = response.data;

        setProducts(userProducts);
    }



    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        
                                        
                                        <th>Servicio</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Estado?</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!products ? (
                                        <tr>
                                            <td colSpan="5">Cargando...</td>
                                        </tr>
                                    ) : (
                                        products.map((product) => (
                                            <tr key={product.id}>
                                                
                                                
                                                <td>{product.nombre}</td>
                                                <td>{product.descripcion}</td>
                                                <td>{product.precio}</td>
                                                <td>{product.publicado ? 'Aprobado' : 'No aprobado'}</td>
                                                <td>
                                                    <Link to={`/admin/producto/edit/${product.id}`} className="btn btn-primary">
                                                        
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
}

export default ServiciosAll