import React, { useEffect, useState } from 'react';
import Config from '../Config';
import Sidebar from "./Sidebar";
import { Link } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const ProductosAll = () => {
    const { getUser, getToken } = AuthUser();
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        getAllProducts();
    },[]);

    const getAllProducts = async() =>{
        try {
            const response = await Config.getAdminProductAll(getToken());
            const userProducts = response.data;
            setProducts(userProducts);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    }

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <ul className="list-group">
                                {!products ? (
                                    <li className="list-group-item">Cargando...</li>
                                ) : (
                                    products.map((product) => (
                                        <li key={product.id} className="list-group-item">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <img src={product.urlfoto} className="img-fluid" alt={product.nombre} />
                                                </div>
                                                <div className="col-md-9">
                                                    <h5>{product.nombre}</h5>
                                                    <p><strong>Vendedor:</strong> {product.user.name}</p>
                                                    <p><strong>Categoría:</strong> {product.categoria.nombre}</p>
                                                    <p><strong>Precio:</strong> {product.precio}</p>
                                                    <p><strong>Estado:</strong> {product.publicado ? 'Aprobado' : 'No aprobado'}</p>
                                                    <Link to={`/admin/producto/edit/${product.id}`} className="btn btn-primary">
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
};

export default ProductosAll;
